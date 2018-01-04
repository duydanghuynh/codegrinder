package common

import "time"

// Quiz represents a single session of interactive student quizzes, usually
// from a single class period.
type Quiz struct {
	ID                     int64     `json:"id" meddler:"id,pk"`
	AssignmentID           int64     `json:"assignmentID" meddler:"assignment_id"` // creator
	LtiID                  string    `json:"-" meddler:"lti_id"`
	Note                   string    `json:"note" meddler:"note"`
	Weight                 float64   `json:"weight" meddler:"weight"`
	ParticipationThreshold float64   `json:"participationThreshold" meddler:"participation_threshold"`
	ParticipationPercent   float64   `json:"participationPercent" meddler:"participation_percent"`
	CreatedAt              time.Time `json:"createdAt" meddler:"created_at,localtime"`
	UpdatedAt              time.Time `json:"updatedAt" meddler:"updated_at,localtime"`
}

type QuizPatch struct {
	Note                   *string  `json:"note"`
	Weight                 *float64 `json:"weight"`
	ParticipationThreshold *float64 `json:"participationThreshold"`
	ParticipationPercent   *float64 `json:"participationPercent"`
}

// Question represents a single interactive quiz question.
type Question struct {
	ID                 int64              `json:"id" meddler:"id,pk"`
	QuizID             int64              `json:"quizID" meddler:"quiz_id"`
	Number             int64              `json:"number" meddler:"question_number"` // note: 1-based
	Note               string             `json:"note" meddler:"note"`
	Weight             float64            `json:"weight" meddler:"weight"`
	PointsForAttempt   float64            `json:"pointsForAttempt" meddler:"points_for_attempt"`
	IsMultipleChoice   bool               `json:"isMultipleChoice" meddler:"is_multiple_choice"`
	Answers            map[string]float64 `json:"answers" meddler:"answers,json"`
	AnswerFilterRegexp string             `json:"answerFilterRegexp" meddler:"answer_filter_regexp,zeroisnull"`
	CreatedAt          time.Time          `json:"createdAt" meddler:"created_at,localtime"`
	UpdatedAt          time.Time          `json:"updatedAt" meddler:"updated_at,localtime"`
	OpenedAt           time.Time          `json:"openedAt" meddler:"opened_at,localtime"`
	ClosedAt           time.Time          `json:"closedAt" meddler:"closed_at,localtime"`
	IsClosed           bool               `json:"isClosed" meddler:"is_closed"`
}

type QuestionPatch struct {
	Note               *string             `json:"note"`
	Weight             *float64            `json:"weight"`
	PointsForAttempt   *float64            `json:"pointsForAttempt"`
	IsMultipleChoice   *bool               `json:"isMultipleChoice"`
	Answers            *map[string]float64 `json:"answers"`
	AnswerFilterRegexp *string             `json:"answerFilterRegexp"`
	OpenedAt           *time.Time          `json:"openedAt"`
	ClosedAt           *time.Time          `json:"closedAt"`
	IsClosed           *bool               `json:"isClosed"`
}

// Response represents a student response to a single question.
type Response struct {
	ID           int64     `json:"id" meddler:"id,pk"`
	AssignmentID int64     `json:"assignmentID" meddler:"assignment_id"`
	QuestionID   int64     `json:"questionID" meddler:"question_id"`
	Response     string    `json:"response" meddler:"response"`
	CreatedAt    time.Time `json:"createdAt" meddler:"created_at,localtime"`
	UpdatedAt    time.Time `json:"updatedAt" meddler:"updated_at,localtime"`
}
