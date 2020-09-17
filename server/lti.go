package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha1"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/go-martini/martini"
	. "github.com/russross/codegrinder/types"
	"github.com/russross/meddler"
)

const bootstrapAssignmentName string = "bootstrap-codegrinder"
const canvasDateFormat string = "2006-01-02 15:04:05 -0700"

// LTIRequest is an LTI request object (generated by Canvas or other LMS).
type LTIRequest struct {
	PersonNameFull                   string  `form:"lis_person_name_full"`                     // Russ Ross
	PersonNameFamily                 string  `form:"lis_person_name_family"`                   // Ross
	PersonNameGiven                  string  `form:"lis_person_name_given"`                    // Russ
	PersonContactEmailPrimary        string  `form:"lis_person_contact_email_primary"`         // russ@dixie.edu
	UserID                           string  `form:"user_id"`                                  // <opaque>: unique per user
	Roles                            string  `form:"roles"`                                    // Instructor, Student; note: varies per course
	UserImage                        string  `form:"user_image"`                               // https:// ... user picture
	LTIMessageType                   string  `form:"lti_message_type"`                         // basic-lti-launch-request
	LTIVersion                       string  `form:"lti_version"`                              // LTI-1p0
	LaunchPresentationDocumentTarget string  `form:"launch_presentation_document_target"`      // iframe
	LaunchPresentationLocale         string  `form:"launch_presentation_locale"`               // en
	TCInstanceName                   string  `form:"tool_consumer_instance_name"`              // Dixie State University
	TCInstanceGUID                   string  `form:"tool_consumer_instance_guid"`              // <opaque>: unique per Canvas instance
	TCInstanceContactEmail           string  `form:"tool_consumer_instance_contact_email"`     // notifications@instructure.com
	TCInstanceVersion                string  `form:"tool_consumer_info_version"`               // cloud
	TCInfoProductFamilyCode          string  `form:"tool_consumer_info_product_family_code"`   // canvas
	CourseOfferingSourceDID          string  `form:"lis_course_offering_sourcedid"`            // CCRSCS-3520-42527.201440
	ContextTitle                     string  `form:"context_title"`                            // CS-3520-01 FA14
	ContextLabel                     string  `form:"context_label"`                            // CS-3520
	ContextID                        string  `form:"context_id"`                               // <opaque>: unique per course
	ResourceLinkTitle                string  `form:"resource_link_title"`                      // CodeGrinder
	ResourceLinkID                   string  `form:"resource_link_id"`                         // <opaque>: unique per course+link, i.e., per-assignment
	PersonSourcedID                  string  `form:"lis_result_sourcedid"`                     // <opaque>: unique per course+link+user, for grade callback
	OutcomeServiceURL                string  `form:"lis_outcome_service_url"`                  // https://... to post grade
	ExtIMSBasicOutcomeURL            string  `form:"ext_ims_lis_basic_outcome_url"`            // https://... to post grade with extensions
	ExtOutcomeDataValuesAccepted     string  `form:"ext_outcome_data_values_accepted"`         // url,text what can be passed back with grade
	LaunchPresentationReturnURL      string  `form:"launch_presentation_return_url"`           // https://... when finished
	CanvasUserLoginID                string  `form:"custom_canvas_user_login_id"`              // rross5
	CanvasAssignmentPointsPossible   float64 `form:"custom_canvas_assignment_points_possible"` // 10
	CanvasEnrollmentState            string  `form:"custom_canvas_enrollment_state"`           // active
	CanvasCourseID                   int64   `form:"custom_canvas_course_id"`                  // 279080
	CanvasUserID                     int64   `form:"custom_canvas_user_id"`                    // 353051
	CanvasAssignmentTitle            string  `form:"custom_canvas_assignment_title"`           // YouFace Template
	CanvasAssignmentID               int64   `form:"custom_canvas_assignment_id"`              // 1566693
	CanvasAPIDomain                  string  `form:"custom_canvas_api_domain"`                 // dixie.instructure.com
	OAuthVersion                     string  `form:"oauth_version"`                            // 1.0
	OAuthSignature                   string  `form:"oauth_signature"`                          // <opaque> base64
	OAuthSignatureMethod             string  `form:"oauth_signature_method"`                   // HMAC-SHA1
	OAuthTimestamp                   int64   `form:"oauth_timestamp"`                          // 1400000132 (unix seconds)
	OAuthConsumerKey                 string  `form:"oauth_consumer_key"`                       // cs3520 (what the instructor entered at setup time)
	OAuthNonce                       string  `form:"oauth_nonce"`                              // <opaque>: must only be accepted once
	OAuthCallback                    string  `form:"oauth_callback"`                           // about:blank
	CanvasAssignmentUnlockAt         string  `form:"custom_canvas_assignment_unlock_at"`       // 2019-10-20T21:00:00Z
	CanvasAssignmentDueAt            string  `form:"custom_canvas_assignment_due_at"`          // 2019-10-20T21:00:00Z
	CanvasAssignmentLockAt           string  `form:"custom_canvas_assignment_lock_at"`         // 2019-10-20T21:00:00Z
}

