(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.qua = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports.main = [null,null,null,null,null,null,null,null,null,["%%def",["qua-function","def"],["qua-function","%%def"]],null,["def",["qua-function","car"],["qua-function","%%car"]],null,["def",["qua-function","cdr"],["qua-function","%%cdr"]],null,["def",["qua-function","cons"],["qua-function","%%cons"]],null,["def",["qua-function","eq"],["qua-function","%%eq"]],null,["def",["qua-function","eval"],["qua-function","%%eval"]],null,["def",["qua-function","%if"],["qua-function","%%if"]],null,["def",["qua-function","make-environment"],["qua-function","%%make-environment"]],null,["def",["qua-function","print"],["qua-function","%%print"]],null,["def",["qua-function","progn"],["qua-function","%%progn"]],null,["def",["qua-function","setq"],["qua-function","%%setq"]],null,["def",["qua-function","unwrap"],["qua-function","%%unwrap"]],null,["def",["qua-function","wrap"],["qua-function","%%wrap"]],null,null,["def",["qua-function","concrete-class-of"],["qua-function","%%concrete-class-of"]],["def",["qua-function","ensure-class"],["qua-function","%%ensure-class"]],["def",["qua-function","find-concrete-class"],["qua-function","%%find-concrete-class"]],["def",["qua-function","find-generic-class"],["qua-function","%%find-generic-class"]],["def",["qua-function","find-method"],["qua-function","%%find-method"]],["def",["qua-function","generic-class-of"],["qua-function","%%generic-class-of"]],["def",["qua-function","instance?"],["qua-function","%%instance?"]],["def",["qua-function","put-method"],["qua-function","%%put-method"]],["def",["qua-function","set-slot-value"],["qua-function","%%set-slot-value"]],["def",["qua-function","slot-bound?"],["qua-function","%%slot-bound?"]],["def",["qua-function","slot-value"],["qua-function","%%slot-value"]],null,["def",["qua-function","js-apply"],["qua-function","%%js-apply"]],["def",["qua-function","js-function"],["qua-function","%%js-function"]],["def",["qua-function","js-get"],["qua-function","%%js-get"]],["def",["qua-function","js-global"],["qua-function","%%js-global"]],["def",["qua-function","js-new"],["qua-function","%%js-new"]],["def",["qua-function","js-set"],["qua-function","%%js-set"]],null,null,["def",["qua-function","%to-fun-sym"],["qua-function","%%to-fun-sym"]],null,null,["def",["qua-function","list*"],["qua-function","%%list*"]],null,["def",["qua-function","list-to-js-array"],["qua-function","%%list-to-array"]],["def",["qua-function","plist-to-js-object"],["qua-function","%%plist-to-js-object"]],null,["def",["qua-function","quote"],["%%vau",["op"],"#ign","op"]],null,["def",["qua-function","list"],["wrap",["%%vau","args","#ign","args"]]],null,["def",["qua-function","the-environment"],["%%vau","#ign","env","env"]],null,null,null,["def",["qua-function","vau"],["%%vau",["params","env-param",".","body"],"env",["eval",["list",["qua-function","%%vau"],"params","env-param",["list*",["qua-function","progn"],"body"]],"env"]]],null,["def",["qua-function","deffexpr"],["vau",["name","params","env-param",".","body"],"env",["eval",["list",["qua-function","def"],["%to-fun-sym","name"],["list*",["qua-function","vau"],"params","env-param","body"]],"env"]]],null,null,["def",["qua-function","make-macro"],["wrap",["vau",["expander"],"#ign",["vau","form","env",["eval",["eval",["cons","expander","form"],["make-environment"]],"env"]]]]],null,["def",["qua-function","macro"],["make-macro",["vau",["params",".","body"],"#ign",["list",["qua-function","make-macro"],["list*",["qua-function","vau"],"params","#ign","body"]]]]],null,["def",["qua-function","defmacro"],["macro",["name","params",".","body"],["list",["qua-function","def"],["%to-fun-sym","name"],["list*",["qua-function","macro"],"params","body"]]]],null,null,["defmacro","%lambda",["params",".","body"],["list",["qua-function","wrap"],["list*",["qua-function","vau"],"params","#ign","body"]]],null,null,["defmacro","%defun",["name","params",".","body"],["list",["qua-function","def"],["%to-fun-sym","name"],["list*",["qua-function","%lambda"],"params","body"]]],null,null,["def",["qua-function","lambda"],["qua-function","%lambda"]],["def",["qua-function","defun"],["qua-function","%defun"]],null,["defun","apply",["fun","args",".","opt-env"],["eval",["cons",["unwrap","fun"],"args"],["optional","opt-env",["make-environment"]]]],null,null,["defun","funcall",["fun",".","args"],["apply","fun","args"]],null,null,["defun","compose",[["qua-function","f"],["qua-function","g"]],["lambda",["arg"],["f",["g","arg"]]]],["defun","identity",["x"],"x"],null,null,["defun","nil?",["obj"],["eq","obj",[]]],["defun","void?",["obj"],["eq","obj","#void"]],["def",["qua-function","caar"],["compose",["qua-function","car"],["qua-function","car"]]],["def",["qua-function","cadr"],["compose",["qua-function","car"],["qua-function","cdr"]]],["def",["qua-function","cdar"],["compose",["qua-function","cdr"],["qua-function","car"]]],["def",["qua-function","cddr"],["compose",["qua-function","cdr"],["qua-function","cdr"]]],["defun","symbol?",["sym"],["%%instance?","sym",["quote","symbol"]]],["defun","keyword?",["obj"],["%%instance?","obj",["quote","keyword"]]],["defun","cons?",["cons"],["%%instance?","cons",["quote","cons"]]],["defun","symbol-name",["sym"],["slot-value","sym",["quote","name"]]],null,["defun","map-list",[["qua-function","fun"],"list"],["%if",["nil?","list"],[],["cons",["fun",["car","list"]],["map-list",["qua-function","fun"],["cdr","list"]]]]],["def",["qua-function","for-each"],["qua-function","map-list"]],["defun","fold-list",[["qua-function","fun"],"init","list"],["%if",["nil?","list"],"init",["fold-list",["qua-function","fun"],["fun","init",["car","list"]],["cdr","list"]]]],null,null,null,["defmacro","let",["bindings",".","body"],["list*",["list*",["qua-function","lambda"],["map-list",["qua-function","car"],"bindings"],"body"],["map-list",["qua-function","cadr"],"bindings"]]],null,null,["defmacro","let*",["bindings",".","body"],["%if",["nil?","bindings"],["list*",["qua-function","let"],[],"body"],["list",["qua-function","let"],["list",["car","bindings"]],["list*",["qua-function","let*"],["cdr","bindings"],"body"]]]],null,null,["defmacro","%letrec",["bindings",".","body"],["list*",["qua-function","let"],[],["list",["qua-function","def"],["map-list",["qua-function","car"],"bindings"],["list*",["qua-function","list"],["map-list",["qua-function","cadr"],"bindings"]]],"body"]],null,["defun","%var-bindingize",[["fun-name","fun-params",".","fun-body"]],["list",["%to-fun-sym","fun-name"],["list*",["qua-function","lambda"],"fun-params","fun-body"]]],null,["defmacro","flet",["fun-bindings",".","body"],["list*",["qua-function","let"],["map-list",["qua-function","%var-bindingize"],"fun-bindings"],"body"]],null,["defmacro","labels",["fun-bindings",".","body"],["list*",["qua-function","%letrec"],["map-list",["qua-function","%var-bindingize"],"fun-bindings"],"body"]],null,["defun","not",["boolean"],["%if","boolean",false,true]],["deffexpr","cond","clauses","env",["%if",["nil?","clauses"],"#void",["let",[[[["test",".","body"],".","clauses"],"clauses"]],["%if",["eval","test","env"],["apply",["wrap",["qua-function","progn"]],"body","env"],["apply",["wrap",["qua-function","cond"]],"clauses","env"]]]]],["deffexpr","and","ops","env",["cond",[["nil?","ops"],true],[["nil?",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],["apply",["wrap",["qua-function","and"]],["cdr","ops"],"env"]],[true,false]]],["deffexpr","or","ops","env",["cond",[["nil?","ops"],false],[["nil?",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],true],[true,["apply",["wrap",["qua-function","or"]],["cdr","ops"],"env"]]]],null,null,["def",["qua-function","="],["qua-function","eq"]],["defun","optional",["opt-arg",".","opt-default"],["%if",["nil?","opt-arg"],["%if",["nil?","opt-default"],"#void",["car","opt-default"]],["car","opt-arg"]]],["def",["qua-function","defconstant"],["qua-function","def"]],null,["defconstant","%setter-prop",["wat-string","qua_setter"]],["defun","setter",["obj"],["js-get","obj","%setter-prop"]],["js-set",["qua-function","setter"],"%setter-prop",["lambda",["new-setter","getter"],["js-set","getter","%setter-prop","new-setter"]]],["defmacro","setf",["place","new-val"],["%if",["symbol?","place"],["list",["qua-function","setq"],"place","new-val"],["let*",[[["getter-form",".","args"],"place"],["getter",["%if",["symbol?","getter-form"],["%to-fun-sym","getter-form"],"getter-form"]]],["list*",["list",["qua-function","setter"],"getter"],"new-val","args"]]]],["defmacro","incf",["place",".","opt-increment"],["let",[["increment",["optional","opt-increment",1]]],["list",["qua-function","setf"],"place",["list",["qua-function","+"],"place","increment"]]]],["defmacro","decf",["place",".","opt-decrement"],["let",[["decrement",["optional","opt-decrement",1]]],["list",["qua-function","setf"],"place",["list",["qua-function","-"],"place","decrement"]]]],null,["defun","make-instance",["class-desig",".","initargs"],["%%make-instance","class-desig",["plist-to-js-object","initargs"]]],["defun","call-method",["obj","name","args"],["let",[["method",["find-method","obj","name"]]],["apply","method","args"]]],["deffexpr","defgeneric",["name","#ign"],"env",["eval",["list",["qua-function","def"],["%to-fun-sym","name"],["lambda","args",["call-method",["car","args"],"name","args"]]],"env"]],["deffexpr","defmethod",["name",[["self","class-spec"],".","args"],".","body"],"env",["let",[["class",["find-generic-class","class-spec"]],["fun",["eval",["list*",["qua-function","lambda"],["list*","self","args"],"body"],"env"]]],["put-method","class","name","fun"],"name"]],["def",["qua-function","%parse-type-spec"],["qua-function","identity"]],null,["deffexpr","defclass",["class-spec","superclass-specs",".","#ign"],"#ign",["ensure-class",["%parse-type-spec","class-spec"],["list-to-js-array",["map-list",["qua-function","%parse-type-spec"],"superclass-specs"]]]],["defgeneric","hash-object",["self"]],["defgeneric","compare-object",["self"]],["defgeneric","print-object",["self","stream"]],null,["defmacro","loop","body",["list",["qua-function","%%loop"],["list*",["qua-function","lambda"],[],"body"]]],["deffexpr","while",["test",".","body"],"env",["let",[["body",["list*",["qua-function","progn"],"body"]]],["block","exit",["loop",["%if",["eval","test","env"],["eval","body","env"],["return-from","exit"]]]]]],null,["deffexpr","if",["test","then",".","rest"],"env",["%if",["eval","test","env"],["eval","then","env"],["%if",["nil?","rest"],"#void",["%if",["nil?",["cdr","rest"]],["eval",["car","rest"],"env"],["eval",["cons",["qua-function","if"],"rest"],"env"]]]]],["defmacro","when",["test",".","body"],["list",["qua-function","%if"],"test",["list*",["qua-function","progn"],"body"],"#void"]],["defmacro","unless",["test",".","body"],["list",["qua-function","%if"],"test","#void",["list*",["qua-function","progn"],"body"]]],["defun","%call-with-escape",[["qua-function","fun"]],["let*",[["tag",["list",["quote","tag"]]],["escape",["lambda","opt-val",["let",[["val",["optional","opt-val"]]],["%%raise",["list","tag","val"]]]]]],["%%rescue",["lambda",["exc"],["%if",["and",["cons?","exc"],["eq","tag",["car","exc"]]],["cadr","exc"],["%%raise","exc"]]],["lambda",[],["fun","escape"]]]]],["defmacro","block",["name",".","body"],["list",["qua-function","%call-with-escape"],["list*",["qua-function","lambda"],["list","name"],"body"]]],["defun","return-from",["escape",".","opt-val"],["apply","escape","opt-val"]],["deffexpr","prog1","forms","env",["%if",["nil?","forms"],"#void",["let",[["result",["eval",["car","forms"],"env"]]],["eval",["list*",["qua-function","progn"],["cdr","forms"]],"env"],"result"]]],["defmacro","prog2",["form",".","forms"],["list",["qua-function","progn"],"form",["list*",["qua-function","prog1"],"forms"]]],["defun","unwind-protect*",[["qua-function","protected-thunk"],["qua-function","cleanup-thunk"]],["prog1",["%%rescue",["lambda",["exc"],["cleanup-thunk"],["%%raise","exc"]],["qua-function","protected-thunk"]],["cleanup-thunk"]]],["defmacro","unwind-protect",["protected-form",".","cleanup-forms"],["list",["qua-function","unwind-protect*"],["list",["qua-function","lambda"],[],"protected-form"],["list*",["qua-function","lambda"],[],"cleanup-forms"]]],["deffexpr","case",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["for-each",["lambda",[["other-val",".","body"]],["when",["=","val",["eval","other-val","env"]],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]]]],"clauses"],"#void"]]],null,["defclass","mut",["standard-object"],["val"]],["defun","mut",["val"],["make-instance",["quote","mut"],["qua-keyword","val"],"val"]],["defun","ref",["mut"],["slot-value","mut",["quote","val"]]],["setf",["setter",["qua-function","ref"]],["lambda",["new-val","mut"],["set-slot-value","mut",["quote","val"],"new-val"]]],null,["defmacro","push-prompt",["prompt",".","body"],["list",["qua-function","%%push-prompt"],"prompt",["list*",["qua-function","lambda"],[],"body"]]],["defmacro","take-subcont",["prompt","name",".","body"],["list",["qua-function","%%take-subcont"],"prompt",["list*",["qua-function","lambda"],["list","name"],"body"]]],["defmacro","push-subcont",["continuation",".","body"],["list",["qua-function","%%push-subcont"],"continuation",["list*",["qua-function","lambda"],[],"body"]]],["defmacro","push-prompt-subcont",["prompt","continuation",".","body"],["list",["qua-function","%%push-prompt-subcont"],"prompt","continuation",["list*",["qua-function","lambda"],[],"body"]]],["defconstant","the-default-prompt",["qua-keyword","the-default-prompt"]],["defmacro","push-default-prompt","body",["list*",["qua-function","push-prompt"],"the-default-prompt","body"]],["defmacro","take-default-subcont",["name",".","body"],["list*",["qua-function","take-subcont"],"the-default-prompt","name","body"]],["defmacro","push-default-subcont",["continuation",".","body"],["list*",["qua-function","push-prompt-subcont"],"the-default-prompt","continuation","body"]],null,["defmacro","defdynamic",["name",".","opt-val"],["list",["qua-function","def"],"name",["list",["qua-function","mut"],["optional","opt-val"]]]],["def",["qua-function","dynamic"],["qua-function","ref"]],["def",["qua-function","%dynamic-let-1"],["qua-function","%%dynamic-let-1"]],["deffexpr","dynamic-let",["bindings",".","body"],"env",["let",[["pairs",["map-list",["lambda",[["dynamic-name","expr"]],["cons",["eval","dynamic-name","env"],["eval","expr","env"]]],"bindings"]]],["labels",[["process-pairs",["pairs"],["%if",["nil?","pairs"],["eval",["list*",["qua-function","progn"],"body"],"env"],["let*",[[[["dynamic",".","value"],".","rest-pairs"],"pairs"]],["%dynamic-let-1","dynamic","value",["lambda",[],["process-pairs","rest-pairs"]]]]]]],["process-pairs","pairs"]]]],null,null,["defun","js-getter",["prop-name"],["let",[["getter",["lambda",["obj"],["js-get","obj","prop-name"]]]],["setf",["setter","getter"],["lambda",["new-val","obj"],["js-set","obj","prop-name","new-val"]]],"getter"]],null,["defun","js-invoker",["fun-name"],["lambda",["this",".","args"],["let",[["fun",["js-get","this","fun-name"]]],["js-apply","fun","this",["list-to-js-array","args"]]]]],null,["defun","create-js-object","opt-proto",[["js-invoker",["wat-string","create"]],["js-global",["wat-string","Object"]],["optional","opt-proto",null]]],["defun","js-object","plist",["plist-to-js-object","plist"]],["defun","js-array","elements",["list-to-js-array","elements"]],["defmacro","js-lambda",["lambda-list",".","body"],["list",["qua-function","js-function"],["list*",["qua-function","lambda"],"lambda-list","body"]]],["defun","%js-relational-op",["name"],["let",[[["qua-function","binop"],["%%js-binop","name"]]],["labels",[["op",["arg1","arg2",".","rest"],["%if",["binop","arg1","arg2"],["%if",["nil?","rest"],true,["apply",["qua-function","op"],["list*","arg2","rest"]]],false]]],["qua-function","op"]]]],["def",["qua-function","=="],["%js-relational-op",["wat-string","=="]]],["def",["qua-function","==="],["%js-relational-op",["wat-string","==="]]],["def",["qua-function","<"],["%js-relational-op",["wat-string","<"]]],["def",["qua-function",">"],["%js-relational-op",["wat-string",">"]]],["def",["qua-function","<="],["%js-relational-op",["wat-string","<="]]],["def",["qua-function",">="],["%js-relational-op",["wat-string",">="]]],["def",["qua-function","lt"],["qua-function","<"]],["def",["qua-function","lte"],["qua-function","<="]],["def",["qua-function","gt"],["qua-function",">"]],["def",["qua-function","gte"],["qua-function",">="]],["defun","!=","args",["not",["apply","==","args"]]],["defun","!==","args",["not",["apply","===","args"]]],["def",["qua-function","*"],["let",[[["qua-function","binop"],["%%js-binop",["wat-string","*"]]]],["lambda","args",["fold-list",["qua-function","binop"],1,"args"]]]],null,["def",["qua-function","+"],["let",[[["qua-function","binop"],["%%js-binop",["wat-string","+"]]]],["lambda","args",["%if",["nil?","args"],0,["fold-list",["qua-function","binop"],["car","args"],["cdr","args"]]]]]],["defun","%js-negative-op",["name","unit"],["let",[[["qua-function","binop"],["%%js-binop","name"]]],["lambda",["arg1",".","rest"],["%if",["nil?","rest"],["binop","unit","arg1"],["fold-list",["qua-function","binop"],"arg1","rest"]]]]],["def",["qua-function","-"],["%js-negative-op",["wat-string","-"],0]],["def",["qua-function","/"],["%js-negative-op",["wat-string","/"],1]],null,["defclass","condition",["standard-object"]],["defclass","serious-condition",["condition"]],["defclass","error",["serious-condition"]],["defclass","warning",["condition"]],["defclass","simple-condition",["condition"],["message"]],["defclass","simple-warning",["warning"],["message"]],["defclass","simple-error",["error"],["message"]],["defclass","runtime-error",["error"]],["defclass","control-error",["runtime-error"]],["defclass","restart-control-error",["control-error"],["restart"]],["defclass","restart",["condition"],["associated-condition"]],["defclass","abort",["restart"]],["defclass","continue",["restart"]],["defclass","use-value",["restart"],["value"]],["defclass","store-value",["restart"],["value"]],null,["defdynamic","current-condition-handler-frame"],["defdynamic","current-restart-handler-frame"],["defclass","handler",[],["condition-type","handler-function","associated-condition"]],["defun","make-handler",["condition-type","handler-function",".","opt-associated-condition"],["make-instance",["quote","handler"],["qua-keyword","condition-type"],"condition-type",["qua-keyword","handler-function"],"handler-function",["qua-keyword","associated-condition"],["optional","opt-associated-condition"]]],["defun","handle-condition",["handler","condition"],["funcall",["slot-value","handler",["quote","handler-function"]],"condition"]],["defclass","handler-frame",[],["handlers","parent"]],["defun","make-handler-frame",["handlers",".","opt-parent"],["make-instance",["quote","handler-frame"],["qua-keyword","handlers"],"handlers",["qua-keyword","parent"],["optional","opt-parent"]]],["defun","%make-handler-bind",[["qua-function","handler-spec-parser"],"handler-frame-dynamic"],["vau",["handler-specs",".","body"],"env",["let*",[["handlers",["map-list",["lambda",["spec"],["handler-spec-parser","spec","env"]],"handler-specs"]],["handler-frame",["make-handler-frame","handlers",["dynamic","handler-frame-dynamic"]]]],["%dynamic-let-1","handler-frame-dynamic","handler-frame",["lambda",[],["eval",["list*",["qua-function","progn"],"body"],"env"]]]]]],null,["def",["qua-function","handler-bind"],["%make-handler-bind",["lambda",[["class-name","function-form"],"env"],["make-handler","class-name",["eval","function-form","env"]]],"current-condition-handler-frame"]],null,["def",["qua-function","restart-bind"],["%make-handler-bind",["lambda",[["class-name","function-form",".","opt-associated-condition"],"env"],["make-handler","class-name",["eval","function-form","env"],["eval",["optional","opt-associated-condition"],"env"]]],"current-restart-handler-frame"]],null,["defun","signal",["condition"],["signal-condition","condition",["dynamic","current-condition-handler-frame"]]],["defun","warn",["condition"],["signal","condition"],["print",["wat-string","Warning:"],"condition"]],["defun","error",["condition"],["signal","condition"],["invoke-debugger","condition"]],["defun","invoke-restart",["restart"],["signal-condition","restart",["dynamic","current-restart-handler-frame"]]],["defun","signal-condition",["condition","dynamic-frame"],["let",[["handler-and-frame",["find-applicable-handler","condition","dynamic-frame"]]],["%if",["void?","handler-and-frame"],"#void",["let",[[["handler","frame"],"handler-and-frame"]],["call-condition-handler","condition","handler","frame"],null,["signal-condition","condition",["slot-value","frame",["quote","parent"]]]]]]],["defun","find-applicable-handler",["condition","dynamic-frame"],["%if",["void?","dynamic-frame"],"#void",["block","found",["for-each",["lambda",["handler"],["when",["condition-applicable?","condition","handler"],["return-from","found",["list","handler","dynamic-frame"]]]],["slot-value","dynamic-frame",["quote","handlers"]]],["find-applicable-handler","condition",["slot-value","dynamic-frame",["quote","parent"]]]]]],["defgeneric","condition-applicable?",["condition","handler"]],["defmethod","condition-applicable?",[["condition","condition"],"handler"],["instance?","condition",["slot-value","handler",["quote","condition-type"]]]],["defun","slot-void?",["obj","slot-name"],["%if",["slot-bound?","obj","slot-name"],["void?",["slot-value","obj","slot-name"]],true]],["defmethod","condition-applicable?",[["restart","restart"],"handler"],["and",["instance?","restart",["slot-value","handler",["quote","condition-type"]]],["or",["slot-void?","restart",["quote","associated-condition"]],["slot-void?","handler",["quote","associated-condition"]],["eq",["slot-value","restart",["quote","associated-condition"]],["slot-value","handler",["quote","associated-condition"]]]]]],["defgeneric","call-condition-handler",["condition","handler","handler-frame"]],["defmethod","call-condition-handler",[["condition","condition"],"handler","handler-frame"],null,["dynamic-let",[["current-condition-handler-frame",["slot-value","handler-frame",["quote","parent"]]]],["handle-condition","handler","condition"]]],["defmethod","call-condition-handler",[["restart","restart"],"handler","handler-frame"],["handle-condition","handler","restart"]],null,["defclass","type-error",["error"],[]],["defconstant","%the-top-type",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","top"],["qua-keyword","generic-params"],["quote",[]]]],["defconstant","%the-bottom-type",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","bottom"],["qua-keyword","generic-params"],["quote",[]]]],["defun","%parse-type-spec",["type-spec"],["if",["keyword?","type-spec"],["make-instance",["quote","%type-variable"],["qua-keyword","name"],["symbol-name","type-spec"]],["symbol?","type-spec"],["make-instance",["quote","%class-type"],["qua-keyword","name"],["symbol-name","type-spec"],["qua-keyword","generic-params"],["quote",[]]],["cons?","type-spec"],["let",[[["class-name",".","generic-param-specs"],"type-spec"]],["make-instance",["quote","%class-type"],["qua-keyword","name"],["symbol-name","class-name"],["qua-keyword","generic-params"],["map-list",["qua-function","%parse-generic-param-spec"],"generic-param-specs"]]],["error",["make-instance",["quote","simple-error"],["qua-keyword","message"],["wat-string","Illegal type-spec"]]]]],["defun","%parse-generic-param-spec",["gp-spec"],["if",["or",["keyword?","gp-spec"],["symbol?","gp-spec"]],["let",[["type",["%parse-type-spec","gp-spec"]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"type",["qua-keyword","out-type"],"type"]],["cons?","gp-spec"],["let",[[["op",".","rest"],"gp-spec"]],["%if",["keyword?","op"],["case",["symbol-name","op"],[["wat-string","io"],["let*",[["in-type",["%parse-type-spec",["car","rest"]]],["out-type",["%parse-type-spec",["optional",["cdr","rest"],"in-type"]]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"in-type",["qua-keyword","out-type"],"out-type"]]],[["wat-string","in"],["let",[["in-type",["%parse-type-spec",["car","rest"]]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"in-type",["qua-keyword","out-type"],"%the-top-type"]]],[["wat-string","out"],["let",[["out-type",["%parse-type-spec",["car","rest"]]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"%the-bottom-type",["qua-keyword","out-type"],"out-type"]]]],["let",[["type",["%parse-type-spec","gp-spec"]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"type",["qua-keyword","out-type"],"type"]]]],["error",["wat-string","Illegal generic param spec"]]]],["defun","instance?",["obj","type-spec"],["%%instance?","obj",["%parse-type-spec","type-spec"]]],["deffexpr","typecase",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["for-each",["lambda",[["type-spec",".","body"]],["%if",["eq","type-spec",true],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]],["when",["instance?","val","type-spec"],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]]]]],"clauses"],"#void"]]],null,["defun","invoke-debugger",["condition"],["print",["wat-string","DEBUG"]],["print","condition"],["%%raise",["js-new",["js-global",["wat-string","Error"]],"condition"]]],["defclass",["collection",["qua-keyword","e"]],["standard-object"],[]],["defgeneric","add",["collection","element"]],["defclass",["list",["qua-keyword","e"]],[["collection",["qua-keyword","e"]]],[]],null]

},{}],2:[function(require,module,exports){
module.exports.main = [null,["def",["qua-function","%assert"],["qua-function","%%assert"]],["def",["qua-function","%deep-equal"],["qua-function","%%deep-equal"]],["defun",["qua-function","%expect"],["expected","actual"],["%assert",["%deep-equal","expected","actual"]]],null,["%assert",["%deep-equal",1,["car",["cons",1,2]]]],["%assert",["%deep-equal",2,["cdr",["cons",1,2]]]],["%assert",["%deep-equal",1,["car",["list",1,2,3]]]],["%assert",["%deep-equal",["list",2,3],["cdr",["list",1,2,3]]]],["%assert",["%deep-equal",1,["car",["list*",1,2,3]]]],["%assert",["%deep-equal",["cons",2,3],["cdr",["list*",1,2,3]]]],["%assert",["symbol?",["quote","foo"]]],["%assert",["keyword?",["qua-keyword","foo"]]],null,["def","e1",["make-environment"]],["eval",["list",["qua-function","def"],["quote","x"],1],"e1"],["%assert",["%deep-equal",1,["eval",["quote","x"],"e1"]]],["%assert",["%deep-equal","#void",["progn"]]],["%assert",["%deep-equal",1,["progn",1]]],["%assert",["%deep-equal",2,["progn",1,2]]],null,["def","e2",["make-environment"]],["def",["qua-function","fun2"],["wrap",["vau",["p"],"#ign","p"]]],["eval",["list",["qua-function","def"],["quote","x"],2],"e2"],["eval",["list",["qua-function","def"],["quote",["qua-function","fun2"]],["qua-function","fun2"]],"e2"],["%assert",["%deep-equal",2,["eval",["list",["qua-function","fun2"],["quote","x"]],"e2"]]],null,["%assert",["%deep-equal",["quote","foo"],["quote","foo"]]],["%assert",["%deep-equal",["quote",["foo","bar"]],["quote",["foo","bar"]]]],null,["def",["qua-function","lam1"],["lambda",[],10,11,12]],["def",["qua-function","lam2"],["lambda",[]]],["%assert",["%deep-equal",12,["lam1"]]],["%assert",["%deep-equal","#void",["lam2"]]],["defun","lam3",["x"],1,2,3,"x"],["%assert",["%deep-equal",4,["lam3",4]]],null,["%assert",["%deep-equal",["list",1,2,3],["apply",["qua-function","list"],["list",1,2,3]]]],null,["%assert",["%deep-equal",["list",1,1,1],["map-list",["lambda",["#ign"],1],["list",1,2,3]]]],null,["%expect","#void",["if",["=",true,false],1]],["%expect",1,["if",["=",true,true],1]],["%expect",2,["if",["=",true,false],1,["=",true,true],2]],["%expect",3,["if",["=",true,false],1,["=",true,false],2,3]],null,["%assert",["%deep-equal",["quote","foo"],["make-instance",["quote","symbol"],["qua-keyword","name"],["wat-string","foo"],["qua-keyword","ns"],["wat-string","v"]]]],["%assert",["%deep-equal",["qua-keyword","foo"],["make-instance",["quote","keyword"],["qua-keyword","name"],["wat-string","foo"]]]],["defgeneric","describe-yourself",["self"]],["defmethod","describe-yourself",[["self","js-number"]],["wat-string","a number"]],["defmethod","describe-yourself",[["self","boolean"]],["wat-string","a boolean"]],["defmethod","describe-yourself",[["self","symbol"]],["wat-string","a symbol"]],["defmethod","describe-yourself",[["self","object"]],["wat-string","any other object"]],["%assert",["%deep-equal",["wat-string","a number"],["describe-yourself",33]]],["%assert",["%deep-equal",["wat-string","a boolean"],["describe-yourself",true]]],["%assert",["%deep-equal",["wat-string","a symbol"],["describe-yourself",["quote","foo"]]]],["%assert",["%deep-equal",["wat-string","any other object"],["describe-yourself",["qua-keyword","hello"]]]],["%assert",["%deep-equal",["wat-string","any other object"],["describe-yourself",["list",1,2]]]],null,["defun","fun-with-keywords",[["qua-keyword","x"],"x-param",["qua-keyword","y"],"y-param"],["list","x-param","y-param"]],["%assert",["%deep-equal",["list",2,4],["fun-with-keywords",["qua-keyword","x"],2,["qua-keyword","y"],4]]],null,["defclass","my-class",[]],["defgeneric","my-generic",["self"]],["defmethod","my-generic",[["self","my-class"]],["wat-string","wow!"]],["def","obj1",["make-instance",["quote","my-class"]]],["defclass","my-subclass",["my-class"]],["def","obj2",["make-instance",["quote","my-subclass"]]],["%assert",["%deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["%assert",["%deep-equal",["wat-string","wow!"],["my-generic","obj2"]]],["defmethod","my-generic",[["self","my-subclass"]],["wat-string","wowzers!"]],["%assert",["%deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["%assert",["%deep-equal",["wat-string","wowzers!"],["my-generic","obj2"]]],null,["defclass","class-with-slots",[],["x",["qua-keyword","type"],"number","y",["qua-keyword","type"],"number"]],["def","object-with-slots",["make-instance",["quote","class-with-slots"],["qua-keyword","x"],2,["qua-keyword","y"],4]],["%assert",["%deep-equal",2,["slot-value","object-with-slots",["quote","x"]]]],["%assert",["%deep-equal",4,["slot-value","object-with-slots",["quote","y"]]]],["%assert",["slot-bound?","object-with-slots",["quote","x"]]],["%assert",["slot-bound?","object-with-slots",["quote","y"]]],["%assert",["not",["slot-bound?","object-with-slots",["quote","z"]]]],["set-slot-value","object-with-slots",["quote","x"],6],["set-slot-value","object-with-slots",["quote","y"],8],["%assert",["%deep-equal",6,["slot-value","object-with-slots",["quote","x"]]]],["%assert",["%deep-equal",8,["slot-value","object-with-slots",["quote","y"]]]],null,["let",[["x",1]],["let",[["x",3]],["setq","x",2],["%assert",["%deep-equal",2,"x"]]],["%assert",["%deep-equal",1,"x"]],["let",[],["setq","x",2],["%assert",["%deep-equal",2,"x"]]],["%assert",["%deep-equal",2,"x"]]],["let",[["x","#void"]],["let",[["y","#void"]],["let",[["z","#void"]],["setq",["x","y",".","z"],["list",1,2,3,4]],["%expect",1,"x"],["%expect",2,"y"],["%expect",["quote",[3,4]],"z"]]]],null,["let",[["foo",1]],["defun","foo",[],"foo"],["%assert",["%deep-equal",["foo"],1]],["def","env",["the-environment"]],["js-set",["qua-function","foo"],["wat-string","qua_setter"],["lambda",["new-val"],["setq","foo","new-val"]]],["setf",["foo"],2],["%assert",["%deep-equal",["foo"],2]]],["let",[["x",12]],["%expect",12,"x"],["setf","x",14],["%expect",14,"x"],["incf","x"],["%expect",15,"x"],["incf","x",2],["%expect",17,"x"],["decf","x"],["%expect",16,"x"],["decf","x",2],["%expect",14,"x"]],null,["let",[["cell",["mut",12]]],["%expect",12,["ref","cell"]],["setf",["ref","cell"],14],["%expect",14,["ref","cell"]],["incf",["ref","cell"]],["%expect",15,["ref","cell"]],["incf",["ref","cell"],2],["%expect",17,["ref","cell"]],["decf",["ref","cell"]],["%expect",16,["ref","cell"]],["decf",["ref","cell"],2],["%expect",14,["ref","cell"]]],null,["%expect",2,["%%rescue",["lambda",["exc"],"exc"],["lambda",[],2]]],["%expect",["quote","foo"],["%%rescue",["lambda",["exc"],"exc"],["lambda",[],["%%raise",["quote","foo"]]]]],["%expect","#void",["cond"]],["%expect",1,["cond",[["%deep-equal",1,1],1]]],["%expect","#void",["cond",[false,1]]],["%expect",2,["cond",[false,1],[true,2],[true,3]]],["%expect",true,["and"]],["%expect",true,["and",true]],["%expect",false,["and",false]],["%expect",true,["and",true,true,true]],["%expect",false,["and",true,true,true,false]],["%expect",false,["or"]],["%expect",true,["or",true]],["%expect",false,["or",false]],["%expect",false,["or",false,false,false]],["%expect",true,["or",false,false,false,true]],["%expect","#void",["case",12]],["%expect",1,["case",1,[1,1],[2,2],[3,3]]],["%expect",3,["case",3,[1,1],[2,2],[3,3]]],["%expect","#void",["case",4,[1,1],[2,2],[3,3]]],["%expect",1,["%call-with-escape",["lambda",["#ign"],1]]],["%expect",2,["%call-with-escape",["lambda",["escape"],1,["return-from","escape",2],3]]],["%expect","#void",["%call-with-escape",["lambda",["escape"],1,["return-from","escape"],3]]],["%expect","#void",["block","x"]],["%expect",1,["block","x",1]],["%expect",2,["block","x",1,["return-from","x",2],3]],["%expect","#void",["block","x",1,["return-from","x"],3]],["%expect",1,["unwind-protect",1]],["%expect",1,["unwind-protect",1,2]],["%expect",1,["unwind-protect",1,2,3]],["let",[["cell",["mut",false]]],["%expect",1,["unwind-protect",1,["setf",["ref","cell"],true]]],["%expect",true,["ref","cell"]]],["let",[["cell",["mut",false]]],["block","exit",["%%rescue",["lambda",["exc"],["%expect",["wat-string","foo"],"exc"],["%expect",true,["ref","cell"]],["return-from","exit"]],["lambda",[],["unwind-protect",["%%raise",["wat-string","foo"]],["setf",["ref","cell"],true]]]],["%assert",false]]],["%expect","#void",["prog1"]],["%expect",1,["prog1",1,2,3]],["%expect",2,["prog2",1,2,3]],["%expect","#void",["prog2",1]],["%expect",12,["flet",[["bar",[],3],["foo",[],4]],["*",["bar"],["foo"]]]],["%expect",12,["labels",[["bar",["x"],["*","x",["foo"]]],["foo",[],4]],["bar",3]]],null,["defdynamic","*my-dynamic*",1],["progn",["%expect",1,["dynamic","*my-dynamic*"]],["dynamic-let",[["*my-dynamic*",2]],["%expect",2,["dynamic","*my-dynamic*"]]],["%expect",1,["dynamic","*my-dynamic*"]]],["block","exit",["%expect",1,["dynamic","*my-dynamic*"]],["%%rescue",["lambda",["exc"],["%expect",["wat-string","foo"],"exc"],["%expect",1,["dynamic","*my-dynamic*"]],["return-from","exit"]],["lambda",[],["dynamic-let",[["*my-dynamic*",2]],["%expect",2,["dynamic","*my-dynamic*"]],["%%raise",["wat-string","foo"]]]]],["%assert",false]],null,["let",[["obj",["js-object",["qua-keyword","message"],["wat-string","hello"],["qua-keyword","sent"],["not",true]]]],["%assert",["%deep-equal",["wat-string","hello"],[["js-getter",["wat-string","message"]],"obj"]]],["%assert",["%deep-equal",false,[["js-getter",["wat-string","sent"]],"obj"]]]],null,["%assert",["%deep-equal",["wat-string","String"],["%%js-get",["%%js-get",["wat-string","foo"],["wat-string","constructor"]],["wat-string","name"]]]],["%assert",["%deep-equal",["wat-string","String"],[["js-getter",["wat-string","name"]],[["js-getter",["wat-string","constructor"]],["wat-string","foo"]]]]],null,["%assert",["%deep-equal",["wat-string","foo"],[["js-getter",["wat-string","qs_name"]],["quote","foo"]]]],["%assert",["%deep-equal",["wat-string","v"],[["js-getter",["wat-string","qs_ns"]],["quote","foo"]]]],["%assert",["%deep-equal",["wat-string","f"],[["js-getter",["wat-string","qs_ns"]],["quote",["qua-function","foo"]]]]],null,["let",[["obj",["create-js-object"]]],["setf",[["js-getter",["wat-string","message"]],"obj"],["wat-string","foo"]],["%assert",["%deep-equal",["wat-string","foo"],[["js-getter",["wat-string","message"]],"obj"]]]],null,["%assert",["%deep-equal",["wat-string","12"],[["js-invoker",["wat-string","toString"]],12]]],null,["%expect",2,["js-get",["js-array",1,2,3],1]],null,["%expect",["wat-string","foobar"],["+",["wat-string","foo"],["wat-string","ba"],["wat-string","r"]]],["%expect",1,["+",1]],["%expect",6,["+",2,2,2]],["%expect",3,["*",3]],["%expect",24,["*",4,3,2]],["%expect",-4,["-",4]],["%expect",4,["-",8,2,2]],["%expect",0.25,["/",4]],["%expect",1,["/",12,4,3]],["%assert",["<",1,2,3,4,5]],["%assert",["not",["<",1,2,3,4,5,-1]]],["%assert",[">",5,4,3,2,1]],["%assert",["not",[">",5,4,3,2,1,6]]],["%assert",["===",1,1,1]],["%assert",["not",["===",1,1,1,2]]],null,["%expect","#void",["handler-bind",[]]],["%expect",true,["handler-bind",[],1,2,["=",true,true]]],["%expect",1,["block","b",["handler-bind",[["condition",["lambda",["c"],["return-from","b",1]]]],["signal",["make-instance",["quote","condition"]]],2]]],["%expect",2,["block","b",["handler-bind",[["warning",["lambda",["c"],["return-from","b",1]]],["serious-condition",["lambda",["c"],["return-from","b",2]]]],["signal",["make-instance",["quote","error"]]],3]]],["%expect","#void",["signal",["make-instance",["quote","condition"]]]],["%expect",["wat-string","foo"],["block","exit",["handler-bind",[["condition",["lambda","#ign",["invoke-restart",["make-instance",["quote","continue"]]]]]],["restart-bind",[["continue",["lambda","#ign",["return-from","exit",["wat-string","foo"]]]]],["signal",["make-instance",["quote","condition"]]]]]]],null,["%assert",["instance?",["make-instance",["quote","serious-condition"]],["quote","object"]]],["%assert",["instance?",["make-instance",["quote","error"]],["quote","serious-condition"]]],["%assert",["instance?",["make-instance",["quote","error"]],["quote","object"]]],["%assert",["not",["instance?",["make-instance",["quote","object"]],["quote","error"]]]],["%assert",["instance?",12,["quote","js-number"]]],["%assert",["instance?",12,["quote","number"]]],["%assert",["instance?",12,["quote","object"]]],["%assert",["not",["instance?",12,["quote","standard-object"]]]],["%assert",["instance?",[["js-getter",["wat-string","qs_direct-superclasses"]],["find-generic-class",["quote","object"]]],["quote","js-array"]]],["%assert",["instance?",[["js-getter",["wat-string","qs_slots"]],["find-generic-class",["quote","object"]]],["quote","js-object"]]],null,["%expect","#void",["typecase",true]],["%expect",2,["typecase",true,["number",1],["boolean",2]]],["%expect",1,["typecase",10,["number",1],["boolean",2]]],["%expect","#void",["typecase",["wat-string","foo"],["number",1],["boolean",2]]],["%expect",["wat-string","default"],["typecase",["quote","whatever"],[true,["wat-string","default"]]]],["%expect",1,["typecase",["quote","whatever"],["symbol",1],[true,["wat-string","default"]]]],["%expect",["wat-string","default"],["typecase",["quote","whatever"],["number",1],[true,["wat-string","default"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],["%parse-type-spec",["quote","boolean"]]],["%parse-generic-param-spec",["quote",[["qua-keyword","io"],"number","boolean"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],"%the-top-type"],["%parse-generic-param-spec",["quote",[["qua-keyword","in"],"number"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"%the-bottom-type",["qua-keyword","out-type"],["%parse-type-spec",["quote","number"]]],["%parse-generic-param-spec",["quote",[["qua-keyword","out"],"number"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],["%parse-type-spec",["quote","number"]]],["%parse-generic-param-spec",["quote","number"]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote",["hash-set","number"]]],["qua-keyword","out-type"],["%parse-type-spec",["quote",["hash-set","number"]]]],["%parse-generic-param-spec",["quote",["hash-set","number"]]]],["%expect",["make-instance",["quote","%type-variable"],["qua-keyword","name"],["wat-string","foo"]],["%parse-type-spec",["qua-keyword","foo"]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","foo"],["qua-keyword","generic-params"],["quote",[]]],["%parse-type-spec",["quote","foo"]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","foo"],["qua-keyword","generic-params"],["quote",[]]],["%parse-type-spec",["quote",["foo"]]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","hash-set"],["qua-keyword","generic-params"],["list",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],["%parse-type-spec",["quote","number"]]]]],["%parse-type-spec",["quote",["hash-set","number"]]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","hash-set"],["qua-keyword","generic-params"],["list",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["qua-keyword","e"]],["qua-keyword","out-type"],["%parse-type-spec",["qua-keyword","e"]]]]],["%parse-type-spec",["quote",["hash-set",["qua-keyword","e"]]]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","hash-set"],["qua-keyword","generic-params"],["list",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],"%the-top-type"]]],["%parse-type-spec",["quote",["hash-set",[["qua-keyword","in"],"number"]]]]],null,null,null,null]

},{}],3:[function(require,module,exports){
(function (global){
// Native JS support
module.exports = function(vm, e) {
    // Make all JS functions callable as Lisp combiners
    vm.original_combine = vm.combine;
    vm.combine = function(m, e, cmb, o) {
        if (cmb instanceof Function) return vm.combine(m, e, vm.jswrap(cmb), o);
        else return vm.original_combine(m, e, cmb, o);
    };
    // Makes a Lisp function callable from JS
    vm.js_function = function(cmb) {
        return function() {
            var args = vm.array_to_list(Array.prototype.slice.call(arguments));
            return vm.combine(null, null, cmb, args);
        }
    };
    vm.JSObject = vm.defclass("js-object", ["object"], {});
    vm.JSArray = vm.defclass("js-array", ["js-object"], {});
    vm.JSFunction = vm.defclass("js-function", ["js-object"], {});
    vm.JSNumber = vm.defclass("js-number", ["number", "js-object"], {});
    vm.JSString = vm.defclass("js-string", ["string", "js-object"], {});
    vm.JSNull = vm.defclass("js-null", ["js-object"], {});
    vm.JSUndefined = vm.defclass("js-undefined", ["js-object"], {});
    vm.concrete_class_of_hook = function(obj) { // override obj.js
        switch (typeof(obj)) {
        case "string": return vm.JSString;
        case "number": return vm.JSNumber;
        case "boolean": return vm.Boolean;
        case "function": return vm.JSFunction;
        case "undefined": return vm.JSUndefined;
        default:
        if (obj === null) {
            return vm.JSNull;
        } else if (Array.isArray(obj)) {
            return vm.JSArray;
        } else {
            var proto = Object.getPrototypeOf(obj);
            if (proto) {
                return vm.unknown_class_hook(obj);
            } else {
                return vm.JSObject;
            }
        }
        }
    };
    vm.JSGlobal = vm.jswrap(function(name) { return global[name]; }); // from Browserify
    vm.js_binop = function(op) { return vm.jswrap(new Function("a", "b", "return (a " + op + " b)")); };
    vm.js_new = function(ctor) {
        var factoryFunction = ctor.bind.apply(ctor, arguments);
        return new factoryFunction(); }
    vm.defun(e, vm.sym("%%js-apply"), vm.jswrap(function(fun, self, args) { return fun.apply(self, args); }));
    vm.defun(e, vm.sym("%%js-binop"), vm.jswrap(vm.js_binop));
    vm.defun(e, vm.sym("%%js-function"), vm.jswrap(vm.js_function));
    vm.defun(e, vm.sym("%%js-get"), vm.jswrap(function(obj, name) { return obj[name]; }));
    vm.defun(e, vm.sym("%%js-global"), vm.JSGlobal);
    vm.defun(e, vm.sym("%%js-new"), vm.jswrap(vm.js_new));
    vm.defun(e, vm.sym("%%js-set"), vm.jswrap(function(obj, name, val) { return obj[name] = val; }));
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
// Plugin for the Qua VM that adds the delimcc API for delimited control.
// Documentation: http://okmij.org/ftp/continuations/implementations.html
// Also adds continuation-aware implementations of loops, exception handling,
// and dynamically-scoped variables.
module.exports = function(vm, e) {
    /* Continuations */
    function StackFrame(fun, next) { this.fun = fun; this.next = next; };
    function Resumption(k, f) { this.k = k; this.f = f; };
    function Suspension(prompt, handler) { this.prompt = prompt; this.handler = handler; this.k = null; };
    function isResumption(m) { return m instanceof Resumption; };
    function isSuspension(x) { return x instanceof Suspension; };
    function suspendFrame(sus, fun) { sus.k = new StackFrame(fun, sus.k); };
    function resumeFrame(k, f) { return k.fun(new Resumption(k.next, f)); };
    vm.monadic = function(m, a, b) { // override vm.js
        if (isResumption(m)) {
            var val = resumeFrame(m.k, m.f);
        } else {
            var val = a();
        }
        if (isSuspension(val)) {
            suspendFrame(val, function(m) { return vm.monadic(m, a, b); });
            return val;
        }
        return b(val);
    };
    /* Delimited control */
    vm.PushPrompt = vm.wrap({
        qua_combine: function do_push_prompt(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var body_thunk = vm.elt(o, 1);
            if (isResumption(m)) {
                var val = resumeFrame(m.k, m.f);
            } else {
                var val = vm.combine(null, e, body_thunk, vm.NIL);
            }
            if (isSuspension(val)) {
                if (val.prompt === prompt) {
                    var continuation = val.k;
                    var handler = val.handler;
                    return vm.combine(null, e, handler, vm.cons(continuation, vm.NIL));
                } else {
                    suspendFrame(val, function(m) { return do_push_prompt(self, m, e, o); });
                    return val;
                }
            }
            return val;
        }
    });
    vm.TakeSubcont = vm.wrap({
        qua_combine: function(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var handler = vm.elt(o, 1);
            var sus = new Suspension(prompt, handler);
            suspendFrame(sus, function(m) { return vm.combine(null, e, m.f, vm.NIL); });
            return sus;
        }
    });
    vm.PushSubcont = vm.wrap({
        qua_combine: function do_push_subcont(self, m, e, o) {
            var thek = vm.elt(o, 0);
            var thef = vm.elt(o, 1);
            if (isResumption(m)) {
                var val = resumeFrame(m.k, m.f);
            } else {
                var val = resumeFrame(thek, thef);
            }
            if (isSuspension(val)) {
                suspendFrame(val, function(m) { return do_push_subcont(self, m, e, o); });
                return val;
            }
            return val;
        }
    });
    vm.PushPromptSubcont = vm.wrap({
        qua_combine: function do_push_prompt_subcont(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var thek = vm.elt(o, 1);
            var thef = vm.elt(o, 2);
            if (isResumption(m)) {
                var val = resumeFrame(m.k, m.f);
            } else {
                var val = resumeFrame(thek, thef);
            }
            if (isSuspension(val)) {
                if (val.prompt === prompt) {
                    var continuation = val.k;
                    var handler = val.handler;
                    return vm.combine(null, e, handler, vm.cons(continuation, vm.NIL));
                } else {
                    suspendFrame(val, function(m) { return do_push_prompt_subcont(self, m, e, o); });
                    return val;
                }
            }
            return val;
        }
    });
    /* Simple control */
    vm.Loop = vm.wrap({
        qua_combine: function do_loop(self, m, e, o) {
            var body = vm.elt(o, 0);
            var first = true; // only resume once
            while (true) {
                if (first && isResumption(m)) {
                    var val = resumeFrame(m.k, m.f);
                } else {
                    var val = vm.combine(null, e, body, vm.NIL);
                }
                first = false;
                if (isSuspension(val)) {
                    suspendFrame(val, function(m) { return do_loop(self, m, e, o); });
                    return val;
                }
            }
        }
    });
    vm.raise = function(err, args) { throw err; };
    vm.Rescue = vm.wrap({
        qua_combine: function do_rescue(self, m, e, o) {
            var handler = vm.elt(o, 0);
            var body = vm.elt(o, 1);
            try {
                if (isResumption(m)) {
                    var val = resumeFrame(m.k, m.f);
                } else {
                    var val = vm.combine(null, e, body, vm.NIL);
                }
            } catch(exc) {
                // unwrap handler to prevent double eval of exception
                var val = vm.combine(null, e, vm.unwrap(handler), vm.list(exc));
            }
            if (isSuspension(val)) {
                suspendFrame(val, function(m) { return do_rescue(self, m, e, o); });
                return val;
            }
            return val;
        }
    });
    /* Dynamic Variables */
    vm.Dlet = vm.wrap({
        qua_combine: function dlet(self, m, e, o) {
            var dynvar = vm.elt(o, 0);
            var val = vm.elt(o, 1);
            var thunk = vm.elt(o, 2);
            var oldVal = dynvar.qs_val;
            dynvar.qs_val = val;
            try {
                if (isResumption(m)) {
                    var res = resumeFrame(m.k, m.f);
                } else {
                    var res = vm.combine(null, e, thunk, vm.NIL);
                }
                if (isSuspension(res)) {
                    suspendFrame(res, function(m) { return dlet(m, e, o); }, x, e);
                    return res;
                } else {
                    return res;
                }
            } finally {
                dynvar.qs_val = oldVal;
            }
        }
    });
    vm.defun(e, vm.sym("%%push-prompt"), vm.PushPrompt);
    vm.defun(e, vm.sym("%%take-subcont"), vm.TakeSubcont);
    vm.defun(e, vm.sym("%%push-subcont"), vm.PushSubcont);
    vm.defun(e, vm.sym("%%push-prompt-subcont"), vm.PushPromptSubcont);
    vm.defun(e, vm.sym("%%loop"), vm.Loop);
    vm.defun(e, vm.sym("%%raise"), vm.jswrap(vm.raise));
    vm.defun(e, vm.sym("%%rescue"), vm.Rescue);
    vm.defun(e, vm.sym("%%dynamic-let-1"), vm.Dlet);
}

},{}],5:[function(require,module,exports){
// Plugin for the Qua VM that adds a second namespace for functions.
// This should be loaded before anything else so that primitive
// functions defined in other modules go into the function namespace.
module.exports = function(vm, e) {
    // Add function namespace in addition to variable namespace.
    vm.FUN_NS = "f";
    // If the first element of a list form being evaluated is a
    // symbol, look up the symbol in the function namespace instead of
    // the variable namespace.
    vm.original_eval_operator = vm.eval_operator;
    vm.eval_operator = function(e, op) { // override vm.js
        if (op instanceof vm.Sym) {
            return vm.lookup(e, vm.to_fun_sym(op));
        } else {
            return vm.original_eval_operator(e, op);
        }
    };
    // Create a symbol in the function namespace.
    vm.fun_sym = function(name) { return vm.sym(name, vm.FUN_NS); };
    // Return a symbol that has the same name as the argument symbol,
    // but in the function namespace.
    vm.to_fun_sym = function(sym) {
        return vm.fun_sym(vm.assert_type(sym, vm.Sym).qs_name);
    };
    // Override the VM's function definition utility so that it puts
    // primitive functions into the function namespace.
    vm.original_defun = vm.defun;
    vm.defun = function(e, name, cmb) { // override vm.js
        vm.original_defun(e, vm.to_fun_sym(name), cmb);
    };
    // Primitives:
    vm.defun(e, vm.sym("%%to-fun-sym"), vm.jswrap(vm.to_fun_sym));
};

},{}],6:[function(require,module,exports){
(function (process){
var vm = require("./vm");
var parser = require("./read");
var init_bytecode = require("../build/out/init.js").main;
var test_bytecode = require("../build/out/test.js").main;
var e = vm.make_env();

vm.time("create vm", function() {
    require("./lisp-2")(vm, e);
    require("./cont")(vm, e);
    require("./alien")(vm, e);
    require("./print")(vm, e);
    require("./optim")(vm, e);
    require("./test")(vm, e);
    vm.init(e);
});
vm.time("run initialization",
        function() { vm.eval(parse_bytecode([vm.sym("%%progn")].concat(init_bytecode)), e); });

if (!process.browser) {
    vm.time("run tests",
            function() { vm.eval(parse_bytecode([vm.sym("%%progn")].concat(test_bytecode)), e) });
}

module.exports.vm = function() {
    return {
        "eval": function(str) { return vm.eval(parse_bytecode([vm.sym("%%progn")].concat(parser.parse_sexp(str))), e); }
    };
};

/* Bytecode parser */
function parse_bytecode(obj) {
    switch(Object.prototype.toString.call(obj)) {
    case "[object String]": 
        switch(obj) {
        case "#ign": return vm.IGN;
        case "#void": return vm.VOID;
        default: return vm.sym(obj);
        }
    case "[object Array]": return parse_bytecode_array(obj);
    default: return obj;
    }
}
function parse_bytecode_array(arr) {
    if ((arr.length == 2) && arr[0] === "wat-string") { return arr[1]; }
    if ((arr.length == 2) && arr[0] === "qua-function") { return vm.fun_sym(arr[1]); }
    if ((arr.length == 2) && arr[0] === "qua-keyword") { return vm.keyword(arr[1]); }
    var i = arr.indexOf(".");
    if (i === -1) return vm.array_to_list(arr.map(parse_bytecode));
    else { var front = arr.slice(0, i);
        return vm.array_to_list(front.map(parse_bytecode), parse_bytecode(arr[i + 1])); }
}

}).call(this,require('_process'))
},{"../build/out/init.js":1,"../build/out/test.js":2,"./alien":3,"./cont":4,"./lisp-2":5,"./optim":8,"./print":9,"./read":10,"./test":11,"./vm":14,"_process":19}],7:[function(require,module,exports){
// Object system
module.exports = function(vm) {
    /* Bootstrap CONCRETE-CLASS */
    vm.THE_GENERIC_CLASS_CONCRETE_CLASS = {
        "qs_name": "concrete-class",
        "qs_type-parameters": [],
        "qs_slots": {
            "generic-class": Object.create(null),
            "type-arguments": Object.create(null)
        },
        "qs_direct-superclasses": ["class"],
        prototype: Object.create(null)
    };
    vm.ConcreteClass = { // the concrete class
        "qs_generic-class": vm.THE_GENERIC_CLASS_CONCRETE_CLASS,
        "qs_type-arguments": [],
        prototype: vm.THE_GENERIC_CLASS_CONCRETE_CLASS.prototype
    };
    vm.ConcreteClass.qua_isa = vm.ConcreteClass;
    /* Bootstrap GENERIC-CLASS */
    vm.THE_GENERIC_CLASS_GENERIC_CLASS = {
        "qs_name": "generic-class",
        "qs_type-parameters": [],
        "qs_slots": {
            "name": Object.create(null),
            "type-parameters": Object.create(null),
            "methods": Object.create(null),
            "slots": Object.create(null),
            "direct-superclasses": Object.create(null)
        },
        "qs_direct-superclasses": ["class"],
        prototype: Object.create(null)
    };
    vm.GenericClass = { // the concrete class
        qua_isa: vm.ConcreteClass,
        "qs_generic-class": vm.THE_GENERIC_CLASS_GENERIC_CLASS,
        "qs_type-arguments": [],
        prototype: vm.THE_GENERIC_CLASS_GENERIC_CLASS.prototype
    };
    vm.THE_GENERIC_CLASS_CONCRETE_CLASS.qua_isa = vm.GenericClass;
    vm.THE_GENERIC_CLASS_GENERIC_CLASS.qua_isa = vm.GenericClass;
    /* Class registry */
    vm.GENERIC_CLASSES = Object.create(null);
    vm.CONCRETE_CLASSES = Object.create(null);
    vm.defclass = function(name, direct_superclasses, slots) {
        name = vm.designate_string(name);
        function generic_class() {};
        generic_class.qua_isa = vm.GenericClass;
        generic_class["qs_name"] = name;
        generic_class["qs_type-parameters"] = [];
        generic_class["qs_direct-superclasses"] =
            direct_superclasses.map(vm.designate_string);
        generic_class["qs_slots"] = slots ? slots : Object.create(null);
        vm.GENERIC_CLASSES[name] = generic_class;
        function concrete_class() {};
        concrete_class.qua_isa = vm.ConcreteClass;
        concrete_class["qs_generic-class"] = generic_class;
        concrete_class["qs_type-arguments"] = [];
        vm.CONCRETE_CLASSES[name] = concrete_class;
        // A concrete class' prototype is essentially superfluous but
        // required to support JS's instanceof (which determines
        // whether a constructor function's prototype occurs in the
        // prototype chain of an object).  We can share it with the
        // generic class, since a concrete class cannot have methods.
        concrete_class.prototype = generic_class.prototype;
        return concrete_class;
    };
    vm.find_concrete_class = function(name) {
        return vm.CONCRETE_CLASSES[vm.concrete_class_key(name)];
    };
    vm.find_generic_class = function(name) {
        return vm.GENERIC_CLASSES[vm.generic_class_key(name)];
    };
    // Classes, methods, and slots have names which can be specified
    // as symbols, keywords, strings, or class types from Lisp.
    // Internally, they're always strings.
    vm.designate_string = function(name) {
        if (name.hasOwnProperty("qs_name")) {
            return name.qs_name;
        } else {
            vm.assert_type(name, "string");
            return name;
        }
    };
    vm.concrete_class_key = function(name) {
        return vm.designate_string(name);
    };
    vm.generic_class_key = function(name) {
        return vm.designate_string(name);
    };
    vm.method_key = function(name) {
        return "qm_" + vm.designate_string(name);
    };
    vm.slot_key = function(name) {
        return "qs_" + vm.designate_string(name);
    };
    vm.designate_concrete_class = function(class_des) {
        if (vm.is_concrete_class(class_des)) {
            return class_des;
        } else {
            return vm.find_concrete_class(class_des);
        }
    };
    vm.designate_generic_class = function(class_des) {
        if (vm.is_generic_class(class_des)) {
            return class_des;
        } else {
            return vm.find_generic_class(class_des);
        }
    };
    /* Setup class hierarchy */
    vm.Object = vm.defclass("object", []);
    vm.StandardObject = vm.defclass("standard-object", ["object"]);
    vm.Class = vm.defclass("class", ["standard-object"]);
    vm.Combiner = vm.defclass("combiner", ["standard-object"]);
    vm.Fexpr = vm.defclass("fexpr", ["combiner"]);
    vm.Function = vm.defclass("function", ["combiner"]);
    vm.Number = vm.defclass("number", ["object"]);
    vm.String = vm.defclass("string", ["object"]);
    vm.Boolean = vm.defclass("boolean", ["object"]);
    /* Objects */
    vm.make_instance = function(class_des, initargs) {
        var concrete_class = vm.designate_concrete_class(class_des);
        var obj = vm.allocate_instance(concrete_class);
        return vm.initialize_instance(obj, initargs);
    };
    vm.allocate_instance = function(concrete_class) {
        vm.assert(vm.is_concrete_class(concrete_class));
        var obj = Object.create(concrete_class.prototype);
        obj.qua_isa = concrete_class;
        return obj;
    };
    vm.initialize_instance = function(obj, initargs) {
        var initargs_dict = vm.assert_type(initargs, "object");
        for (name in initargs_dict) {
            var value = initargs_dict[name];
            vm.set_slot_value(obj, name, value);
        }
        return obj;
    };
    vm.concrete_class_of = function(obj) {
        if (obj && obj.qua_isa) {
            return obj.qua_isa;
        } else {
            return vm.concrete_class_of_hook(obj);
        }
    };
    vm.concrete_class_of_hook = function(obj) { vm.panic("object is missing class: " + obj); };
    vm.unknown_class_hook = function(obj) { vm.panic("unknown class: " + obj); };
    vm.generic_class_of = function(obj) {
        var ccls = vm.concrete_class_of(obj);
        vm.assert(vm.is_concrete_class(ccls));
        return ccls["qs_generic-class"];
    };
    // Instanceof does not work for properly for the CONCRETE-CLASS
    // and GENERIC-CLASS classes themselves, so we need these crutches
    // to determine if an object is a class.
    vm.is_concrete_class = function(obj) {
        return obj && (obj.qua_isa === vm.ConcreteClass);
    };
    vm.is_generic_class = function(obj) {
        return obj && (obj.qua_isa === vm.GenericClass);
    };
    /* Methods */
    vm.put_method = function(generic_class, name, combiner) {
        vm.assert(vm.is_generic_class(generic_class));
        vm.assert((combiner instanceof vm.Opv) || (combiner instanceof vm.Apv));
        generic_class.prototype[vm.method_key(name)] = combiner;
        return combiner;
    };
    vm.find_method = function(obj, name) {
        var key = vm.method_key(name);
        if (obj && obj[key]) {
            return obj[key];
        } else {
            return vm.find_method_using_concrete_class(obj, vm.concrete_class_of(obj), name);
        }
    };
    vm.find_method_using_concrete_class = function(obj, cls, name) {
        vm.assert(vm.is_concrete_class(cls));
        return vm.find_method_using_generic_class(obj, cls["qs_generic-class"], name);
    };
    vm.find_method_using_generic_class = function(obj, gcls, name) {
        vm.assert(vm.is_generic_class(gcls));
        var key = vm.method_key(name);
        if (gcls.prototype[key]) {
            return gcls.prototype[key];
        } else {
            var methods = vm.find_superclass_methods(obj, gcls, name);
            switch (methods.length) {
            case 0: return null;
            case 1: return methods[0];
            default: return vm.ambiguous_method_hook(obj, name);
            }
        }
    };
    vm.find_superclass_methods = function(obj, gcls, name) {
        var methods = [];
        var superclass_names = gcls["qs_direct-superclasses"];
        superclass_names.forEach(function(superclass_name) {
                var gsuper = vm.GENERIC_CLASSES[vm.generic_class_key(superclass_name)];
                vm.assert(vm.is_generic_class(gsuper));
                // TODO: not reentrant
                var method = vm.find_method_using_generic_class(obj, gsuper, name);
                if (method) {
                    methods.push(method);
                }
            });
        return methods;
    };
    /* Slots */
    vm.slot_value = function(obj, name) {
        var key = vm.slot_key(name);
        if (obj.hasOwnProperty(key)) {
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
        return obj && obj.hasOwnProperty(key);
    };
    vm.slot_unbound_hook = function(obj, name) {
        return vm.error("slot unbound: " + vm.designate_string(name));
    };
};

},{}],8:[function(require,module,exports){
module.exports = function(vm, e) {
    vm.list_star = function() {
        var len = arguments.length; var c = len >= 1 ? arguments[len-1] : vm.NIL;
        for (var i = len-1; i > 0; i--) c = vm.cons(arguments[i - 1], c); return c;
    };
    vm.plist_to_js_object = function(plist, obj) {
        obj = (obj !== undefined) ? obj : Object.create(null);
        if (plist === vm.NIL) {
            return obj;
        } else {
            var name = vm.assert_type(vm.elt(plist, 0), vm.Keyword);
            var value = vm.elt(plist, 1);
            obj[vm.designate_string(name)] = value;
            return vm.plist_to_js_object(vm.cdr(vm.cdr(plist)), obj);
        }
    };
    vm.defun(e, vm.sym("%%list*"), vm.jswrap(vm.list_star));
    vm.defun(e, vm.sym("%%plist-to-js-object"), vm.jswrap(vm.plist_to_js_object));
}

},{}],9:[function(require,module,exports){
module.exports = function(vm, e) {
    vm.to_sexp = function(obj) {
        return obj.qua_to_sexp(obj);
    };
    vm.to_str = function(sexp) {
        return sexp.qua_to_str(sexp);
    };
    vm.Sym.prototype.qua_to_str = function(self) { return self.name; };
    vm.Cons.prototype.qua_to_str = function(self) {
        var elements = vm.map_list(self, vm.to_str);
        return "(" + vm.list_to_array(elements).join(" ") + ")";
    };
}

},{}],10:[function(require,module,exports){
var jsparse = require("jsparse");
module.exports.parse_sexp = parse_sexp;

var ps = jsparse.ps; var choice = jsparse.choice; var range = jsparse.range; var action = jsparse.action; var sequence = jsparse.sequence; var join = jsparse.join; var join_action = jsparse.join_action; var negate = jsparse.negate; var repeat0 = jsparse.repeat0; var optional = jsparse.optional; var repeat1 = jsparse.repeat1; var wsequence = jsparse.wsequence; var whitespace = jsparse.whitespace; var ch = jsparse.ch; var butnot = jsparse.butnot;

/* S-expr parser */
function parse_sexp(s) {
    var res = program_stx(ps(s));
    if (res.remaining.index === s.length) return res.ast;
    else throw("parse error at " + res.remaining.index + " in " + s); }
var x_stx = function(input) { return x_stx(input); }; // forward decl.
var id_special_char =
    choice(":", "-", "&", "!", "=", ">", "<", "%", "+", "?", "/", "*", "$", "_", "#", ".", "@", "|", "~", "^", "'");
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

},{"jsparse":18}],11:[function(require,module,exports){
// Adds utility functions for testing the built-ins to a VM
var deep_equal = require("deep-equal");
module.exports = function(vm, e) {
    vm.defun(e, vm.sym("%%assert"), vm.jswrap(vm.assert));
    vm.defun(e, vm.sym("%%deep-equal"), vm.jswrap(deep_equal));
};

},{"deep-equal":15}],12:[function(require,module,exports){
// Type system
module.exports = function(vm) {
    vm.Type = vm.defclass("%type", ["standard-object"], {});
    vm.TypeVar = vm.defclass("%type-variable", ["%type"], { "name": {} });
    vm.TypeVar.prototype = Object.create(vm.Type.prototype);
    vm.ClassType = vm.defclass("%class-type", ["%type"], { "name": {}, "generic-params": {} });
    vm.ClassType.prototype = Object.create(vm.Type.prototype);
    vm.GenericParam = vm.defclass("%generic-param", ["standard-object"], { "in-type": {}, "out-type": {} });
    vm.typep = function(obj, type_designator) {
        var gcls = vm.generic_class_of(obj);
        var class_type = vm.designate_type(type_designator);
        vm.assert_type(class_type, vm.ClassType);
        var other_gcls = vm.find_generic_class(vm.slot_value(class_type, "name"));
        return vm.generic_subclassp(gcls, other_gcls);
    };
    vm.designate_type = function(type_designator) {
        if (type_designator instanceof vm.ClassType) {
            return type_designator;
        } else if (type_designator instanceof vm.Sym) {
            return vm.make_instance(vm.ClassType,
                                    { "name": vm.sym_name(type_designator),
                                      "generic-params": [] });
        } else {
            return vm.error("Illegal type designator: " + JSON.stringify(type_designator));
        }
    };
    vm.generic_subclassp = function(generic_class, other_class) {
        vm.assert(vm.is_generic_class(generic_class));
        vm.assert(vm.is_generic_class(other_class));
        if (generic_class === other_class) {
            return true;
        } else {
            var tag = {};
            var superclass_names = generic_class["qs_direct-superclasses"];
            try {
                superclass_names.forEach(function(superclass_name) {
                        var superclass = vm.GENERIC_CLASSES[vm.generic_class_key(superclass_name)];
                        vm.assert(vm.is_generic_class(superclass));
                        if (vm.generic_subclassp(superclass, other_class)) {
                            throw tag;
                        }
                    });
            } catch(exc) {
                if (exc === tag) {
                    return true;
                } else {
                    throw exc;
                }
            }
            return false;
        }
    };
};

},{}],13:[function(require,module,exports){
module.exports = function(vm) {
    vm.assert_type = function(obj, type_spec) {
        if (vm.check_type(obj, type_spec)) return obj;
        else return vm.panic("type error: " + obj + " should be " + type_spec + " but is " + obj);
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
    vm.error = function(err) { throw new Error(err); };
    vm.panic = vm.error;
    vm.time = function(name, fun) {
        var start = new Date().getTime();
        fun();
        var end = new Date().getTime();
        var time = end - start;
        console.log(name + ": "  + time + "ms");
    };
};

},{}],14:[function(require,module,exports){
var vm = module.exports;
require("./util")(vm);
require("./obj")(vm);
require("./type")(vm);
/* Evaluation */
vm.evaluate = function(m, e, x) {
    if (x && x.qua_evaluate) return x.qua_evaluate(x, m, e); else return x;
};
vm.THE_CLASS_SYM = vm.defclass("symbol", ["standard-object"], { "name": {}, "ns": {} });
vm.Sym = function Sym(name, ns) { this.qs_name = name; this.qs_ns = ns; };
vm.Sym.prototype.qua_evaluate = function(self, m, e) {
    return vm.lookup(e, self);
};
vm.THE_CLASS_CONS = vm.defclass("cons", ["standard-object"], { "car": {}, "cdr": {} });
vm.Cons = function Cons(car, cdr) { this.qs_car = car; this.qs_cdr = cdr; };
vm.Cons.prototype.qua_evaluate = function(self, m, e) {
    return vm.monadic(m,
                      function() { return vm.eval_operator(e, vm.car(self)); },
                      function(cmb) { return vm.combine(null, e, cmb, vm.cdr(self)); });
};
vm.eval_operator = function(e, op) {
    return vm.evaluate(null, e, op);
};
/* Combiners */
vm.combine = function(m, e, cmb, o) {
    if (cmb && cmb.qua_combine) return cmb.qua_combine(cmb, m, e, o);
    else return vm.error("not a combiner: " + cmb);
};
vm.Opv = function(p, ep, x, e) { this.p = p; this.ep = ep; this.x = x; this.e = e; };
vm.Apv = function(cmb) { this.cmb = cmb; };
vm.wrap = function(cmb) { return new vm.Apv(cmb); };
vm.unwrap = function(apv) { return apv.cmb; };
vm.Opv.prototype.qua_combine = function(self, m, e, o) {
    var xe = vm.make_env(self.e);
    return vm.monadic(m,
                      function() { return vm.bind(xe, self.p, o); },
                      function() {
                          return vm.monadic(m,
                                            function() { return vm.bind(xe, self.ep, e); },
                                            function() { return vm.evaluate(null, xe, self.x); }); });
};
vm.Apv.prototype.qua_combine = function(self, m, e, o) {
    return vm.monadic(m,
                      function() { return vm.eval_args(null, e, o, vm.NIL); },
                      function(args) { return vm.combine(null, e, self.cmb, args); });
};
vm.eval_args = function(m, e, todo, done) {
    if (vm.is_nil(todo)) { return vm.reverse_list(done); }
    return vm.monadic(m, 
                      function() { return vm.evaluate(null, e, vm.car(todo)); },
                      function(arg) { return vm.eval_args(null, e, vm.cdr(todo), vm.cons(arg, done)); });
};
/* Built-in combiners */
vm.Vau = {
    qua_combine: function(self, m, e, o) {
        var p = vm.elt(o, 0);
        var ep = vm.elt(o, 1);
        var x = vm.elt(o, 2);
        return new vm.Opv(p, ep, x, e);
    }
};
vm.Def = {
    qua_combine: function (self, m, e, o) {
        var lhs = vm.elt(o, 0);
        var rhs = vm.elt(o, 1);
        return vm.monadic(m,
                          function() { return vm.evaluate(null, e, rhs); },
                          function(val) { return vm.bind(e, lhs, val, vm.do_def); });
    }
};
vm.Setq = {
    qua_combine: function (self, m, e, o) {
        var lhs = vm.elt(o, 0);
        var rhs = vm.elt(o, 1);
        return vm.monadic(m,
                          function() { return vm.evaluate(null, e, rhs); },
                          function(val) { return vm.bind(e, lhs, val, vm.do_setq); });
    }
};
vm.Eval = vm.wrap({
        qua_combine: function(self, m, e, o) {
            var x = vm.elt(o, 0);
            var e = vm.elt(o, 1);
            return vm.evaluate(m, e, x);
        }
    });
vm.If = {
    qua_combine: function(self, m, e, o) {
        return vm.monadic(m,  
                          function() { return vm.evaluate(null, e, vm.elt(o, 0)); },
                          function(test) {
                              return vm.evaluate(null, e, test ? vm.elt(o, 1) : vm.elt(o, 2));
                          });
    }
};
vm.Progn = {
    qua_combine: function(self, m, e, o) {
        if (vm.is_nil(o)) return vm.VOID; else return vm.progn(m, e, o);
    }
};
vm.progn = function(m, e, xs) {
    return vm.monadic(m,
                      function() { return vm.evaluate(null, e, vm.car(xs)); },
                      function(res) {
                          var cdr = vm.cdr(xs);
                          if (vm.is_nil(cdr)) return res; else return vm.progn(null, e, cdr);
                      });
};
/* JS function combiners */
vm.JSFun = function(jsfun) { this.jsfun = vm.assert_type(jsfun, "function"); };
vm.JSFun.prototype.qua_combine = function(self, m, e, o) {
    return self.jsfun.apply(null, vm.list_to_array(o));
};
vm.jswrap = function(jsfun) { return vm.wrap(new vm.JSFun(jsfun)); };
/* Forms */
vm.VAR_NS = "v";
vm.sym = function(name, ns) { var s = new vm.Sym(name, ns ? ns : vm.VAR_NS); s.qua_isa = vm.THE_CLASS_SYM; return s; };
vm.sym_key = function(sym) { return sym.qs_name + "_" + sym.qs_ns; };
vm.sym_name = function(sym) { return vm.assert_type(sym, vm.Sym).qs_name; };
vm.cons = function cons(car, cdr) { var c = new vm.Cons(car, cdr); c.qua_isa = vm.THE_CLASS_CONS; return c; }
vm.car = function(cons) { return vm.assert_type(cons, vm.Cons).qs_car; };
vm.cdr = function(cons) { return vm.assert_type(cons, vm.Cons).qs_cdr; };
vm.elt = function(cons, i) { return (i === 0) ? vm.car(cons) : vm.elt(vm.cdr(cons), i - 1); };
vm.THE_CLASS_KEYWORD = vm.defclass("keyword", ["standard-object"], { "name": {} });
vm.Keyword = function Keyword(name) { this.qs_name = name; }
vm.keyword = function(name) { var k = new vm.Keyword(name); k.qua_isa = vm.THE_CLASS_KEYWORD; return k; };
vm.Nil = function Nil() {}; vm.NIL = new vm.Nil();
vm.is_nil = function(obj) { return obj === vm.NIL; };
vm.Ign = function Ign() {}; vm.IGN = new vm.Ign();
vm.Void = function Void() {}; vm.VOID = new vm.Void();
/* Environments */
vm.Env = function(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
    this.parent = parent;
};
vm.lookup = function(e, sym) {
    vm.assert_type(e, vm.Env);
    vm.assert_type(sym, vm.Sym);
    var key = vm.sym_key(sym);
    if (key in e.bindings) return e.bindings[key];
    else return vm.error("unbound: " + sym.qs_name + " (" + sym.qs_ns + ")");
};
vm.bind = function(e, lhs, rhs, doit) {
    vm.assert_type(e, vm.Env);
    if (lhs.qua_bind) return lhs.qua_bind(lhs, e, rhs, doit ? doit : vm.do_def);
    else return vm.error("cannot match", { lhs: lhs, rhs: rhs });
};
vm.do_def = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    return e.bindings[vm.sym_key(lhs)] = rhs;
};
vm.do_setq = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    if (Object.prototype.hasOwnProperty.call(e.bindings, vm.sym_key(lhs)))
        return vm.do_def(e, lhs, rhs);
    else if (e.parent)
        return vm.do_setq(e.parent, lhs, rhs);
    else
        return vm.error("cannot set unbound variable: " + lhs.qs_name);
};
vm.Sym.prototype.qua_bind = function(self, e, rhs, doit) {
    return doit(e, self, rhs);
};
vm.Cons.prototype.qua_bind = function(self, e, rhs, doit) {
    return vm.monadic(null,
                      function() { return vm.bind(e, vm.car(self), vm.car(rhs), doit); },
                      function() { return vm.bind(e, vm.cdr(self), vm.cdr(rhs), doit); });
};
vm.Nil.prototype.qua_bind = function(self, e, rhs, doit) {
    if (!vm.is_nil(rhs)) return vm.error("NIL expected, but got: " + JSON.stringify(rhs));
};
vm.Keyword.prototype.qua_bind = function(self, e, rhs, doit) {
    if (!(rhs && (rhs instanceof vm.Keyword) && (rhs.qs_name === self.qs_name))) {
        return vm.error(":" + self.qs_name + " expected, but got: " + JSON.stringify(rhs));
    }
};
vm.Ign.prototype.qua_bind = function(self, e, rhs, doit) {};
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
/* API */
vm.make_env = function(parent) { return new vm.Env(parent); };
vm.def = vm.bind;
vm.defun = vm.bind;
vm.init = function(e) {
    // Forms
    vm.defun(e, vm.sym("%%car"), vm.jswrap(vm.car));
    vm.defun(e, vm.sym("%%cdr"), vm.jswrap(vm.cdr));
    vm.defun(e, vm.sym("%%cons"), vm.jswrap(vm.cons));
    // Evaluation
    vm.defun(e, vm.sym("%%def"), vm.Def);
    vm.defun(e, vm.sym("%%eval"), vm.Eval);
    vm.defun(e, vm.sym("%%if"), vm.If);
    vm.defun(e, vm.sym("%%progn"), vm.Progn);
    vm.defun(e, vm.sym("%%setq"), vm.Setq);
    // Combiners
    vm.defun(e, vm.sym("%%vau"), vm.Vau);
    vm.defun(e, vm.sym("%%wrap"), vm.jswrap(vm.wrap));
    vm.defun(e, vm.sym("%%unwrap"), vm.jswrap(vm.unwrap));
    // Environments
    vm.defun(e, vm.sym("%%make-environment"), vm.jswrap(vm.make_env));
    // Object system
    vm.defun(e, vm.sym("%%concrete-class-of"), vm.jswrap(vm.concrete_class_of));
    vm.defun(e, vm.sym("%%ensure-class"), vm.jswrap(vm.defclass));
    vm.defun(e, vm.sym("%%find-concrete-class"), vm.jswrap(vm.find_concrete_class));
    vm.defun(e, vm.sym("%%find-generic-class"), vm.jswrap(vm.find_generic_class));
    vm.defun(e, vm.sym("%%find-method"), vm.jswrap(vm.find_method));
    vm.defun(e, vm.sym("%%generic-class-of"), vm.jswrap(vm.generic_class_of));
    vm.defun(e, vm.sym("%%make-instance"), vm.jswrap(vm.make_instance));
    vm.defun(e, vm.sym("%%put-method"), vm.jswrap(vm.put_method));
    vm.defun(e, vm.sym("%%set-slot-value"), vm.jswrap(vm.set_slot_value));
    vm.defun(e, vm.sym("%%slot-bound?"), vm.jswrap(vm.slot_bound_p));
    vm.defun(e, vm.sym("%%slot-value"), vm.jswrap(vm.slot_value));
    vm.defun(e, vm.sym("%%instance?"), vm.jswrap(vm.typep));
    // Misc
    vm.defun(e, vm.sym("%%eq"), vm.jswrap(function(a, b) { return a === b; }));
    vm.defun(e, vm.sym("%%print"), vm.jswrap(console.log));
    vm.defun(e, vm.sym("%%list-to-array"), vm.jswrap(vm.list_to_array));
};
vm.eval = function(x, e) {
    return vm.evaluate(null, e, x); // change to x,e
};

},{"./obj":7,"./type":12,"./util":13}],15:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":16,"./lib/keys.js":17}],16:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],17:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],18:[function(require,module,exports){
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


},{}],19:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[6])(6)
});
