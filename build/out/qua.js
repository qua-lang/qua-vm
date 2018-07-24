require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
global.qua = require("../src/main");

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/main":5}],2:[function(require,module,exports){
module.exports=["%%progn",null,null,null,null,null,null,["%%def",["qua-function","def"],["qua-function","%%def"]],null,["def",["qua-function","car"],["qua-function","%%car"]],null,["def",["qua-function","cdr"],["qua-function","%%cdr"]],null,["def",["qua-function","cons"],["qua-function","%%cons"]],null,["def",["qua-function","defconstant"],["qua-function","def"]],null,["def",["qua-function","dynamic"],["qua-function","%%dynamic"]],null,["def",["qua-function","dynamic-bind"],["qua-function","%%dynamic-bind"]],null,["def",["qua-function","eq"],["qua-function","%%eq"]],null,["def",["qua-function","eql"],["qua-function","eq"]],null,["def",["qua-function","eval"],["qua-function","%%eval"]],null,["def",["qua-function","if"],["qua-function","%%if"]],null,["def",["qua-function","make-dynamic"],["qua-function","%%make-dynamic"]],null,["def",["qua-function","make-environment"],["qua-function","%%make-environment"]],null,["def",["qua-function","progn"],["qua-function","%%progn"]],null,["def",["qua-function","setq"],["qua-function","%%setq"]],null,["def",["qua-function","to-fun-sym"],["qua-function","%%to-fun-sym"]],null,["def",["qua-function","to-type-sym"],["qua-function","%%to-type-sym"]],null,["def",["qua-function","unwrap"],["qua-function","%%unwrap"]],null,["def",["qua-function","wrap"],["qua-function","%%wrap"]],null,null,["def",["qua-function","class-of"],["qua-function","%%class-of"]],["def",["qua-function","make-class"],["qua-function","%%make-class"]],["def",["qua-function","send-message"],["qua-function","%%send-message"]],null,["def",["qua-function","js-apply"],["qua-function","%%js-apply"]],["def",["qua-function","js-function"],["qua-function","%%js-function"]],["def",["qua-function","js-get"],["qua-function","%%js-get"]],["def",["qua-function","js-global"],["qua-function","%%js-global"]],["def",["qua-function","js-new"],["qua-function","%%js-new"]],["def",["qua-function","js-set"],["qua-function","%%js-set"]],["def",["qua-function","own-property?"],["qua-function","%%own-property?"]],null,["def",["qua-function","list*"],["qua-function","%%list*"]],["def",["qua-function","list-to-js-array"],["qua-function","%%list-to-array"]],["def",["qua-function","plist-to-js-object"],["qua-function","%%plist-to-js-object"]],["def",["qua-function","reverse-list"],["qua-function","%%reverse-list"]],null,["def","*print-escape*","%%*print-escape*"],null,["def",["qua-function","quote"],["%%vau",["operand"],"#ign","operand"]],null,["def",["qua-function","list"],["wrap",["%%vau","arguments","#ign","arguments"]]],null,["def",["qua-function","the-environment"],["%%vau","#ign","environment","environment"]],null,null,null,["def",["qua-function","vau"],["%%vau",["params","env-param",".","body"],"env",["eval",["list",["qua-function","%%vau"],"params","env-param",["list*",["qua-function","progn"],"body"]],"env"]]],null,["def",["qua-function","deffexpr"],["vau",["name","params","env-param",".","body"],"env",["eval",["list",["qua-function","def"],["to-fun-sym","name"],["list*",["qua-function","vau"],"params","env-param","body"]],"env"]]],null,null,["def",["qua-function","make-macro"],["wrap",["vau",["expander"],"#ign",["vau","form","env",["eval",["eval",["cons","expander","form"],["make-environment"]],"env"]]]]],null,["def",["qua-function","macro"],["make-macro",["vau",["params",".","body"],"#ign",["list",["qua-function","make-macro"],["list*",["qua-function","vau"],"params","#ign","body"]]]]],null,["def",["qua-function","defmacro"],["macro",["name","params",".","body"],["list",["qua-function","def"],["to-fun-sym","name"],["list*",["qua-function","macro"],"params","body"]]]],null,null,["defmacro","lambda",["params",".","body"],["list",["qua-function","wrap"],["list*",["qua-function","vau"],"params","#ign","body"]]],null,["defmacro","defun",["name","params",".","body"],["list",["qua-function","def"],["to-fun-sym","name"],["list*",["qua-function","lambda"],"params","body"]]],null,["defmacro","lambda/env",["params","env-param",".","body"],["list",["qua-function","wrap"],["list*",["qua-function","vau"],"params","env-param","body"]]],null,["defmacro","defun/env",["name","params","env-param",".","body"],["list",["qua-function","def"],["to-fun-sym","name"],["list*",["qua-function","lambda/env"],"params","env-param","body"]]],null,["defun","optional",["opt-arg",".","opt-default"],["if",["nil?","opt-arg"],["if",["nil?","opt-default"],"#void",["car","opt-default"]],["car","opt-arg"]]],null,["defun","apply",["fun","arguments",".","opt-env"],["eval",["cons",["unwrap","fun"],"arguments"],["optional","opt-env",["make-environment"]]]],null,null,["defun","funcall",["fun",".","arguments"],["apply","fun","arguments"]],null,null,null,null,["defun","compose",[["qua-function","f"],["qua-function","g"]],["lambda",["arg"],["f",["g","arg"]]]],["defun","identity",["x"],"x"],null,["defun","symbol?",["sym"],["eq",["class-of","sym"],["class","symbol"]]],["defun","cons?",["cons"],["eq",["class-of","cons"],["class","cons"]]],["defun","nil?",["obj"],["eq","obj",[]]],["defun","void?",["obj"],["eq","obj","#void"]],["def",["qua-function","caar"],["compose",["qua-function","car"],["qua-function","car"]]],["def",["qua-function","cadr"],["compose",["qua-function","car"],["qua-function","cdr"]]],["def",["qua-function","cdar"],["compose",["qua-function","cdr"],["qua-function","car"]]],["def",["qua-function","cddr"],["compose",["qua-function","cdr"],["qua-function","cdr"]]],["defmacro","function",["name"],["to-fun-sym","name"]],["defmacro","class",["name"],["to-type-sym","name"]],["defun","symbol-name",["sym"],["%%slot-value","sym",["wat-string","name"]]],null,["defun","map-list",[["qua-function","fun"],"list"],["if",["nil?","list"],[],["cons",["fun",["car","list"]],["map-list",["qua-function","fun"],["cdr","list"]]]]],["def",["qua-function","list-for-each"],["qua-function","map-list"]],["defun","fold-list",[["qua-function","fun"],"init","list"],["if",["nil?","list"],"init",["fold-list",["qua-function","fun"],["fun","init",["car","list"]],["cdr","list"]]]],null,null,null,["defmacro","let",["bindings",".","body"],["list*",["list*",["qua-function","lambda"],["map-list",["qua-function","car"],"bindings"],"body"],["map-list",["qua-function","cadr"],"bindings"]]],null,null,["defmacro","let*",["bindings",".","body"],["if",["nil?","bindings"],["list*",["qua-function","let"],[],"body"],["list",["qua-function","let"],["list",["car","bindings"]],["list*",["qua-function","let*"],["cdr","bindings"],"body"]]]],null,null,["defmacro","letrec",["bindings",".","body"],["list*",["qua-function","let"],[],["list",["qua-function","def"],["map-list",["qua-function","car"],"bindings"],["list*",["qua-function","list"],["map-list",["qua-function","cadr"],"bindings"]]],"body"]],null,["defun","var-bindingize",[["fun-name","fun-params",".","fun-body"]],["list",["to-fun-sym","fun-name"],["list*",["qua-function","lambda"],"fun-params","fun-body"]]],null,["defmacro","flet",["fun-bindings",".","body"],["list*",["qua-function","let"],["map-list",["qua-function","var-bindingize"],"fun-bindings"],"body"]],null,["defmacro","labels",["fun-bindings",".","body"],["list*",["qua-function","letrec"],["map-list",["qua-function","var-bindingize"],"fun-bindings"],"body"]],null,["defun","not",["boolean"],["if","boolean",false,true]],["deffexpr","cond","clauses","env",["if",["nil?","clauses"],"#void",["let",[[[["test",".","body"],".","rest-clauses"],"clauses"]],["if",["eval","test","env"],["eval",["cons",["qua-function","progn"],"body"],"env"],["eval",["cons",["qua-function","cond"],"rest-clauses"],"env"]]]]],["deffexpr","and","ops","env",["cond",[["nil?","ops"],true],[["nil?",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],["eval",["cons",["qua-function","and"],["cdr","ops"]],"env"]],[true,false]]],["deffexpr","or","ops","env",["cond",[["nil?","ops"],false],[["nil?",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],true],[true,["eval",["cons",["qua-function","or"],["cdr","ops"]],"env"]]]],null,["defconstant","+setter-prop+",["wat-string","qua_setter"]],["defun","setter",["obj"],["js-get","obj","+setter-prop+"]],["defun","defsetf",["access-fn","update-fn"],["js-set","access-fn","+setter-prop+","update-fn"]],["defsetf",["qua-function","setter"],["lambda",["new-setter","getter"],["js-set","getter","+setter-prop+","new-setter"]]],["defmacro","setf",["place","new-val"],["if",["symbol?","place"],["list",["qua-function","setq"],"place","new-val"],["let*",[[["getter-form",".","arguments"],"place"],["getter",["if",["symbol?","getter-form"],["to-fun-sym","getter-form"],"getter-form"]]],["list*",["list",["qua-function","setter"],"getter"],"new-val","arguments"]]]],["defmacro","incf",["place",".","opt-increment"],["let",[["increment",["optional","opt-increment",1]]],["list",["qua-function","setf"],"place",["list",["qua-function","+"],"place","increment"]]]],["defmacro","decf",["place",".","opt-decrement"],["let",[["decrement",["optional","opt-decrement",1]]],["list",["qua-function","setf"],"place",["list",["qua-function","-"],"place","decrement"]]]],null,["defun/env","find-class",["class-desig"],"env",["eval",["to-type-sym","class-desig"],"env"]],["defun","make-instance",["class-desig",".","initargs"],["%%make-instance",["find-class","class-desig"],["plist-to-js-object","initargs"]]],["deffexpr","defgeneric",["name",".","#ign"],"env",["let",[["generic",["lambda","arguments",["send-message",["car","arguments"],["symbol-name","name"],"arguments"]]]],["eval",["list",["qua-function","def"],["to-fun-sym","name"],"generic"],"env"]]],["deffexpr","defmethod",["name",[["self","class-spec"],".","arguments"],".","body"],"env",["let",[["class",["find-class","class-spec"]],["method",["eval",["list*",["qua-function","lambda"],["list*","self","arguments"],"body"],"env"]]],["%%put-method","class",["symbol-name","name"],"method"]]],["deffexpr","defstruct",["name",".","#ign"],"env",["let*",[["class-name",["symbol-name","name"]],["class",["make-class",["class","structure-class"],"class-name"]]],["eval",["list",["qua-function","def"],["to-type-sym","name"],"class"],"env"]]],["defun","slot-value",["obj","name"],["%%slot-value","obj",["symbol-name","name"]]],["defun","set-slot-value",["obj","name","value"],["%%set-slot-value","obj",["symbol-name","name"],"value"]],["defun","slot-bound?",["obj","name"],["%%slot-bound?","obj",["symbol-name","name"]]],["defsetf",["qua-function","slot-value"],["lambda",["new-val","obj","slot-name"],["set-slot-value","obj","slot-name","new-val"]]],null,["defun","slot-void?",["obj","slot-name"],["if",["slot-bound?","obj","slot-name"],["void?",["slot-value","obj","slot-name"]],true]],["defgeneric","compute-method",["class","receiver","message","arguments"]],null,["defmacro","loop","body",["list",["qua-function","%%loop"],["list*",["qua-function","lambda"],[],"body"]]],["deffexpr","while",["test",".","body"],"env",["let",[["body",["list*",["qua-function","progn"],"body"]]],["block","exit",["loop",["if",["eval","test","env"],["eval","body","env"],["return-from","exit"]]]]]],["defmacro","if",["test","then","else"],["list",["qua-function","%%if"],"test","then","else"]],["defmacro","when",["test",".","body"],["list",["qua-function","if"],"test",["list*",["qua-function","progn"],"body"],"#void"]],["defmacro","unless",["test",".","body"],["list",["qua-function","if"],"test","#void",["list*",["qua-function","progn"],"body"]]],["defun","call-with-escape",[["qua-function","fn"]],["labels",[["escape","opt-val",["%%raise",["make-instance",["quote","%%tag"],["qua-keyword","id"],["qua-function","escape"],["qua-keyword","val"],["optional","opt-val"]]]]],["%%rescue",["lambda",["exc"],["if",["and",["eq",["class-of","exc"],["class","%%tag"]],["eq",["slot-value","exc",["quote","id"]],["qua-function","escape"]]],["slot-value","exc",["quote","val"]],["%%raise","exc"]]],["lambda",[],["fn",["qua-function","escape"]]]]]],["defmacro","block",["name",".","body"],["list",["qua-function","call-with-escape"],["list*",["qua-function","lambda"],["list","name"],"body"]]],["defun","return-from",["escape",".","opt-val"],["apply","escape","opt-val"]],["deffexpr","prog1","forms","env",["if",["nil?","forms"],"#void",["let",[["result",["eval",["car","forms"],"env"]]],["eval",["list*",["qua-function","progn"],["cdr","forms"]],"env"],"result"]]],["defmacro","prog2",["form",".","forms"],["list",["qua-function","progn"],"form",["list*",["qua-function","prog1"],"forms"]]],["defun","unwind-protect*",[["qua-function","protected-thunk"],["qua-function","cleanup-thunk"]],["prog1",["%%rescue",["lambda",["exc"],["cleanup-thunk"],["%%raise","exc"]],["qua-function","protected-thunk"]],["cleanup-thunk"]]],["defmacro","unwind-protect",["protected-form",".","cleanup-forms"],["list",["qua-function","unwind-protect*"],["list",["qua-function","lambda"],[],"protected-form"],["list*",["qua-function","lambda"],[],"cleanup-forms"]]],["deffexpr","case",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["list-for-each",["lambda",[["other-val",".","body"]],["when",["eql","val",["eval","other-val","env"]],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]]]],"clauses"],"#void"]]],null,["defstruct","box","val"],["defun","make-box","opt-val",["make-instance",["quote","box"],["qua-keyword","val"],["optional","opt-val"]]],["defun","box-value",["box"],["slot-value","box",["quote","val"]]],["defsetf",["qua-function","box-value"],["lambda",["new-val","box"],["setf",["slot-value","box",["quote","val"]],"new-val"]]],null,["defmacro","push-prompt",["prompt",".","body"],["list",["qua-function","%%push-prompt"],"prompt",["list*",["qua-function","lambda"],[],"body"]]],["defmacro","take-subcont",["prompt","name",".","body"],["list",["qua-function","%%take-subcont"],"prompt",["list*",["qua-function","lambda"],["list","name"],"body"]]],["defmacro","push-subcont",["continuation",".","body"],["list",["qua-function","%%push-subcont"],"continuation",["list*",["qua-function","lambda"],[],"body"]]],["defmacro","push-prompt-subcont",["prompt","continuation",".","body"],["list",["qua-function","%%push-prompt-subcont"],"prompt","continuation",["list*",["qua-function","lambda"],[],"body"]]],["defconstant","+default-prompt+",["qua-keyword","default-prompt"]],["defmacro","push-default-prompt","body",["list*",["qua-function","push-prompt"],"+default-prompt+","body"]],["defmacro","take-default-subcont",["name",".","body"],["list*",["qua-function","take-subcont"],"+default-prompt+","name","body"]],["defmacro","push-default-subcont",["continuation",".","body"],["list*",["qua-function","push-prompt-subcont"],"+default-prompt+","continuation","body"]],null,["defmacro","defdynamic",["name",".","opt-val"],["list",["qua-function","def"],"name",["list",["qua-function","make-dynamic"],["optional","opt-val"]]]],null,null,["deffexpr","dynamic-let",["bindings",".","body"],"env",["let",[["pairs",["map-list",["lambda",[["dynamic-name","expr"]],["cons",["eval","dynamic-name","env"],["eval","expr","env"]]],"bindings"]]],["labels",[["process-pairs",["pairs"],["if",["nil?","pairs"],["eval",["list*",["qua-function","progn"],"body"],"env"],["let*",[[[["dynamic",".","value"],".","rest-pairs"],"pairs"]],["dynamic-bind","dynamic","value",["lambda",[],["process-pairs","rest-pairs"]]]]]]],["process-pairs","pairs"]]]],null,null,["defun","js-getter",["prop-name"],["flet",[["getter",["obj"],["js-get","obj","prop-name"]]],["defsetf",["qua-function","getter"],["lambda",["new-val","obj"],["js-set","obj","prop-name","new-val"]]],["qua-function","getter"]]],null,["defun","js-invoker",["method-name"],["lambda",["this",".","arguments"],["let",[["js-fun",["js-get","this","method-name"]]],["js-apply","js-fun","this",["list-to-js-array","arguments"]]]]],["defun","js-object","plist",["plist-to-js-object","plist"]],["defun","js-array","elements",["list-to-js-array","elements"]],["defmacro","js-lambda",["lambda-list",".","body"],["list",["qua-function","js-function"],["list*",["qua-function","lambda"],"lambda-list","body"]]],["defun","js-relational-op",["name"],["let",[[["qua-function","binop"],["%%js-binop","name"]]],["labels",[["op",["arg1","arg2",".","rest"],["if",["binop","arg1","arg2"],["if",["nil?","rest"],true,["apply",["qua-function","op"],["list*","arg2","rest"]]],false]]],["qua-function","op"]]]],["def",["qua-function","=="],["js-relational-op",["wat-string","=="]]],["def",["qua-function","==="],["js-relational-op",["wat-string","==="]]],["def",["qua-function","<"],["js-relational-op",["wat-string","<"]]],["def",["qua-function",">"],["js-relational-op",["wat-string",">"]]],["def",["qua-function","<="],["js-relational-op",["wat-string","<="]]],["def",["qua-function",">="],["js-relational-op",["wat-string",">="]]],["def",["qua-function","lt"],["qua-function","<"]],["def",["qua-function","lte"],["qua-function","<="]],["def",["qua-function","gt"],["qua-function",">"]],["def",["qua-function","gte"],["qua-function",">="]],["defun","!=","arguments",["not",["apply",["qua-function","=="],"arguments"]]],["defun","!==","arguments",["not",["apply",["qua-function","==="],"arguments"]]],["def",["qua-function","*"],["let",[[["qua-function","binop"],["%%js-binop",["wat-string","*"]]]],["lambda","arguments",["fold-list",["qua-function","binop"],1,"arguments"]]]],null,["def",["qua-function","+"],["let",[[["qua-function","binop"],["%%js-binop",["wat-string","+"]]]],["lambda","arguments",["if",["nil?","arguments"],0,["fold-list",["qua-function","binop"],["car","arguments"],["cdr","arguments"]]]]]],["defun","js-negative-op",["name","unit"],["let",[[["qua-function","binop"],["%%js-binop","name"]]],["lambda",["arg1",".","rest"],["if",["nil?","rest"],["binop","unit","arg1"],["fold-list",["qua-function","binop"],"arg1","rest"]]]]],["def",["qua-function","-"],["js-negative-op",["wat-string","-"],0]],["def",["qua-function","/"],["js-negative-op",["wat-string","/"],1]],null,["defun","list-length",["list"],["if",["nil?","list"],0,["+",1,["list-length",["cdr","list"]]]]],["defun","list-elt",["list","i"],["if",["eql","i",0],["car","list"],["list-elt",["cdr","list"],["-","i",1]]]],["defun","filter-list",[["qua-function","pred?"],"list"],["if",["nil?","list"],["quote",[]],["if",["pred?",["car","list"]],["cons",["car","list"],["filter-list",["qua-function","pred?"],["cdr","list"]]],["filter-list",["qua-function","pred?"],["cdr","list"]]]]],["defun","append-lists",["list-1","list-2"],["if",["nil?","list-1"],"list-2",["cons",["car","list-1"],["append-lists",["cdr","list-1"],"list-2"]]]],null,["defgeneric","type?",["obj","type-spec"]],["defmethod","type?",[["obj","object"],"type-spec"],["default-type?","obj","type-spec"]],["defun","default-type?",["obj","type-spec"],["let",[["c",["find-class","type-spec"]]],["or",["eq","c",["class","object"]],["eq","c",["class-of","obj"]]]]],["deffexpr","typecase",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["list-for-each",["lambda",[["type-spec",".","body"]],["if",["eq","type-spec",true],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]],["when",["type?","val","type-spec"],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]]]]],"clauses"],"#void"]]],["defstruct","type-mismatch-error","type-spec","obj"],["deffexpr","the",["type-spec","obj"],"env",["let",[["evaluated-obj",["eval","obj","env"]]],["if",["type?","evaluated-obj","type-spec"],"evaluated-obj",["error",["make-instance",["quote","type-mismatch-error"],["qua-keyword","type-spec"],"type-spec",["qua-keyword","obj"],"evaluated-obj"]]]]],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,["defstruct","handler-frame","handlers","parent"],["defun","make-handler-frame",["handlers","parent"],["make-instance",["quote","handler-frame"],["qua-keyword","handlers"],"handlers",["qua-keyword","parent"],"parent"]],["defstruct","condition-handler","condition-type","handler-function"],["defun","make-condition-handler",["condition-type","handler-function"],["the","symbol","condition-type"],["the","function","handler-function"],["make-instance",["quote","condition-handler"],["qua-keyword","condition-type"],"condition-type",["qua-keyword","handler-function"],"handler-function"]],["defstruct","restart-handler","restart-name","handler-function","associated-condition","interactive-function"],["defun","make-restart-handler",["restart-name","handler-function","interactive-function","associated-condition"],["the","symbol","restart-name"],["the","function","handler-function"],["the","function","interactive-function"],["make-instance",["quote","restart-handler"],["qua-keyword","restart-name"],"restart-name",["qua-keyword","handler-function"],"handler-function",["qua-keyword","associated-condition"],"associated-condition",["qua-keyword","interactive-function"],"interactive-function"]],["defdynamic","*condition-handler-frame*"],["defdynamic","*restart-handler-frame*"],null,["defun","apply-handler-function",["handler","arguments"],["apply",["slot-value","handler",["quote","handler-function"]],"arguments"]],["defun","make-handler-bind-operator",[["qua-function","handler-spec-parser"],"handler-frame-dynamic"],["vau",["handler-specs",".","body"],"env",["let*",[["handlers",["map-list",["lambda",["spec"],["handler-spec-parser","spec","env"]],"handler-specs"]],["handler-frame",["make-handler-frame","handlers",["dynamic","handler-frame-dynamic"]]]],["dynamic-bind","handler-frame-dynamic","handler-frame",["lambda",[],["eval",["list*",["qua-function","progn"],"body"],"env"]]]]]],null,["def",["qua-function","handler-bind"],["make-handler-bind-operator",["lambda",[["class-name","function-form"],"env"],["make-condition-handler","class-name",["eval","function-form","env"]]],"*condition-handler-frame*"]],null,null,null,["def",["qua-function","restart-bind"],["make-handler-bind-operator",["lambda",[["restart-name","function-form",".","keywords"],"env"],null,["let*",[["dict",["plist-to-js-object","keywords"]],["interactive-function",["if",["own-property?","dict",["wat-string","interactive-function"]],["eval",[["js-getter",["wat-string","interactive-function"]],"dict"],"env"],["lambda",[],["quote",[]]]]],["associated-condition",["if",["own-property?","dict",["wat-string","associated-condition"]],["eval",[["js-getter",["wat-string","associated-condition"]],"dict"],"env"],"#void"]]],["make-restart-handler","restart-name",["eval","function-form","env"],"interactive-function","associated-condition"]]],"*restart-handler-frame*"]],null,["defun","signal",["condition"],["signal-condition","condition",["dynamic","*condition-handler-frame*"],["list","condition"]]],["defun","warn",["condition"],["signal","condition"],["print","condition"]],null,null,null,null,null,["defun","error",["condition"],["signal","condition"],["invoke-debugger","condition"]],["defstruct","restart-not-found","restart-designator"],["defun","restart-not-found",["restart-designator"],["make-instance",["quote","restart-not-found"],["qua-keyword","restart-designator"],"restart-designator"]],["defun","invoke-restart",["restart-designator",".","arguments"],["cond",[["symbol?","restart-designator"],["signal-condition","restart-designator",["dynamic","*restart-handler-frame*"],"arguments"]],[["type?","restart-designator",["quote","restart-handler"]],["apply-handler-function","restart-designator","arguments"]],[true,["error",["restart-not-found","restart-designator"]]]]],null,null,null,null,null,["defun","signal-condition",["condition","dynamic-frame","arguments"],["let",[["handler-and-frame",["find-applicable-handler","condition","dynamic-frame","#void"]]],["if",["void?","handler-and-frame"],"#void",["let",[[["handler","frame"],"handler-and-frame"]],["call-condition-handler","handler","frame","arguments"],null,["signal-condition","condition",["slot-value","frame",["quote","parent"]],"arguments"]]]]],null,null,null,["defun","find-applicable-handler",["condition","dynamic-frame","payload"],["if",["void?","dynamic-frame"],"#void",["block","found",["list-for-each",["lambda",["handler"],["when",["condition-applicable?","handler","condition","payload"],["return-from","found",["list","handler","dynamic-frame"]]]],["slot-value","dynamic-frame",["quote","handlers"]]],["find-applicable-handler","condition",["slot-value","dynamic-frame",["quote","parent"]],"payload"]]]],["defun","find-restart",["restart-name",".","opt-condition"],["the","symbol","restart-name"],["let*",[["associated-condition",["optional","opt-condition"]],["handler-and-frame",["find-applicable-handler","restart-name",["dynamic","*restart-handler-frame*"],"associated-condition"]]],["if",["void?","handler-and-frame"],"#void",["let",[[["handler","#ign"],"handler-and-frame"]],"handler"]]]],["defgeneric","condition-applicable?",["handler","condition","payload"]],["defmethod","condition-applicable?",[["handler","condition-handler"],"condition","#ign"],["type?","condition",["slot-value","handler",["quote","condition-type"]]]],["defmethod","condition-applicable?",[["handler","restart-handler"],"restart-name","associated-condition"],["and",["eql",["symbol-name","restart-name"],["symbol-name",["slot-value","handler",["quote","restart-name"]]]],["or",["void?","associated-condition"],["slot-void?","handler",["quote","associated-condition"]],["eq","associated-condition",["slot-value","handler",["quote","associated-condition"]]]]]],["defgeneric","call-condition-handler",["handler","handler-frame","arguments"]],["defmethod","call-condition-handler",[["handler","condition-handler"],"handler-frame","arguments"],null,["dynamic-let",[["*condition-handler-frame*",["slot-value","handler-frame",["quote","parent"]]]],["apply-handler-function","handler","arguments"]]],["defmethod","call-condition-handler",[["handler","restart-handler"],"handler-frame","arguments"],["apply-handler-function","handler","arguments"]],["defun","compute-restarts","opt-condition",["reverse-list",["do-compute-restarts",["optional","opt-condition"],["quote",[]],["dynamic","*restart-handler-frame*"]]]],["defun","do-compute-restarts",["condition","restart-list","handler-frame"],["if",["void?","handler-frame"],"restart-list",["let",[["restarts",["filter-list",["lambda",["handler"],["or",["void?","condition"],["slot-void?","handler",["quote","associated-condition"]],["eq",["slot-value","handler",["quote","associated-condition"]],"condition"]]],["slot-value","handler-frame",["quote","handlers"]]]]],["do-compute-restarts","condition",["append-lists","restarts","restart-list"],["slot-value","handler-frame",["quote","parent"]]]]]],["defun","invoke-restart-interactively",["restart-designator"],["let*",[["restart",["cond",[["symbol?","restart-designator"],["let",[["restart",["find-restart","restart-designator"]]],["if",["void?","restart"],["error",["restart-not-found","restart-designator"]],"restart"]]],[["type?","restart-designator",["quote","restart-handler"]],"restart-designator"],[true,["error",["restart-not-found","restart-designator"]]]]],["arguments",["funcall",["slot-value","restart",["quote","interactive-function"]]]]],["apply",["qua-function","invoke-restart"],["list*","restart","arguments"]]]],["defstruct","simple-error","message"],["defun","simple-error",["message"],["error",["make-instance",["quote","simple-error"],["qua-keyword","message"],"message"]]],null,null,["defgeneric","start-iteration",["sequence"]],["defgeneric","more?",["sequence","iteration-state"]],["defgeneric","current",["sequence","iteration-state"]],["defgeneric","advance",["sequence","iteration-state"]],["defgeneric","empty-clone",["sequence"]],["defgeneric","add-for-iteration",["sequence","element"]],["defgeneric","finish-clone",["sequence"]],["defun","for-each",[["qua-function","fn"],"seq"],["let",[["state",["start-iteration","seq"]]],["while",["more?","seq","state"],["fn",["current","seq","state"]],["setq","state",["advance","seq","state"]]]]],["defun","map",[["qua-function","fn"],"seq"],["let",[["result",["empty-clone","seq"]],["state",["start-iteration","seq"]]],["while",["more?","seq","state"],["setq","result",["add-for-iteration","result",["fn",["current","seq","state"]]]],["setq","state",["advance","seq","state"]]],["finish-clone","result"]]],null,["defmethod","start-iteration",[["self","cons"]],"self"],["defmethod","more?",[["self","cons"],"state"],["cons?","state"]],["defmethod","current",[["self","cons"],"state"],["car","state"]],["defmethod","advance",[["self","cons"],"state"],["cdr","state"]],["defmethod","empty-clone",[["self","cons"]],[]],["defmethod","add-for-iteration",[["self","cons"],"elt"],["cons","elt","self"]],["defmethod","finish-clone",[["self","cons"]],["reverse-list","self"]],["defmethod","start-iteration",[["self","nil"]],[]],["defmethod","more?",[["self","nil"],"state"],false],["defmethod","current",[["self","nil"],"state"],["simple-error",["wat-string","At end"]]],["defmethod","advance",[["self","nil"],"state"],["simple-error",["wat-string","Can't advance past end"]]],["defmethod","empty-clone",[["self","nil"]],[]],["defmethod","add-for-iteration",[["self","nil"],"elt"],["cons","elt","self"]],["defmethod","finish-clone",[["self","nil"]],[]],null,["defmethod","start-iteration",[["self","js-array"]],0],["defmethod","more?",[["self","js-array"],"state"],["lt","state",[["js-getter",["wat-string","length"]],"self"]]],["defmethod","current",[["self","js-array"],"state"],["js-get","self","state"]],["defmethod","advance",[["self","js-array"],"state"],["+","state",1]],["defmethod","empty-clone",[["self","js-array"]],["js-array"]],["defmethod","add-for-iteration",[["self","js-array"],"elt"],[["js-invoker",["wat-string","push"]],"self","elt"],"self"],["defmethod","finish-clone",[["self","js-array"]],"self"],null,null,["defgeneric","read-string-from-stream",["stream"]],null,["defgeneric","write-string-to-stream",["stream","string"]],["defdynamic","*standard-input*"],["defdynamic","*standard-output*"],null,null,null,["defun","print-object",["self","stream"],["write-string-to-stream","stream",["%%object-to-string","self"]]],null,["defun","read","opt-stream",["let*",[["stream",["optional","opt-stream",["dynamic","*standard-input*"]]],["string",["read-string-from-stream","stream"]]],["%%parse-forms","string"]]],["defun","write",["object",".","opt-stream"],["let*",[["stream",["optional","opt-stream",["dynamic","*standard-output*"]]]],["if",["void?","stream"],["%%print","object"],["print-object","object","stream"]]]],["defun","print",["object",".","opt-stream"],["let*",[["stream",["optional","opt-stream",["dynamic","*standard-output*"]]]],["if",["void?","stream"],["%%print","object"],["progn",["dynamic-let",[["*print-escape*",false]],["write","object","stream"],["write-string-to-stream","stream",["wat-string","\n"]]]]]]],null,["defun","prin1",["object",".","opt-stream"],["let*",[["stream",["optional","opt-stream",["dynamic","*standard-output*"]]]],["if",["void?","stream"],["%%print","object"],["progn",["dynamic-let",[["*print-escape*",true]],["write","object","stream"],["write-string-to-stream","stream",["wat-string","\n"]]]]]]],null,null,["defconstant","+user-prompt+",["qua-keyword","user-prompt"]],null,null,["defun","push-userspace*",[["qua-function","user-thunk"]],["push-prompt","+user-prompt+",["dynamic-let",[["*standard-input*",["%arch-standard-input"]],["*standard-output*",["%arch-standard-output"]]],["user-thunk"]]]],["defmacro","push-userspace","body",["list",["qua-function","push-userspace*"],["list*",["qua-function","lambda"],[],"body"]]],null,["defun","log","args",["apply",["js-invoker",["wat-string","log"]],["list*",["js-global",["wat-string","console"]],"args"]]],null,["defun","invoke-debugger",["condition"],["print",["wat-string",""]],["print",["wat-string","Welcome to the debugger!"]],["loop",["block","continue",["print",["wat-string","Condition: "]],["print","condition"],["print",["wat-string","Stack: "]],["print-stacktrace"],["let",[["restarts",["compute-restarts","condition"]]],["if",[">",["list-length","restarts"],0],["progn",["print",["wat-string","Restarts:"]],["let",[["i",0]],["list-for-each",["lambda",["restart"],["print",["+","i",["wat-string",": "],["symbol-name",["slot-value","restart",["quote","restart-name"]]]]],["incf","i"]],"restarts"],["print",["wat-string","Enter a restart number:"]],["let*",[["n",["car",["read"]]]],["if",[["js-global",["wat-string","isNaN"]],"n"],["progn",["print",["wat-string","You didn't enter a number. Please try again."]],["return-from","continue"]],["invoke-restart-interactively",["list-elt","restarts","n"]]]]]],["%%panic","condition"]]]]]],["defun","print-stacktrace",[],["labels",[["print-frame",["k"],["when",[["js-getter",["wat-string","dbg_info"]],"k"],["prin1",[["js-getter",["wat-string","expr"]],[["js-getter",["wat-string","dbg_info"]],"k"]]]],["when",[["js-getter",["wat-string","inner"]],"k"],["print-frame",[["js-getter",["wat-string","inner"]],"k"]]]]],["take-subcont","+user-prompt+","k",["print-frame","k"],["push-prompt","+user-prompt+",["push-subcont","k"]]]]],null,["def",["qua-function","node:require"],["js-global",["wat-string","require"]]],null,["defstruct","browser-stream","id"],["def","-browser-stream-counter-",-1],["defun","make-browser-stream",[],["make-instance",["quote","browser-stream"],["qua-keyword","id"],["incf","-browser-stream-counter-"]]],["defmethod","read-string-from-stream",[["stream","browser-stream"]],["repl-read-string",[["js-getter",["wat-string","id"]],"stream"]]],["defmethod","write-string-to-stream",[["stream","browser-stream"],"string"],["log","string"]],null,["defconstant","+default-browser-stream+",["make-browser-stream"]],["defun","%arch-standard-input",[],"+default-browser-stream+"],["defun","%arch-standard-output",[],"+default-browser-stream+"],null,["defun","repl-read-string",["repl-id"],["ensure-repl","repl-id"],["take-subcont","+user-prompt+","k",["def","elem",["get-element-by-id",["repl-element-id","repl-id"]]],["setf",[["js-getter",["wat-string","qua-continuation"]],"elem"],"k"]]],["defun","ensure-repl",["repl-id"],["def","elem",["get-element-by-id",["repl-element-id","repl-id"]]],["when",["eql",0,[["js-getter",["wat-string","length"]],[["js-getter",["wat-string","children"]],"elem"]]],["def","printout",["create-element",["wat-string","div"]]],["def","input",["create-element",["wat-string","input"]]],[["js-invoker",["wat-string","appendChild"]],"elem","input"],["def","button",["create-element",["wat-string","button"]]],[["js-invoker",["wat-string","addEventListener"]],"button",["wat-string","click"],["js-lambda","#ign",["push-prompt-subcont","+user-prompt+",[["js-getter",["wat-string","qua-continuation"]],"elem"],["prog1",[["js-getter",["wat-string","value"]],"input"],["setf",[["js-getter",["wat-string","value"]],"input"],["wat-string",""]],[["js-invoker",["wat-string","focus"]],"input"]]]]],[["js-invoker",["wat-string","appendChild"]],"button",["create-text-node",["wat-string","eval"]]],[["js-invoker",["wat-string","appendChild"]],"elem","button"]]],["defun","get-element-by-id",["id"],["the","string","id"],[["js-invoker",["wat-string","getElementById"]],["js-global",["wat-string","document"]],"id"]],["defun","create-element",["tag"],["the","string","tag"],[["js-invoker",["wat-string","createElement"]],["js-global",["wat-string","document"]],"tag"]],["defun","create-text-node",["text"],["the","string","text"],[["js-invoker",["wat-string","createTextNode"]],["js-global",["wat-string","document"]],"text"]],["defun","repl-element-id",["repl-id"],["+",["wat-string","qua-repl-"],"repl-id"]],["defun","repl-write-string",["repl-id","string"],["log","string"]],null,null]
},{}],3:[function(require,module,exports){
// Copyright (C) 2007 Chris Double.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// DEVELOPERS AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

var jsparse;
try {
    jsparse = exports;
} catch(e) {
    jsparse = {};
}

jsparse.foldl = function foldl(f, initial, seq) {
    for(var i=0; i< seq.length; ++i)
        initial = f(initial, seq[i]);
    return initial;
}

jsparse.memoize = true;

jsparse.ParseState = (function() {
    function ParseState(input, index) {
        this.input = input;
        this.index = index || 0;
        this.length = input.length - this.index;
        this.cache = { };
        return this;
    }

    ParseState.prototype.from = function(index) {
        var r = new ParseState(this.input, this.index + index);
        r.cache = this.cache;
        r.length = this.length - index;
        return r;
    }

    ParseState.prototype.substring = function(start, end) {
        return this.input.substring(start + this.index, (end || this.length) + this.index);
    }

    ParseState.prototype.trimLeft = function() {
        var s = this.substring(0);
        var m = s.match(/^\s+/);
        return m ? this.from(m[0].length) : this;
    }

    ParseState.prototype.at = function(index) {
        return this.input.charAt(this.index + index);
    }

    ParseState.prototype.toString = function() {
        return 'PS"' + this.substring(0) + '"';
    }

    ParseState.prototype.getCached = function(pid) {
        if(!jsparse.memoize)
            return false;

        var p = this.cache[pid];
        if(p)
            return p[this.index];
        else
            return false;
    }

    ParseState.prototype.putCached = function(pid, cached) {
        if(!jsparse.memoize)
            return false;

        var p = this.cache[pid];
        if(p)
            p[this.index] = cached;
        else {
            p = this.cache[pid] = { };
            p[this.index] = cached;
        }
    }
    return ParseState;
})()

jsparse.ps = function ps(str) {
    return new jsparse.ParseState(str);
}

// 'r' is the remaining string to be parsed.
// 'matched' is the portion of the string that
// was successfully matched by the parser.
// 'ast' is the AST returned by the successfull parse.
jsparse.make_result = function make_result(r, matched, ast) {
    return { remaining: r, matched: matched, ast: ast };
}

jsparse.parser_id = 0;

// 'token' is a parser combinator that given a string, returns a parser
// that parses that string value. The AST contains the string that was parsed.
jsparse.token = function token(s) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var r = state.length >= s.length && state.substring(0,s.length) == s;
        if(r)
            cached = { remaining: state.from(s.length), matched: s, ast: s };
        else
            cached = false;
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Like 'token' but for a single character. Returns a parser that given a string
// containing a single character, parses that character value.
jsparse.ch = function ch(c) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        var r = state.length >= 1 && state.at(0) == c;
        if(r)
            cached = { remaining: state.from(1), matched: c, ast: c };
        else
            cached = false;
        savedState.putCached(pid, cached);
        return cached;
    };
}

