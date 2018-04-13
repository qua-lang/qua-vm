module.exports.main = [null,["def",["qua:function","qua:assert"],["qua:function","%%assert"]],["def",["qua:function","qua:deep-equal"],["qua:function","%%deep-equal"]],["defun",["qua:function","qua:expect"],["expected","actual"],["qua:assert",["qua:deep-equal","expected","actual"]]],null,["qua:assert",["qua:deep-equal",1,["car",["cons",1,2]]]],["qua:assert",["qua:deep-equal",2,["cdr",["cons",1,2]]]],["qua:assert",["qua:deep-equal",1,["car",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",["list",2,3],["cdr",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",1,["car",["list*",1,2,3]]]],["qua:assert",["qua:deep-equal",["cons",2,3],["cdr",["list*",1,2,3]]]],null,["def","e1",["make-environment"]],["eval",["list",["qua:function","def"],["quote","x"],1],"e1"],["qua:assert",["qua:deep-equal",1,["eval",["quote","x"],"e1"]]],["qua:assert",["qua:deep-equal","#void",["progn"]]],["qua:assert",["qua:deep-equal",1,["progn",1]]],["qua:assert",["qua:deep-equal",2,["progn",1,2]]],null,["def","e2",["make-environment"]],["def",["qua:function","fun2"],["wrap",["vau",["p"],"#ign","p"]]],["eval",["list",["qua:function","def"],["quote","x"],2],"e2"],["eval",["list",["qua:function","def"],["quote",["qua:function","fun2"]],["qua:function","fun2"]],"e2"],["qua:assert",["qua:deep-equal",2,["eval",["list",["qua:function","fun2"],["quote","x"]],"e2"]]],null,["qua:assert",["qua:deep-equal",["quote","foo"],["quote","foo"]]],["qua:assert",["qua:deep-equal",["quote",["foo","bar"]],["quote",["foo","bar"]]]],null,["def",["qua:function","lam1"],["lambda",[],10,11,12]],["def",["qua:function","lam2"],["lambda",[]]],["qua:assert",["qua:deep-equal",12,["lam1"]]],["qua:assert",["qua:deep-equal","#void",["lam2"]]],["defun","lam3",["x"],1,2,3,"x"],["qua:assert",["qua:deep-equal",4,["lam3",4]]],null,["qua:assert",["qua:deep-equal",["list",1,2,3],["apply",["qua:function","list"],["list",1,2,3]]]],null,["qua:assert",["qua:deep-equal",["list",1,1,1],["map-list",["lambda",["#ign"],1],["list",1,2,3]]]],null,["qua:assert",["qua:deep-equal",["quote","foo"],["make",["quote","symbol"],["qua:keyword","name"],["wat-string","foo"],["qua:keyword","ns"],["wat-string","v"]]]],["qua:assert",["qua:deep-equal",["qua:keyword","foo"],["make",["quote","keyword"],["qua:keyword","name"],["wat-string","foo"]]]],["defgeneric","describe-yourself",["self"]],["defmethod","describe-yourself",[["self","js:number"]],["wat-string","a number"]],["defmethod","describe-yourself",[["self","boolean"]],["wat-string","a boolean"]],["defmethod","describe-yourself",[["self","symbol"]],["wat-string","a symbol"]],["defmethod","describe-yourself",[["self","object"]],["wat-string","any other object"]],["qua:assert",["qua:deep-equal",["wat-string","a number"],["describe-yourself",33]]],["qua:assert",["qua:deep-equal",["wat-string","a boolean"],["describe-yourself",true]]],["qua:assert",["qua:deep-equal",["wat-string","a symbol"],["describe-yourself",["quote","foo"]]]],["qua:assert",["qua:deep-equal",["wat-string","any other object"],["describe-yourself",["qua:keyword","hello"]]]],["qua:assert",["qua:deep-equal",["wat-string","any other object"],["describe-yourself",["list",1,2]]]],null,["defun","fun-with-keywords",[["qua:keyword","x"],"x-param",["qua:keyword","y"],"y-param"],["list","x-param","y-param"]],["qua:assert",["qua:deep-equal",["list",2,4],["fun-with-keywords",["qua:keyword","x"],2,["qua:keyword","y"],4]]],null,["defclass","my-class",[]],["defgeneric","my-generic",["self"]],["defmethod","my-generic",[["self","my-class"]],["wat-string","wow!"]],["def","obj1",["make",["quote","my-class"]]],["defclass","my-subclass",["my-class"]],["def","obj2",["make",["quote","my-subclass"]]],["qua:assert",["qua:deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["qua:assert",["qua:deep-equal",["wat-string","wow!"],["my-generic","obj2"]]],["defmethod","my-generic",[["self","my-subclass"]],["wat-string","wowzers!"]],["qua:assert",["qua:deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["qua:assert",["qua:deep-equal",["wat-string","wowzers!"],["my-generic","obj2"]]],null,["defclass","class-with-slots",[],["x",["qua:keyword","type"],"number","y",["qua:keyword","type"],"number"]],["def","object-with-slots",["make",["quote","class-with-slots"],["qua:keyword","x"],2,["qua:keyword","y"],4]],["qua:assert",["qua:deep-equal",2,["slot-value","object-with-slots",["quote","x"]]]],["qua:assert",["qua:deep-equal",4,["slot-value","object-with-slots",["quote","y"]]]],["qua:assert",["slot-bound-p","object-with-slots",["quote","x"]]],["qua:assert",["slot-bound-p","object-with-slots",["quote","y"]]],["qua:assert",["not",["slot-bound-p","object-with-slots",["quote","z"]]]],["set-slot-value","object-with-slots",["quote","x"],6],["set-slot-value","object-with-slots",["quote","y"],8],["qua:assert",["qua:deep-equal",6,["slot-value","object-with-slots",["quote","x"]]]],["qua:assert",["qua:deep-equal",8,["slot-value","object-with-slots",["quote","y"]]]],null,["let",[["x",1]],["setq",["the-environment"],"x",2],["qua:assert",["qua:deep-equal",2,"x"]]],null,["let",[["foo",1]],["defun","foo",[],"foo"],["qua:assert",["qua:deep-equal",["foo"],1]],["def","env",["the-environment"]],["js:set",["qua:function","foo"],["wat-string","qua_setter"],["lambda",["new-val"],["setq","env","foo","new-val"]]],["setf",["foo"],2],["qua:assert",["qua:deep-equal",["foo"],2]]],null,["qua:expect",2,["%%rescue",["lambda",["exc"],"exc"],["lambda",[],2]]],["qua:expect",["quote","foo"],["%%rescue",["lambda",["exc"],"exc"],["lambda",[],["%%raise",["quote","foo"]]]]],["qua:expect","#void",["cond"]],["qua:expect",1,["cond",[["qua:deep-equal",1,1],1]]],["qua:expect","#void",["cond",[false,1]]],["qua:expect",2,["cond",[false,1],[true,2],[true,3]]],["qua:expect",true,["and"]],["qua:expect",true,["and",true]],["qua:expect",false,["and",false]],["qua:expect",true,["and",true,true,true]],["qua:expect",false,["and",true,true,true,false]],["qua:expect",false,["or"]],["qua:expect",true,["or",true]],["qua:expect",false,["or",false]],["qua:expect",false,["or",false,false,false]],["qua:expect",true,["or",false,false,false,true]],["defun","call-with-escape",[["qua:function","fun"]],["let*",[["tag",["list"]],["escape-function",["lambda","opt-val",["let",[["val",["optional","opt-val","#void"]]],["%%raise",["list","tag","val"]]]]]],["%%rescue",["lambda",["exc"],["if",["and",["consp","exc"],["eq","tag",["car","exc"]]],["cadr","exc"],["%%raise","exc"]]],["lambda",[],["fun","escape-function"]]]]],["defmacro","block",["name",".","body"],["list",["qua:function","call-with-escape"],["list*",["qua:function","lambda"],["list","name"],"body"]]],["defun","return-from",["escape",".","opt-val"],["apply","escape","opt-val"]],["qua:expect",1,["call-with-escape",["lambda",["#ign"],1]]],["qua:expect",2,["call-with-escape",["lambda",["escape"],1,["return-from","escape",2],3]]],["qua:expect","#void",["call-with-escape",["lambda",["escape"],1,["return-from","escape"],3]]],["qua:expect","#void",["block","x"]],["qua:expect",1,["block","x",1]],["qua:expect",2,["block","x",1,["return-from","x",2],3]],["qua:expect","#void",["block","x",1,["return-from","x"],3]],null,["let",[["coro",["coro:run",["lambda",[],1]]]],["qua:assert",["qua:deep-equal",1,"coro"]]],["let",[["coro",["coro:run",["lambda",[],["qua:assert",["qua:deep-equal",2,["coro:yield",1]]],["qua:assert",["qua:deep-equal","#void",["coro:yield"]]],3]]]],["qua:assert",["qua:deep-equal",1,["coro:value","coro"]]],["def","coro",["coro:resume","coro",2]],["qua:assert",["qua:deep-equal","#void",["coro:value","coro"]]],["def","coro",["coro:resume","coro"]],["qua:assert",["qua:deep-equal","coro",3]]],null,["let",[["obj",["js:object",["qua:keyword","message"],["wat-string","hello"],["qua:keyword","sent"],["not",true]]]],["qua:assert",["qua:deep-equal",["wat-string","hello"],[["js:getter",["wat-string","message"]],"obj"]]],["qua:assert",["qua:deep-equal",false,[["js:getter",["wat-string","sent"]],"obj"]]]],null,["qua:assert",["qua:deep-equal",["wat-string","String"],["%%js:get",["%%js:get",["wat-string","foo"],["wat-string","constructor"]],["wat-string","name"]]]],["qua:assert",["qua:deep-equal",["wat-string","String"],[["js:getter",["wat-string","name"]],[["js:getter",["wat-string","constructor"]],["wat-string","foo"]]]]],null,["qua:assert",["qua:deep-equal",["wat-string","foo"],[["js:getter",["wat-string","qs_name"]],["quote","foo"]]]],["qua:assert",["qua:deep-equal",["wat-string","v"],[["js:getter",["wat-string","qs_ns"]],["quote","foo"]]]],["qua:assert",["qua:deep-equal",["wat-string","f"],[["js:getter",["wat-string","qs_ns"]],["quote",["qua:function","foo"]]]]],null,["let",[["obj",["js:create-object",null]]],["setf",[["js:getter",["wat-string","message"]],"obj"],["wat-string","foo"]],["qua:assert",["qua:deep-equal",["wat-string","foo"],[["js:getter",["wat-string","message"]],"obj"]]]],null,["qua:assert",["qua:deep-equal",["wat-string","12"],[["js:invoker",["wat-string","toString"]],12]]],null,null]