// GradeResponse is the XML format to post a grade back to the LMS.
type GradeResponse struct {
	XMLName   xml.Name `xml:"imsx_POXEnvelopeRequest"`
	Namespace string   `xml:"xmlns,attr"`
	Version   string   `xml:"imsx_POXHeader>imsx_POXRequestHeaderInfo>imsx_version"`
	Message   string   `xml:"imsx_POXHeader>imsx_POXRequestHeaderInfo>imsx_messageIdentifier"`
	SourcedID string   `xml:"imsx_POXBody>replaceResultRequest>resultRecord>sourcedGUID>sourcedId"`
	Language  string   `xml:"imsx_POXBody>replaceResultRequest>resultRecord>result>resultScore>language"`
	Score     string   `xml:"imsx_POXBody>replaceResultRequest>resultRecord>result>resultScore>textString"`
	URL       string   `xml:"imsx_POXBody>replaceResultRequest>resultRecord>result>resultData>url,omitempty"`
	Text      string   `xml:"imsx_POXBody>replaceResultRequest>resultRecord>result>resultData>text,omitempty"`
}

// LTIConfig is the XML format to configure the LMS to use this tool.
type LTIConfig struct {
	XMLName         xml.Name            `xml:"cartridge_basiclti_link"`
	Namespace       string              `xml:"xmlns,attr"`
	NamespaceBLTI   string              `xml:"xmlns:blti,attr"`
	NamespaceLTICM  string              `xml:"xmlns:lticm,attr"`
	NamespaceLTICP  string              `xml:"xmlns:lticp,attr"`
	NamespaceXSI    string              `xml:"xmlns:xsi,attr"`
	SchemaLocation  string              `xml:"xsi:schemaLocation,attr"`
	Title           string              `xml:"blti:title"`
	Description     string              `xml:"blti:description"`
	Icon            string              `xml:"blti:icon"`
	Extensions      LTIConfigExtensions `xml:"blti:extensions"`
	CartridgeBundle LTICartridge        `xml:"cartridge_bundle"`
	CartridgeIcon   LTICartridge        `xml:"cartridge_icon"`
}

// LTIConfigExtensions is the XML format for Canvas extensions to LTI configuration.
type LTIConfigExtensions struct {
	Platform   string `xml:"platform,attr"`
	Extensions []LTIConfigExtension
	Options    []LTIConfigOptions
}

// LTIConfigOptions is part of the XML format for Canvas extensions to LTI configuration.
type LTIConfigOptions struct {
	XMLName xml.Name `xml:"lticm:options"`
	Name    string   `xml:"name,attr"`
	Options []LTIConfigExtension
}

// LTIConfigExtension is part of the XML format for Canvas extensions to LTI configuration.
type LTIConfigExtension struct {
	XMLName xml.Name `xml:"lticm:property"`
	Name    string   `xml:"name,attr"`
	Value   string   `xml:",chardata"`
}

// LTICartridge is part of the XML format for Canvas extensions to LTI configuration.
type LTICartridge struct {
	IdentifierRef string `xml:"identifierref,attr"`
}