// 'range' is a parser combinator that returns a single character parser
// (similar to 'ch'). It parses single characters that are in the inclusive
// range of the 'lower' and 'upper' bounds ("a" to "z" for example).
jsparse.range = function range(lower, upper) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        if(state.length < 1)
            cached = false;
        else {
            var ch = state.at(0);
            if(ch >= lower && ch <= upper)
                cached = { remaining: state.from(1), matched: ch, ast: ch };
            else
                cached = false;
        }
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Helper function to convert string literals to token parsers
// and perform other implicit parser conversions.
jsparse.toParser = function toParser(p) {
    return (typeof(p) == "string") ? jsparse.token(p) : p;
}

// Parser combinator that returns a parser that
// skips whitespace before applying parser.
jsparse.whitespace = function whitespace(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        cached = p(state.trimLeft());
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Parser combinator that passes the AST generated from the parser 'p'
// to the function 'f'. The result of 'f' is used as the AST in the result.
jsparse.action = function action(p, f) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var x = p(state);
        if(x) {
            x.ast = f(x.ast);
            cached = x;
        }
        else {
            cached = false;
        }
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Given a parser that produces an array as an ast, returns a
// parser that produces an ast with the array joined by a separator.
jsparse.join_action = function join_action(p, sep) {
    return jsparse.action(p, function(ast) { return ast.join(sep); });
}

// Given an ast of the form [ Expression, [ a, b, ...] ], convert to
// [ [ [ Expression [ a ] ] b ] ... ]
// This is used for handling left recursive entries in the grammar. e.g.
// MemberExpression:
//   PrimaryExpression
//   FunctionExpression
//   MemberExpression [ Expression ]
//   MemberExpression . Identifier
//   new MemberExpression Arguments
jsparse.left_factor = function left_factor(ast) {
    return jsparse.foldl(function(v, action) {
                     return [ v, action ];
                 },
                 ast[0],
                 ast[1]);
}

// Return a parser that left factors the ast result of the original
// parser.
jsparse.left_factor_action = function left_factor_action(p) {
    return jsparse.action(p, jsparse.left_factor);
}

// 'negate' will negate a single character parser. So given 'ch("a")' it will successfully
// parse any character except for 'a'. Or 'negate(range("a", "z"))' will successfully parse
// anything except the lowercase characters a-z.
jsparse.negate = function negate(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        if(state.length >= 1) {
            var r = p(state);
            if(!r)
                cached =  jsparse.make_result(state.from(1), state.at(0), state.at(0));
            else
                cached = false;
        }
        else {
            cached = false;
        }
        savedState.putCached(pid, cached);
        return cached;
    };
}

