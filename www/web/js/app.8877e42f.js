(function(e){function t(t){for(var r,o,a=t[0],c=t[1],u=t[2],m=0,d=[];m<a.length;m++)o=a[m],i[o]&&d.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(d.length)d.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={app:0},s=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("1356"),i=n.n(r);i.a},"08af":function(e,t,n){"use strict";var r=n("e9e7"),i=n.n(r);i.a},1356:function(e,t,n){},1539:function(e,t,n){},"1d56":function(e,t,n){},"2dd9":function(e,t,n){"use strict";var r=n("9b27"),i=n.n(r);i.a},3725:function(e,t,n){"use strict";var r=n("1539"),i=n.n(r);i.a},"3e1c":function(e,t,n){},"487a":function(e,t,n){},"4e29":function(e,t,n){"use strict";var r=n("1d56"),i=n.n(r);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=n("bb71");n("da64");r["a"].use(i["a"],{iconfont:"md"});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:e.dark}},[n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-layout",{attrs:{column:""}},[n("v-flex",{attrs:{"d-flex":"",grow:"",xs1:""}},[n("v-layout",{attrs:{row:"","fill-height":""}},[n("v-flex",{attrs:{"d-flex":""}},[n("v-card",{attrs:{id:"SidePanelContainer"}},[n("v-layout",{attrs:{column:""}},[n("SidePanel")],1)],1)],1),n("v-flex",{attrs:{"d-flex":"",xs4:"",grow:""}},[n("v-layout",{attrs:{column:""}},[n("v-flex",{attrs:{"d-flex":"",shrink:""}},[n("v-card",{attrs:{id:"InfoPanelContainer"}},[n("InfoPanel")],1)],1),n("v-flex",[n("v-card",{attrs:{id:"TreeVueContainer",height:"100%"}},[n("TreeVue")],1)],1)],1)],1),n("v-flex",{attrs:{"d-flex":"",xs12:""}},[n("v-layout",{attrs:{column:""}},[n("v-flex",{attrs:{"d-flex":"",shrink:""}},[n("v-card",{attrs:{id:"FilePanelContainer"}},[n("FilePanel")],1)],1),n("v-flex",{attrs:{"d-flex":"",xs2:"",grow:""}},[n("codemirror")],1),n("v-flex",{attrs:{"d-flex":"",shrink:""}},[n("v-card",{attrs:{id:"CommandsContainer"}},[n("Commands")],1)],1),n("v-flex",{staticClass:"terminalBackground",attrs:{"d-flex":"",grow:""}},[n("v-card",{attrs:{height:"100%"}},[n("Terminal")],1)],1)],1)],1)],1)],1)],1)],1)],1)},o=[],a=(n("3e1c"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",e._l(e.commands,function(t){return n("v-btn",{key:t.id,on:{click:function(n){return e.grind(t.command)}}},[e._v(e._s(t.command))])}),1)}),c=[],u=(n("ac6a"),n("c5f6"),n("f499")),l=n.n(u),m=(n("96cf"),n("3b8d")),d=n("2f62"),p=(n("386d"),n("28a5"),function(e){return fetch("https://codegrinder.cs.dixie.edu/v2/commit_bundles/unsigned",{method:"POST",body:e,credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()})}),f=function(e){return fetch("https://codegrinder.cs.dixie.edu/v2/commit_bundles/signed",{method:"POST",body:e,credentials:"include",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()})},h=function(e){return fetch("https://codegrinder.cs.dixie.edu/v2/problems/"+e,{method:"GET",credentials:"include"}).then(function(e){return e.json()})},v=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://codegrinder.cs.dixie.edu/v2/users/me",{method:"GET",credentials:"include"});case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://codegrinder.cs.dixie.edu/v2/problem_sets/".concat(t,"/problems"),{method:"GET",credentials:"include"});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://codegrinder.cs.dixie.edu/v2/assignments/".concat(t),{method:"GET",credentials:"include"});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t,n){var r,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://codegrinder.cs.dixie.edu/v2/assignments/".concat(t,"/problems/").concat(n,"/commits/last"),{method:"GET",credentials:"include"});case 2:if(r=e.sent,404!=r.status){e.next=8;break}return console.log("no last step"),e.abrupt("return");case 8:if(1!=r.ok){e.next=13;break}return e.next=11,r.json();case 11:return i=e.sent,e.abrupt("return",i);case 13:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),x=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t,n,r){var i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://codegrinder.cs.dixie.edu/v2/assignments/".concat(t,"/problems/").concat(n,"/steps/").concat(r,"/commits/last"),{method:"GET",credentials:"include"});case 2:if(i=e.sent,1!=i.ok){e.next=8;break}return e.next=6,i.json();case 6:return s=e.sent,e.abrupt("return",s);case 8:case"end":return e.stop()}},e)}));return function(t,n,r){return e.apply(this,arguments)}}(),C=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://codegrinder.cs.dixie.edu/v2/problem_sets/".concat(t),{method:"GET",credentials:"include"});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://codegrinder.cs.dixie.edu/v2/problems/".concat(t,"/steps"),{method:"GET",credentials:"include"});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),y={getMe:v,getAssignment:b,getProblemSets:C,getProblemSetProblems:g,getProblemSteps:k,GetAssignmentProblemCommitLastAll:x,GetAssignmentProblemCommitLast:w,PostCommitBundlesUnsigned:p,PostCommitBundlesSigned:f,getProblem:h},_=new r["a"],S={getStudent:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,y.getMe();case 3:return r=e.sent,e.next=6,n("getStudent",r);case 6:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),getAssignmentID:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,r=window.location.search.split("="),e.next=4,n("getAssignmentID",r[1]);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),getAssignment:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t,n){var r,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,y.getAssignment(n);case 3:i=e.sent,r("getAssignment",i.problemSetID);case 5:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}(),getProblemSetProblems:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t,n){var r,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,y.getProblemSetProblems(n);case 3:i=e.sent,r("getProblemSetProblems",i[0].problemID);case 5:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}(),GetProblemStepsAction:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t,n){var r,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,y.getProblemSteps(n);case 3:i=e.sent,console.log("problem steps: ",i),r("GetProblemStepsMutation",i),_.$emit("update-infopanel-problemsteps",M.getters.getProblemSteps),console.log("lookup table: ",M.getters.getFileLookup);case 8:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}(),GetAssignmentProblemCommitLastAction:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,r=M.getters.getAssignmentID,i=M.getters.getProblemID,e.next=5,y.GetAssignmentProblemCommitLast(r,i);case 5:s=e.sent,void 0!=s&&(0==s.score?M.dispatch("setCurrentStep",s.step):1==s.score&&M.dispatch("setCurrentStep",s.step+1),n("GetAssignmentProblemCommitLastMutation",s.step));case 7:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),GetAssignmentProblemCommitLastAllAction:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){var n,r,i,s,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,r=M.getters.getAssignmentID,i=M.getters.getProblemID,s=M.getters.getLastCommitedStep,console.log("lastCommitedStep",s),e.next=7,y.GetAssignmentProblemCommitLastAll(r,i,s);case 7:o=e.sent,void 0!=o&&(console.log("data: ",o),n("GetAssignmentProblemCommitLastAllMutation",[o.files])),_.$emit("update-infopanel-currentstep",M.getters.getCurrentStep),_.$emit("update-treevue-instructions",M.getters.getProblemSteps[M.getters.getCurrentStep-1]);case 11:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),getProblemSets:function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t.commit,setTimeout(function(){y.getProblemSets(n).then(function(e){console.log("problemSets: ",e)})});case 2:case"end":return e.stop()}},e)}));function t(t,n){return e.apply(this,arguments)}return t}(),selectFile:function(e,t){var n=e.commit;n("selectFile",t)},editFile:function(e,t){var n=e.commit;n("editFile",t)},changeInfoPanelView:function(e,t){var n=e.commit;n("changeInfoPanelView",t)},setCurrentStep:function(e,t){var n=e.commit;n("setCurrentStep",t)}},L=S,P=n("a4bb"),I=n.n(P),R=(n("7f7f"),function(e){var t=e,n=atob(t);return n}),F={getStudent:function(e,t){e.student.name=t.name,e.student.id=t.id},getAssignmentID:function(e,t){e.student.aid=t},getAssignment:function(e,t){e.student.problemSetID=t},getProblemSetProblems:function(e,t){e.student.problemID=t},GetProblemStepsMutation:function(e,t){e.student.problemSteps=t;for(var n=function(n){var r=I()(t[n].files),i=[];r.forEach(function(t){for(var r=!0,s=0;s<t.length;s++)"/"==t[s]&&(r=!1);if(1==r){String(t);var o={file:t,code:"",step:n+1};e.view.files.push(o),i.push(t)}}),e.view.fileLookup.push(i)},r=0;r<t.length;r++)n(r)},GetAssignmentProblemCommitLastMutation:function(e,t){console.log("last step, ",t),e.student.lastCommitedStep=t},GetAssignmentProblemCommitLastAllMutation:function(e,t){var n=t[0];I()(n).forEach(function(t){e.view.files.forEach(function(e){t==e.file&&(e.code=R(n[t]))})})},setCurrentStep:function(e,t){e.student.currentStep=t},selectFile:function(e,t){e.view.selectedFile=t},editFile:function(e,t){var n=t[1],r=t[0];e.view.files.forEach(function(e){e.file!=n||(e.code=r)})},changeInfoPanelView:function(e,t){e.view.index=t}},T=F,$={getUserId:function(e){return e.student.id},getAssignmentID:function(e){return e.student.aid},getProblemID:function(e){return e.student.problemID},getProblemSetID:function(e){return e.student.problemSetID},getFileLookup:function(e){return e.view.fileLookup},getFiles:function(e){return e.view.files},getLastCommitedStep:function(e){return e.student.lastCommitedStep},getCurrentStep:function(e){return e.student.currentStep},getProblemSteps:function(e){return e.student.problemSteps},getSelectedFile:function(e){return e.view.selectedFile}},j=$;r["a"].use(d["a"]);var O=new d["a"].Store({state:{theme:"dark",commitBundle:null,student:{id:Number(-1),assignmentID:Number(-1),lastCommitedStep:Number(1),currentStep:Number(1),name:"default",problemSteps:[],problemID:Number(-1),problemSetID:Number(-1)},view:{fileLookup:[],files:[],selectedFile:Number(-1)}},actions:L,mutations:T,getters:j}),V=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,O.dispatch("getStudent");case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,O.dispatch("getAssignmentID");case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,A();case 2:return e.next=4,O.dispatch("getAssignment",O.getters.getAssignmentID);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:return e.next=4,O.dispatch("getProblemSetProblems",O.getters.getProblemSetID);case 4:_.$emit("update-vuetree-files",O.getters.getFiles);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:return e.next=4,O.dispatch("GetProblemStepsAction",O.getters.getProblemID);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,B();case 2:return e.next=4,O.dispatch("GetAssignmentProblemCommitLastAction");case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,N();case 2:return e.next=4,O.dispatch("GetAssignmentProblemCommitLastAllAction");case 4:_.$emit("update-vuetree-files",O.getters.getFiles);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();V(),G();var M=O,H=function(e){var t=e,n=btoa(t);return n},U=function(e){var t=e,n=atob(t);return n},W={methods:{wsHandler:function(e){this.socket.send(e)},connectSocket:function(e,t,n,r){var i=this,s="wss://"+e+"/v2/sockets/"+t+"/"+n;console.log("url// ",s),this.socket=new WebSocket(s),this.socket.onopen=function(){var e=Object(m["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,console.log("You're now connected to the server. ");case 2:i.wsHandler(r);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),this.socket.onmessage=function(e){var t=JSON.parse(e.data);if(t["commitBundle"])if(console.log("commit bundle ",t["commitBundle"]),0==t["commitBundle"].commit.reportCard.passed){var n=t["commitBundle"].commit.reportCard.results,r=t["commitBundle"].commit.reportCard.note;console.log("report ",n),_.$emit("push-to-terminal","\n"),_.$emit("push-to-terminal",r),_.$emit("update-info-panel",{id:3,icon:"R",title:"results"}),_.$emit("update-treeVue",{id:3,icon:"R",title:"results"}),_.$emit("update-treevue-result",n)}else{var i=t["commitBundle"].commit.reportCard.note;_.$emit("push-to-terminal","\n"),_.$emit("push-to-terminal",i),_.$emit("update-treevue-result",i),M.dispatch("setCurrentStep",t["commitBundle"].commit.step+1);var s=l()({hostname:t.commitBundle.hostname,userID:t.commitBundle.userID,commit:t.commitBundle.commit,commitSignature:t.commitBundle.commitSignature});y.PostCommitBundlesSigned(s).then(function(){_.$emit("update-infopanel-currentstep",M.getters.getCurrentStep),_.$emit("update-treevue-instructions",M.getters.getProblemSteps[M.getters.getCurrentStep-1]),_.$emit("update-info-panel",{id:2,icon:"I",title:"instructions"}),_.$emit("update-treeVue",{id:2,icon:"I",title:"instructions"})})}else if("stderr"==t["event"].event){var o=U(t["event"].streamdata);_.$emit("push-to-terminal",o)}else if("stdout"==t["event"].event){var a=U(t["event"].streamdata);_.$emit("push-to-terminal",a)}else if("exit"==t["event"].event){var c=t["event"].exitstatus;_.$emit("push-to-terminal","exit with status ".concat(c))}}},grade:function(e){var t=this;_.$emit("push-to-terminal","grind grade");var n=Number(M.getters.getCurrentStep),r=(M.getters.getFileLookup,M.getters.getFiles),i={};r.forEach(function(e){console.log("file: ",e),i[e.file]=H(e.code)});var s=Number(M.getters.getUserId),o={action:"command",assignmentID:Number(-1),files:i,problemID:Number(-1),step:Number(-1)};o.action=e.toLowerCase(),o.assignmentID=Number(M.getters.getAssignmentID),o.problemID=Number(M.getters.getProblemID),o.step=n;var a=l()({commit:o,userID:s});y.PostCommitBundlesUnsigned(a).then(function(e){var n=l()({commitBundle:e});t.connectSocket(e.hostname,e.problem.problemType,o.action,n)})},grind:function(e){switch(e){case"GRADE":console.log("grind grade"),this.grade(e);break;default:}}},data:function(){return{socket:null,commands:[{id:1,command:"GRADE"},{id:2,command:"SAVE"},{id:3,command:"RUN"}]}}},J=W,q=(n("2dd9"),n("2877")),z=n("6544"),Y=n.n(z),K=n("8336"),Q=n("a523"),X=Object(q["a"])(J,a,c,!1,null,"3d1fda9e",null),Z=X.exports;Y()(X,{VBtn:K["a"],VContainer:Q["a"]});var ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("codemirror",{attrs:{options:e.cmOptions},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}},[e._v(e._s(e.watchFile))])},te=[],ne=n("8f94"),re=(n("a7be"),n("8c2e"),n("9603"),n("db91"),{data:function(){return{code:"",cmOptions:{tabSize:2,indentUnit:2,smartIndent:!1,mode:"python",theme:"mbo",lineNumbers:!0,line:!0},selectedFile:"null"}},watch:{selectedFile:function(e){var t=this;if(M.getters.getFiles.length>=1){var n=M.getters.getFiles;n.forEach(function(n){n.file!=e||(t.code=n.code)})}},code:function(e){M.dispatch("editFile",[e,this.selectedFile])}},components:{codemirror:ne["codemirror"]},computed:{codemirror:function(){return this.$refs.myCm.codemirror},watchFile:function(){return this.selectedFile=M.state.view.selectedFile,this.selectedFile}},mounted:function(){}}),ie=re,se=(n("4e29"),Object(q["a"])(ie,ee,te,!1,null,null,null)),oe=se.exports,ae=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-tabs",{attrs:{slot:"extension",left:"","slider-color":"white",color:"transparent"},slot:"extension",model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.files,function(t){return n("v-tab",{key:t,on:{click:function(n){return e.fileTabClick(t)}}},[e._v(" "+e._s(t)+"  \n      "),n("v-icon",{staticClass:"material-icons md-19",on:{click:function(n){return e.closeFile(t)}}},[e._v(" close\n      ")])],1)}),1)],1)},ce=[],ue=(n("d06d"),n("0874")),le={name:"FilePanel",Store:M,components:{Icon:ue["a"]},directives:{active:function(e,t){}},methods:{fileTabClick:function(e){M.dispatch("selectFile",e),_.$emit("update-treeVue-selectedFiles",e)},closeFile:function(e){var t=this.files.indexOf(e);this.files.splice(t,1)}},computed:{},created:function(){var e=this;_.$on("update-filepanel",function(t){0==e.files.length?(e.files.push(t),e.active=0):-1===e.files.indexOf(t)&&(e.files.push(t),e.active=e.files.length-1);var n=e.files.indexOf(t);e.active=n}),_.$on("filetabs-push-file",function(t){0==e.files.length&&(e.files.push(t),e.active=0)})},data:function(){return{files:[],showclose:!1,active:null,closeBtn:{backgroundColor:null}}}},me=le,de=(n("7a86"),n("08af"),n("132d")),pe=n("71a3"),fe=n("fe57"),he=Object(q["a"])(me,ae,ce,!1,null,"32861918",null),ve=he.exports;Y()(he,{VContainer:Q["a"],VIcon:de["a"],VTab:pe["a"],VTabs:fe["a"]});var ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-btn",{on:{click:function(t){return e.increment()}}})],1)},be=[],we={Store:M,methods:{setTheme:function(e){M.state.theme="light"==e,console.log("theme: ",M.state.theme)},increment:function(){M.dispatch("adder")}},computed:{counter:function(){return M.getters.getCount}},data:function(){return{theme:M.state.theme}}},xe=we,Ce=(n("f3eb"),Object(q["a"])(xe,ge,be,!1,null,"2fc65f04",null)),ke=Ce.exports;Y()(Ce,{VBtn:K["a"],VContainer:Q["a"]});var ye=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-flex",{attrs:{"d-flex":""}},[n("v-card",{attrs:{id:"InfoPanelContainer"}},[n("v-card-title",[e._v(" "+e._s(e.panel.title)+" ")])],1),n("v-layout",{attrs:{"justify-end":"",column:""}},["instructions"==e.panel.title?n("v-menu",{attrs:{transition:"slide-x-transition",bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-btn",e._g({attrs:{dark:"",icon:""}},r),[n("v-icon",{staticClass:"material-icons md-18"},[e._v("view_list")])],1)]}}],null,!1,932247941)},[n("v-list",e._l(e.problemSteps,function(t,r){return n("v-list-tile",{key:t,on:{click:function(n){return e.showInstructions(t)}}},[e.completedStep(t,r)?n("v-icon",{staticClass:"resultPassed"},[e._v("done")]):e._e(),e._v("  "),n("v-list-tile-title",[e._v(e._s(t.note))])],1)}),1)],1):e._e()],1)],1)],1)},_e=[],Se=[{instructions:"<html><head></head><body><h1>Add two numbers</h1>↵↵<p>Write a function called <code>adder</code> that returns the sum of its two↵arguments. For example:</p>↵↵<pre><code>adder(5, 7)↵</code></pre>↵↵<p>should return 12.</p>↵</body></html>",note:"Add two numbers",step:1,weight:1,score:1},{instructions:"<html><head></head><body><h1>Add two numbers</h1>↵↵<p>Write a function called <code>adder</code> that returns the sum of its two↵arguments. For example:</p>↵↵<pre><code>adder(5, 7)↵</code></pre>↵↵<p>should return 12.</p>↵</body></html>",note:"Add three numbers",step:2,weight:1,score:0}],Le={name:"InfoPanel",Store:M,data:function(){return{panel:{title:"files"},problemSteps:Se,currentStep:Number(1)}},methods:{showInstructions:function(e){_.$emit("update-treevue-instructions",e),console.log("update instruction: ",e)},completedStep:function(e,t){return t+1<this.currentStep}},created:function(){var e=this;_.$on("update-info-panel",function(t){e.panel=t}),_.$on("update-infopanel-problemsteps",function(t){console.log("update-infopanel-problemsteps ",t),e.problemSteps=t}),_.$on("update-infopanel-currentstep",function(t){e.currentStep=t})}},Pe=Le,Ie=(n("d3a7"),n("b0af")),Re=n("12b2"),Fe=n("0e8f"),Te=n("a722"),$e=n("8860"),je=n("ba95"),Oe=n("5d23"),Ve=n("e449"),Ae=Object(q["a"])(Pe,ye,_e,!1,null,"7abe7dd0",null),Ee=Ae.exports;Y()(Ae,{VBtn:K["a"],VCard:Ie["a"],VCardTitle:Re["a"],VContainer:Q["a"],VFlex:Fe["a"],VIcon:de["a"],VLayout:Te["a"],VList:$e["a"],VListTile:je["a"],VListTileTitle:Oe["a"],VMenu:Ve["a"]});var De=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-card",{staticClass:"sidepanel",attrs:{height:"100%"}},[n("v-layout",{attrs:{"align-start":"",column:""}},[n("v-btn",e._g({attrs:{dark:"",icon:""},on:{click:function(t){return e.emitChangePanel(0)}}},e.on),[n("v-icon",{staticClass:"material-icons md-18"},[e._v("folder")])],1),n("v-btn",e._g({attrs:{dark:"",icon:""},on:{click:function(t){return e.emitChangePanel(1)}}},e.on),[n("v-icon",{staticClass:"material-icons md-18"},[e._v("info")])],1),n("v-btn",e._g({attrs:{dark:"",icon:""},on:{click:function(t){return e.emitChangePanel(2)}}},e.on),[n("v-icon",{staticClass:"material-icons md-18"},[e._v("check_box")])],1)],1)],1)],1)},Be=[],Ne={methods:{emitChangePanel:function(e){_.$emit("update-info-panel",this.sideButtons[e]),_.$emit("update-treeVue",this.sideButtons[e])}},data:function(){return{sideButtons:[{id:1,icon:"F",title:"files"},{id:2,icon:"I",title:"instructions"},{id:3,icon:"R",title:"results"}]}}},Ge=Ne,Me=(n("5b69"),Object(q["a"])(Ge,De,Be,!1,null,"48b315b0",null)),He=Me.exports;Y()(Me,{VBtn:K["a"],VCard:Ie["a"],VContainer:Q["a"],VIcon:de["a"],VLayout:Te["a"]});var Ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("vue-terminal")},We=[],Je=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.clearFocus,expression:"clearFocus"}],staticClass:"terminal",on:{click:e.handleFocus}},[n("div",{staticStyle:{position:"relative"}},[n("div",{ref:"terminalWindow",staticStyle:{position:"absolute",top:"0",left:"0",right:"0",overflow:"auto","z-index":"1","margin-top":"0px","max-height":"300px"}},[n("div",{staticClass:"terminal-window",attrs:{id:"terminalWindow"}},[e._m(0),e._l(e.messageList,function(t,r){return n("p",{key:r},[n("span",[e._v(e._s(t.time))]),t.label?n("span",{class:t.type},[e._v(e._s(t.label))]):e._e(),t.message.list?n("span",{staticClass:"cmd"},[n("span",[e._v(e._s(t.message.text))]),n("ul",e._l(t.message.list,function(t,r){return n("li",{key:r},[t.label?n("span",{class:t.type},[e._v(e._s(t.label)+":")]):e._e(),n("pre",[e._v(e._s(t.message))])])}),0)]):n("span",{staticClass:"cmd"},[e._v(e._s(t.message))])])}),e.actionResult?n("p",[n("span",{staticClass:"cmd"},[e._v(e._s(e.actionResult))])]):e._e(),n("p",{ref:"terminalLastLine",staticClass:"terminal-last-line"},["&nbsp"===e.lastLineContent?n("span",{staticClass:"prompt"}):e._e(),n("span",[e._v(e._s(e.inputCommand))]),n("span",{class:e.lastLineClass,domProps:{innerHTML:e._s(e.lastLineContent)}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputCommand,expression:"inputCommand"}],ref:"inputBox",staticClass:"input-box",attrs:{disabled:"&nbsp"!==e.lastLineContent,autofocus:"true",type:"text"},domProps:{value:e.inputCommand},on:{keyup:function(t){return e.handleCommand(t)},input:function(t){t.target.composing||(e.inputCommand=t.target.value)}}})])],2)])])])},qe=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("span",{staticClass:"prompt"}),n("span",{staticClass:"cmd"},[e._v('>> type "python" for interactive shell. Coming Soon')])])}],ze={name:"VueTerminal",data:function(){return{title:"",messageList:[],actionResult:"",lastLineContent:"&nbsp",inputCommand:"",supportingCommandList:"",historyIndex:0,commandHistory:[],focused:!1}},props:{commandList:{required:!1,default:function(){return{}}},taskList:{required:!1,default:function(){return{}}}},computed:{lastLineClass:function(){if(1==this.focused){if("&nbsp"===this.lastLineContent)return"cursor";if("..."===this.lastLineContent)return"loading"}}},created:function(){var e=this;_.$on("push-to-terminal",function(t){e.pushToList({level:"System",message:t})}),_.$on("clear-terminal",function(){e.messageList=[]}),this.supportingCommandList=I()(this.commandList).concat(I()(this.taskList))},methods:{clearFocus:function(){this.focused=!1},handleFocus:function(){this.focused=!0,this.$refs.inputBox.focus()},handleCommand:function(e){var t=this;if(13===e.keyCode){if(this.commandHistory.push(this.inputCommand),this.historyIndex=this.commandHistory.length,this.pushToList({message:"$ ".concat(this.title," ").concat(this.inputCommand," ")}),this.inputCommand){var n=this.inputCommand.split(" ");"help"===n[0]?this.printHelp(n[1]):"python"==n[0]?console.log("running python shell"):this.commandList[this.inputCommand]?this.commandList[this.inputCommand].messages.map(function(e){return t.pushToList(e)}):this.taskList[this.inputCommand.split(" ")[0]]&&this.handleRun(this.inputCommand.split(" ")[0],this.inputCommand),this.inputCommand="",this.autoScroll()}}else this.handlekeyEvent(e)},handlekeyEvent:function(e){switch(e.keyCode){case 38:this.historyIndex=0===this.historyIndex?0:this.historyIndex-1,this.inputCommand=this.commandHistory[this.historyIndex];break;case 40:this.historyIndex=this.historyIndex===this.commandHistory.length?this.commandHistory.length:this.historyIndex+1,this.inputCommand=this.commandHistory[this.historyIndex];break;default:break}},handleRun:function(e,t){var n=this;return this.lastLineContent="&nbsp",this.taskList[e][e](this.pushToList,t).then(function(e){n.pushToList(e),n.lastLineContent="&nbsp"}).catch(function(e){n.pushToList(e||{type:"error",label:"Error",message:"Something went wrong!"}),n.lastLineContent="&nbsp"})},pushToList:function(e){this.messageList.push(e),this.autoScroll()},printHelp:function(e){var t=this;if(e){var n=this.commandList[e]||this.taskList[e];this.pushToList({message:n.description})}else this.pushToList({message:"Here is a list of supporting command."}),this.supportingCommandList.map(function(e){t.commandList[e]?t.pushToList({type:"success",label:e,message:"---\x3e "+t.commandList[e].description}):t.pushToList({type:"success",label:e,message:"---\x3e "+t.taskList[e].description})}),this.pushToList({message:"Enter help <command> to get help for a particular command."});this.autoScroll()},time:function(){return(new Date).toLocaleTimeString().split("").splice(2).join("")},autoScroll:function(){var e=this;this.$nextTick(function(){e.$refs.terminalWindow.scrollTop=e.$refs.terminalLastLine.offsetTop})}}};r["a"].directive("click-outside",{bind:function(e,t,n){e.clickOutsideEvent=function(r){e==r.target||e.contains(r.target)||n.context[t.expression](r)},document.body.addEventListener("click",e.clickOutsideEvent)},unbind:function(e){document.body.removeEventListener("click",e.clickOutsideEvent)}});var Ye=ze,Ke=(n("3725"),Object(q["a"])(Ye,Je,qe,!1,null,"7b8bf6dc",null)),Qe=Ke.exports,Xe=Qe;"undefined"!==typeof window&&window.Vue&&window.Vue.component("vue-terminal",Qe);var Ze={components:{VueTerminal:Xe},created:function(){console.log("terminal created")},data:function(){return{}}},et=Ze,tt=Object(q["a"])(et,Ue,We,!1,null,null,null),nt=tt.exports,rt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-toolbar",{attrs:{app:""}},[n("v-btn",{on:{click:e.increment}}),e._v("\n    "+e._s(e.count)+"\n  ")],1)],1)},it=[],st={name:"ToolBar",Store:M,methods:{increment:function(){M.commit("increment")}},computed:{count:function(){return M.state.count}}},ot=st,at=n("7496"),ct=n("71d9"),ut=Object(q["a"])(ot,rt,it,!1,null,null,null),lt=ut.exports;Y()(ut,{VApp:at["a"],VBtn:K["a"],VToolbar:ct["a"]});var mt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("sl-vue-tree",{directives:[{name:"show",rawName:"v-show",value:e.showFiles,expression:"showFiles"}],on:{nodeclick:function(t){return e.fileClicked(t)},getNode:function(t){return e.fileClicked(t)}},scopedSlots:e._u([{key:"toggle",fn:function(t){var r=t.node;return[r.isLeaf?e._e():n("span",[r.isExpanded?e._e():n("icon",{attrs:{name:"caret-right"}}),r.isExpanded?n("icon",{attrs:{name:"caret-down"}}):e._e()],1)]}},{key:"title",fn:function(t){var r=t.node;return[r.isLeaf?n("icon",{attrs:{name:"file"}}):e._e(),e._v(" "+e._s(r.title)+" ")]}},{key:"sidebar",fn:function(t){var r=t.node;return[r.data.isModified?n("icon",{attrs:{name:"circle"}}):e._e()]}}]),model:{value:e.nodes,callback:function(t){e.nodes=t},expression:"nodes"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showInstructions,expression:"showInstructions"},{name:"description",rawName:"v-description",value:e.instructions,expression:"instructions"}],staticClass:"probStepDescription",attrs:{id:"instructionsContainer"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showResults,expression:"showResults"}],staticClass:"probStepDescription"},e._l(e.results,function(t,r){return n("v-card",{key:r,attrs:{id:"resultCards"},on:{click:function(n){return e.showTestFile(t)}}},[n("v-icon",{staticClass:"material-icons md-30",class:{resultPassed:e.checkResultPassed(t)}},[e._v("done")]),e._v("   "+e._s(t.name)+" "+e._s(t.outcome)+"\n    ")],1)}),1)],1)},dt=[],pt=(n("4917"),n("c536")),ft=n.n(pt),ht=(n("fc68"),[{title:"hello.py",isLeaf:!0,code:"def main(): return true"},{title:"world.py",isLeaf:!0,code:"def main(): return true"},{title:"python.py",isLeaf:!0,code:"def main(): return true"},{title:"example.py",isLeaf:!0,code:"def main(): return true"}]),vt={name:"TreeVue",components:{slVueTree:ft.a,Icon:ue["a"]},data:function(){return{nodes:ht,files:"default files",testFiles:[],instructions:"",results:[{name:"unittest.loader._FailedTest -> test_6_CircleConstructor",outcome:"failed"},{name:"test_1_CarConstructor.Test_CarConstructor -> test_01",outcome:"passed"}],step:Number(0),showFiles:!0,showInstructions:!1,showProblems:!1,showResults:!1}},directives:{description:function(e,t){e.innerHTML=t.value}},methods:{checkResultPassed:function(e){return"passed"==e.outcome},fileClicked:function(e){console.log("event: ",e),_.$emit("update-filepanel",e.title),M.dispatch("selectFile",e.title)},showTestFile:function(e){var t;console.log("test ",e),t="passed"==e.outcome?e.name.split(".")[0]:e.name.split(/([-> ])/g).pop(),console.log("name: ",t),I()(this.testFiles).forEach(function(e){var n=e.split(/[.\/\/\\]/)[1];if(console.log("testName: ",n),n.match(t))return console.log("File: ",e),void _.$emit("filetabs-push-file",e)})}},watch:{nodes:function(e){}},computed:{lastStep:function(){var e=M.getters.getLastCommitedStep;return this.step=e,this.step}},created:function(){var e=this;_.$on("update-vuetree-files",function(t){if(t){var n=[];t.forEach(function(e){var t={title:e.file,isLeaf:!0,code:e.code};n.push(t)}),e.nodes=n;var r=M.getters.getProblemSteps.pop().files;r&&(console.log("testFiles ",r),e.testFiles=r)}}),_.$on("update-treeVue-selectedFiles",function(e){console.log("nodes: ",ht)}),_.$on("update-treevue-instructions",function(t){e.instructions=t.instructions}),_.$on("update-treevue-result",function(t){e.results=t}),_.$on("update-treeVue",function(t){"files"==t.title?(e.showFiles=!0,e.showInstructions=!1,e.showResults=!1):"instructions"==t.title?(e.showFiles=!1,e.showInstructions=!0,e.showResults=!1):"results"==t.title&&(e.showFiles=!1,e.showInstructions=!1,e.showResults=!0)})}},gt=vt,bt=(n("83e6"),n("e9f9"),Object(q["a"])(gt,mt,dt,!1,null,"6addec3b",null)),wt=bt.exports;Y()(bt,{VCard:Ie["a"],VContainer:Q["a"],VIcon:de["a"]});var xt={name:"App",Store:M,components:{Commands:Z,codemirror:oe,FilePanel:ve,Header:ke,InfoPanel:Ee,SidePanel:He,Terminal:nt,ToolBar:lt,TreeVue:wt},methods:{},computed:{dark:function(){return M.state.theme}},data:function(){return{}}},Ct=xt,kt=(n("034f"),Object(q["a"])(Ct,s,o,!1,null,null,null)),yt=kt.exports;Y()(kt,{VApp:at["a"],VCard:Ie["a"],VContainer:Q["a"],VFlex:Fe["a"],VLayout:Te["a"]}),r["a"].config.productionTip=!1,r["a"].config.devtools=!1,r["a"].use(d["a"]),new r["a"]({created:function(){},render:function(e){return e(yt)}}).$mount("#app")},"5b69":function(e,t,n){"use strict";var r=n("92ed"),i=n.n(r);i.a},"7a86":function(e,t,n){"use strict";var r=n("7ecd"),i=n.n(r);i.a},"7ecd":function(e,t,n){},"83e6":function(e,t,n){"use strict";var r=n("98a7"),i=n.n(r);i.a},"92ed":function(e,t,n){},"98a7":function(e,t,n){},"9b27":function(e,t,n){},b4cd:function(e,t,n){},d3a7:function(e,t,n){"use strict";var r=n("b4cd"),i=n.n(r);i.a},e9e7:function(e,t,n){},e9f9:function(e,t,n){"use strict";var r=n("487a"),i=n.n(r);i.a},ecfb:function(e,t,n){},f3eb:function(e,t,n){"use strict";var r=n("ecfb"),i=n.n(r);i.a}});
//# sourceMappingURL=app.8877e42f.js.map