// GetConfigXML handles /lti/config.xml requests, returning an XML file to configure the LMS to use this tool.
func GetConfigXML(w http.ResponseWriter) {
	c := &LTIConfig{
		Namespace:      "http://www.imsglobal.org/xsd/imslticc_v1p0",
		NamespaceBLTI:  "http://www.imsglobal.org/xsd/imsbasiclti_v1p0",
		NamespaceLTICM: "http://www.imsglobal.org/xsd/imslticm_v1p0",
		NamespaceLTICP: "http://www.imsglobal.org/xsd/imslticp_v1p0",
		NamespaceXSI:   "http://www.w3.org/2001/XMLSchema-instance",
		SchemaLocation: "http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd" +
			" http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0.xsd" +
			" http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd" +
			" http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd",
		Title:       Config.ToolName,
		Description: Config.ToolDescription,
		Extensions: LTIConfigExtensions{
			Platform: "canvas.instructure.com",
			Extensions: []LTIConfigExtension{
				LTIConfigExtension{Name: "tool_id", Value: Config.ToolID},
				LTIConfigExtension{Name: "privacy_level", Value: "public"},
				LTIConfigExtension{Name: "domain", Value: Config.Hostname},
			},
			Options: []LTIConfigOptions{
				LTIConfigOptions{
					Name: "custom_fields",
					Options: []LTIConfigExtension{
						LTIConfigExtension{Name: "canvas_assignment_unlock_at", Value: "$Canvas.assignment.unlockAt.iso8601"},
						LTIConfigExtension{Name: "canvas_assignment_due_at", Value: "$Canvas.assignment.dueAt.iso8601"},
						LTIConfigExtension{Name: "canvas_assignment_lock_at", Value: "$Canvas.assignment.lockAt.iso8601"},
					},
				},
			},
			// Options: []LTIConfigOptions{
			// 	LTIConfigOptions{
			// 		Name: "resource_selection",
			// 		Options: []LTIConfigExtension{
			// 			LTIConfigExtension{Name: "url", Value: "https://" + Config.Hostname + "/v2/lti/problem_sets"},
			// 			LTIConfigExtension{Name: "text", Value: Config.ToolName},
			// 			LTIConfigExtension{Name: "selection_width", Value: "320"},
			// 			LTIConfigExtension{Name: "selection_height", Value: "640"},
			// 			LTIConfigExtension{Name: "enabled", Value: "true"},
			// 		},
			// 	},
			// },
		},
		CartridgeBundle: LTICartridge{IdentifierRef: "BLTI001_Bundle"},
		CartridgeIcon:   LTICartridge{IdentifierRef: "BLTI001_Icon"},
	}
	raw, err := xml.MarshalIndent(c, "", "  ")
	if err != nil {
		loggedHTTPErrorf(w, http.StatusInternalServerError, "error rendering XML config data: %v", err)
		return
	}
	w.Header().Set("Content-Type", "application/xml")
	if _, err = fmt.Fprintf(w, "%s%s\n", xml.Header, raw); err != nil {
		loggedHTTPErrorf(w, http.StatusInternalServerError, "error writing XML: %v", err)
		return
	}
}

func signXMLRequest(consumerKey, method, targetURL string, content []byte, secret string) string {
	sum := sha1.Sum(content)
	bodyHash := base64.StdEncoding.EncodeToString(sum[:])

	// gather parts as form value for the signature
	v := url.Values{}
	v.Set("oauth_body_hash", bodyHash)
	v.Set("oauth_token", "")
	v.Set("oauth_consumer_key", consumerKey)
	v.Set("oauth_signature_method", "HMAC-SHA1")
	v.Set("oauth_timestamp", strconv.FormatInt(time.Now().Unix(), 10))
	v.Set("oauth_version", "1.0")
	v.Set("oauth_nonce", strconv.FormatInt(time.Now().UnixNano(), 10))

	// compute the signature and add it to the mix
	sig := computeOAuthSignature(method, targetURL, v, secret)
	v.Set("oauth_signature", sig)

	// form the Authorization header
	var buf bytes.Buffer
	buf.WriteString(fmt.Sprintf(`OAuth realm="%s"`, escape("https://"+Config.Hostname)))
	for key, val := range v {
		buf.WriteString(fmt.Sprintf(`,%s="%s"`, key, escape(val[0])))
	}
	return buf.String()
}

func getMyURL(r *http.Request, withPath bool) *url.URL {
	scheme := r.Header.Get("X-Forwarded-Proto")
	if scheme == "" {
		scheme = "https"
	}
	host := r.Header.Get("X-Forwarded-Host")
	if host == "" {
		host = r.Host
	}
	u := &url.URL{
		Scheme: scheme,
		Host:   host,
	}
	if withPath {
		u.Path = r.URL.Path
	}
	return u
}

