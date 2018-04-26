module.exports.main = [null,null,null,null,null,null,null,null,null,["%%def",["qua-function","def"],["qua-function","%%def"]],null,["def",["qua-function","car"],["qua-function","%%car"]],null,["def",["qua-function","cdr"],["qua-function","%%cdr"]],null,["def",["qua-function","cons"],["qua-function","%%cons"]],null,["def",["qua-function","identical?"],["qua-function","%%eq"]],null,["def",["qua-function","eval"],["qua-function","%%eval"]],null,["def",["qua-function","if"],["qua-function","%%if"]],null,["def",["qua-function","make-environment"],["qua-function","%%make-environment"]],null,["def",["qua-function","print"],["qua-function","%%print"]],null,["def",["qua-function","progn"],["qua-function","%%progn"]],null,["def",["qua-function","setq"],["qua-function","%%setq"]],null,["def",["qua-function","unwrap"],["qua-function","%%unwrap"]],null,["def",["qua-function","wrap"],["qua-function","%%wrap"]],null,null,["def",["qua-function","concrete-class-of"],["qua-function","%%concrete-class-of"]],["def",["qua-function","ensure-class"],["qua-function","%%ensure-class"]],["def",["qua-function","find-concrete-class"],["qua-function","%%find-concrete-class"]],["def",["qua-function","find-generic-class"],["qua-function","%%find-generic-class"]],["def",["qua-function","find-method"],["qua-function","%%find-method"]],["def",["qua-function","generic-class-of"],["qua-function","%%generic-class-of"]],["def",["qua-function","instance?"],["qua-function","%%instance?"]],["def",["qua-function","put-method"],["qua-function","%%put-method"]],["def",["qua-function","set-slot-value"],["qua-function","%%set-slot-value"]],["def",["qua-function","slot-bound?"],["qua-function","%%slot-bound?"]],["def",["qua-function","slot-value"],["qua-function","%%slot-value"]],null,["def",["qua-function","js-apply"],["qua-function","%%js-apply"]],["def",["qua-function","js-function"],["qua-function","%%js-function"]],["def",["qua-function","js-get"],["qua-function","%%js-get"]],["def",["qua-function","js-global"],["qua-function","%%js-global"]],["def",["qua-function","js-new"],["qua-function","%%js-new"]],["def",["qua-function","js-set"],["qua-function","%%js-set"]],null,null,["def",["qua-function","%to-fun-sym"],["qua-function","%%to-fun-sym"]],null,null,["def",["qua-function","list*"],["qua-function","%%list*"]],null,["def",["qua-function","list-to-js-array"],["qua-function","%%list-to-array"]],null,["def",["qua-function","quote"],["%%vau",["op"],"#ign","op"]],null,["def",["qua-function","list"],["wrap",["%%vau","args","#ign","args"]]],null,["def",["qua-function","the-environment"],["%%vau","#ign","env","env"]],null,null,null,["def",["qua-function","vau"],["%%vau",["params","env-param",".","body"],"env",["eval",["list",["qua-function","%%vau"],"params","env-param",["list*",["qua-function","progn"],"body"]],"env"]]],null,["def",["qua-function","deffexpr"],["vau",["name","params","env-param",".","body"],"env",["eval",["list",["qua-function","def"],["%to-fun-sym","name"],["list*",["qua-function","vau"],"params","env-param","body"]],"env"]]],null,null,["def",["qua-function","make-macro"],["wrap",["vau",["expander"],"#ign",["vau","form","env",["eval",["eval",["cons","expander","form"],["make-environment"]],"env"]]]]],null,["def",["qua-function","macro"],["make-macro",["vau",["params",".","body"],"#ign",["list",["qua-function","make-macro"],["list*",["qua-function","vau"],"params","#ign","body"]]]]],null,["def",["qua-function","defmacro"],["macro",["name","params",".","body"],["list",["qua-function","def"],["%to-fun-sym","name"],["list*",["qua-function","macro"],"params","body"]]]],null,null,["defmacro","%lambda",["params",".","body"],["list",["qua-function","wrap"],["list*",["qua-function","vau"],"params","#ign","body"]]],null,null,["defmacro","%defun",["name","params",".","body"],["list",["qua-function","def"],["%to-fun-sym","name"],["list*",["qua-function","%lambda"],"params","body"]]],null,null,["def",["qua-function","lambda"],["qua-function","%lambda"]],["def",["qua-function","defun"],["qua-function","%defun"]],null,["defun","apply",["fun","args",".","opt-env"],["eval",["cons",["unwrap","fun"],"args"],["optional","opt-env",["make-environment"]]]],null,null,["defun","funcall",["fun",".","args"],["apply","fun","args"]],null,null,["defun","compose",[["qua-function","f"],["qua-function","g"]],["lambda",["arg"],["f",["g","arg"]]]],null,null,["defun","nil?",["obj"],["identical?","obj",[]]],["defun","void?",["obj"],["identical?","obj","#void"]],["def",["qua-function","caar"],["compose",["qua-function","car"],["qua-function","car"]]],["def",["qua-function","cadr"],["compose",["qua-function","car"],["qua-function","cdr"]]],["def",["qua-function","cdar"],["compose",["qua-function","cdr"],["qua-function","car"]]],["def",["qua-function","cddr"],["compose",["qua-function","cdr"],["qua-function","cdr"]]],["defun","symbol?",["sym"],["%%instance?","sym",["quote","symbol"]]],["defun","keyword?",["obj"],["%%instance?","obj",["quote","keyword"]]],["defun","cons?",["cons"],["%%instance?","cons",["quote","cons"]]],["defun","symbol-name",["sym"],["slot-value","sym",["quote","name"]]],null,["defun","map-list",[["qua-function","fun"],"list"],["if",["nil?","list"],[],["cons",["fun",["car","list"]],["map-list",["qua-function","fun"],["cdr","list"]]]]],["def",["qua-function","for-each"],["qua-function","map-list"]],["defun","fold-list",[["qua-function","fun"],"init","list"],["if",["nil?","list"],"init",["fold-list",["qua-function","fun"],["fun","init",["car","list"]],["cdr","list"]]]],null,null,null,["defmacro","let",["bindings",".","body"],["list*",["list*",["qua-function","lambda"],["map-list",["qua-function","car"],"bindings"],"body"],["map-list",["qua-function","cadr"],"bindings"]]],null,null,["defmacro","let*",["bindings",".","body"],["if",["nil?","bindings"],["list*",["qua-function","let"],[],"body"],["list",["qua-function","let"],["list",["car","bindings"]],["list*",["qua-function","let*"],["cdr","bindings"],"body"]]]],null,null,["defmacro","%letrec",["bindings",".","body"],["list*",["qua-function","let"],[],["list",["qua-function","def"],["map-list",["qua-function","car"],"bindings"],["list*",["qua-function","list"],["map-list",["qua-function","cadr"],"bindings"]]],"body"]],null,["defun","%fun-binding-xform",[["fun-name","fun-params",".","fun-body"]],["list",["%to-fun-sym","fun-name"],["list*",["qua-function","lambda"],"fun-params","fun-body"]]],null,["defmacro","flet",["fun-bindings",".","body"],["list*",["qua-function","let"],["map-list",["qua-function","%fun-binding-xform"],"fun-bindings"],"body"]],null,["defmacro","labels",["fun-bindings",".","body"],["list*",["qua-function","%letrec"],["map-list",["qua-function","%fun-binding-xform"],"fun-bindings"],"body"]],null,["defun","not",["boolean"],["if","boolean",false,true]],["deffexpr","cond","clauses","env",["if",["nil?","clauses"],"#void",["let",[[[["test",".","body"],".","clauses"],"clauses"]],["if",["eval","test","env"],["apply",["wrap",["qua-function","progn"]],"body","env"],["apply",["wrap",["qua-function","cond"]],"clauses","env"]]]]],["deffexpr","and","ops","env",["cond",[["nil?","ops"],true],[["nil?",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],["apply",["wrap",["qua-function","and"]],["cdr","ops"],"env"]],[true,false]]],["deffexpr","or","ops","env",["cond",[["nil?","ops"],false],[["nil?",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],true],[true,["apply",["wrap",["qua-function","or"]],["cdr","ops"],"env"]]]],null,null,["def",["qua-function","equal?"],["qua-function","%%eq"]],["defun","optional",["opt-arg",".","opt-default"],["if",["nil?","opt-arg"],["if",["nil?","opt-default"],"#void",["car","opt-default"]],["car","opt-arg"]]],["def",["qua-function","defconstant"],["qua-function","def"]],null,["defconstant","%setter-prop",["wat-string","qua_setter"]],["defun","setter",["obj"],["js-get","obj","%setter-prop"]],["js-set",["qua-function","setter"],"%setter-prop",["lambda",["new-setter","getter"],["js-set","getter","%setter-prop","new-setter"]]],["defmacro","setf",["place","new-val"],["if",["symbol?","place"],["list",["qua-function","setq"],"place","new-val"],["let*",[[["getter-form",".","args"],"place"],["getter",["if",["symbol?","getter-form"],["%to-fun-sym","getter-form"],"getter-form"]]],["list*",["list",["qua-function","setter"],"getter"],"new-val","args"]]]],["defmacro","incf",["place",".","opt-increment"],["let",[["increment",["optional","opt-increment",1]]],["list",["qua-function","setf"],"place",["list",["qua-function","+"],"place","increment"]]]],["defmacro","decf",["place",".","opt-decrement"],["let",[["decrement",["optional","opt-decrement",1]]],["list",["qua-function","setf"],"place",["list",["qua-function","-"],"place","decrement"]]]],null,["defun","make-instance",["class-desig",".","initargs"],["%%make-instance","class-desig",["plist-to-js-object","initargs"]]],["defun","call-method",["obj","name","args"],["let",[["method",["find-method","obj","name"]]],["apply","method","args"]]],["deffexpr","defgeneric",["name","#ign"],"env",["eval",["list",["qua-function","def"],["%to-fun-sym","name"],["lambda","args",["call-method",["car","args"],"name","args"]]],"env"]],["deffexpr","defmethod",["name",[["self","class-spec"],".","args"],".","body"],"env",["let",[["class",["find-generic-class","class-spec"]],["fun",["eval",["list*",["qua-function","lambda"],["list*","self","args"],"body"],"env"]]],["put-method","class","name","fun"],"name"]],["deffexpr","defclass",["class-spec","superclass-specs",".","#ign"],"#ign",["ensure-class","class-spec",["list-to-js-array","superclass-specs"]]],["defgeneric","hash-object",["self"]],["defgeneric","compare-object",["self"]],["defgeneric","print-object",["self","stream"]],null,["defmacro","loop","body",["list",["qua-function","%%loop"],["list*",["qua-function","lambda"],[],"body"]]],["deffexpr","while",["test",".","body"],"env",["let",[["body",["list*",["qua-function","progn"],"body"]]],["block","exit",["loop",["if",["eval","test","env"],["eval","body","env"],["return-from","exit"]]]]]],["defmacro","if",["test","then","else"],["list",["qua-function","%%if"],"test","then","else"]],["defmacro","when",["test",".","body"],["list",["qua-function","if"],"test",["list*",["qua-function","progn"],"body"],"#void"]],["defmacro","unless",["test",".","body"],["list",["qua-function","if"],"test","#void",["list*",["qua-function","progn"],"body"]]],["defun","%call-with-escape",[["qua-function","fun"]],["let*",[["tag",["list",["quote","tag"]]],["escape",["lambda","opt-val",["let",[["val",["optional","opt-val"]]],["%%raise",["list","tag","val"]]]]]],["%%rescue",["lambda",["exc"],["if",["and",["cons?","exc"],["identical?","tag",["car","exc"]]],["cadr","exc"],["%%raise","exc"]]],["lambda",[],["fun","escape"]]]]],["defmacro","block",["name",".","body"],["list",["qua-function","%call-with-escape"],["list*",["qua-function","lambda"],["list","name"],"body"]]],["defun","return-from",["escape",".","opt-val"],["apply","escape","opt-val"]],["deffexpr","prog1","forms","env",["if",["nil?","forms"],"#void",["let",[["result",["eval",["car","forms"],"env"]]],["eval",["list*",["qua-function","progn"],["cdr","forms"]],"env"],"result"]]],["defmacro","prog2",["form",".","forms"],["list",["qua-function","progn"],"form",["list*",["qua-function","prog1"],"forms"]]],["defun","unwind-protect*",[["qua-function","protected-thunk"],["qua-function","cleanup-thunk"]],["prog1",["%%rescue",["lambda",["exc"],["cleanup-thunk"],["%%raise","exc"]],["qua-function","protected-thunk"]],["cleanup-thunk"]]],["defmacro","unwind-protect",["protected-form",".","cleanup-forms"],["list",["qua-function","unwind-protect*"],["list",["qua-function","lambda"],[],"protected-form"],["list*",["qua-function","lambda"],[],"cleanup-forms"]]],["deffexpr","case",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["for-each",["lambda",[["other-val",".","body"]],["when",["equal?","val",["eval","other-val","env"]],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]]]],"clauses"],"#void"]]],null,["defclass","mut",["standard-object"],["val"]],["defun","mut",["val"],["make-instance",["quote","mut"],["qua-keyword","val"],"val"]],["defun","ref",["mut"],["slot-value","mut",["quote","val"]]],["setf",["setter",["qua-function","ref"]],["lambda",["new-val","mut"],["set-slot-value","mut",["quote","val"],"new-val"]]],null,["defmacro","push-prompt",["prompt",".","body"],["list",["qua-function","%%push-prompt"],"prompt",["list*",["qua-function","lambda"],[],"body"]]],["defmacro","take-subcont",["prompt","name",".","body"],["list",["qua-function","%%take-subcont"],"prompt",["list*",["qua-function","lambda"],["list","name"],"body"]]],["defmacro","push-subcont",["continuation",".","body"],["list",["qua-function","%%push-subcont"],"continuation",["list*",["qua-function","lambda"],[],"body"]]],["defmacro","push-prompt-subcont",["prompt","continuation",".","body"],["list",["qua-function","%%push-prompt-subcont"],"prompt","continuation",["list*",["qua-function","lambda"],[],"body"]]],["defconstant","the-default-prompt",["qua-keyword","the-default-prompt"]],["defmacro","push-default-prompt","body",["list*",["qua-function","push-prompt"],"the-default-prompt","body"]],["defmacro","take-default-subcont",["name",".","body"],["list*",["qua-function","take-subcont"],"the-default-prompt","name","body"]],["defmacro","push-default-subcont",["continuation",".","body"],["list*",["qua-function","push-prompt-subcont"],"the-default-prompt","continuation","body"]],null,["defmacro","defdynamic",["name",".","opt-val"],["list",["qua-function","def"],"name",["list",["qua-function","mut"],["optional","opt-val"]]]],["def",["qua-function","dynamic"],["qua-function","ref"]],["def",["qua-function","%dynamic-let-1"],["qua-function","%%dynamic-let-1"]],["deffexpr","dynamic-let",["bindings",".","body"],"env",["let",[["pairs",["map-list",["lambda",[["dynamic-name","expr"]],["cons",["eval","dynamic-name","env"],["eval","expr","env"]]],"bindings"]]],["labels",[["process-pairs",["pairs"],["if",["nil?","pairs"],["eval",["list*",["qua-function","progn"],"body"],"env"],["let*",[[[["dynamic",".","value"],".","rest-pairs"],"pairs"]],["%dynamic-let-1","dynamic","value",["lambda",[],["process-pairs","rest-pairs"]]]]]]],["process-pairs","pairs"]]]],null,null,["defun","js-getter",["prop-name"],["let",[["getter",["lambda",["obj"],["js-get","obj","prop-name"]]]],["setf",["setter","getter"],["lambda",["new-val","obj"],["js-set","obj","prop-name","new-val"]]],"getter"]],null,["defun","js-invoker",["fun-name"],["lambda",["this",".","args"],["let",[["fun",["js-get","this","fun-name"]]],["js-apply","fun","this",["list-to-js-array","args"]]]]],null,["defun","create-js-object","opt-proto",[["js-invoker",["wat-string","create"]],["js-global",["wat-string","Object"]],["optional","opt-proto",null]]],["defun","plist-to-js-object",["plist"],["let",[["obj",["create-js-object"]]],["labels",[["add-to-dict",["plist"],["if",["nil?","plist"],"obj",["progn",["js-set","obj",["symbol-name",["car","plist"]],["cadr","plist"]],["add-to-dict",["cddr","plist"]]]]]],["add-to-dict","plist"]]]],["defun","js-object","plist",["plist-to-js-object","plist"]],["defun","js-array","elements",["list-to-js-array","elements"]],["defmacro","js-lambda",["lambda-list",".","body"],["list",["qua-function","js-function"],["list*",["qua-function","lambda"],"lambda-list","body"]]],["defun","%js-relational-op",["name"],["let",[[["qua-function","binop"],["%%js-binop","name"]]],["labels",[["op",["arg1","arg2",".","rest"],["if",["binop","arg1","arg2"],["if",["nil?","rest"],true,["apply",["qua-function","op"],["list*","arg2","rest"]]],false]]],["qua-function","op"]]]],["def",["qua-function","=="],["%js-relational-op",["wat-string","=="]]],["def",["qua-function","==="],["%js-relational-op",["wat-string","==="]]],["def",["qua-function","<"],["%js-relational-op",["wat-string","<"]]],["def",["qua-function",">"],["%js-relational-op",["wat-string",">"]]],["def",["qua-function","<="],["%js-relational-op",["wat-string","<="]]],["def",["qua-function",">="],["%js-relational-op",["wat-string",">="]]],["def",["qua-function","lt"],["qua-function","<"]],["def",["qua-function","lte"],["qua-function","<="]],["def",["qua-function","gt"],["qua-function",">"]],["def",["qua-function","gte"],["qua-function",">="]],["defun","!=","args",["not",["apply","==","args"]]],["defun","!==","args",["not",["apply","===","args"]]],["def",["qua-function","*"],["let",[[["qua-function","binop"],["%%js-binop",["wat-string","*"]]]],["lambda","args",["fold-list",["qua-function","binop"],1,"args"]]]],null,["def",["qua-function","+"],["let",[[["qua-function","binop"],["%%js-binop",["wat-string","+"]]]],["lambda","args",["if",["nil?","args"],0,["fold-list",["qua-function","binop"],["car","args"],["cdr","args"]]]]]],["defun","%js-negative-op",["name","unit"],["let",[[["qua-function","binop"],["%%js-binop","name"]]],["lambda",["arg1",".","rest"],["if",["nil?","rest"],["binop","unit","arg1"],["fold-list",["qua-function","binop"],"arg1","rest"]]]]],["def",["qua-function","-"],["%js-negative-op",["wat-string","-"],0]],["def",["qua-function","/"],["%js-negative-op",["wat-string","/"],1]],null,["defclass","condition",["standard-object"]],["defclass","serious-condition",["condition"]],["defclass","error",["serious-condition"]],["defclass","warning",["condition"]],["defclass","simple-condition",["condition"],["message"]],["defclass","simple-warning",["warning"],["message"]],["defclass","simple-error",["error"],["message"]],["defclass","runtime-error",["error"]],["defclass","control-error",["runtime-error"]],["defclass","restart-control-error",["control-error"],["restart"]],["defclass","restart",["condition"],["associated-condition"]],["defclass","abort",["restart"]],["defclass","continue",["restart"]],["defclass","use-value",["restart"],["value"]],["defclass","store-value",["restart"],["value"]],null,["defdynamic","current-condition-handler-frame"],["defdynamic","current-restart-handler-frame"],["defclass","handler",[],["condition-type","handler-function","associated-condition"]],["defun","make-handler",["condition-type","handler-function",".","opt-associated-condition"],["make-instance",["quote","handler"],["qua-keyword","condition-type"],"condition-type",["qua-keyword","handler-function"],"handler-function",["qua-keyword","associated-condition"],["optional","opt-associated-condition"]]],["defun","handle-condition",["handler","condition"],["funcall",["slot-value","handler",["quote","handler-function"]],"condition"]],["defclass","handler-frame",[],["handlers","parent"]],["defun","make-handler-frame",["handlers",".","opt-parent"],["make-instance",["quote","handler-frame"],["qua-keyword","handlers"],"handlers",["qua-keyword","parent"],["optional","opt-parent"]]],["defun","%make-handler-bind",[["qua-function","handler-spec-parser"],"handler-frame-dynamic"],["vau",["handler-specs",".","body"],"env",["let*",[["handlers",["map-list",["lambda",["spec"],["handler-spec-parser","spec","env"]],"handler-specs"]],["handler-frame",["make-handler-frame","handlers",["dynamic","handler-frame-dynamic"]]]],["%dynamic-let-1","handler-frame-dynamic","handler-frame",["lambda",[],["eval",["list*",["qua-function","progn"],"body"],"env"]]]]]],null,["def",["qua-function","handler-bind"],["%make-handler-bind",["lambda",[["class-name","function-form"],"env"],["make-handler","class-name",["eval","function-form","env"]]],"current-condition-handler-frame"]],null,["def",["qua-function","restart-bind"],["%make-handler-bind",["lambda",[["class-name","function-form",".","opt-associated-condition"],"env"],["make-handler","class-name",["eval","function-form","env"],["eval",["optional","opt-associated-condition"],"env"]]],"current-restart-handler-frame"]],null,["defun","signal",["condition"],["signal-condition","condition",["dynamic","current-condition-handler-frame"]]],["defun","warn",["condition"],["signal","condition"],["print",["wat-string","Warning:"],"condition"]],["defun","error",["condition"],["signal","condition"],["invoke-debugger","condition"]],["defun","invoke-restart",["restart"],["signal-condition","restart",["dynamic","current-restart-handler-frame"]]],["defun","signal-condition",["condition","dynamic-frame"],["let",[["handler-and-frame",["find-applicable-handler","condition","dynamic-frame"]]],["if",["void?","handler-and-frame"],"#void",["let",[[["handler","frame"],"handler-and-frame"]],["call-condition-handler","condition","handler","frame"],null,["signal-condition","condition",["slot-value","frame",["quote","parent"]]]]]]],["defun","find-applicable-handler",["condition","dynamic-frame"],["if",["void?","dynamic-frame"],"#void",["block","found",["for-each",["lambda",["handler"],["when",["condition-applicable?","condition","handler"],["return-from","found",["list","handler","dynamic-frame"]]]],["slot-value","dynamic-frame",["quote","handlers"]]],["find-applicable-handler","condition",["slot-value","dynamic-frame",["quote","parent"]]]]]],["defgeneric","condition-applicable?",["condition","handler"]],["defmethod","condition-applicable?",[["condition","condition"],"handler"],["instance?","condition",["slot-value","handler",["quote","condition-type"]]]],["defun","slot-void?",["obj","slot-name"],["if",["slot-bound?","obj","slot-name"],["void?",["slot-value","obj","slot-name"]],true]],["defmethod","condition-applicable?",[["restart","restart"],"handler"],["and",["instance?","restart",["slot-value","handler",["quote","condition-type"]]],["or",["slot-void?","restart",["quote","associated-condition"]],["slot-void?","handler",["quote","associated-condition"]],["identical?",["slot-value","restart",["quote","associated-condition"]],["slot-value","handler",["quote","associated-condition"]]]]]],["defgeneric","call-condition-handler",["condition","handler","handler-frame"]],["defmethod","call-condition-handler",[["condition","condition"],"handler","handler-frame"],null,["dynamic-let",[["current-condition-handler-frame",["slot-value","handler-frame",["quote","parent"]]]],["handle-condition","handler","condition"]]],["defmethod","call-condition-handler",[["restart","restart"],"handler","handler-frame"],["handle-condition","handler","restart"]],null,["defclass","type-error",["error"],[]],["defconstant","%the-top-type",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","top"],["qua-keyword","generic-params"],["quote",[]]]],["defconstant","%the-bottom-type",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","bottom"],["qua-keyword","generic-params"],["quote",[]]]],["defun","%parse-type-spec",["type-spec"],["if",["keyword?","type-spec"],["make-instance",["quote","%type-variable"],["qua-keyword","name"],["symbol-name","type-spec"]],["if",["symbol?","type-spec"],["make-instance",["quote","%class-type"],["qua-keyword","name"],["symbol-name","type-spec"],["qua-keyword","generic-params"],["quote",[]]],["if",["cons?","type-spec"],["let",[[["class-name",".","generic-param-specs"],"type-spec"]],["make-instance",["quote","%class-type"],["qua-keyword","name"],["symbol-name","class-name"],["qua-keyword","generic-params"],["map-list",["qua-function","%parse-generic-param-spec"],"generic-param-specs"]]],["error",["make-instance",["quote","simple-error"],["qua-keyword","message"],["wat-string","Illegal type-spec"]]]]]]],["defun","%parse-generic-param-spec",["gp-spec"],["if",["symbol?","gp-spec"],["let",[["type",["%parse-type-spec","gp-spec"]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"type",["qua-keyword","out-type"],"type"]],["if",["cons?","gp-spec"],["let",[[["op",".","rest"],"gp-spec"]],["if",["keyword?","op"],["case",["symbol-name","op"],[["wat-string","io"],["let*",[["in-type",["%parse-type-spec",["car","rest"]]],["out-type",["%parse-type-spec",["optional",["cdr","rest"],"in-type"]]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"in-type",["qua-keyword","out-type"],"out-type"]]],[["wat-string","in"],["let",[["in-type",["%parse-type-spec",["car","rest"]]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"in-type",["qua-keyword","out-type"],"%the-top-type"]]],[["wat-string","out"],["let",[["out-type",["%parse-type-spec",["car","rest"]]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"%the-bottom-type",["qua-keyword","out-type"],"out-type"]]]],["let",[["type",["%parse-type-spec","gp-spec"]]],["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"type",["qua-keyword","out-type"],"type"]]]],["error",["wat-string","Illegal generic param spec"]]]]],["defun","instance?",["obj","type-spec"],["%%instance?","obj",["%parse-type-spec","type-spec"]]],["deffexpr","typecase",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["for-each",["lambda",[["type-spec",".","body"]],["if",["identical?","type-spec",true],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]],["when",["instance?","val","type-spec"],["return-from","match",["eval",["list*",["qua-function","progn"],"body"],"env"]]]]],"clauses"],"#void"]]],null,["defun","invoke-debugger",["condition"],["print",["wat-string","DEBUG"]],["print","condition"],["%%raise",["js-new",["js-global",["wat-string","Error"]],"condition"]]],["defclass","collection",["standard-object"],[]],null,null]
