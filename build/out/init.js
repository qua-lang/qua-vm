module.exports.main = [null,null,null,null,null,null,null,null,null,["%%def",["qua:function","def"],["qua:function","%%def"]],null,["def",["qua:function","car"],["qua:function","%%car"]],null,["def",["qua:function","cdr"],["qua:function","%%cdr"]],null,["def",["qua:function","cons"],["qua:function","%%cons"]],null,["def",["qua:function","eval"],["qua:function","%%eval"]],null,["def",["qua:function","eq"],["qua:function","%%eq"]],null,["def",["qua:function","if"],["qua:function","%%if"]],null,["def",["qua:function","make-environment"],["qua:function","%%make-environment"]],null,["def",["qua:function","pr"],["qua:function","%%pr"]],null,["def",["qua:function","progn"],["qua:function","%%progn"]],null,["def",["qua:function","unwrap"],["qua:function","%%unwrap"]],null,["def",["qua:function","wrap"],["qua:function","%%wrap"]],null,["def",["qua:function","class-of"],["qua:function","%%class-of"]],["def",["qua:function","find-class"],["qua:function","%%find-generic-class"]],["def",["qua:function","put-method"],["qua:function","%%put-method"]],["def",["qua:function","call-method"],["qua:function","%%call-method"]],null,null,["def",["qua:function","qua:to-fun-sym"],["qua:function","%%to-fun-sym"]],null,null,["def",["qua:function","list*"],["qua:function","%%list*"]],null,["def",["qua:function","quote"],["%%vau",["op"],"#ign","op"]],null,["def",["qua:function","list"],["wrap",["%%vau","args","#ign","args"]]],null,null,["def",["qua:function","vau"],["%%vau",["params","env-param",".","body"],"env",["eval",["list",["qua:function","%%vau"],"params","env-param",["list*",["qua:function","progn"],"body"]],"env"]]],null,["def",["qua:function","deffexpr"],["vau",["name","params","env-param",".","body"],"env",["eval",["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","vau"],"params","env-param","body"]],"env"]]],null,["def",["qua:function","make-macro"],["wrap",["vau",["expander"],"#ign",["vau","form","env",["eval",["eval",["cons","expander","form"],["make-environment"]],"env"]]]]],null,["def",["qua:function","macro"],["make-macro",["vau",["params",".","body"],"#ign",["list",["qua:function","make-macro"],["list*",["qua:function","vau"],"params","#ign","body"]]]]],null,["def",["qua:function","defmacro"],["macro",["name","params",".","body"],["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","macro"],"params","body"]]]],null,["defmacro","ur-lambda",["params",".","body"],["list",["qua:function","wrap"],["list*",["qua:function","vau"],"params","#ign","body"]]],null,null,["defmacro","ur-defun",["name","params",".","body"],["list",["qua:function","def"],["qua:to-fun-sym","name"],["list*",["qua:function","ur-lambda"],"params","body"]]],null,null,["def",["qua:function","lambda"],["qua:function","ur-lambda"]],["def",["qua:function","defun"],["qua:function","ur-defun"]],null,["defun","apply",["fun","args"],["eval",["cons",["unwrap","fun"],"args"],["make-environment"]]],["defun","funcall",["fun",".","args"],["apply","fun","args"]],null,["defun","nilp",["obj"],["eq","obj",[]]],null,["defun","qua:map-list",[["qua:function","fun"],"list"],["if",["nilp","list"],[],["cons",["fun",["car","list"]],["qua:map-list",["qua:function","fun"],["cdr","list"]]]]],["defun","qua:compose",["f","g"],["lambda",["arg"],["funcall","f",["funcall","g","arg"]]]],["def",["qua:function","caar"],["qua:compose",["qua:function","car"],["qua:function","car"]]],["def",["qua:function","cadr"],["qua:compose",["qua:function","car"],["qua:function","cdr"]]],["def",["qua:function","cdar"],["qua:compose",["qua:function","cdr"],["qua:function","car"]]],["def",["qua:function","cddr"],["qua:compose",["qua:function","cdr"],["qua:function","cdr"]]],null,null,["defmacro","let",["bindings",".","body"],["list*",["list*",["qua:function","lambda"],["qua:map-list",["qua:function","car"],"bindings"],"body"],["qua:map-list",["qua:function","cadr"],"bindings"]]],null,null,["defmacro","let*",["bindings",".","body"],["if",["nilp","bindings"],["list*",["qua:function","let"],[],"body"],["list",["qua:function","let"],["list",["car","bindings"]],["list*",["qua:function","let*"],["cdr","bindings"],"body"]]]],["defun","make-instance",["class-desig",".","initargs"],["%%make-instance","class-desig","initargs"]],["defmacro","defgeneric",["name","#ign"],["list",["qua:function","def"],["qua:to-fun-sym","name"],["vau",["self-form",".","args"],"denv",["let",[["self",["eval","self-form","denv"]]],["call-method","self","name",["cons","self","args"],"denv"]]]]],["deffexpr","defmethod",["name",[["self","class-desig"],".","args"],".","body"],"env",["let",[["class",["find-class","class-desig"]],["fun",["eval",["list*",["qua:function","lambda"],["list*","self","args"],"body"],"env"]]],["put-method","class","name","fun"],"name"]],null]