// 'end' is a parser that is successful if the input string is empty (ie. end of parse).
jsparse.end = function end(state) {
    if(state.length == 0)
        return jsparse.make_result(state, undefined, undefined);
    else
        return false;
}
jsparse.end_p = jsparse.end;

// 'nothing' is a parser that always fails.
jsparse.nothing = function nothing(state) {
    return false;
}
jsparse.nothing_p = jsparse.nothing;

// 'sequence' is a parser combinator that processes a number of parsers in sequence.
// It can take any number of arguments, each one being a parser. The parser that 'sequence'
// returns succeeds if all the parsers in the sequence succeeds. It fails if any of them fail.
jsparse.sequence = function sequence() {
    var parsers = [];
    for(var i = 0; i < arguments.length; ++i)
        parsers.push(jsparse.toParser(arguments[i]));
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached) {
            return cached;
        }

        var ast = [];
        var matched = "";
        var i;
        for(i=0; i< parsers.length; ++i) {
            var parser = parsers[i];
            var result = parser(state);
            if(result) {
                state = result.remaining;
                if(result.ast != undefined) {
                    ast.push(result.ast);
                    matched = matched + result.matched;
                }
            }
            else {
                break;
            }
        }
        if(i == parsers.length) {
            cached = jsparse.make_result(state, matched, ast);
        }
        else
            cached = false;
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Like sequence, but ignores whitespace between individual parsers.
jsparse.wsequence = function wsequence() {
    var parsers = [];
    for(var i=0; i < arguments.length; ++i) {
        parsers.push(jsparse.whitespace(jsparse.toParser(arguments[i])));
    }
    return jsparse.sequence.apply(null, parsers);
}

