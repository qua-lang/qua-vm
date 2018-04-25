module.exports.main = [null,["def",["qua:function","qua:assert"],["qua:function","%%assert"]],["def",["qua:function","qua:deep-equal"],["qua:function","%%deep-equal"]],["defun",["qua:function","qua:expect"],["expected","actual"],["qua:assert",["qua:deep-equal","expected","actual"]]],null,["qua:assert",["qua:deep-equal",1,["car",["cons",1,2]]]],["qua:assert",["qua:deep-equal",2,["cdr",["cons",1,2]]]],["qua:assert",["qua:deep-equal",1,["car",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",["list",2,3],["cdr",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",1,["car",["list*",1,2,3]]]],["qua:assert",["qua:deep-equal",["cons",2,3],["cdr",["list*",1,2,3]]]],null,["def","e1",["make-environment"]],["eval",["list",["qua:function","def"],["quote","x"],1],"e1"],["qua:assert",["qua:deep-equal",1,["eval",["quote","x"],"e1"]]],["qua:assert",["qua:deep-equal","#void",["progn"]]],["qua:assert",["qua:deep-equal",1,["progn",1]]],["qua:assert",["qua:deep-equal",2,["progn",1,2]]],null,["def","e2",["make-environment"]],["def",["qua:function","fun2"],["wrap",["vau",["p"],"#ign","p"]]],["eval",["list",["qua:function","def"],["quote","x"],2],"e2"],["eval",["list",["qua:function","def"],["quote",["qua:function","fun2"]],["qua:function","fun2"]],"e2"],["qua:assert",["qua:deep-equal",2,["eval",["list",["qua:function","fun2"],["quote","x"]],"e2"]]],null,["qua:assert",["qua:deep-equal",["quote","foo"],["quote","foo"]]],["qua:assert",["qua:deep-equal",["quote",["foo","bar"]],["quote",["foo","bar"]]]],null,["def",["qua:function","lam1"],["lambda",[],10,11,12]],["def",["qua:function","lam2"],["lambda",[]]],["qua:assert",["qua:deep-equal",12,["lam1"]]],["qua:assert",["qua:deep-equal","#void",["lam2"]]],["defun","lam3",["x"],1,2,3,"x"],["qua:assert",["qua:deep-equal",4,["lam3",4]]],null,["qua:assert",["qua:deep-equal",["list",1,2,3],["apply",["qua:function","list"],["list",1,2,3]]]],null,["qua:assert",["qua:deep-equal",["list",1,1,1],["map-list",["lambda",["#ign"],1],["list",1,2,3]]]],null,["qua:assert",["qua:deep-equal",["quote","foo"],["make-instance",["quote","symbol"],["qua:keyword","name"],["wat-string","foo"],["qua:keyword","ns"],["wat-string","v"]]]],["qua:assert",["qua:deep-equal",["qua:keyword","foo"],["make-instance",["quote","keyword"],["qua:keyword","name"],["wat-string","foo"]]]],["defgeneric","describe-yourself",["self"]],["defmethod","describe-yourself",[["self","js:number"]],["wat-string","a number"]],["defmethod","describe-yourself",[["self","boolean"]],["wat-string","a boolean"]],["defmethod","describe-yourself",[["self","symbol"]],["wat-string","a symbol"]],["defmethod","describe-yourself",[["self","object"]],["wat-string","any other object"]],["qua:assert",["qua:deep-equal",["wat-string","a number"],["describe-yourself",33]]],["qua:assert",["qua:deep-equal",["wat-string","a boolean"],["describe-yourself",true]]],["qua:assert",["qua:deep-equal",["wat-string","a symbol"],["describe-yourself",["quote","foo"]]]],["qua:assert",["qua:deep-equal",["wat-string","any other object"],["describe-yourself",["qua:keyword","hello"]]]],["qua:assert",["qua:deep-equal",["wat-string","any other object"],["describe-yourself",["list",1,2]]]],null,["defun","fun-with-keywords",[["qua:keyword","x"],"x-param",["qua:keyword","y"],"y-param"],["list","x-param","y-param"]],["qua:assert",["qua:deep-equal",["list",2,4],["fun-with-keywords",["qua:keyword","x"],2,["qua:keyword","y"],4]]],null,["defclass","my-class",[]],["defgeneric","my-generic",["self"]],["defmethod","my-generic",[["self","my-class"]],["wat-string","wow!"]],["def","obj1",["make-instance",["quote","my-class"]]],["defclass","my-subclass",["my-class"]],["def","obj2",["make-instance",["quote","my-subclass"]]],["qua:assert",["qua:deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["qua:assert",["qua:deep-equal",["wat-string","wow!"],["my-generic","obj2"]]],["defmethod","my-generic",[["self","my-subclass"]],["wat-string","wowzers!"]],["qua:assert",["qua:deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["qua:assert",["qua:deep-equal",["wat-string","wowzers!"],["my-generic","obj2"]]],null,["defclass","class-with-slots",[],["x",["qua:keyword","type"],"number","y",["qua:keyword","type"],"number"]],["def","object-with-slots",["make-instance",["quote","class-with-slots"],["qua:keyword","x"],2,["qua:keyword","y"],4]],["qua:assert",["qua:deep-equal",2,["slot-value","object-with-slots",["quote","x"]]]],["qua:assert",["qua:deep-equal",4,["slot-value","object-with-slots",["quote","y"]]]],["qua:assert",["slot-bound-p","object-with-slots",["quote","x"]]],["qua:assert",["slot-bound-p","object-with-slots",["quote","y"]]],["qua:assert",["not",["slot-bound-p","object-with-slots",["quote","z"]]]],["set-slot-value","object-with-slots",["quote","x"],6],["set-slot-value","object-with-slots",["quote","y"],8],["qua:assert",["qua:deep-equal",6,["slot-value","object-with-slots",["quote","x"]]]],["qua:assert",["qua:deep-equal",8,["slot-value","object-with-slots",["quote","y"]]]],null,["let",[["x",1]],["setq","x",2],["qua:assert",["qua:deep-equal",2,"x"]]],null,["let",[["foo",1]],["defun","foo",[],"foo"],["qua:assert",["qua:deep-equal",["foo"],1]],["def","env",["the-environment"]],["js:set",["qua:function","foo"],["wat-string","qua_setter"],["lambda",["new-val"],["setq","foo","new-val"]]],["setf",["foo"],2],["qua:assert",["qua:deep-equal",["foo"],2]]],null,["let",[["cell",["mut",12]]],["qua:expect",12,["ref","cell"]],["setf",["ref","cell"],14],["qua:expect",14,["ref","cell"]],["incf",["ref","cell"]],["qua:expect",15,["ref","cell"]],["incf",["ref","cell"],2],["qua:expect",17,["ref","cell"]],["decf",["ref","cell"]],["qua:expect",16,["ref","cell"]],["decf",["ref","cell"],2],["qua:expect",14,["ref","cell"]]],null,["qua:expect",2,["%%rescue",["lambda",["exc"],"exc"],["lambda",[],2]]],["qua:expect",["quote","foo"],["%%rescue",["lambda",["exc"],"exc"],["lambda",[],["%%raise",["quote","foo"]]]]],["qua:expect","#void",["cond"]],["qua:expect",1,["cond",[["qua:deep-equal",1,1],1]]],["qua:expect","#void",["cond",[false,1]]],["qua:expect",2,["cond",[false,1],[true,2],[true,3]]],["qua:expect",true,["and"]],["qua:expect",true,["and",true]],["qua:expect",false,["and",false]],["qua:expect",true,["and",true,true,true]],["qua:expect",false,["and",true,true,true,false]],["qua:expect",false,["or"]],["qua:expect",true,["or",true]],["qua:expect",false,["or",false]],["qua:expect",false,["or",false,false,false]],["qua:expect",true,["or",false,false,false,true]],["qua:expect","#void",["case",12]],["qua:expect",1,["case",1,[1,1],[2,2],[3,3]]],["qua:expect",3,["case",3,[1,1],[2,2],[3,3]]],["qua:expect","#void",["case",4,[1,1],[2,2],[3,3]]],["qua:expect",1,["qua:call-with-escape",["lambda",["#ign"],1]]],["qua:expect",2,["qua:call-with-escape",["lambda",["escape"],1,["return-from","escape",2],3]]],["qua:expect","#void",["qua:call-with-escape",["lambda",["escape"],1,["return-from","escape"],3]]],["qua:expect","#void",["block","x"]],["qua:expect",1,["block","x",1]],["qua:expect",2,["block","x",1,["return-from","x",2],3]],["qua:expect","#void",["block","x",1,["return-from","x"],3]],["qua:expect",1,["unwind-protect",1]],["qua:expect",1,["unwind-protect",1,2]],["qua:expect",1,["unwind-protect",1,2,3]],["let",[["cell",["mut",false]]],["qua:expect",1,["unwind-protect",1,["setf",["ref","cell"],true]]],["qua:expect",true,["ref","cell"]]],["let",[["cell",["mut",false]]],["block","exit",["%%rescue",["lambda",["exc"],["qua:expect",["wat-string","foo"],"exc"],["qua:expect",true,["ref","cell"]],["return-from","exit"]],["lambda",[],["unwind-protect",["%%raise",["wat-string","foo"]],["setf",["ref","cell"],true]]]],["qua:assert",false]]],["qua:expect","#void",["prog1"]],["qua:expect",1,["prog1",1,2,3]],["qua:expect",2,["prog2",1,2,3]],["qua:expect","#void",["prog2",1]],null,["defdynamic","*my-dynamic*",1],["progn",["qua:expect",1,["dynamic","*my-dynamic*"]],["dynamic-let",[["*my-dynamic*",2]],["qua:expect",2,["dynamic","*my-dynamic*"]]],["qua:expect",1,["dynamic","*my-dynamic*"]]],["block","exit",["qua:expect",1,["dynamic","*my-dynamic*"]],["%%rescue",["lambda",["exc"],["qua:expect",["wat-string","foo"],"exc"],["qua:expect",1,["dynamic","*my-dynamic*"]],["return-from","exit"]],["lambda",[],["dynamic-let",[["*my-dynamic*",2]],["qua:expect",2,["dynamic","*my-dynamic*"]],["%%raise",["wat-string","foo"]]]]],["qua:assert",false]],null,["let",[["obj",["js:object",["qua:keyword","message"],["wat-string","hello"],["qua:keyword","sent"],["not",true]]]],["qua:assert",["qua:deep-equal",["wat-string","hello"],[["js:getter",["wat-string","message"]],"obj"]]],["qua:assert",["qua:deep-equal",false,[["js:getter",["wat-string","sent"]],"obj"]]]],null,["qua:assert",["qua:deep-equal",["wat-string","String"],["%%js:get",["%%js:get",["wat-string","foo"],["wat-string","constructor"]],["wat-string","name"]]]],["qua:assert",["qua:deep-equal",["wat-string","String"],[["js:getter",["wat-string","name"]],[["js:getter",["wat-string","constructor"]],["wat-string","foo"]]]]],null,["qua:assert",["qua:deep-equal",["wat-string","foo"],[["js:getter",["wat-string","qs_name"]],["quote","foo"]]]],["qua:assert",["qua:deep-equal",["wat-string","v"],[["js:getter",["wat-string","qs_ns"]],["quote","foo"]]]],["qua:assert",["qua:deep-equal",["wat-string","f"],[["js:getter",["wat-string","qs_ns"]],["quote",["qua:function","foo"]]]]],null,["let",[["obj",["js:create-object",null]]],["setf",[["js:getter",["wat-string","message"]],"obj"],["wat-string","foo"]],["qua:assert",["qua:deep-equal",["wat-string","foo"],[["js:getter",["wat-string","message"]],"obj"]]]],null,["qua:assert",["qua:deep-equal",["wat-string","12"],[["js:invoker",["wat-string","toString"]],12]]],null,["qua:expect",2,["js:get",["js:array",1,2,3],1]],null,["qua:expect",["wat-string","foobar"],["+",["wat-string","foo"],["wat-string","ba"],["wat-string","r"]]],["qua:expect",1,["+",1]],["qua:expect",6,["+",2,2,2]],["qua:expect",3,["*",3]],["qua:expect",24,["*",4,3,2]],["qua:expect",-4,["-",4]],["qua:expect",4,["-",8,2,2]],["qua:expect",0.25,["/",4]],["qua:expect",1,["/",12,4,3]],["qua:assert",["<",1,2,3,4,5]],["qua:assert",["not",["<",1,2,3,4,5,-1]]],["qua:assert",[">",5,4,3,2,1]],["qua:assert",["not",[">",5,4,3,2,1,6]]],["qua:assert",["===",1,1,1]],["qua:assert",["not",["===",1,1,1,2]]],null,["qua:expect","#void",["handler-bind",[]]],["qua:expect",true,["handler-bind",[],1,2,["eq",true,true]]],["qua:expect",1,["block","b",["handler-bind",[["condition",["lambda",["c"],["return-from","b",1]]]],["signal",["make-instance",["quote","condition"]]],2]]],["qua:expect",2,["block","b",["handler-bind",[["warning",["lambda",["c"],["return-from","b",1]]],["serious-condition",["lambda",["c"],["return-from","b",2]]]],["signal",["make-instance",["quote","error"]]],3]]],["qua:expect","#void",["signal",["make-instance",["quote","condition"]]]],["qua:expect",["wat-string","foo"],["block","exit",["handler-bind",[["condition",["lambda","#ign",["invoke-restart",["make-instance",["quote","continue"]]]]]],["restart-bind",[["continue",["lambda","#ign",["return-from","exit",["wat-string","foo"]]]]],["signal",["make-instance",["quote","condition"]]]]]]],null,["qua:assert",["typep",["make-instance",["quote","serious-condition"]],["quote","object"]]],["qua:assert",["typep",["make-instance",["quote","error"]],["quote","serious-condition"]]],["qua:assert",["typep",["make-instance",["quote","error"]],["quote","object"]]],["qua:assert",["not",["typep",["make-instance",["quote","object"]],["quote","error"]]]],["qua:assert",["typep",12,["quote","js:number"]]],["qua:assert",["typep",12,["quote","number"]]],["qua:assert",["typep",12,["quote","object"]]],["qua:assert",["not",["typep",12,["quote","standard-object"]]]],["qua:assert",["typep",[["js:getter",["wat-string","qs_direct-superclasses"]],["find-generic-class",["quote","object"]]],["quote","js:array"]]],["qua:assert",["typep",[["js:getter",["wat-string","qs_slots"]],["find-generic-class",["quote","object"]]],["quote","js:object"]]],null,["qua:expect","#void",["typecase",true]],["qua:expect",2,["typecase",true,["number",1],["boolean",2]]],["qua:expect",1,["typecase",10,["number",1],["boolean",2]]],["qua:expect","#void",["typecase",["wat-string","foo"],["number",1],["boolean",2]]],["qua:expect",["wat-string","default"],["typecase",["quote","whatever"],[true,["wat-string","default"]]]],["qua:expect",1,["typecase",["quote","whatever"],["symbol",1],[true,["wat-string","default"]]]],["qua:expect",["wat-string","default"],["typecase",["quote","whatever"],["number",1],[true,["wat-string","default"]]]],["qua:assert",["qua:type-variable-p",["quote","?t"]]],["qua:assert",["not",["qua:type-variable-p",["quote","t"]]]],["qua:expect",["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],["qua:parse-type-spec",["quote","number"]],["qua:keyword","out-type"],["qua:parse-type-spec",["quote","boolean"]]],["qua:parse-generic-param-spec",["quote",[["qua:keyword","io"],"number","boolean"]]]],["qua:expect",["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],["qua:parse-type-spec",["quote","number"]],["qua:keyword","out-type"],"qua:the-top-type"],["qua:parse-generic-param-spec",["quote",[["qua:keyword","in"],"number"]]]],["qua:expect",["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],"qua:the-bottom-type",["qua:keyword","out-type"],["qua:parse-type-spec",["quote","number"]]],["qua:parse-generic-param-spec",["quote",[["qua:keyword","out"],"number"]]]],["qua:expect",["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],["qua:parse-type-spec",["quote","number"]],["qua:keyword","out-type"],["qua:parse-type-spec",["quote","number"]]],["qua:parse-generic-param-spec",["quote","number"]]],["qua:expect",["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],["qua:parse-type-spec",["quote",["hash-set","number"]]],["qua:keyword","out-type"],["qua:parse-type-spec",["quote",["hash-set","number"]]]],["qua:parse-generic-param-spec",["quote",["hash-set","number"]]]],["qua:expect",["make-instance",["quote","qua:type-variable"],["qua:keyword","name"],["wat-string","?foo"]],["qua:parse-type-spec",["quote","?foo"]]],["qua:expect",["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["wat-string","foo"],["qua:keyword","generic-params"],["quote",[]]],["qua:parse-type-spec",["quote","foo"]]],["qua:expect",["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["wat-string","foo"],["qua:keyword","generic-params"],["quote",[]]],["qua:parse-type-spec",["quote",["foo"]]]],["qua:expect",["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["wat-string","hash-set"],["qua:keyword","generic-params"],["list",["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],["qua:parse-type-spec",["quote","number"]],["qua:keyword","out-type"],["qua:parse-type-spec",["quote","number"]]]]],["qua:parse-type-spec",["quote",["hash-set","number"]]]],["qua:expect",["make-instance",["quote","qua:class-type"],["qua:keyword","name"],["wat-string","hash-set"],["qua:keyword","generic-params"],["list",["make-instance",["quote","qua:generic-param"],["qua:keyword","in-type"],["qua:parse-type-spec",["quote","number"]],["qua:keyword","out-type"],"qua:the-top-type"]]],["qua:parse-type-spec",["quote",["hash-set",[["qua:keyword","in"],"number"]]]]],null,null]
