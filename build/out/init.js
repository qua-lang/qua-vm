module.exports.main = [null,null,null,null,null,null,null,null,null,["%%def",["qua:function","def"],["qua:function","%%def"]],null,["def",["qua:function","car"],["qua:function","%%car"]],null,["def",["qua:function","cdr"],["qua:function","%%cdr"]],null,["def",["qua:function","cons"],["qua:function","%%cons"]],null,["def",["qua:function","eq"],["qua:function","%%eq"]],null,["def",["qua:function","eval"],["qua:function","%%eval"]],null,["def",["qua:function","if"],["qua:function","%%if"]],null,["def",["qua:function","make-environment"],["qua:function","%%make-environment"]],null,["def",["qua:function","print"],["qua:function","%%print"]],null,["def",["qua:function","progn"],["qua:function","%%progn"]],null,["def",["qua:function","unwrap"],["qua:function","%%unwrap"]],null,["def",["qua:function","wrap"],["qua:function","%%wrap"]],null,null,["def",["qua:function","concrete-class-of"],["qua:function","%%concrete-class-of"]],["def",["qua:function","ensure-class"],["qua:function","%%ensure-class"]],["def",["qua:function","find-concrete-class"],["qua:function","%%find-concrete-class"]],["def",["qua:function","find-generic-class"],["qua:function","%%find-generic-class"]],["def",["qua:function","find-method"],["qua:function","%%find-method"]],["def",["qua:function","generic-class-of"],["qua:function","%%generic-class-of"]],["def",["qua:function","put-method"],["qua:function","%%put-method"]],["def",["qua:function","set-slot-value"],["qua:function","%%set-slot-value"]],["def",["qua:function","slot-bound-p"],["qua:function","%%slot-bound-p"]],["def",["qua:function","slot-value"],["qua:function","%%slot-value"]],["def",["qua:function","typep"],["qua:function","%%typep"]],null,["def",["qua:function","js:apply"],["qua:function","%%js:apply"]],["def",["qua:function","js:function"],["qua:function","%%js:function"]],["def",["qua:function","js:get"],["qua:function","%%js:get"]],["def",["qua:function","js:global"],["qua:function","%%js:global"]],["def",["qua:function","js:new"],["qua:function","%%js:new"]],["def",["qua:function","js:set"],["qua:function","%%js:set"]],null,null,["def",["qua:function","qua:to-fun-sym"],["qua:function","%%to-fun-sym"]],null,null,["def",["qua:function","list*"],["qua:function","%%list*"]],null,["def",["qua:function","js:list-to-array"],["qua:function","%%list-to-array"]],["def",["qua:function","="],["qua:function","eq"]],null,["def",["qua:function","quote"],["%%vau",["op"],"#ign","op"]],null,["def",["qua:function","list"],["wrap",["%%vau","args","#ign","args"]]],null,["def",["qua:function","the-environment"],["%%vau","#ign","env","env"]],null,null,null,["def",["qua:function","vau"],["%%vau",["params","env-param",".","body"],"env",["eval",["list",["qua:function","%%vau"],"params","env-param",["list*",["qua:function","progn"],"body"]],"env"]]],null,["def",["qua:function","deffexpr"],["vau",["name","params","env-param",".","body"],"env",["eval",["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","vau"],"params","env-param","body"]],"env"]]],null,null,["def",["qua:function","make-macro"],["wrap",["vau",["expander"],"#ign",["vau","form","env",["eval",["eval",["cons","expander","form"],["make-environment"]],"env"]]]]],null,["def",["qua:function","macro"],["make-macro",["vau",["params",".","body"],"#ign",["list",["qua:function","make-macro"],["list*",["qua:function","vau"],"params","#ign","body"]]]]],null,["def",["qua:function","defmacro"],["macro",["name","params",".","body"],["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","macro"],"params","body"]]]],null,null,["defmacro","ur-lambda",["params",".","body"],["list",["qua:function","wrap"],["list*",["qua:function","vau"],"params","#ign","body"]]],null,null,["defmacro","ur-defun",["name","params",".","body"],["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","ur-lambda"],"params","body"]]],null,null,["def",["qua:function","lambda"],["qua:function","ur-lambda"]],["def",["qua:function","defun"],["qua:function","ur-defun"]],null,["defun","apply",["fun","args",".","opt-env"],["eval",["cons",["unwrap","fun"],"args"],["optional","opt-env",["make-environment"]]]],null,null,["defun","funcall",["fun",".","args"],["apply","fun","args"]],["defun","compose",[["qua:function","f"],["qua:function","g"]],["lambda",["arg"],["f",["g","arg"]]]],null,null,["defun","nilp",["obj"],["eq","obj",[]]],["defun","voidp",["obj"],["eq","obj","#void"]],["def",["qua:function","caar"],["compose",["qua:function","car"],["qua:function","car"]]],["def",["qua:function","cadr"],["compose",["qua:function","car"],["qua:function","cdr"]]],["def",["qua:function","cdar"],["compose",["qua:function","cdr"],["qua:function","car"]]],["def",["qua:function","cddr"],["compose",["qua:function","cdr"],["qua:function","cdr"]]],["defun","symbolp",["sym"],["%%typep","sym",["quote","symbol"]]],["defun","keywordp",["obj"],["%%typep","obj",["quote","keyword"]]],["defun","consp",["cons"],["%%typep","cons",["quote","cons"]]],["defun","symbol-name",["sym"],["slot-value","sym",["quote","name"]]],null,["defun","map-list",[["qua:function","fun"],"list"],["if",["nilp","list"],[],["cons",["fun",["car","list"]],["map-list",["qua:function","fun"],["cdr","list"]]]]],["def",["qua:function","for-each"],["qua:function","map-list"]],["defun","fold-list",[["qua:function","fun"],"init","list"],["if",["nilp","list"],"init",["fold-list",["qua:function","fun"],["fun","init",["car","list"]],["cdr","list"]]]],null,null,null,["defmacro","let",["bindings",".","body"],["list*",["list*",["qua:function","lambda"],["map-list",["qua:function","car"],"bindings"],"body"],["map-list",["qua:function","cadr"],"bindings"]]],null,null,["defmacro","let*",["bindings",".","body"],["if",["nilp","bindings"],["list*",["qua:function","let"],[],"body"],["list",["qua:function","let"],["list",["car","bindings"]],["list*",["qua:function","let*"],["cdr","bindings"],"body"]]]],null,null,["defmacro","letrec",["bindings",".","body"],["list*",["qua:function","let"],[],["list",["qua:function","def"],["map-list",["qua:function","car"],"bindings"],["list*",["qua:function","list"],["map-list",["qua:function","cadr"],"bindings"]]],"body"]],null,["defun","not",["boolean"],["if","boolean",false,true]],["deffexpr","cond","clauses","env",["if",["nilp","clauses"],"#void",["let",[[[["test",".","body"],".","clauses"],"clauses"]],["if",["eval","test","env"],["apply",["wrap",["qua:function","progn"]],"body","env"],["apply",["wrap",["qua:function","cond"]],"clauses","env"]]]]],["deffexpr","and","ops","env",["cond",[["nilp","ops"],true],[["nilp",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],["apply",["wrap",["qua:function","and"]],["cdr","ops"],"env"]],[true,false]]],["deffexpr","or","ops","env",["cond",[["nilp","ops"],false],[["nilp",["cdr","ops"]],["eval",["car","ops"],"env"]],[["eval",["car","ops"],"env"],true],[true,["apply",["wrap",["qua:function","or"]],["cdr","ops"],"env"]]]],null,["defun","optional",["opt-arg",".","opt-default"],["if",["nilp","opt-arg"],["if",["nilp","opt-default"],"#void",["car","opt-default"]],["car","opt-arg"]]],["def",["qua:function","defconstant"],["qua:function","def"]],null,["deffexpr","setq",["env","lhs","rhs"],"denv",["eval",["list",["qua:function","def"],"lhs",["list",["unwrap",["qua:function","eval"]],"rhs","denv"]],["eval","env","denv"]]],null,["defconstant","qua:setter-prop",["wat-string","qua_setter"]],["defun","setter",["obj"],["js:get","obj","qua:setter-prop"]],["js:set",["qua:function","setter"],"qua:setter-prop",["lambda",["new-setter","getter"],["js:set","getter","qua:setter-prop","new-setter"]]],["defmacro","setf",[["getter-form",".","args"],"new-val"],["let",[["getter",["if",["symbolp","getter-form"],["qua:to-fun-sym","getter-form"],"getter-form"]]],["list*",["list",["qua:function","setter"],"getter"],"new-val","args"]]],null,["defun","make-instance",["class-desig",".","initargs"],["%%make-instance","class-desig",["js:plist-to-object","initargs"]]],["defun","call-method",["obj","name","args"],["let",[["method",["find-method","obj","name"]]],["apply","method","args"]]],["deffexpr","defgeneric",["name","#ign"],"env",["eval",["list",["qua:function","def"],["qua:to-fun-sym","name"],["lambda","args",["call-method",["car","args"],"name","args"]]],"env"]],["deffexpr","defmethod",["name",[["self","class-desig"],".","args"],".","body"],"env",["let",[["class",["find-generic-class","class-desig"]],["fun",["eval",["list*",["qua:function","lambda"],["list*","self","args"],"body"],"env"]]],["put-method","class","name","fun"],"name"]],["deffexpr","defclass",["name","superclasses",".","#ign"],"#ign",["let",[["string-list",["map-list",["lambda",["superclass"],["slot-value","superclass",["quote","name"]]],"superclasses"]]],["ensure-class",["slot-value","name",["quote","name"]],["js:list-to-array","string-list"]]]],["defgeneric","hash-object",["self"]],["defgeneric","compare-object",["self"]],["defgeneric","print-object",["self","stream"]],null,["defmacro","loop","body",["list",["qua:function","%%loop"],["list*",["qua:function","lambda"],[],"body"]]],["deffexpr","while",["test",".","body"],"env",["let",[["body",["list*",["qua:function","progn"],"body"]]],["block","exit",["loop",["if",["eval","test","env"],["eval","body","env"],["return-from","exit"]]]]]],["defmacro","if",["test","then","else"],["list",["qua:function","%%if"],"test","then","else"]],["defmacro","when",["test",".","body"],["list",["qua:function","if"],"test",["list*",["qua:function","progn"],"body"],"#void"]],["defmacro","unless",["test",".","body"],["list",["qua:function","if"],"test","#void",["list*",["qua:function","progn"],"body"]]],["defun","qua:call-with-escape",[["qua:function","fun"]],["let*",[["tag",["list",["quote","tag"]]],["escape",["lambda","opt-val",["let",[["val",["optional","opt-val"]]],["%%raise",["list","tag","val"]]]]]],["%%rescue",["lambda",["exc"],["if",["and",["consp","exc"],["eq","tag",["car","exc"]]],["cadr","exc"],["%%raise","exc"]]],["lambda",[],["fun","escape"]]]]],["defmacro","block",["name",".","body"],["list",["qua:function","qua:call-with-escape"],["list*",["qua:function","lambda"],["list","name"],"body"]]],["defun","return-from",["escape",".","opt-val"],["apply","escape","opt-val"]],["deffexpr","prog1","forms","env",["if",["nilp","forms"],"#void",["let",[["result",["eval",["car","forms"],"env"]]],["eval",["list*",["qua:function","progn"],["cdr","forms"]],"env"],"result"]]],["defmacro","prog2",["form",".","forms"],["list",["qua:function","progn"],"form",["list*",["qua:function","prog1"],"forms"]]],["defun","unwind-protect*",[["qua:function","protected-thunk"],["qua:function","cleanup-thunk"]],["prog1",["%%rescue",["lambda",["exc"],["cleanup-thunk"],["%%raise","exc"]],["qua:function","protected-thunk"]],["cleanup-thunk"]]],["defmacro","unwind-protect",["protected-form",".","cleanup-forms"],["list",["qua:function","unwind-protect*"],["list",["qua:function","lambda"],[],"protected-form"],["list*",["qua:function","lambda"],[],"cleanup-forms"]]],["deffexpr","case",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["for-each",["lambda",[["other-val",".","body"]],["when",["=","val",["eval","other-val","env"]],["return-from","match",["eval",["list*",["qua:function","progn"],"body"],"env"]]]],"clauses"],"#void"]]],null,["defclass","mut",["standard-object"],["val"]],["defun","mut",["val"],["make-instance",["quote","mut"],["qua:keyword","val"],"val"]],["defun","ref",["mut"],["slot-value","mut",["quote","val"]]],["setf",["setter",["qua:function","ref"]],["lambda",["new-val","mut"],["set-slot-value","mut",["quote","val"],"new-val"]]],null,["defmacro","push-prompt",["prompt",".","body"],["list",["qua:function","%%push-prompt"],"prompt",["list*",["qua:function","lambda"],[],"body"]]],["defmacro","take-subcont",["prompt","name",".","body"],["list",["qua:function","%%take-subcont"],"prompt",["list*",["qua:function","lambda"],["list","name"],"body"]]],["defmacro","push-subcont",["continuation",".","body"],["list",["qua:function","%%push-subcont"],"continuation",["list*",["qua:function","lambda"],[],"body"]]],["defmacro","push-prompt-subcont",["prompt","continuation",".","body"],["list",["qua:function","%%push-prompt-subcont"],"prompt","continuation",["list*",["qua:function","lambda"],[],"body"]]],null,["defmacro","defdynamic",["name",".","opt-val"],["list",["qua:function","def"],"name",["list",["qua:function","mut"],["optional","opt-val"]]]],["def",["qua:function","dynamic"],["qua:function","ref"]],["deffexpr","dynamic-let",["bindings",".","body"],"env",["letrec",[[["qua:function","process-bindings"],["lambda",["bs"],["if",["nilp","bs"],["list*",["qua:function","progn"],"body"],["let*",[[[["name","expr"],".","rest-bs"],"bs"],["value",["eval","expr","env"]]],["list",["qua:function","%%dynamic-let-1"],"name","value",["list",["qua:function","lambda"],[],["process-bindings","rest-bs"]]]]]]]],["eval",["process-bindings","bindings"],"env"]]],null,null,["defun","js:getter",["prop-name"],["let",[["getter",["lambda",["obj"],["js:get","obj","prop-name"]]]],["setf",["setter","getter"],["lambda",["new-val","obj"],["js:set","obj","prop-name","new-val"]]],"getter"]],null,["defun","js:invoker",["fun-name"],["lambda",["this",".","args"],["let",[["fun",["js:get","this","fun-name"]]],["js:apply","fun","this",["js:list-to-array","args"]]]]],null,["defun","js:create-object",["proto"],[["js:invoker",["wat-string","create"]],["js:global",["wat-string","Object"]],"proto"]],["defun","js:plist-to-object",["plist"],["letrec",[["obj",["js:create-object",null]],[["qua:function","add-to-dict"],["lambda",["plist"],["if",["nilp","plist"],"obj",["progn",["js:set","obj",["symbol-name",["car","plist"]],["cadr","plist"]],["add-to-dict",["cddr","plist"]]]]]]],["add-to-dict","plist"]]],["defun","js:object","plist",["js:plist-to-object","plist"]],["defun","js:array","elements",["js:list-to-array","elements"]],["defmacro","js:lambda",["lambda-list",".","body"],["list",["qua:function","js:function"],["list*",["qua:function","lambda"],"lambda-list","body"]]],["defun","js:relational-op",["name"],["let",[[["qua:function","binop"],["%%js:binop","name"]]],["letrec",[[["qua:function","op"],["lambda",["arg1","arg2",".","rest"],["if",["binop","arg1","arg2"],["if",["nilp","rest"],true,["apply",["qua:function","op"],["list*","arg2","rest"]]],false]]]],["qua:function","op"]]]],["def",["qua:function","=="],["js:relational-op",["wat-string","=="]]],["def",["qua:function","==="],["js:relational-op",["wat-string","==="]]],["def",["qua:function","<"],["js:relational-op",["wat-string","<"]]],["def",["qua:function",">"],["js:relational-op",["wat-string",">"]]],["def",["qua:function","<="],["js:relational-op",["wat-string","<="]]],["def",["qua:function",">="],["js:relational-op",["wat-string",">="]]],["def",["qua:function","lt"],["qua:function","<"]],["def",["qua:function","lte"],["qua:function","<="]],["def",["qua:function","gt"],["qua:function",">"]],["def",["qua:function","gte"],["qua:function",">="]],["defun","!=","args",["not",["apply","==","args"]]],["defun","!==","args",["not",["apply","===","args"]]],["def",["qua:function","*"],["let",[[["qua:function","binop"],["%%js:binop",["wat-string","*"]]]],["lambda","args",["fold-list",["qua:function","binop"],1,"args"]]]],null,["def",["qua:function","+"],["let",[[["qua:function","binop"],["%%js:binop",["wat-string","+"]]]],["lambda","args",["if",["nilp","args"],0,["fold-list",["qua:function","binop"],["car","args"],["cdr","args"]]]]]],["defun","js:negative-op",["name","unit"],["let",[[["qua:function","binop"],["%%js:binop","name"]]],["lambda",["arg1",".","rest"],["if",["nilp","rest"],["binop","unit","arg1"],["fold-list",["qua:function","binop"],"arg1","rest"]]]]],["def",["qua:function","-"],["js:negative-op",["wat-string","-"],0]],["def",["qua:function","/"],["js:negative-op",["wat-string","/"],1]],null,["defclass","condition",["standard-object"]],["defclass","serious-condition",["condition"]],["defclass","error",["serious-condition"]],["defclass","warning",["condition"]],["defclass","simple-condition",["condition"],["message"]],["defclass","simple-warning",["warning"],["message"]],["defclass","simple-error",["error"],["message"]],["defclass","runtime-error",["error"]],["defclass","control-error",["runtime-error"]],["defclass","restart-control-error",["control-error"],["restart"]],["defclass","restart",["condition"],["associated-condition"]],["defclass","abort",["restart"]],["defclass","continue",["restart"]],["defclass","use-value",["restart"],["value"]],["defclass","store-value",["restart"],["value"]],null,["defdynamic","current-condition-handler-frame"],["defdynamic","current-restart-handler-frame"],["defclass","handler",[],["condition-type","handler-function","associated-condition"]],["defun","make-handler",["condition-type","handler-function",".","opt-associated-condition"],["make-instance",["quote","handler"],["qua:keyword","condition-type"],"condition-type",["qua:keyword","handler-function"],"handler-function",["qua:keyword","associated-condition"],["optional","opt-associated-condition"]]],["defun","handle-condition",["handler","condition"],["funcall",["slot-value","handler",["quote","handler-function"]],"condition"]],["defclass","handler-frame",[],["handlers","parent"]],["defun","make-handler-frame",["handlers",".","opt-parent"],["make-instance",["quote","handler-frame"],["qua:keyword","handlers"],"handlers",["qua:keyword","parent"],["optional","opt-parent"]]],null,["deffexpr","handler-bind",["handler-specs",".","body"],"env",["let*",[["handlers",["map-list",["lambda",[["class-name","function-form"]],["make-handler","class-name",["eval","function-form","env"]]],"handler-specs"]],["handler-frame",["make-handler-frame","handlers",["dynamic","current-condition-handler-frame"]]]],["dynamic-let",[["current-condition-handler-frame","handler-frame"]],["eval",["list*",["qua:function","progn"],"body"],"env"]]]],null,["deffexpr","restart-bind",["handler-specs",".","body"],"env",["let*",[["handlers",["map-list",["lambda",[["class-name","function-form",".","opt-associated-condition"]],["make-handler","class-name",["eval","function-form","env"],["eval",["optional","opt-associated-condition"],"env"]]],"handler-specs"]],["handler-frame",["make-handler-frame","handlers",["dynamic","current-restart-handler-frame"]]]],["dynamic-let",[["current-restart-handler-frame","handler-frame"]],["eval",["list*",["qua:function","progn"],"body"],"env"]]]],null,["defun","signal",["condition"],["signal-condition","condition",["dynamic","current-condition-handler-frame"]]],["defun","warn",["condition"],["signal","condition"],["print",["wat-string","Warning:"],"condition"]],["defun","error",["condition"],["signal","condition"],["invoke-debugger","condition"]],["defun","invoke-restart",["restart"],["signal-condition","restart",["dynamic","current-restart-handler-frame"]]],["defun","signal-condition",["condition","dynamic-frame"],["let",[["handler-and-frame",["find-applicable-handler","condition","dynamic-frame"]]],["if",["voidp","handler-and-frame"],"#void",["let",[[["handler","frame"],"handler-and-frame"]],["call-condition-handler","condition","handler","frame"],null,["signal-condition","condition",["slot-value","frame",["quote","parent"]]]]]]],["defun","find-applicable-handler",["condition","dynamic-frame"],["if",["voidp","dynamic-frame"],"#void",["block","found",["for-each",["lambda",["handler"],["when",["condition-applicable?","condition","handler"],["return-from","found",["list","handler","dynamic-frame"]]]],["slot-value","dynamic-frame",["quote","handlers"]]],["find-applicable-handler","condition",["slot-value","dynamic-frame",["quote","parent"]]]]]],["defgeneric","condition-applicable?",["condition","handler"]],["defmethod","condition-applicable?",[["condition","condition"],"handler"],["typep","condition",["slot-value","handler",["quote","condition-type"]]]],["defun","slot-void-p",["obj","slot-name"],["if",["slot-bound-p","obj","slot-name"],["voidp",["slot-value","obj","slot-name"]],true]],["defmethod","condition-applicable?",[["restart","restart"],"handler"],["and",["typep","restart",["slot-value","handler",["quote","condition-type"]]],["or",["slot-void-p","restart",["quote","associated-condition"]],["slot-void-p","handler",["quote","associated-condition"]],["eq",["slot-value","restart",["quote","associated-condition"]],["slot-value","handler",["quote","associated-condition"]]]]]],["defgeneric","call-condition-handler",["condition","handler","handler-frame"]],["defmethod","call-condition-handler",[["condition","condition"],"handler","handler-frame"],null,["dynamic-let",[["current-condition-handler-frame",["slot-value","handler-frame",["quote","parent"]]]],["handle-condition","handler","condition"]]],["defmethod","call-condition-handler",[["restart","restart"],"handler","handler-frame"],["handle-condition","handler","restart"]],null,["defclass","type-error",["error"],[]],["defconstant","qua:the-top-type",["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["wat-string","top"],["qua:keyword","generic-params"],["quote",[]]]],["defconstant","qua:the-bottom-type",["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["wat-string","bottom"],["qua:keyword","generic-params"],["quote",[]]]],["defun","qua:type-variable-p",["symbol"],["eq",["wat-string","?"],["js:get",["symbol-name","symbol"],0]]],null,["defun","qua:parse-type-spec",["type-spec"],["if",["symbolp","type-spec"],["if",["qua:type-variable-p","type-spec"],["make-instance",["quote","qua:type-variable"],["qua:keyword","name"],["symbol-name","type-spec"]],["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["symbol-name","type-spec"],["qua:keyword","generic-params"],["quote",[]]]],["if",["consp","type-spec"],["let",[[["class-name",".","generic-param-specs"],"type-spec"]],["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["symbol-name","class-name"],["qua:keyword","generic-params"],["map-list",["qua:function","qua:parse-generic-param-spec"],"generic-param-specs"]]],["error",["make-instance",["quote","simple-error"],["qua:keyword","message"],["wat-string","Illegal type-spec"]]]]]],["defun","qua:parse-generic-param-spec",["gp-spec"],["if",["symbolp","gp-spec"],["let",[["type",["qua:parse-type-spec","gp-spec"]]],["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],"type",["qua:keyword","out-type"],"type"]],["if",["consp","gp-spec"],["let",[[["op",".","rest"],"gp-spec"]],["if",["keywordp","op"],["case",["symbol-name","op"],[["wat-string","io"],["let*",[["in-type",["qua:parse-type-spec",["car","rest"]]],["out-type",["qua:parse-type-spec",["optional",["cdr","rest"],"in-type"]]]],["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],"in-type",["qua:keyword","out-type"],"out-type"]]],[["wat-string","in"],["let",[["in-type",["qua:parse-type-spec",["car","rest"]]]],["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],"in-type",["qua:keyword","out-type"],"qua:the-top-type"]]],[["wat-string","out"],["let",[["out-type",["qua:parse-type-spec",["car","rest"]]]],["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],"qua:the-bottom-type",["qua:keyword","out-type"],"out-type"]]]],["let",[["type",["qua:parse-type-spec","gp-spec"]]],["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],"type",["qua:keyword","out-type"],"type"]]]],["error",["wat-string","Illegal generic param spec"]]]]],["defun","typep",["obj","type-spec"],["%%typep","obj",["qua:parse-type-spec","type-spec"]]],["deffexpr","typecase",["expr",".","clauses"],"env",["let",[["val",["eval","expr","env"]]],["block","match",["for-each",["lambda",[["type-spec",".","body"]],["if",["eq","type-spec",true],["return-from","match",["eval",["list*",["qua:function","progn"],"body"],"env"]],["when",["typep","val","type-spec"],["return-from","match",["eval",["list*",["qua:function","progn"],"body"],"env"]]]]],"clauses"],"#void"]]],null]