func checkOAuthSignature(w http.ResponseWriter, r *http.Request) {
	// make sure this is a signed request
	r.ParseForm()
	expected := r.Form.Get("oauth_signature")
	if expected == "" {
		loggedHTTPErrorf(w, http.StatusUnauthorized, "Missing oauth_signature form field")
		return
	}

	// compute the signature
	sig := computeOAuthSignature(r.Method, getMyURL(r, true).String(), r.Form, Config.LTISecret)

	// verify it
	if sig != expected {
		loggedHTTPErrorf(w, http.StatusUnauthorized, "Signature mismatch: got %s but expected %s", sig, expected)
	}
}

func computeOAuthSignature(method, urlString string, parameters url.Values, secret string) string {
	// method must be upper case
	method = strings.ToUpper(method)

	// make sure scheme and host are lower case
	u, err := url.Parse(urlString)
	if err != nil {
		log.Printf("Error parsing URI: %v", err)
		return ""
	}
	u.Scheme = strings.ToLower(u.Scheme)
	u.Opaque = ""
	u.User = nil
	u.Host = strings.ToLower(u.Host)
	u.RawQuery = ""
	u.Fragment = ""
	reqURL := u.String()

	// get a sorted list of parameter keys (minus oauth_signature)
	oldsig := parameters.Get("oauth_signature")
	parameters.Del("oauth_signature")
	params := string(encode(parameters))
	if oldsig != "" {
		parameters.Set("oauth_signature", oldsig)
	}

	// get the full string
	s := escape(method) + "&" + escape(reqURL) + "&" + escape(params)

	// perform the signature
	// key is a combination of consumer secret and token secret, but we don't have token secrets
	mac := hmac.New(sha1.New, []byte(escape(secret)+"&"))
	mac.Write([]byte(s))
	sum := mac.Sum(nil)

	return base64.StdEncoding.EncodeToString(sum)
}

func escape(s string) string {
	var buf bytes.Buffer
	for _, b := range []byte(s) {
		if b >= 'a' && b <= 'z' || b >= 'A' && b <= 'Z' || b >= '0' && b <= '9' || b == '-' || b == '.' || b == '_' || b == '~' {
			buf.WriteByte(b)
		} else {
			fmt.Fprintf(&buf, "%%%02X", b)
		}
	}
	return buf.String()
}

