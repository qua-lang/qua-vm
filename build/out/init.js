module.exports.main = [null,null,null,null,null,null,null,null,null,["%%def",["qua:function","def"],["qua:function","%%def"]],null,["def",["qua:function","car"],["qua:function","%%car"]],null,["def",["qua:function","cdr"],["qua:function","%%cdr"]],null,["def",["qua:function","cons"],["qua:function","%%cons"]],null,["def",["qua:function","eq"],["qua:function","%%eq"]],null,["def",["qua:function","eval"],["qua:function","%%eval"]],null,["def",["qua:function","if"],["qua:function","%%if"]],null,["def",["qua:function","make-environment"],["qua:function","%%make-environment"]],null,["def",["qua:function","print"],["qua:function","%%print"]],null,["def",["qua:function","progn"],["qua:function","%%progn"]],null,["def",["qua:function","unwrap"],["qua:function","%%unwrap"]],null,["def",["qua:function","wrap"],["qua:function","%%wrap"]],null,null,["def",["qua:function","class-of"],["qua:function","%%class-of"]],["def",["qua:function","ensure-class"],["qua:function","%%ensure-class"]],["def",["qua:function","find-class"],["qua:function","%%find-generic-class"]],["def",["qua:function","find-method"],["qua:function","%%find-method"]],["def",["qua:function","put-method"],["qua:function","%%put-method"]],["def",["qua:function","set-slot-value"],["qua:function","%%set-slot-value"]],["def",["qua:function","slot-bound-p"],["qua:function","%%slot-bound-p"]],["def",["qua:function","slot-value"],["qua:function","%%slot-value"]],null,["def",["qua:function","js:apply"],["qua:function","%%js:apply"]],["def",["qua:function","js:get"],["qua:function","%%js:get"]],["def",["qua:function","js:global"],["qua:function","%%js:global"]],["def",["qua:function","js:list-to-array"],["qua:function","%%list-to-array"]],["def",["qua:function","js:set"],["qua:function","%%js:set"]],null,null,["def",["qua:function","qua:to-fun-sym"],["qua:function","%%to-fun-sym"]],null,null,["def",["qua:function","list*"],["qua:function","%%list*"]],null,null,["def",["qua:function","quote"],["%%vau",["op"],"#ign","op"]],null,["def",["qua:function","list"],["wrap",["%%vau","args","#ign","args"]]],null,["def",["qua:function","the-environment"],["%%vau","#ign","env","env"]],null,null,["def",["qua:function","vau"],["%%vau",["params","env-param",".","body"],"env",["eval",["list",["qua:function","%%vau"],"params","env-param",["list*",["qua:function","progn"],"body"]],"env"]]],null,["def",["qua:function","deffexpr"],["vau",["name","params","env-param",".","body"],"env",["eval",["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","vau"],"params","env-param","body"]],"env"]]],null,["def",["qua:function","make-macro"],["wrap",["vau",["expander"],"#ign",["vau","form","env",["eval",["eval",["cons","expander","form"],["make-environment"]],"env"]]]]],null,["def",["qua:function","macro"],["make-macro",["vau",["params",".","body"],"#ign",["list",["qua:function","make-macro"],["list*",["qua:function","vau"],"params","#ign","body"]]]]],null,["def",["qua:function","defmacro"],["macro",["name","params",".","body"],["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","macro"],"params","body"]]]],null,["defmacro","ur-lambda",["params",".","body"],["list",["qua:function","wrap"],["list*",["qua:function","vau"],"params","#ign","body"]]],null,null,["defmacro","ur-defun",["name","params",".","body"],["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","ur-lambda"],"params","body"]]],null,null,["def",["qua:function","lambda"],["qua:function","ur-lambda"]],["def",["qua:function","defun"],["qua:function","ur-defun"]],["defun","not",["boolean"],["if","boolean",false,true]],null,["defun","apply",["fun","args"],["eval",["cons",["unwrap","fun"],"args"],["make-environment"]]],null,null,["defun","funcall",["fun",".","args"],["apply","fun","args"]],null,["defun","nilp",["obj"],["eq","obj",[]]],null,["defun","map-list",[["qua:function","fun"],"list"],["if",["nilp","list"],[],["cons",["fun",["car","list"]],["map-list",["qua:function","fun"],["cdr","list"]]]]],["defun","compose",["f","g"],["lambda",["arg"],["funcall","f",["funcall","g","arg"]]]],["def",["qua:function","caar"],["compose",["qua:function","car"],["qua:function","car"]]],["def",["qua:function","cadr"],["compose",["qua:function","car"],["qua:function","cdr"]]],["def",["qua:function","cdar"],["compose",["qua:function","cdr"],["qua:function","car"]]],["def",["qua:function","cddr"],["compose",["qua:function","cdr"],["qua:function","cdr"]]],null,null,["defmacro","let",["bindings",".","body"],["list*",["list*",["qua:function","lambda"],["map-list",["qua:function","car"],"bindings"],"body"],["map-list",["qua:function","cadr"],"bindings"]]],null,null,["defmacro","let*",["bindings",".","body"],["if",["nilp","bindings"],["list*",["qua:function","let"],[],"body"],["list",["qua:function","let"],["list",["car","bindings"]],["list*",["qua:function","let*"],["cdr","bindings"],"body"]]]],null,null,["defmacro","letrec",["bindings",".","body"],["list*",["qua:function","let"],[],["list",["qua:function","def"],["map-list",["qua:function","car"],"bindings"],["list*",["qua:function","list"],["map-list",["qua:function","cadr"],"bindings"]]],"body"]],["def",["qua:function","defconstant"],["qua:function","def"]],["defun","symbol-name",["sym"],["slot-value","sym",["quote","name"]]],["defun","optional",["opt-arg","default"],["if",["nilp","opt-arg"],"default",["car","opt-arg"]]],null,["deffexpr","setq",["env","lhs","rhs"],"denv",["eval",["list",["qua:function","def"],"lhs",["list",["unwrap",["qua:function","eval"]],"rhs","denv"]],["eval","env","denv"]]],null,["defconstant","qua:setter-prop",["wat-string","qua_setter"]],["defun","setter",["obj"],["js:get","obj","qua:setter-prop"]],["js:set",["qua:function","setter"],"qua:setter-prop",["lambda",["new-setter","getter"],["js:set","getter","qua:setter-prop","new-setter"]]],["defmacro","setf",[["getter-form",".","args"],"new-val"],["let",[["getter",["if",["symbolp","getter-form"],["qua:to-fun-sym","getter-form"],"getter-form"]]],["list*",["list",["qua:function","setter"],"getter"],"new-val","args"]]],null,["defun","make",["class-desig",".","initargs"],["%%make-instance","class-desig",["js:plist-to-object","initargs"]]],["defun","call-method",["obj","name","args"],["let",[["method",["find-method","obj","name"]]],["apply","method","args"]]],["deffexpr","defgeneric",["name","#ign"],"env",["eval",["list",["qua:function","def"],["qua:to-fun-sym","name"],["lambda","args",["call-method",["car","args"],"name","args"]]],"env"]],["deffexpr","defmethod",["name",[["self","class-desig"],".","args"],".","body"],"env",["let",[["class",["find-class","class-desig"]],["fun",["eval",["list*",["qua:function","lambda"],["list*","self","args"],"body"],"env"]]],["put-method","class","name","fun"],"name"]],["deffexpr","defclass",["name","superclasses",".","#ign"],"#ign",["let",[["string-list",["map-list",["lambda",["superclass"],["slot-value","superclass",["quote","name"]]],"superclasses"]]],["ensure-class",["slot-value","name",["quote","name"]],["js:list-to-array","string-list"]]]],["defgeneric","hash-object",["self"]],["defgeneric","compare-object",["self"]],["defgeneric","print-object",["self","stream"]],null,null,["defclass","coro:yield-rec",["standard-object"],["val","cont"]],["defun","coro:make-yield-rec",["val","cont"],["make",["quote","coro:yield-rec"],["qua:keyword","val"],"val",["qua:keyword","cont"],"cont"]],["defun","coro:value",["yield-rec"],["slot-value","yield-rec",["quote","val"]]],["defun","coro:continuation",["yield-rec"],["slot-value","yield-rec",["quote","cont"]]],["defconstant","coro:the-prompt",["quote","coro:prompt"]],["defun","coro:run",["thunk"],["%%push-prompt","coro:the-prompt","thunk"]],["defun","coro:yield","opt-val",["let",[["val",["optional","opt-val","#void"]]],["%%take-subcont","coro:the-prompt",["lambda",["cont"],["coro:make-yield-rec","val","cont"]]]]],["defun","coro:resume",["yield-rec",".","opt-val"],["let",[["val",["optional","opt-val","#void"]]],["%%push-prompt-subcont","coro:the-prompt",["coro:continuation","yield-rec"],["lambda",[],"val"]]]],["defun","dynamic-wind*",[["qua:function","pre"],["qua:function","body"],["qua:function","post"]],["block","exit",["let",[["thunk",["mut",["lambda",[],["coro:run",["body"]]]]]],["loop",["pre"],["let",[["res",[["ref","thunk"]]]],["post"],["if",["coro:yieldp","res"],["let",[["reenter",["coro:yield",["coro:value","res"]]]],["setf",["ref","thunk"],["lambda",[],["coro:resume","res","reenter"]]]],["return-from","exit","res"]]]]]]],["defmacro","dynamic-wind",["pre","body","post"],["list",["qua:function","dynamic-wind*"],["list*",["qua:function","lambda"],[],"pre"],["list*",["qua:function","lambda"],[],"body"],["list*",["qua:function","lambda"],[],"post"]]],null,null,["defun","js:getter",["prop-name"],["let",[["getter",["lambda",["obj"],["js:get","obj","prop-name"]]]],["setf",["setter","getter"],["lambda",["new-val","obj"],["js:set","obj","prop-name","new-val"]]],"getter"]],null,["defun","js:invoker",["fun-name"],["lambda",["this",".","args"],["let",[["fun",["js:get","this","fun-name"]]],["js:apply","fun","this",["js:list-to-array","args"]]]]],null,["defun","js:create-object",["proto"],[["js:invoker",["wat-string","create"]],["js:global",["wat-string","Object"]],"proto"]],null,["defun","js:plist-to-object",["plist"],["letrec",[["obj",["js:create-object",null]],[["qua:function","add-to-dict"],["lambda",["plist"],["if",["nilp","plist"],"obj",["progn",["js:set","obj",["symbol-name",["car","plist"]],["cadr","plist"]],["add-to-dict",["cddr","plist"]]]]]]],["add-to-dict","plist"]]],["defun","js:object","plist",["js:plist-to-object","plist"]],null,null]
