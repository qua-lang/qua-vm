module.exports.main = [null,["def",["qua-function","%assert"],["qua-function","%%assert"]],["def",["qua-function","%deep-equal"],["qua-function","%%deep-equal"]],["defun",["qua-function","%expect"],["expected","actual"],["%assert",["%deep-equal","expected","actual"]]],null,["%assert",["%deep-equal",1,["car",["cons",1,2]]]],["%assert",["%deep-equal",2,["cdr",["cons",1,2]]]],["%assert",["%deep-equal",1,["car",["list",1,2,3]]]],["%assert",["%deep-equal",["list",2,3],["cdr",["list",1,2,3]]]],["%assert",["%deep-equal",1,["car",["list*",1,2,3]]]],["%assert",["%deep-equal",["cons",2,3],["cdr",["list*",1,2,3]]]],["%assert",["symbol?",["quote","foo"]]],["%assert",["keyword?",["qua-keyword","foo"]]],null,["def","e1",["make-environment"]],["eval",["list",["qua-function","def"],["quote","x"],1],"e1"],["%assert",["%deep-equal",1,["eval",["quote","x"],"e1"]]],["%assert",["%deep-equal","#void",["progn"]]],["%assert",["%deep-equal",1,["progn",1]]],["%assert",["%deep-equal",2,["progn",1,2]]],null,["def","e2",["make-environment"]],["def",["qua-function","fun2"],["wrap",["vau",["p"],"#ign","p"]]],["eval",["list",["qua-function","def"],["quote","x"],2],"e2"],["eval",["list",["qua-function","def"],["quote",["qua-function","fun2"]],["qua-function","fun2"]],"e2"],["%assert",["%deep-equal",2,["eval",["list",["qua-function","fun2"],["quote","x"]],"e2"]]],null,["%assert",["%deep-equal",["quote","foo"],["quote","foo"]]],["%assert",["%deep-equal",["quote",["foo","bar"]],["quote",["foo","bar"]]]],null,["def",["qua-function","lam1"],["lambda",[],10,11,12]],["def",["qua-function","lam2"],["lambda",[]]],["%assert",["%deep-equal",12,["lam1"]]],["%assert",["%deep-equal","#void",["lam2"]]],["defun","lam3",["x"],1,2,3,"x"],["%assert",["%deep-equal",4,["lam3",4]]],null,["%assert",["%deep-equal",["list",1,2,3],["apply",["qua-function","list"],["list",1,2,3]]]],null,["%assert",["%deep-equal",["list",1,1,1],["map-list",["lambda",["#ign"],1],["list",1,2,3]]]],null,["%expect","#void",["if",["=",true,false],1]],["%expect",1,["if",["=",true,true],1]],["%expect",2,["if",["=",true,false],1,["=",true,true],2]],["%expect",3,["if",["=",true,false],1,["=",true,false],2,3]],null,["%assert",["%deep-equal",["quote","foo"],["make-instance",["quote","symbol"],["qua-keyword","name"],["wat-string","foo"],["qua-keyword","ns"],["wat-string","v"]]]],["%assert",["%deep-equal",["qua-keyword","foo"],["make-instance",["quote","keyword"],["qua-keyword","name"],["wat-string","foo"]]]],["defgeneric","describe-yourself",["self"]],["defmethod","describe-yourself",[["self","js-number"]],["wat-string","a number"]],["defmethod","describe-yourself",[["self","boolean"]],["wat-string","a boolean"]],["defmethod","describe-yourself",[["self","symbol"]],["wat-string","a symbol"]],["defmethod","describe-yourself",[["self","object"]],["wat-string","any other object"]],["%assert",["%deep-equal",["wat-string","a number"],["describe-yourself",33]]],["%assert",["%deep-equal",["wat-string","a boolean"],["describe-yourself",true]]],["%assert",["%deep-equal",["wat-string","a symbol"],["describe-yourself",["quote","foo"]]]],["%assert",["%deep-equal",["wat-string","any other object"],["describe-yourself",["qua-keyword","hello"]]]],["%assert",["%deep-equal",["wat-string","any other object"],["describe-yourself",["list",1,2]]]],null,["defun","fun-with-keywords",[["qua-keyword","x"],"x-param",["qua-keyword","y"],"y-param"],["list","x-param","y-param"]],["%assert",["%deep-equal",["list",2,4],["fun-with-keywords",["qua-keyword","x"],2,["qua-keyword","y"],4]]],null,["defclass","my-class",[]],["defgeneric","my-generic",["self"]],["defmethod","my-generic",[["self","my-class"]],["wat-string","wow!"]],["def","obj1",["make-instance",["quote","my-class"]]],["defclass","my-subclass",["my-class"]],["def","obj2",["make-instance",["quote","my-subclass"]]],["%assert",["%deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["%assert",["%deep-equal",["wat-string","wow!"],["my-generic","obj2"]]],["defmethod","my-generic",[["self","my-subclass"]],["wat-string","wowzers!"]],["%assert",["%deep-equal",["wat-string","wow!"],["my-generic","obj1"]]],["%assert",["%deep-equal",["wat-string","wowzers!"],["my-generic","obj2"]]],null,["defclass","class-with-slots",[],["x",["qua-keyword","type"],"number","y",["qua-keyword","type"],"number"]],["def","object-with-slots",["make-instance",["quote","class-with-slots"],["qua-keyword","x"],2,["qua-keyword","y"],4]],["%assert",["%deep-equal",2,["slot-value","object-with-slots",["quote","x"]]]],["%assert",["%deep-equal",4,["slot-value","object-with-slots",["quote","y"]]]],["%assert",["slot-bound?","object-with-slots",["quote","x"]]],["%assert",["slot-bound?","object-with-slots",["quote","y"]]],["%assert",["not",["slot-bound?","object-with-slots",["quote","z"]]]],["setf",["slot-value","object-with-slots",["quote","x"]],6],["setf",["slot-value","object-with-slots",["quote","y"]],8],["%assert",["%deep-equal",6,["slot-value","object-with-slots",["quote","x"]]]],["%assert",["%deep-equal",8,["slot-value","object-with-slots",["quote","y"]]]],null,["let",[["x",1]],["let",[["x",3]],["setq","x",2],["%assert",["%deep-equal",2,"x"]]],["%assert",["%deep-equal",1,"x"]],["let",[],["setq","x",2],["%assert",["%deep-equal",2,"x"]]],["%assert",["%deep-equal",2,"x"]]],["let",[["x","#void"]],["let",[["y","#void"]],["let",[["z","#void"]],["setq",["x","y",".","z"],["list",1,2,3,4]],["%expect",1,"x"],["%expect",2,"y"],["%expect",["quote",[3,4]],"z"]]]],null,["let",[["foo",1]],["defun","foo",[],"foo"],["%assert",["%deep-equal",["foo"],1]],["def","env",["the-environment"]],["js-set",["qua-function","foo"],["wat-string","qua_setter"],["lambda",["new-val"],["setq","foo","new-val"]]],["setf",["foo"],2],["%assert",["%deep-equal",["foo"],2]]],["let",[["x",12]],["%expect",12,"x"],["setf","x",14],["%expect",14,"x"],["incf","x"],["%expect",15,"x"],["incf","x",2],["%expect",17,"x"],["decf","x"],["%expect",16,"x"],["decf","x",2],["%expect",14,"x"]],null,["let",[["cell",["mut",12]]],["%expect",12,["ref","cell"]],["setf",["ref","cell"],14],["%expect",14,["ref","cell"]],["incf",["ref","cell"]],["%expect",15,["ref","cell"]],["incf",["ref","cell"],2],["%expect",17,["ref","cell"]],["decf",["ref","cell"]],["%expect",16,["ref","cell"]],["decf",["ref","cell"],2],["%expect",14,["ref","cell"]]],null,["%expect",3,["block","#ign",1,2,3]],["%expect",2,["block","b",1,["return-from","b",2],3]],["%expect","#void",["cond"]],["%expect",1,["cond",[["%deep-equal",1,1],1]]],["%expect","#void",["cond",[false,1]]],["%expect",2,["cond",[false,1],[true,2],[true,3]]],["%expect",true,["and"]],["%expect",true,["and",true]],["%expect",false,["and",false]],["%expect",true,["and",true,true,true]],["%expect",false,["and",true,true,true,false]],["%expect",false,["or"]],["%expect",true,["or",true]],["%expect",false,["or",false]],["%expect",false,["or",false,false,false]],["%expect",true,["or",false,false,false,true]],["%expect","#void",["case",12]],["%expect",1,["case",1,[1,1],[2,2],[3,3]]],["%expect",3,["case",3,[1,1],[2,2],[3,3]]],["%expect","#void",["case",4,[1,1],[2,2],[3,3]]],["%expect",1,["%call-with-escape",["lambda",["#ign"],1]]],["%expect",2,["%call-with-escape",["lambda",["escape"],1,["return-from","escape",2],3]]],["%expect","#void",["%call-with-escape",["lambda",["escape"],1,["return-from","escape"],3]]],["%expect","#void",["block","x"]],["%expect",1,["block","x",1]],["%expect",2,["block","x",1,["return-from","x",2],3]],["%expect","#void",["block","x",1,["return-from","x"],3]],["%expect",1,["unwind-protect",1]],["%expect",1,["unwind-protect",1,2]],["%expect",1,["unwind-protect",1,2,3]],["let",[["cell",["mut",false]]],["%expect",1,["unwind-protect",1,["setf",["ref","cell"],true]]],["%expect",true,["ref","cell"]]],["let",[["cell",false]],["block","exit",["unwind-protect",["return-from","exit"],["setf","cell",true]],["%expect",true,"cell"]]],["%expect","#void",["prog1"]],["%expect",1,["prog1",1,2,3]],["%expect",2,["prog2",1,2,3]],["%expect","#void",["prog2",1]],["%expect",12,["flet",[["bar",[],3],["foo",[],4]],["*",["bar"],["foo"]]]],["%expect",12,["labels",[["bar",["x"],["*","x",["foo"]]],["foo",[],4]],["bar",3]]],null,["defdynamic","*my-dynamic*",1],["progn",["%expect",1,["dynamic","*my-dynamic*"]],["dynamic-let",[["*my-dynamic*",2]],["%expect",2,["dynamic","*my-dynamic*"]]],["%expect",1,["dynamic","*my-dynamic*"]]],["progn",["%expect",1,["dynamic","*my-dynamic*"]],["block","exc",["dynamic-let",[["*my-dynamic*",2]],["%expect",2,["dynamic","*my-dynamic*"]],["return-from","exc"]]],["%expect",1,["dynamic","*my-dynamic*"]]],null,["let",[["obj",["js-object",["qua-keyword","message"],["wat-string","hello"],["qua-keyword","sent"],["not",true]]]],["%assert",["%deep-equal",["wat-string","hello"],[["js-getter",["wat-string","message"]],"obj"]]],["%assert",["%deep-equal",false,[["js-getter",["wat-string","sent"]],"obj"]]],["%assert",["own-property?","obj",["wat-string","message"]]],["%assert",["own-property?","obj",["qua-keyword","message"]]],["%assert",["own-property?","obj",["quote","message"]]],["%assert",["own-property?","obj",["wat-string","sent"]]],["%assert",["own-property?","obj",["qua-keyword","sent"]]],["%assert",["own-property?","obj",["quote","sent"]]],["%assert",["not",["own-property?","obj",["quote","xyz"]]]]],null,["%assert",["%deep-equal",["wat-string","String"],["%%js-get",["%%js-get",["wat-string","foo"],["wat-string","constructor"]],["wat-string","name"]]]],["%assert",["%deep-equal",["wat-string","String"],[["js-getter",["wat-string","name"]],[["js-getter",["wat-string","constructor"]],["wat-string","foo"]]]]],null,["%assert",["%deep-equal",["wat-string","foo"],[["js-getter",["wat-string","qs_name"]],["quote","foo"]]]],["%assert",["%deep-equal",["wat-string","v"],[["js-getter",["wat-string","qs_ns"]],["quote","foo"]]]],["%assert",["%deep-equal",["wat-string","f"],[["js-getter",["wat-string","qs_ns"]],["quote",["qua-function","foo"]]]]],null,["let",[["obj",["create-js-object"]]],["setf",[["js-getter",["wat-string","message"]],"obj"],["wat-string","foo"]],["%assert",["%deep-equal",["wat-string","foo"],[["js-getter",["wat-string","message"]],"obj"]]]],null,["%assert",["%deep-equal",["wat-string","12"],[["js-invoker",["wat-string","toString"]],12]]],null,["%expect",2,["js-get",["js-array",1,2,3],1]],null,["%expect",["wat-string","foobar"],["+",["wat-string","foo"],["wat-string","ba"],["wat-string","r"]]],["%expect",1,["+",1]],["%expect",6,["+",2,2,2]],["%expect",3,["*",3]],["%expect",24,["*",4,3,2]],["%expect",-4,["-",4]],["%expect",4,["-",8,2,2]],["%expect",0.25,["/",4]],["%expect",1,["/",12,4,3]],["%assert",["<",1,2,3,4,5]],["%assert",["not",["<",1,2,3,4,5,-1]]],["%assert",[">",5,4,3,2,1]],["%assert",["not",[">",5,4,3,2,1,6]]],["%assert",["===",1,1,1]],["%assert",["not",["===",1,1,1,2]]],null,["%expect","#void",["handler-bind",[]]],["%expect",true,["handler-bind",[],1,2,["=",true,true]]],["%expect",1,["block","b",["handler-bind",[["condition",["lambda",["c"],["return-from","b",1]]]],["signal",["make-instance",["quote","condition"]]],2]]],["%expect",2,["block","b",["handler-bind",[["warning",["lambda",["c"],["return-from","b",1]]],["serious-condition",["lambda",["c"],["return-from","b",2]]]],["signal",["make-instance",["quote","error"]]],3]]],["%expect","#void",["signal",["make-instance",["quote","condition"]]]],["%expect",["wat-string","foo"],["block","exit",["handler-bind",[["condition",["lambda","#ign",["invoke-restart",["make-instance",["quote","continue"]]]]]],["restart-bind",[["continue",["lambda","#ign",["return-from","exit",["wat-string","foo"]]]]],["signal",["make-instance",["quote","condition"]]]]]]],null,["%assert",["type?",["make-instance",["quote","serious-condition"]],["quote","object"]]],["%assert",["type?",["make-instance",["quote","error"]],["quote","serious-condition"]]],["%assert",["type?",["make-instance",["quote","error"]],["quote","object"]]],["%assert",["not",["type?",["make-instance",["quote","object"]],["quote","error"]]]],["%assert",["type?",12,["quote","js-number"]]],["%assert",["type?",12,["quote","number"]]],["%assert",["type?",12,["quote","object"]]],["%assert",["not",["type?",12,["quote","standard-object"]]]],["%assert",["type?",[["js-getter",["wat-string","qs_direct-superclasses"]],["find-generic-class",["quote","object"]]],["quote","js-array"]]],["%assert",["type?",[["js-getter",["wat-string","qs_slots"]],["find-generic-class",["quote","object"]]],["quote","js-object"]]],null,["%expect","#void",["typecase",true]],["%expect",2,["typecase",true,["number",1],["boolean",2]]],["%expect",1,["typecase",10,["number",1],["boolean",2]]],["%expect","#void",["typecase",["wat-string","foo"],["number",1],["boolean",2]]],["%expect",["wat-string","default"],["typecase",["quote","whatever"],[true,["wat-string","default"]]]],["%expect",1,["typecase",["quote","whatever"],["symbol",1],[true,["wat-string","default"]]]],["%expect",["wat-string","default"],["typecase",["quote","whatever"],["number",1],[true,["wat-string","default"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],["%parse-type-spec",["quote","boolean"]]],["%parse-generic-param-spec",["quote",[["qua-keyword","io"],"number","boolean"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],"+top-type+"],["%parse-generic-param-spec",["quote",[["qua-keyword","in"],"number"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],"+bottom-type+",["qua-keyword","out-type"],["%parse-type-spec",["quote","number"]]],["%parse-generic-param-spec",["quote",[["qua-keyword","out"],"number"]]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],["%parse-type-spec",["quote","number"]]],["%parse-generic-param-spec",["quote","number"]]],["%expect",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote",["hash-set","number"]]],["qua-keyword","out-type"],["%parse-type-spec",["quote",["hash-set","number"]]]],["%parse-generic-param-spec",["quote",["hash-set","number"]]]],["%expect",["make-instance",["quote","%type-variable"],["qua-keyword","name"],["wat-string","foo"]],["%parse-type-spec",["qua-keyword","foo"]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","foo"],["qua-keyword","generic-params"],["quote",[]]],["%parse-type-spec",["quote","foo"]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","foo"],["qua-keyword","generic-params"],["quote",[]]],["%parse-type-spec",["quote",["foo"]]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","hash-set"],["qua-keyword","generic-params"],["list",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],["%parse-type-spec",["quote","number"]]]]],["%parse-type-spec",["quote",["hash-set","number"]]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","hash-set"],["qua-keyword","generic-params"],["list",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["qua-keyword","e"]],["qua-keyword","out-type"],["%parse-type-spec",["qua-keyword","e"]]]]],["%parse-type-spec",["quote",["hash-set",["qua-keyword","e"]]]]],["%expect",["make-instance",["quote","%class-type"],["qua-keyword","name"],["wat-string","hash-set"],["qua-keyword","generic-params"],["list",["make-instance",["quote","%generic-param"],["qua-keyword","in-type"],["%parse-type-spec",["quote","number"]],["qua-keyword","out-type"],"+top-type+"]]],["%parse-type-spec",["quote",["hash-set",[["qua-keyword","in"],"number"]]]]],null,null,null,null]