// 'choice' is a parser combinator that provides a choice between other parsers.
// It takes any number of parsers as arguments and returns a parser that will try
// each of the given parsers in order. The first one that succeeds results in a
// successfull parse. It fails if all parsers fail.
jsparse.choice = function choice() {
    var parsers = [];
    for(var i = 0; i < arguments.length; ++i)
        parsers.push(jsparse.toParser(arguments[i]));
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached) {
            return cached;
        }
        var i;
        for(i=0; i< parsers.length; ++i) {
            var parser=parsers[i];
            var result = parser(state);
            if(result) {
                break;
            }
        }
        if(i == parsers.length)
            cached = false;
        else
            cached = result;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// 'butnot' is a parser combinator that takes two parsers, 'p1' and 'p2'.
// It returns a parser that succeeds if 'p1' matches and 'p2' does not, or
// 'p1' matches and the matched text is longer that p2's.
// Useful for things like: butnot(IdentifierName, ReservedWord)
jsparse.butnot = function butnot(p1,p2) {
    var p1 = jsparse.toParser(p1);
    var p2 = jsparse.toParser(p2);
    var pid = jsparse.parser_id++;

    // match a but not b. if both match and b's matched text is shorter
    // than a's, a failed match is made
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var br = p2(state);
        if(!br) {
            cached = p1(state);
        } else {
            var ar = p1(state);

            if (ar) {
              if(ar.matched.length > br.matched.length)
                  cached = ar;
              else
                  cached = false;
            }
            else {
              cached = false;
            }
        }
        savedState.putCached(pid, cached);
        return cached;
    }
}

// 'difference' is a parser combinator that takes two parsers, 'p1' and 'p2'.
// It returns a parser that succeeds if 'p1' matches and 'p2' does not. If
// both match then if p2's matched text is shorter than p1's it is successfull.
jsparse.difference = function difference(p1,p2) {
    var p1 = jsparse.toParser(p1);
    var p2 = jsparse.toParser(p2);
    var pid = jsparse.parser_id++;

    // match a but not b. if both match and b's matched text is shorter
    // than a's, a successfull match is made
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var br = p2(state);
        if(!br) {
            cached = p1(state);
        } else {
            var ar = p1(state);
            if(ar.matched.length >= br.matched.length)
                cached = br;
            else
                cached = ar;
        }
        savedState.putCached(pid, cached);
        return cached;
    }
}