// this is url.URL.Encode from the standard library, but using escape instead of url.QueryEscape
func encode(v url.Values) []byte {
	if v == nil {
		return []byte{}
	}
	var buf bytes.Buffer
	keys := make([]string, 0, len(v))
	for k := range v {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for _, k := range keys {
		vs := v[k]
		prefix := escape(k) + "="
		for _, v := range vs {
			if buf.Len() > 0 {
				buf.WriteByte('&')
			}
			buf.WriteString(prefix)
			buf.WriteString(escape(v))
		}
	}
	return buf.Bytes()
}

// LtiProblem handles /lti/problem_sets/:ui/:unique requests.
// It creates the user/course/assignment if necessary, creates a session,
// and redirects the user to the main UI URL.
func LtiProblemSet(w http.ResponseWriter, r *http.Request, tx *sql.Tx, form LTIRequest, params martini.Params) {
	ui := params["ui"]
	if ui != "cli" {
		loggedHTTPErrorf(w, http.StatusBadRequest, "UI type must be cli, not %q", ui)
		return
	}
	unique := params["unique"]
	if unique == "" {
		loggedHTTPErrorf(w, http.StatusBadRequest, "malformed URL: missing unique ID for problem")
		return
	}
	if unique != url.QueryEscape(unique) {
		loggedHTTPErrorf(w, http.StatusBadRequest, "unique ID must be URL friendly: %s is escaped as %s", unique, url.QueryEscape(unique))
		return
	}

	now := time.Now()

	// Special case: the problem set named "codegrinder-bootstrap"
	// does not map to an actual problem set. This is useful for creating
	// the first user before a problem set has been created.

	// load the problem set
	problemSet := new(ProblemSet)

	if unique != bootstrapAssignmentName {
		if err := meddler.QueryRow(tx, problemSet, `SELECT * FROM problem_sets WHERE unique_id = ?`, unique); err != nil {
			loggedHTTPDBNotFoundError(w, err)
			return
		}
	}

	// load the course
	course, err := getUpdateCourse(tx, &form, now)
	if err != nil {
		loggedHTTPErrorf(w, http.StatusInternalServerError, "db error: %v", err)
		return
	}

	// load the user
	user, err := getUpdateUser(tx, &form, now)
	if err != nil {
		loggedHTTPErrorf(w, http.StatusInternalServerError, "db error: %v", err)
		return
	}

	// load the assignment
	asst := new(Assignment)

	if unique != bootstrapAssignmentName {
		if asst, err = getUpdateAssignment(tx, &form, now, course, problemSet, user); err != nil {
			loggedHTTPErrorf(w, http.StatusInternalServerError, "db error: %v", err)
			return
		}
	}

	// sign the user in
	session := NewSession(user.ID)
	session.Save(w)

	// redirect to the console
	key := loginRecords.Insert(user.ID)
	http.Redirect(w, r, fmt.Sprintf("/%s/?assignment=%d&session=%s", ui, asst.ID, key), http.StatusSeeOther)
}

// LtiQuizzes handles /lti/quizzes requests.
// It creates the user/course/assignment if necessary, creates a session,
// and redirects the user to the main UI URL.
func LtiQuizzes(w http.ResponseWriter, r *http.Request, tx *sql.Tx, form LTIRequest, params martini.Params) {
	now := time.Now()

	// load the course
	course, err := getUpdateCourse(tx, &form, now)
	if err != nil {
		loggedHTTPErrorf(w, http.StatusInternalServerError, "db error: %v", err)
		return
	}

	// load the user
	user, err := getUpdateUser(tx, &form, now)
	if err != nil {
		loggedHTTPErrorf(w, http.StatusInternalServerError, "db error: %v", err)
		return
	}

	// load the assignment
	asst := new(Assignment)
	if asst, err = getUpdateAssignment(tx, &form, now, course, nil, user); err != nil {
		loggedHTTPErrorf(w, http.StatusInternalServerError, "db error: %v", err)
		return
	}

	// sign the user in
	session := NewSession(user.ID)
	session.Save(w)

	// redirect to the console
	if asst.Instructor {
		http.Redirect(w, r, fmt.Sprintf("/quiz/console.html?assignment=%d", asst.ID), http.StatusSeeOther)
	} else {
		http.Redirect(w, r, fmt.Sprintf("/quiz/?assignment=%d", asst.ID), http.StatusSeeOther)
	}
}

// get/create/update this user
func getUpdateUser(tx *sql.Tx, form *LTIRequest, now time.Time) (*User, error) {
	user := new(User)
	if err := meddler.QueryRow(tx, user, `SELECT * FROM users WHERE lti_id = ?`, form.UserID); err != nil {
		if err != sql.ErrNoRows {
			log.Printf("db error loading user %s (%s): %v", form.UserID, form.PersonContactEmailPrimary, err)
			return nil, err
		}
		log.Printf("creating new user (%s)", form.PersonContactEmailPrimary)
		user.ID = 0
		user.CreatedAt = now
		user.UpdatedAt = now
	}

	// any changes?
	changed := user.Name != form.PersonNameFull ||
		user.Email != form.PersonContactEmailPrimary ||
		user.LtiID != form.UserID ||
		user.ImageURL != form.UserImage ||
		user.CanvasLogin != form.CanvasUserLoginID ||
		user.CanvasID != form.CanvasUserID

	// make any changes
	user.Name = form.PersonNameFull
	user.Email = form.PersonContactEmailPrimary
	user.LtiID = form.UserID
	user.ImageURL = form.UserImage
	user.CanvasLogin = form.CanvasUserLoginID
	user.CanvasID = form.CanvasUserID
	if user.ID > 0 && changed {
		// if something changed, note the update time
		log.Printf("user %d (%s) updated because of new LTI request", user.ID, user.Email)
		user.UpdatedAt = now
	}

	// always save to note the last signed in time
	user.LastSignedInAt = now
	if err := meddler.Save(tx, "users", user); err != nil {
		log.Printf("db error updating user %s (%s): %v", user.LtiID, user.Email, err)
		return nil, err
	}

	return user, nil
}

// get/create/update this course
func getUpdateCourse(tx *sql.Tx, form *LTIRequest, now time.Time) (*Course, error) {
	course := new(Course)
	if err := meddler.QueryRow(tx, course, `SELECT * FROM courses WHERE lti_id = ?`, form.ContextID); err != nil {
		if err != sql.ErrNoRows {
			log.Printf("db error loading course %s (%s): %v", form.ContextID, form.ContextTitle, err)
			return nil, err
		}
		log.Printf("creating new course %s (%s)", form.ContextID, form.ContextTitle)
		course.ID = 0
		course.CreatedAt = now
		course.UpdatedAt = now
	}

	// any changes?
	changed := course.Name != form.ContextTitle ||
		course.Label != form.ContextLabel ||
		course.LtiID != form.ContextID ||
		course.CanvasID != form.CanvasCourseID

	// make any changes
	course.Name = form.ContextTitle
	course.Label = form.ContextLabel
	course.LtiID = form.ContextID
	course.CanvasID = form.CanvasCourseID
	if course.ID < 1 || changed {
		// if something changed, note the update time and save
		if course.ID > 0 {
			log.Printf("course %d (%s) updated", course.ID, course.Name)
		}
		course.UpdatedAt = now
		if err := meddler.Save(tx, "courses", course); err != nil {
			log.Printf("db error saving course %s (%s): %v", course.LtiID, course.Name, err)
			return nil, err
		}
	}

	return course, nil
}

// get/create/update this assignment
func getUpdateAssignment(tx *sql.Tx, form *LTIRequest, now time.Time, course *Course, problemSet *ProblemSet, user *User) (*Assignment, error) {
	asst := new(Assignment)
	err := meddler.QueryRow(tx, asst, `SELECT * FROM assignments WHERE course_id = ? AND lti_id = ? AND user_id = ?`,
		course.ID, form.ResourceLinkID, user.ID)
	if err != nil {
		if err != sql.ErrNoRows {
			log.Printf("db error loading assignment for course %d, lti id %s, user %d: %v", course.ID, form.ResourceLinkID, user.ID, err)
			return nil, err
		}

		log.Printf("creating new assignment %q for course %d (%s), lti id %s, user %d: %s (%s)",
			form.CanvasAssignmentTitle, course.ID, course.Name, form.ResourceLinkID, user.ID, user.Name, user.Email)
		asst.ID = 0
		asst.RawScores = map[string][]float64{}
		asst.Score = 0.0
		asst.UnlockAt = nil
		asst.DueAt = nil
		asst.LockAt = nil
		asst.CreatedAt = now
		asst.UpdatedAt = now
	}

	problemSetID := int64(0)
	if problemSet != nil {
		problemSetID = problemSet.ID
	}

	dateMismatch := func(old *time.Time, in string) bool {
		if old == nil {
			return in != ""
		}
		if in == "" {
			return true
		}

		// parse the new date to see if it matches
		if when, err := time.Parse(canvasDateFormat, in); err == nil {
			return !when.Equal(*old)
		}

		return false
	}

	// any changes?
	changed := asst.CourseID != course.ID ||
		asst.ProblemSetID != problemSetID ||
		asst.UserID != user.ID ||
		asst.Roles != form.Roles ||
		(form.PersonSourcedID != "" && asst.GradeID != form.PersonSourcedID) ||
		asst.LtiID != form.ResourceLinkID ||
		asst.CanvasTitle != form.CanvasAssignmentTitle ||
		asst.CanvasID != form.CanvasAssignmentID ||
		asst.CanvasAPIDomain != form.CanvasAPIDomain ||
		asst.OutcomeURL != form.OutcomeServiceURL ||
		asst.OutcomeExtURL != form.ExtIMSBasicOutcomeURL ||
		asst.OutcomeExtAccepted != form.ExtOutcomeDataValuesAccepted ||
		asst.FinishedURL != form.LaunchPresentationReturnURL ||
		asst.ConsumerKey != form.OAuthConsumerKey ||
		dateMismatch(asst.UnlockAt, form.CanvasAssignmentUnlockAt) ||
		dateMismatch(asst.DueAt, form.CanvasAssignmentDueAt) ||
		dateMismatch(asst.LockAt, form.CanvasAssignmentLockAt)

	// make any changes
	asst.CourseID = course.ID
	asst.ProblemSetID = problemSetID
	asst.UserID = user.ID
	asst.Roles = form.Roles

	if asst.IsInstructorRole() {
		if !asst.Instructor {
			log.Printf("user %d (%s) reported as instructor for course %d (%s)", user.ID, user.Email, course.ID, course.Name)
			asst.Instructor = true
		}

		// instructor reported for user that is not marked as an author?
		if !user.Author {
			log.Printf("user %d (%s) reported as instructor by LTI request, but not marked as author in user record", user.ID, user.Email)
		}
	}

	if form.PersonSourcedID != "" {
		asst.GradeID = form.PersonSourcedID
	}
	asst.LtiID = form.ResourceLinkID
	asst.CanvasTitle = form.CanvasAssignmentTitle
	asst.CanvasID = form.CanvasAssignmentID
	asst.CanvasAPIDomain = form.CanvasAPIDomain
	asst.OutcomeURL = form.OutcomeServiceURL
	asst.OutcomeExtURL = form.ExtIMSBasicOutcomeURL
	asst.OutcomeExtAccepted = form.ExtOutcomeDataValuesAccepted
	asst.FinishedURL = form.LaunchPresentationReturnURL
	asst.ConsumerKey = form.OAuthConsumerKey
	if when, err := time.Parse(canvasDateFormat, form.CanvasAssignmentUnlockAt); err == nil {
		when = when.Local()
		asst.UnlockAt = &when
	} else {
		asst.UnlockAt = nil
	}
	if when, err := time.Parse(canvasDateFormat, form.CanvasAssignmentDueAt); err == nil {
		when = when.Local()
		asst.DueAt = &when
	} else {
		asst.DueAt = nil
	}
	if when, err := time.Parse(canvasDateFormat, form.CanvasAssignmentLockAt); err == nil {
		when = when.Local()
		asst.LockAt = &when
	} else {
		asst.LockAt = nil
	}

	if asst.ID < 1 || changed {
		// if something changed, note the update time and save
		if asst.ID > 0 {
			log.Printf("assignment %d, course %d (%s), lti id %s, user %d (%s) updated",
				asst.ID, course.ID, course.Name, form.ResourceLinkID, user.ID, user.Email)
		}
		asst.UpdatedAt = now
		if err := meddler.Save(tx, "assignments", asst); err != nil {
			log.Printf("db error saving assignment for course %d, user %d: %v", course.ID, user.ID, err)
			if problemSet != nil {
				log.Printf("problem set %d (%s)", problemSet.ID, problemSet.Note)
			}
			log.Printf("LtiID (resource_link_id) = %v, GradeID = %v", asst.LtiID, asst.GradeID)

			// dump the request to the logs for debugging purposes
			if raw, err := json.MarshalIndent(form, ">>>>", "    "); err == nil {
				log.Printf("LTI Request dump:")
				for _, line := range bytes.Split(raw, []byte("\n")) {
					log.Printf("%s", line)
				}
			}

			return nil, err
		}
	}

	return asst, nil
}

func saveGrade(asst *Assignment, text string) error {
	if asst.GradeID == "" {
		// instructors do not get grades
		//log.Printf("cannot post grade for assignment %d user %d because no grade ID is present", asst.ID, asst.UserID)
		return nil
	}
	if asst.OutcomeURL == "" {
		log.Printf("cannot post grade for assignment %d user %d because no outcome URL is present", asst.ID, asst.UserID)
		return nil
	}

	// report back using lti
	outcomeURL := asst.OutcomeURL
	gradeURL := ""
	gradeText := ""

	if strings.Contains(asst.OutcomeExtAccepted, "text") {
		//outcomeURL = asst.OutcomeExtURL
		gradeText = text
	}

	report := &GradeResponse{
		Namespace: "http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0",
		Version:   "V1.0",
		Message:   "Grade from CodeGrinder",
		SourcedID: asst.GradeID,
		URL:       gradeURL,
		Text:      gradeText,
		Language:  "en",
		Score:     fmt.Sprintf("%0.5f", asst.Score),
	}

	raw, err := xml.MarshalIndent(report, "", "  ")
	if err != nil {
		log.Printf("error rendering XML grade response: %v", err)
		return err
	}
	result := []byte(fmt.Sprintf("%s%s\n", xml.Header, raw))

	// sign the request
	auth := signXMLRequest(asst.ConsumerKey, "POST", outcomeURL, result, Config.LTISecret)

	// POST the grade
	req, err := http.NewRequest("POST", outcomeURL, bytes.NewReader(result))
	if err != nil {
		log.Printf("error preparing grade request: %v", err)
		return err
	}
	req.Header.Set("Authorization", auth)
	req.Header.Set("Content-Type", "application/xml")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("error sending grade request: %v", err)
		return err
	}
	resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		log.Printf("assignment %q grade of %0.5f posted for user %d", asst.CanvasTitle, asst.Score, asst.UserID)
	} else {
		return loggedErrorf("result status %d (%s) when posting grade for user %d", resp.StatusCode, resp.Status, asst.UserID)
	}

	return nil
}