// 'xor' is a parser combinator that takes two parsers, 'p1' and 'p2'.
// It returns a parser that succeeds if 'p1' or 'p2' match but fails if
// they both match.
jsparse.xor = function xor(p1, p2) {
    var p1 = jsparse.toParser(p1);
    var p2 = jsparse.toParser(p2);
    var pid = jsparse.parser_id++;

    // match a or b but not both
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var ar = p1(state);
        var br = p2(state);
        if(ar && br)
            cached = false;
        else
            cached = ar || br;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that takes one parser. It returns a parser that
// looks for zero or more matches of the original parser.
jsparse.repeat0 = function repeat0(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;

    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached) {
            return cached;
        }

        var ast = [];
        var matched = "";
        var result;
        while(result = p(state)) {
            ast.push(result.ast);
            matched = matched + result.matched;
            if(result.remaining.index == state.index)
                break;
            state = result.remaining;
        }
        cached = jsparse.make_result(state, matched, ast);
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that takes one parser. It returns a parser that
// looks for one or more matches of the original parser.
jsparse.repeat1 = function repeat1(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;

    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var ast = [];
        var matched = "";
        var result= p(state);
        if(!result)
            cached = false;
        else {
            while(result) {
                ast.push(result.ast);
                matched = matched + result.matched;
                if(result.remaining.index == state.index)
                    break;
                state = result.remaining;
                result = p(state);
            }
            cached = jsparse.make_result(state, matched, ast);
        }
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that takes one parser. It returns a parser that
// matches zero or one matches of the original parser.
jsparse.optional = function optional(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        var r = p(state);
        cached = r || jsparse.make_result(state, "", false);
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that ensures that the given parser succeeds but
// ignores its result. This can be useful for parsing literals that you
// don't want to appear in the ast. eg:
// sequence(expect("("), Number, expect(")")) => ast: Number
jsparse.expect = function expect(p) {
    return jsparse.action(p, function(ast) { return undefined; });
}

jsparse.chain = function chain(p, s, f) {
    var p = jsparse.toParser(p);

    return jsparse.action(jsparse.sequence(p, jsparse.repeat0(jsparse.action(jsparse.sequence(s, p), f))),
                  function(ast) { return [ast[0]].concat(ast[1]); });
}

// A parser combinator to do left chaining and evaluation. Like 'chain', it expects a parser
// for an item and for a seperator. The seperator parser's AST result should be a function
// of the form: function(lhs,rhs) { return x; }
// Where 'x' is the result of applying some operation to the lhs and rhs AST's from the item
// parser.
jsparse.chainl = function chainl(p, s) {
    var p = jsparse.toParser(p);
    return jsparse.action(jsparse.sequence(p, jsparse.repeat0(jsparse.sequence(s, p))),
                  function(ast) {
                      return jsparse.foldl(function(v, action) { return action[0](v, action[1]); }, ast[0], ast[1]);
                  });
}

// A parser combinator that returns a parser that matches lists of things. The parser to
// match the list item and the parser to match the seperator need to
// be provided. The AST is the array of matched items.
jsparse.list = function list(p, s) {
    return jsparse.chain(p, s, function(ast) { return ast[1]; });
}

// Like list, but ignores whitespace between individual parsers.
jsparse.wlist = function wlist() {
    var parsers = [];
    for(var i=0; i < arguments.length; ++i) {
        parsers.push(jsparse.whitespace(arguments[i]));
    }
    return jsparse.list.apply(null, parsers);
}

// A parser that always returns a zero length match
jsparse.epsilon_p = function epsilon_p(state) {
    return jsparse.make_result(state, "", undefined);
}

// Allows attaching of a function anywhere in the grammer. If the function returns
// true then parse succeeds otherwise it fails. Can be used for testing if a symbol
// is in the symbol table, etc.
jsparse.semantic = function semantic(f) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        cached = f() ? jsparse.make_result(state, "", undefined) : false;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// The and predicate asserts that a certain conditional
// syntax is satisfied before evaluating another production. Eg:
// sequence(and("0"), oct_p)
// (if a leading zero, then parse octal)
// It succeeds if 'p' succeeds and fails if 'p' fails. It never
// consume any input however, and doesn't put anything in the resulting
// AST.
jsparse.and = function and(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        var r = p(state);
        cached = r ? jsparse.make_result(state, "", undefined) : false;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// The opposite of 'and'. It fails if 'p' succeeds and succeeds if
// 'p' fails. It never consumes any input. This combined with 'and' can
// be used for 'lookahead' and disambiguation of cases.
//
// Compare:
// sequence("a",choice("+","++"),"b")
//   parses a+b
//   but not a++b because the + matches the first part and peg's don't
//   backtrack to other choice options if they succeed but later things fail.
//
// sequence("a",choice(sequence("+", not("+")),"++"),"b")
//    parses a+b
//    parses a++b
//
jsparse.not = function not(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        cached = p(state) ? false : jsparse.make_result(state, "", undefined);
        savedState.putCached(pid, cached);
        return cached;
    }
}


// For ease of use, it's sometimes nice to be able to not have to prefix all
// of the jsparse functions with `jsparse.` and since the original version of
// this library put everything in the toplevel namespace, this makes it easy
// to use this version with old code.
//
// The only caveat there is that changing `memoize` MUST be done on
// jsparse.memoize
//
// Typical usage:
//   jsparse.inject_into(window)
//
jsparse.inject_into = function inject_into(into) {
    for (var key in jsparse) {
        if (typeof jsparse[key] === 'function') {
            into[key] = jsparse[key];
        }
    }
}


},{}],4:[function(require,module,exports){
// Browser-specific code.  The package.json's browser field contains a
// mapping so that this gets used instead of arch.js if we're doing a
// browser build.
module.exports = function(vm, init_env) {
    // Here we could do browser-specific exports to Lisp.
};

},{}],5:[function(require,module,exports){
// This is the main Qua file, that pulls together all components and
// creates a user environment in which Qua code can be evaluated.
var qua = module.exports;

// The boot bytecode is the precompiled version of the
// `bootstrap.lisp' file plus either `arch.lisp' or
// `arch-browser.lisp' depending on whether we run in Node or are
// doing a browser build.
var boot_bytecode = require("../build/out/bootstrap.json");

qua.vm = function() {
    // VM initialization: The `vm.init' function from the file `vm.js'
    // performs the major part of initialization: it populates a fresh
    // environment, called the init environment, with primitive bindings.
    var vm = require("./vm.js");
    vm.init();
    
    // Once that is done, we run some "plug-in" files, each of which
    // receives the VM module, and the created init environment, and can
    // add new primitive functionality to both.  Most of these are
    // plug-ins simply to keep the `vm.js' file a bit leaner and more
    // readable.  The only files where this is really required are the
    // `arch.js'/`arch-browser.js' files that get used depending on what
    // architecture we're building for with some Browserify magic in
    // `package.json'.
    require("./read.js")(vm, vm.init_env);  // S-Expression Parser
    require("./print.js")(vm, vm.init_env); // (Not Yet) Pretty Printer
    require("./arch.js")(vm, vm.init_env);  // Architecture-Specific Code
    
    // Add some convenient API functions
    vm.eval_sexp = function(x, e) {
        return vm.evaluate(e ? e : vm.init_env, x);
    };
    vm.eval_string = function(s, e) {
        return vm.eval_sexp(vm.parse_forms_progn(s), e);
    };
    vm.eval_bytecode = function(c, e) {
        return vm.eval_sexp(vm.parse_bytecode(c), e);
    };

    // Finally, we run the Lisp boot bytecode, i.e. the preparsed Lisp
    // code from the file `bootstrap.lisp', that sets up the
    // user-level language.
    vm.time("run boot bytecode",
            function() {
		vm.eval_bytecode(boot_bytecode);
	    });
    
    return vm;
};

},{"../build/out/bootstrap.json":2,"./arch.js":4,"./print.js":6,"./read.js":7,"./vm.js":8}],6:[function(require,module,exports){
module.exports = function(vm, init_env) {
    vm.PRINT_ESCAPE = vm.make_dynamic(true);
    vm.unreadable_object_to_string = function(object) {
        var c = vm.class_of(object);
        var class_name = c.class_name || c.name; // FIXME: why?
        return "#[" + class_name + " " + object + "]";
    };
    vm.object_to_string = function(object) {
        switch(typeof(object)) {
        case "string":
            if (vm.dynamic(vm.PRINT_ESCAPE)) {
                return JSON.stringify(object);
            } else {
                return object;
            }
        case "number":
            return String(object);
        default:
            if (object && object.qua_to_string) {
                return object.qua_to_string(object);
            } else {
                return vm.unreadable_object_to_string(object);
            }
        }
    };
    vm.Sym.prototype.qua_to_string = function(sym) {
        switch(sym.ns) {
        case vm.VAR_NS: return sym.name;
        case vm.FUN_NS: return "#'" + sym.name;
        default: return vm.sym_key(sym);
        }
    };
    vm.Prim.prototype.qua_to_string = function(prim) {
        return "#[primitive " + prim.name + "]";
    };
    vm.Cons.prototype.qua_to_string = function(cons) {
        return "(" + vm.cons_to_string(cons) + ")"
    };
    vm.cons_to_string = function (c) {
        if (vm.cdr(c) === vm.NIL) {
            return vm.object_to_string(vm.car(c));
        } else if (vm.cdr(c) instanceof vm.Cons) {
            return vm.object_to_string(vm.car(c)) + " " + vm.cons_to_string(vm.cdr(c));
        } else {
            return vm.object_to_string(vm.car(c)) + " . " + vm.object_to_string(vm.cdr(c));
        }
    };
    vm.def(vm.init_env, "%%*print-escape*", vm.PRINT_ESCAPE);
    vm.defun(vm.init_env, "%%object-to-string", vm.jswrap(vm.object_to_string));
};

},{}],7:[function(require,module,exports){
var jsparse = require("jsparse");
module.exports = function(vm, init_env) {
    vm.parse_bytecode = function(obj) {
        switch(Object.prototype.toString.call(obj)) {
        case "[object String]": 
            switch(obj) {
            case "#ign": return vm.IGN;
            case "#void": return vm.VOID;
            default: return vm.sym(obj);
            }
        case "[object Array]": return vm.parse_bytecode_array(obj);
        default: return obj;
        }
    };
    vm.parse_bytecode_array = function(arr) {
        if ((arr.length == 2) && arr[0] === "wat-string") { return arr[1]; }
        if ((arr.length == 2) && arr[0] === "qua-function") { return vm.fun_sym(arr[1]); }
        if ((arr.length == 2) && arr[0] === "qua-keyword") { return vm.keyword(arr[1]); }
        var i = arr.indexOf(".");
        if (i === -1) return vm.array_to_list(arr.map(vm.parse_bytecode));
        else { var front = arr.slice(0, i);
               return vm.array_to_list(front.map(vm.parse_bytecode), vm.parse_bytecode(arr[i + 1])); }
    };
    vm.parse_forms = function (string) {
	return vm.parse_bytecode(parse_sexp(string));
    };
    vm.parse_forms_progn = function (string) {
        return vm.parse_bytecode(parse_sexp_progn(string));
    };
    vm.defun(init_env, "%%parse-forms", vm.jswrap(vm.parse_forms));
};

module.exports.parse_sexp = parse_sexp;

module.exports.parse_sexp_progn = parse_sexp_progn;

function parse_sexp_progn(string) {
    return ["%%progn"].concat(parse_sexp(string));
}

var ps = jsparse.ps; var choice = jsparse.choice; var range = jsparse.range; var action = jsparse.action; var sequence = jsparse.sequence; var join = jsparse.join; var join_action = jsparse.join_action; var negate = jsparse.negate; var repeat0 = jsparse.repeat0; var optional = jsparse.optional; var repeat1 = jsparse.repeat1; var wsequence = jsparse.wsequence; var whitespace = jsparse.whitespace; var ch = jsparse.ch; var butnot = jsparse.butnot;

/* S-expr parser */
function parse_sexp(s) {
    var res = program_stx(ps(s));
    if (res.remaining.index === s.length) return res.ast;
    else throw("parse error at " + res.remaining.index + " in " + s); }
var x_stx = function(input) { return x_stx(input); }; // forward decl.
var id_special_char =
    choice(":", ",", "-", "&", "!", "=", ">", "<", "%", "+", "?", "/", "*", "$", "_", "#", ".", "@", "|", "~", "^", "'");
var id_char = choice(range("a", "z"), range("A", "Z"), range("0", "9"), id_special_char);
// Kludge: don't allow single dot as id, so as not to conflict with dotted pair stx.
var id_stx = action(join_action(butnot(repeat1(id_char), "."), ""), handle_identifier);
var keyword_stx = action(sequence(":", id_stx), function(ast) {
        return ["qua-keyword", ast[1]];
    });
function handle_identifier(str) {
    if ((str[0] === ".") && (str.length > 1)) { return ["js-getter", ["wat-string", str.substring(1)]]; }
    else if (str[0] === "@") { return ["js-invoker", ["wat-string", str.substring(1)]]; }
    else if (str[0] === "$") { return ["js-global", ["wat-string", str.substring(1)]]; }
    else if (str.startsWith("#'")) { return ["qua-function", str.substring(2)]; }
    else return str; }
var escape_char = choice("\"", "\\", "n", "r", "t", "0");
var escape_sequence = action(sequence("\\", escape_char), function (ast) {
    switch(ast[1]) {
    case "n": return "\n";
    case "r": return "\r";
    case "t": return "\t";
    case "0": return "\0";
    default: return ast[1]; }});
var line_terminator = choice(ch("\r"), ch("\n"));
var string_char = choice(escape_sequence, line_terminator, negate("\""));
var string_stx = action(sequence("\"", join_action(repeat0(string_char), ""), "\""),
                        function (ast) { return ["wat-string", ast[1]]; });
var digits = join_action(repeat1(range("0", "9")), "");
var number_stx =
    action(sequence(optional(choice("+", "-")), digits, optional(join_action(sequence(".", digits), ""))),
           function (ast) {
               var sign = ast[0] ? ast[0] : "";
               var integral_digits = ast[1]; 
               var fractional_digits = ast[2] || "";
               return Number(sign + integral_digits + fractional_digits); });
function make_constant_stx(string, constant) { return action(string, function(ast) { return constant; }); }
var nil_stx = make_constant_stx("()", []);
var nil_stx_2 = make_constant_stx("#nil", []);
var ign_stx = make_constant_stx("#ign", "#ign");
var void_stx = make_constant_stx("#void", "#void");
var t_stx = make_constant_stx("#t", true);
var f_stx = make_constant_stx("#f", false);
var null_stx = make_constant_stx("#null", null);
var undef_stx = make_constant_stx("#undefined", undefined);
var dot_stx = action(wsequence(".", x_stx), function (ast) { return ast[1]; });
var compound_stx = action(wsequence("(", repeat1(x_stx), optional(dot_stx), ")"),
                          function(ast) {
                              var exprs = ast[1];
                              var end = ast[2] ? [".", ast[2]] : [];
                              return exprs.concat(end); });
var quote_stx = action(sequence("'", x_stx), function(ast) { return ["quote", ast[1]]; });
var cmt_stx = action(sequence(";", repeat0(negate(line_terminator)), optional(line_terminator)), nothing_action);
var whitespace_stx = action(choice(" ", "\n", "\r", "\t"), nothing_action);
function nothing_action(ast) { return null; } // HACK!
var x_stx = whitespace(choice(ign_stx, void_stx, nil_stx, nil_stx_2, t_stx, f_stx, null_stx, undef_stx, number_stx,
                              quote_stx, compound_stx, keyword_stx, id_stx, string_stx, cmt_stx));
var program_stx = whitespace(repeat0(choice(x_stx, whitespace_stx))); // HACK!

},{"jsparse":3}],8:[function(require,module,exports){
(function (global){
///// QUA
// Interpreter core
var vm = module.exports;
/* Symbols */
vm.Sym = function Sym(name, ns) {
    this.name = name;
    this.ns = ns;
};
vm.VAR_NS = "variable";
vm.FUN_NS = "function";
vm.TYPE_NS = "type";
vm.KWD_NS = "keyword";
vm.sym = function(name, ns) { var s = new vm.Sym(name, ns ? ns : vm.VAR_NS); return s; };
vm.sym_key = function(sym) { return sym.ns + ":" + sym.name; };
vm.sym_name = function(sym) { return vm.assert_type(sym, vm.Sym).name; };
vm.fun_sym = function(name) { return vm.sym(name, vm.FUN_NS); };
vm.type_sym = function(name) { return vm.sym(name, vm.TYPE_NS); };
vm.to_fun_sym = function(sym) { return vm.fun_sym(vm.assert_type(sym, vm.Sym).name); };
vm.to_type_sym = function(sym) { return vm.type_sym(vm.assert_type(sym, vm.Sym).name); };
vm.keyword = function(name) { return vm.sym(name, vm.KWD_NS); };
/* Lists */
vm.Cons = function Cons(car, cdr) {
    this.car = car;
    this.cdr = cdr;
};
vm.Nil = function Nil() {}; vm.NIL = new vm.Nil();
vm.cons = function cons(car, cdr) { var c = new vm.Cons(car, cdr); return c; }
vm.car = function(cons) { return vm.assert_type(cons, vm.Cons).car; };
vm.cdr = function(cons) { return vm.assert_type(cons, vm.Cons).cdr; };
vm.elt = function(cons, i) { return (i === 0) ? vm.car(cons) : vm.elt(vm.cdr(cons), i - 1); };
vm.is_nil = function(obj) { return obj === vm.NIL; };
/* Add'l forms */
vm.Ign = function Ign() {}; vm.IGN = new vm.Ign();
vm.Void = function Void() {}; vm.VOID = new vm.Void();
/* Evaluation */
vm.evaluate = function(e, x) {
    if (x && x.qua_evaluate) {
        return vm.trap_exceptions(function() { return x.qua_evaluate(x, e); });
    } else {
        return x;
    }
};
vm.Sym.prototype.qua_evaluate = function(self, e) {
    if (self.ns === vm.KWD_NS) {
	return self;
    } else {
	return vm.lookup(e, self);
    }
};
vm.Cons.prototype.qua_evaluate = function(self, e) {
    return vm.monadic(function() { return vm.eval_operator(e, vm.car(self)); },
                      function(cmb) { return vm.combine(e, cmb, vm.cdr(self)); },
		      dbg_info(e, self));
};
vm.eval_operator = function(e, op) {
    if (op instanceof vm.Sym) {
        return vm.lookup(e, vm.to_fun_sym(op));
    } else {
        return vm.evaluate(e, op);
    }
};
/* Combiners */
vm.combine = function(e, cmb, o) {
    if (cmb && cmb.qua_combine) {
        return vm.trap_exceptions(function() { return cmb.qua_combine(cmb, e, o); });
    } else if (cmb instanceof Function) {
	// make JS functions transparently usable like Lisp functions
	return vm.combine(e, vm.jswrap(cmb), o);
    } else {
        return vm.error("not a combiner: " + cmb);
    }
};
vm.Fexpr = function Fexpr(p, ep, x, e) {
    this.p = p;   // Parameter tree
    this.ep = ep; // Environment parameter
    this.x = x;   // Body expression
    this.e = e;   // Lexical definition environment
};
vm.Function = function(cmb) { this.cmb = cmb; };
vm.wrap = function(cmb) { return new vm.Function(cmb); };
vm.unwrap = function(fun) { return fun.cmb; };
vm.Fexpr.prototype.qua_combine = function(self, e, o) {
    var xe = vm.make_env(self.e);
    return vm.monadic(function() { return vm.bind(xe, self.p, o); },
                      function() {
                          return vm.monadic(function() { return vm.bind(xe, self.ep, e); },
                                            function() { return vm.evaluate(xe, self.x); },
					    dbg_info(e, self.x));
		      },
		      dbg_info(e, self));
};
vm.Function.prototype.qua_combine = function(self, e, o) {
    return vm.monadic(function() { return vm.eval_args(e, o, vm.NIL); },
                      function(args) { return vm.combine(e, self.cmb, args); },
		      dbg_info(e, self));
};
vm.eval_args = function(e, todo, done) {
    if (vm.is_nil(todo)) { return vm.reverse_list(done); }
    return vm.monadic(function() { return vm.evaluate(e, vm.car(todo)); },
                      function(arg) {
			  return vm.eval_args(e, vm.cdr(todo), vm.cons(arg, done));
		      });
};
/* Built-in combiners */
vm.Prim = function Prim(name, fn) {
    this.name = name;
    this.qua_combine = fn;
};
vm.prim = function(name, fn) { return new vm.Prim(name, fn); }
vm.Vau = vm.prim("%%vau", function(self, e, o) {
    var p = vm.elt(o, 0);
    var ep = vm.elt(o, 1);
    var x = vm.elt(o, 2);
    return new vm.Fexpr(p, ep, x, e);
});
vm.Def = vm.prim("%%def", function (self, e, o) {
    var lhs = vm.elt(o, 0);
    var rhs = vm.elt(o, 1);
    return vm.monadic(function() { return vm.evaluate(e, rhs); },
                      function(val) { return vm.bind(e, lhs, val, vm.do_def); },
		      dbg_info(e, self));
});
vm.Setq = vm.prim("%%setq", function (self, e, o) {
    var lhs = vm.elt(o, 0);
    var rhs = vm.elt(o, 1);
    return vm.monadic(function() { return vm.evaluate(e, rhs); },
                      function(val) { return vm.bind(e, lhs, val, vm.do_setq); },
		      dbg_info(e, self));
});
vm.Eval = vm.wrap(vm.prim("%%eval", function(self, e, o) {
    var x = vm.elt(o, 0);
    var e = vm.elt(o, 1);
    return vm.evaluate(e, x);
}));
vm.If = vm.prim("%%if", function(self, e, o) {
    return vm.monadic(function() { return vm.evaluate(e, vm.elt(o, 0)); },
                      function(test_result) {
                          return vm.evaluate(e, test_result ? vm.elt(o, 1) : vm.elt(o, 2));
                      },
		      dbg_info(e, self));
});
vm.Progn = vm.prim("%%progn", function(self, e, o) {
    if (vm.is_nil(o)) return vm.VOID; else return vm.progn(e, o);
});
vm.progn = function(e, xs) {
    return vm.monadic(function() { return vm.evaluate(e, vm.car(xs)); },
                      function(res) {
                          var cdr = vm.cdr(xs);
                          if (vm.is_nil(cdr)) return res; else return vm.progn(e, cdr);
                      },
		      dbg_info(e, vm.car(xs)));
};
/* Operator that calls JS function to do work */
vm.JSOperator = function(js_fn) { this.js_fn = js_fn; };
vm.JSOperator.prototype.qua_combine = function(self, e, o) {
    return vm.trap_exceptions(function() {
        return self.js_fn.apply(null, vm.list_to_array(o));
    });
};
vm.jswrap = function(js_fn) {
    if (typeof(js_fn) !== "function") { vm.error("not a function"); }
    return vm.wrap(new vm.JSOperator(js_fn)); };
/* Continuations */
// A continuation or stack frame is created in order to suspend
// (capture) a computation so that we can treat it as a data
// structure, and later resume (compose) it again and turn it back
// into control flow.  A stack frame consists of a work function, that
// restores the stack frame on resumption which is specially created
// by each distinct language primitive, and an inner suspended stack
// frame.  The innermost stack frame is always the one created by the
// %%TAKE-SUBCONT expression that effected the continuation capture.
function StackFrame(work_fun, inner, dbg_info) {
    // primitive-specific JS function that will be called to resume this frame
    this.work_fun = work_fun;
    // next stack frame or null for innermost %%TAKE-SUBCONT frame
    this.inner = inner;
    // attach some debugging info to this frame (not needed operationally)
    this.dbg_info = dbg_info;
};
function DbgInfo(env, expr) {
    this.env = env;   // lexical environment of stack frame
    this.expr = expr; // source form
};
function dbg_info(env, expr) { return new DbgInfo(env, expr); }
// A suspension is a helper object created for the capture of a
// continuation and passed from the inside out.  A %%TAKE-SUBCONT
// call will return a fresh suspension, and the outer caller will
// react specially to receiving such a suspension from the callee
// instead of an ordinary return value -- usually by pushing a
// stack frame with a primitive-specific work function onto the
// suspension, and itself returning the suspension to its caller.
// In other words, every language primitive knows how to reify
// itself as a (later resumable) stack frame in case an inner
// expression is suspended.  Eventually, the outer %%PUSH-PROMPT
// expression whose prompt matches the suspension's will call the
// suspension's handler function (i.e., the Lisp function supplied
// by the user to %%TAKE-SUBCONT that gets to determine what
// happens once we reach the prompt) with the continuation
// accumulated during the capture.
function Suspension(prompt, handler) {
    // capture up to this prompt (EQ)
    this.prompt = prompt;
    // call this handler with captured continuation once we reach prompt
    this.handler = handler;
    // continuation / outermost stack frame accumulated during unwind/capture
    this.k = null;
};
// During continuation capture, destructively push a new outer
// stack frame with a primitive-specific work function onto a
// suspension's continuation.
function suspendFrame(sus, work_fun, dbg_info) {
    sus.k = new StackFrame(work_fun, sus.k, dbg_info);
};
// During continuation resumption, call the primitive-specific
// work function of the outermost stack frame with the next inner
// frame, and the user-supplied "stimulus" function (F).  The next
// inner frame will do the same, until we reach the innermost
// stack frame, created by a %%TAKE-SUBCONT expression.  This
// innermost frame will call the stimulus function within the
// newly composed context and return its value, giving the user
// control over what happens once a continuation has been composed
// onto the current stack.
function resumeFrame(k, f) {
    return k.work_fun(k.inner, f);
};
// vm.monadic() is a basic building block for many language primitives
// that need to do two or more operations that may capture a
// continuation in sequence.  Examples are PROGN that needs to
// evaluate the first and then the rest of its body expressions, and
// IF that needs to evaluate the test expression before evaluating
// either the then or the else expression depending on the result of
// the test.  Looking at vm.monadic in details is instructive because
// it shows in a pure form the general protocol that language
// primitives have to honor in order to the able to suspend and resume
// themselves.  (Primitives like %%PUSH-PROMPT and %%RESCUE with more
// complex control flow requirements cannot use vm.monadic but follow
// this same protocol.)
//
// So, we have two thunks, A and B, that we want to call so that B
// receives the result of A(), i.e. B(A()).  We also have the two
// protocol parameters K (continuation, outermost stack frame) and
// F (stimulus function) which are only relevant and passed in if
// we are resuming a continuation.  (If we are not resuming they
// are undefined.)
vm.monadic = function(a, b, dbg_info, k, f) {
    // Caller passed in continuation?  This means we are resuming.
    // In other words, a previous call to A() led to a suspension
    // which we returned, and now the caller is passing in the
    // then-captured continuation again for resumption via
    // resumeFrame(k, f).
    if (k instanceof StackFrame) {
        // Resume into inner stack frames until exhausted, calling
        // stimulus function F in innermost context.  Here we are
        // reconstructing the control state of our previously
        // suspended inner expression A, ultimately giving control
        // to the caller as to what happens once the continuation
        // has been fully composed again onto the current stack.
        var val = resumeFrame(k, f);
    } else {
        // Otherwise, we are just normally executing,
        // so execute first expression/thunk.
        var val = a();
    }
    // Did the first expression suspend (lead to a %%TAKE-SUBCONT)?
    if (val instanceof Suspension) {
        // If it did, we suspend ourselves -- i.e. push an outer
        // stack frame onto to the already accumulated
        // continuation whose work function remembers what we were
        // doing prior to suspension and will restore us back to
        // this point when resumed.
	//
	// The work function closure remembers our parameters A
	// and B, and in effect will repeat the original, current
	// call to vm.monadic when the captured continuation is
	// resumed at a future point.
	var work_fun = function(k, f) {
	    return vm.monadic(a, b, dbg_info, k, f);
	};
        suspendFrame(val, work_fun, dbg_info);
        // Pass suspension back to caller.
        return val;
    } else {
        // First expression didn't suspend, we can just pass its
        // result to second expression.
        return b(val);
    }
};
/* Delimited control */
// %%PUSH-PROMPT prompt body-thunk => result
//
// Push a prompt and call the body thunk within this delimited
// context.
vm.PushPrompt = vm.wrap(vm.prim("%%push-prompt", function do_push_prompt(self, e, o, k, f) {
    var prompt = vm.elt(o, 0);
    var body_thunk = vm.elt(o, 1);
    if (k instanceof StackFrame) {
        var val = resumeFrame(k, f);
    } else {
        var val = vm.combine(e, body_thunk, vm.NIL);
    }
    if (val instanceof Suspension) {
	// Analyze the result of the body thunk and if it's a suspension,
	// check if it matches our, the pushed, prompt.  If it matches,
	// call the suspension's user-supplied handler function with the
	// continuation accumulated during the unwind from the originating
	// inner %%TAKE-SUBCONT.
        if (val.prompt === prompt) {
            var continuation = val.k;
            var handler = val.handler;
            return vm.combine(e, handler, vm.cons(continuation, vm.NIL));
        } else {
            suspendFrame(
		val,
		function(k, f) {
		    return do_push_prompt(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return val;
        }
    }
    return val;
}));
// %%TAKE-SUBCONT prompt handler
//
// Abort up to prompt and call handler with captured continuation.
vm.TakeSubcont = vm.wrap(vm.prim("%%take-subcont", function(self, e, o, k, f) {
    var prompt = vm.elt(o, 0);
    var handler = vm.elt(o, 1);
    // Inject a suspension that will lead to the call of the
    // user-supplied handler at the outer %%PUSH-PROMPT with matching
    // prompt.  The innermost stack frame's work function we define
    // will call the protocol parameter F, the user-supplied stimulus
    // function passed in during continuation resumption/composition,
    // thereby completing resumption and entering back into normal
    // evaluation.
    var sus = new Suspension(prompt, handler);
    suspendFrame(
	sus,
	function(k, f) {
	    // As final step of continuation resumption, call
	    // user-supplied stimulus function in innermost context.
	    return vm.combine(e, f, vm.NIL);
	},
	dbg_info(e, self)
    );
    return sus;
}));
// %%PUSH-SUBCONT k f
//
// Compose a delimited continuation onto the current stack and when
// done, call user-supplied thunk inside new context.
vm.PushSubcont = vm.wrap(vm.prim("%%push-subcont", function do_push_subcont(self, e, o, k, f) {
    var thek = vm.elt(o, 0);
    var thef = vm.elt(o, 1);
    if (k instanceof StackFrame) {
        var val = resumeFrame(k, f);
    } else {
	// Resume into a user-supplied continuation, calling the
	// "stimulus" thunk F within the newly established stack
	// context (this is accomplished by the innermost stack
	// frame's work function defined by %%TAKE-SUBCONT, which
	// ultimately calls the passed-in F).
        var val = resumeFrame(thek, thef);
    }
    if (val instanceof Suspension) {
        suspendFrame(
	    val,
	    function(k, f) {
		return do_push_subcont(self, e, o, k, f);
	    },
	    dbg_info(e, self)
	);
        return val;
    }
    return val;
}));
// %%PUSH-PROMPT-SUBCONT prompt k f
//
// Manually fused version of pushing a prompt and continuation in
// one fell swoop, to work around stack overflow issue for
// server-type apps, see Oleg's paper.
vm.PushPromptSubcont = vm.wrap(vm.prim("%%push-prompt-subcont", function do_push_prompt_subcont(self, e, o, k, f) {
    var prompt = vm.elt(o, 0);
    var thek = vm.elt(o, 1);
    var thef = vm.elt(o, 2);
    if (k instanceof StackFrame) {
        var val = resumeFrame(k, f);
    } else {
        var val = resumeFrame(thek, thef);
    }
    if (val instanceof Suspension) {
        if (val.prompt === prompt) {
            var continuation = val.k;
            var handler = val.handler;
            return vm.combine(e, handler, vm.cons(continuation, vm.NIL));
        } else {
            suspendFrame(
		val,
		function(k, f) {
		    return do_push_prompt_subcont(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return val;
        }
    }
    return val;
}));
/* Simple control */
// %%LOOP thunk
//
// Call thunk repeatedly.
vm.Loop = vm.wrap(vm.prim("%%loop", function do_loop(self, e, o, k, f) {
    var body = vm.elt(o, 0);
    var first = true; // only resume once
    while (true) {
        if (first && (k instanceof StackFrame)) {
            var val = resumeFrame(k, f);
        } else {
            var val = vm.combine(e, body, vm.NIL);
        }
        first = false;
        if (val instanceof Suspension) {
            suspendFrame(
		val,
		function(k, f) {
		    return do_loop(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return val;
        }
    }
}));
// %%RAISE obj
//
// Throw something as a JS exception.
vm.Raise = vm.jswrap(function(err) { throw err; });
// %%RESCUE handler-fun body-thunk
//
// Call HANDLER-FUN if a JS exception is thrown during BODY-THUNK
// (except VM panics, let those through so that user can't
// interfere with panicking).
vm.Rescue = vm.wrap(vm.prim("%%rescue", function do_rescue(self, e, o, k, f) {
    var handler = vm.elt(o, 0);
    var body = vm.elt(o, 1);
    try {
        if (k instanceof StackFrame) {
            var val = resumeFrame(k, f);
        } else {
            var val = vm.combine(e, body, vm.NIL);
        }
    } catch(exc) {
        if (exc instanceof vm.Panic) {
            throw exc;
        } else {
            var val = vm.combine(e, vm.unwrap(handler), vm.list(exc));
        }
    }
    if (val instanceof Suspension) {
        suspendFrame(
	    val,
	    function(k, f) {
		return do_rescue(self, e, o, k, f);
	    },
	    dbg_info(e, self)
	);
        return val;
    }
    return val;
}));
/* Dynamic Variables */
vm.DV = function DV(value) { this.val = value; }
vm.make_dynamic = function(initial_value) {
    return new vm.DV(initial_value);
};
vm.dynamic = function(dv) { return vm.assert_type(dv, vm.DV).val; };
// %%DYNAMIC-BIND dynvar new-val body-thunk
//
// Bind a single dynamic variable to a new value during the
// execution of a body thunk.
vm.DynamicBind = vm.wrap(vm.prim("%%dynamic-bind", function dynamic_bind(self, e, o, k, f) {
    var dynvar = vm.elt(o, 0);
    var val = vm.elt(o, 1);
    var thunk = vm.elt(o, 2);
    var oldVal = dynvar.val;
    dynvar.val = val;
    try {
        if (k instanceof StackFrame) {
            var res = resumeFrame(k, f);
        } else {
            var res = vm.combine(e, thunk, vm.NIL);
        }
        if (res instanceof Suspension) {
            suspendFrame(
		res,
		function(k, f) {
		    return dynamic_bind(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return res;
        } else {
            return res;
        }
    } finally {
        dynvar.val = oldVal;
    }
}));
/* Environments */
vm.Env = function Env(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
    this.parent = parent;
};
vm.make_env = function(parent) { return new vm.Env(parent); };
vm.lookup = function(e, sym, default_val) {
    vm.assert_type(e, vm.Env);
    vm.assert_type(sym, vm.Sym);
    var key = vm.sym_key(sym);
    if (key in e.bindings) return e.bindings[key];
    else if (default_val !== undefined) return default_val;
    else return vm.error("unbound " + sym.ns + ": " + sym.name);
};
vm.bind = function(e, lhs, rhs, doit) {
    vm.assert_type(e, vm.Env);
    if (lhs.qua_bind) return lhs.qua_bind(lhs, e, rhs, doit ? doit : vm.do_def);
    else return vm.error("cannot match", { lhs: lhs, rhs: rhs });
};
vm.do_def = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    e.bindings[vm.sym_key(lhs)] = rhs;
    return rhs;
};
vm.do_setq = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    if (vm.has_own_property(e.bindings, vm.sym_key(lhs)))
        return vm.do_def(e, lhs, rhs);
    else if (e.parent)
        return vm.do_setq(e.parent, lhs, rhs);
    else
        return vm.error("cannot set unbound variable: " + vm.sym_key(lhs));
};
vm.Sym.prototype.qua_bind = function(self, e, rhs, doit) {
    if (self.ns === vm.KWD_NS) {
	if (!(rhs && (rhs.ns === vm.KWD_NS) && (rhs.name === self.name))) {
            return vm.error(":" + self.name + " expected, but got: " + JSON.stringify(rhs));
	}
    } else {
	return doit(e, self, rhs);
    }
};
vm.Cons.prototype.qua_bind = function(self, e, rhs, doit) {
    return vm.monadic(function() { return vm.bind(e, vm.car(self), vm.car(rhs), doit); },
		      function() { return vm.bind(e, vm.cdr(self), vm.cdr(rhs), doit); },
		      dbg_info(e, self));
};
vm.Nil.prototype.qua_bind = function(self, e, rhs, doit) {
    if (!vm.is_nil(rhs)) return vm.error("NIL expected, but got: " + JSON.stringify(rhs));
};
vm.Ign.prototype.qua_bind = function(self, e, rhs, doit) {};
/* Object model */
vm.mangle_name = function(name) {
    return name.replace(/-/g, "_").replace(/%/g, "P");
};
vm.make_class = function(metaclass, name) {
    var c = eval("(function Qua_" + vm.mangle_name(name) + "(){})");
    c.qua_isa = metaclass;
    c.name = name;
    c.methods = Object.create(null);
    return c;
};
vm.allocate_instance = function(c) {
    var obj = new c();
    obj.qua_isa = c;
    return obj;
};
vm.make_instance = function(c, initargs) {
    var obj = vm.allocate_instance(c);
    for (name in initargs) {
        var value = initargs[name];
        obj[name] = value;
    }
    return obj;
};
vm.class_of = function(obj) {
    if (obj && obj.qua_isa) {
	return obj.qua_isa;
    } else {
	// generate pseudo-classes for JS built-ins
	return vm.synthetic_class_of(obj);
    }
};
vm.put_method = function(c, name, method) {
    c.methods[name] = method;
};
vm.send_message = function(rcv, msg, args) { // args has to include rcv as first elt
    return vm.monadic(
	function() {
	    var c = vm.class_of(rcv);
	    var metaclass = vm.class_of(c);
	    if (metaclass === vm.STR_CLS) {
		return vm.builtin_lookup(rcv, msg);
	    } else {
		return vm.send_message(c, "compute-method",
				       vm.list(c, rcv, msg, args));
	    }
	},
	function(method) {
	    return vm.combine(vm.make_env(), vm.unwrap(method), args);
	}
    );
};
vm.builtin_lookup = function(rcv, msg) {
    vm.assert_type(msg, "string");
    var c = vm.class_of(rcv);
    if (c.methods[msg]) {
	return c.methods[msg];
    } else if (vm.OBJ.methods[msg]) {
	return vm.OBJ.methods[msg];
    } else {
	return vm.error("builtin lookup failed: " + msg);
    }
};
/* Slots */
vm.slot_key = function(name) { return name; };
vm.slot_value = function(obj, name) {
    var key = vm.slot_key(name);
    if (vm.has_own_property(obj, key)) {
        return obj[key];
    } else {
        return vm.slot_unbound_hook(obj, name);
    }
};
vm.set_slot_value = function(obj, name, value) {
    var key = vm.slot_key(name);
    try {
        obj[key] = value;
        return value;
    } catch(exc) {
        return vm.set_slot_value_error_hook(obj, name, value, exc);
    };
};
vm.slot_bound_p = function(obj, name) {
    var key = vm.slot_key(name);
    return vm.has_own_property(obj, name);
};
vm.slot_unbound_hook = function(obj, name) {
    return vm.error("slot unbound: " + name);
};
/* Utilities */
vm.list = function() {
    return vm.array_to_list(Array.prototype.slice.call(arguments));
};
vm.array_to_list = function(array, end) {
    var c = end ? end : vm.NIL;
    for (var i = array.length; i > 0; i--) c = vm.cons(array[i - 1], c); return c;
};
vm.list_to_array = function(c) {
    var res = []; while(!vm.is_nil(c)) { res.push(vm.car(c)); c = vm.cdr(c); } return res;
};
vm.reverse_list = function(list) {
    var res = vm.NIL;
    while(!vm.is_nil(list)) { res = vm.cons(vm.car(list), res); list = vm.cdr(list); }
    return res;
};
vm.is_list = function(obj) {
    return vm.is_nil(obj) || obj instanceof vm.Cons;
};
vm.list_star = function() {
    var len = arguments.length; var c = len >= 1 ? arguments[len-1] : vm.NIL;
    for (var i = len-1; i > 0; i--) c = vm.cons(arguments[i - 1], c); return c;
};
vm.plist_to_js_object = function(plist, obj) {
    obj = (obj !== undefined) ? obj : Object.create(null);
    if (plist === vm.NIL) {
        return obj;
    } else {
        var name = vm.assert_type(vm.elt(plist, 0), vm.Sym);
        var value = vm.elt(plist, 1);
        obj[name.name] = value;
        return vm.plist_to_js_object(vm.cdr(vm.cdr(plist)), obj);
    }
};
/* Exception handling and nonlocal exits */
// Instances of this class are thrown as JS exceptions to transfer a
// value from a RETURN-FROM expression to its enclosing BLOCK.
vm.Tag = function Tag(id, val) {
    this.id = id;
    this.val = val;
};
vm.trap_exceptions = function(thunk) {
    try {
        return thunk();
    } catch(exc) {
        if ((exc.qua_isa === vm.Tag) || (exc instanceof vm.Panic)) {
            // let nonlocal exits and panics through
            throw exc;
        } else {
            // pipe all other evaluation exceptions into condition system
            return vm.error(exc);
        }
    }
};
vm.Panic = function Panic(exc) {
    vm.assert_type(exc, Error);
    this.exc = exc;
};
vm.Panic.prototype.toString = function() {
    return this.exc.stack;
};
vm.error = function(err) {
    // Call into user ERROR handler if defined...
    if (vm.init_env) {
	var error = vm.lookup(vm.init_env, vm.fun_sym("error"), false);
	if (error) {
            return vm.combine(vm.make_env(), error, vm.list(err));
	}
    }
    // ...otherwise panic.
    console.log("Panic at boot");
    vm.panic(err);
};
// Unconditionally abort up to the next exception handler outside
// of the VM.  Bypasses any intervening %%RESCUE handlers to
// prevent user code from interfering with the unwinding.
vm.panic = function(err) {
    console.log("vm.panic:", err);
    err = (err instanceof Error) ? err : new Error(err);
    throw new vm.Panic(err);
};
/* Util Dumping Ground */
vm.has_own_property = function(obj, name) {
    return obj && Object.prototype.hasOwnProperty.call(obj, name); // WHY?
};
vm.assert_type = function(obj, type_spec) {
    if (vm.check_type(obj, type_spec)) return obj;
    else {
	console.log(obj);
	return vm.error("type error: " + obj + " should be " + type_spec + " but is " + obj);
    }
};
vm.check_type = function(obj, type_spec) {
    if (typeof(type_spec) === "string") {
        return (typeof(obj) === type_spec);
    } else if (Array.isArray(type_spec)) {
        vm.assert(type_spec.length === 1);
        vm.assert(Array.isArray(obj));
        var elt_type_spec = type_spec[0];
        obj.forEach(function(elt) { vm.assert_type(elt, elt_type_spec); });
        return true;
    } else {
        return (obj instanceof type_spec);
    }
};
vm.assert = function(x) { if (!x) vm.panic("assertion failed"); };
vm.time = function(name, fun) {
    var start = new Date().getTime();
    fun();
    var end = new Date().getTime();
    var time = end - start;
    console.log(name + ": "  + time + "ms");
};
/* JS Native Interface */
// Returns a JS function that calls the given Lisp operator with
// the arguments passed to the function.
vm.js_function = function(cmb) {
    return function() {
        var args = vm.array_to_list(Array.prototype.slice.call(arguments));
        return vm.combine(vm.make_env(), cmb, args);
    }
};
// Detect JS built-in types and make them appear to object system
// as objects with (pseudo) Lisp classes.
vm.synthetic_class_of = function(obj) {
    switch (typeof(obj)) {
    case "string": return vm.JSString;
    case "number": return vm.JSNumber;
    case "boolean": return vm.JSBoolean;
    case "function": return vm.JSFunction;
    case "undefined": return vm.JSUndefined;
    default:
        if (obj === null) {
            return vm.JSNull;
        } else if (Array.isArray(obj)) {
            return vm.JSArray;
        } else {
            return vm.JSObject;
        }
    }
};
// Applies JS function.
vm.js_apply = function(fun, thiz, args) { return fun.apply(thiz, args); };
// Creates a Lisp operator whose body executes a JS binary operator.
vm.js_binop = function(op) {
    return vm.jswrap(new Function("a", "b", "return (a " + op + " b)")); };
// Reads a JS property, implementation of `.some_property' syntax.
vm.js_get = function(obj, name) { return obj[name]; };
// Reads a JS global variable, implementation of the `$some_global' syntax.
vm.js_global = function(name) { return global[name]; }; // from Browserify
// Creates a new JS object with a given constructor.
vm.js_new = function(ctor) {
    var factoryFunction = ctor.bind.apply(ctor, arguments);
    return new factoryFunction(); }
// Writes a JS property, implementation of `(setf (.property_name ...) ...)'.
vm.js_set = function(obj, name, val) { return obj[name] = val; };
/* API */
vm.def = function(e, name, cmb) { vm.bind(e, vm.sym(name), cmb); };
vm.defun = function(e, name, cmb) { vm.assert(cmb); vm.bind(e, vm.fun_sym(name), cmb); };
vm.deftype = function(e, type, name) { vm.assert(type); vm.bind(e, vm.type_sym(name), type); };
// Populates a fresh init environment with the VM primitives.
vm.init = function() {
    vm.init_env = vm.make_env();
    // Bootstrap object model
    vm.STR_CLS = vm.make_class(null, "structure-class");
    vm.STR_CLS.qua_isa = vm.STR_CLS;
    vm.OBJ = vm.make_class(vm.STR_CLS, "object");
    vm.deftype(vm.init_env, vm.OBJ, "object");
    vm.deftype(vm.init_env, vm.STR_CLS, "structure-class");
    // Bless built-in types as Lisp types
    function define_builtin_type(type, name) {
	type.qua_isa = vm.STR_CLS;
	type.name = name;
        type.class_name = name;
	type.methods = Object.create(null);
	type.prototype.qua_isa = type;
	vm.deftype(vm.init_env, type, name);
    }
    define_builtin_type(vm.Cons, "cons");
    define_builtin_type(vm.DV, "dynamic");
    define_builtin_type(vm.Env, "environment");
    define_builtin_type(vm.Fexpr, "fexpr");
    define_builtin_type(vm.Function, "function");
    define_builtin_type(vm.Ign, "ignore");
    define_builtin_type(vm.JSOperator, "js-operator");
    define_builtin_type(vm.Nil, "nil");
    define_builtin_type(vm.Prim, "primitive");
    define_builtin_type(vm.Sym, "symbol");
    define_builtin_type(vm.Tag, "%%tag");
    define_builtin_type(vm.Void, "void");
    define_builtin_type(StackFrame, "continuation");
    // Synthetic/virtual classes given to JS built-in objects, so we
    // can define methods on them.
    function define_js_type(name) {
	var c = vm.make_class(vm.STR_CLS, name);
	vm.deftype(vm.init_env, c, name);
	return c;
    }
    vm.JSObject = define_js_type("js-object");
    vm.JSArray = define_js_type("js-array");
    vm.JSFunction = define_js_type("js-function");
    vm.JSBoolean = define_js_type("boolean");
    vm.JSNumber = define_js_type("number");
    vm.JSString = define_js_type("string");
    vm.JSNull = define_js_type("js-null");
    vm.JSUndefined = define_js_type("js-undefined");
    // Forms
    vm.defun(vm.init_env, "%%car", vm.jswrap(vm.car));
    vm.defun(vm.init_env, "%%cdr", vm.jswrap(vm.cdr));
    vm.defun(vm.init_env, "%%cons", vm.jswrap(vm.cons));
    vm.defun(vm.init_env, "%%to-fun-sym", vm.jswrap(vm.to_fun_sym));
    vm.defun(vm.init_env, "%%to-type-sym", vm.jswrap(vm.to_type_sym));
    // Combiners & environments
    vm.defun(vm.init_env, "%%make-environment", vm.jswrap(vm.make_env));
    vm.defun(vm.init_env, "%%unwrap", vm.jswrap(vm.unwrap));
    vm.defun(vm.init_env, "%%vau", vm.Vau);
    vm.defun(vm.init_env, "%%wrap", vm.jswrap(vm.wrap));
    // Evaluation
    vm.defun(vm.init_env, "%%def", vm.Def);
    vm.defun(vm.init_env, "%%eval", vm.Eval);
    vm.defun(vm.init_env, "%%if", vm.If);
    vm.defun(vm.init_env, "%%loop", vm.Loop);
    vm.defun(vm.init_env, "%%progn", vm.Progn);
    vm.defun(vm.init_env, "%%raise", vm.Raise);
    vm.defun(vm.init_env, "%%rescue", vm.Rescue);
    vm.defun(vm.init_env, "%%setq", vm.Setq);
    // Dynamic variables
    vm.defun(vm.init_env, "%%dynamic", vm.jswrap(vm.dynamic));
    vm.defun(vm.init_env, "%%dynamic-bind", vm.DynamicBind);
    vm.defun(vm.init_env, "%%make-dynamic", vm.jswrap(vm.make_dynamic));
    // Continuations
    vm.defun(vm.init_env, "%%push-prompt", vm.PushPrompt);
    vm.defun(vm.init_env, "%%push-prompt-subcont", vm.PushPromptSubcont);
    vm.defun(vm.init_env, "%%push-subcont", vm.PushSubcont);
    vm.defun(vm.init_env, "%%take-subcont", vm.TakeSubcont);
    // Object system
    vm.defun(vm.init_env, "%%class-of", vm.jswrap(vm.class_of));
    vm.defun(vm.init_env, "%%make-class", vm.jswrap(vm.make_class));
    vm.defun(vm.init_env, "%%make-instance", vm.jswrap(vm.make_instance));
    vm.defun(vm.init_env, "%%put-method", vm.jswrap(vm.put_method));
    vm.defun(vm.init_env, "%%send-message", vm.jswrap(vm.send_message));
    vm.defun(vm.init_env, "%%set-slot-value", vm.jswrap(vm.set_slot_value));
    vm.defun(vm.init_env, "%%slot-bound?", vm.jswrap(vm.slot_bound_p));
    vm.defun(vm.init_env, "%%slot-value", vm.jswrap(vm.slot_value));
    // JSNI
    vm.defun(vm.init_env, "%%js-apply", vm.jswrap(vm.js_apply));
    vm.defun(vm.init_env, "%%js-binop", vm.jswrap(vm.js_binop));
    vm.defun(vm.init_env, "%%js-function", vm.jswrap(vm.js_function));
    vm.defun(vm.init_env, "%%js-get", vm.jswrap(vm.js_get));
    vm.defun(vm.init_env, "%%js-global", vm.jswrap(vm.js_global));
    vm.defun(vm.init_env, "%%js-new", vm.jswrap(vm.js_new));
    vm.defun(vm.init_env, "%%js-set", vm.jswrap(vm.js_set));
    vm.defun(vm.init_env, "%%own-property?", vm.jswrap(vm.has_own_property));
    // Misc
    vm.defun(vm.init_env, "%%assert", vm.jswrap(vm.assert));
    vm.defun(vm.init_env, "%%eq", vm.jswrap(function(a, b) { return a === b; }));
    vm.defun(vm.init_env, "%%panic", vm.jswrap(vm.panic));
    vm.defun(vm.init_env, "%%print", vm.jswrap(console.log));
    // List optims
    vm.defun(vm.init_env, "%%list*", vm.jswrap(vm.list_star));
    vm.defun(vm.init_env, "%%list-to-array", vm.jswrap(vm.list_to_array));
    vm.defun(vm.init_env, "%%plist-to-js-object", vm.jswrap(vm.plist_to_js_object));
    vm.defun(vm.init_env, "%%reverse-list", vm.jswrap(vm.reverse_list));
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"qua-user-bytecode":[function(require,module,exports){
module.exports=["%%progn"]
},{}]},{},[1]);
