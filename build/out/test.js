module.exports.main = [null,["def",["qua:function","qua:assert"],["qua:function","%%assert"]],["def",["qua:function","qua:deep-equal"],["qua:function","%%deep-equal"]],["def",["qua:function","pr"],["qua:function","%%print"]],null,["qua:assert",["qua:deep-equal",1,["car",["cons",1,2]]]],["qua:assert",["qua:deep-equal",2,["cdr",["cons",1,2]]]],["qua:assert",["qua:deep-equal",1,["car",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",["list",2,3],["cdr",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",1,["car",["list*",1,2,3]]]],["qua:assert",["qua:deep-equal",["cons",2,3],["cdr",["list*",1,2,3]]]],null,["def","e1",["make-environment"]],["eval",["list",["qua:function","def"],["quote","x"],1],"e1"],["qua:assert",["qua:deep-equal",1,["eval",["quote","x"],"e1"]]],["qua:assert",["qua:deep-equal","#void",["progn"]]],["qua:assert",["qua:deep-equal",1,["progn",1]]],["qua:assert",["qua:deep-equal",2,["progn",1,2]]],null,["def","e2",["make-environment"]],["def",["qua:function","fun2"],["wrap",["vau",["p"],"#ign","p"]]],["eval",["list",["qua:function","def"],["quote","x"],2],"e2"],["eval",["list",["qua:function","def"],["quote",["qua:function","fun2"]],["qua:function","fun2"]],"e2"],["qua:assert",["qua:deep-equal",2,["eval",["list",["qua:function","fun2"],["quote","x"]],"e2"]]],null,["qua:assert",["qua:deep-equal",["quote","foo"],["quote","foo"]]],["qua:assert",["qua:deep-equal",["quote",["foo","bar"]],["quote",["foo","bar"]]]],null,["def",["qua:function","lam1"],["lambda",[],10,11,12]],["def",["qua:function","lam2"],["lambda",[]]],["qua:assert",["qua:deep-equal",12,["lam1"]]],["qua:assert",["qua:deep-equal","#void",["lam2"]]],["defun","lam3",["x"],1,2,3,"x"],["qua:assert",["qua:deep-equal",4,["lam3",4]]],null,["qua:assert",["qua:deep-equal",["list",1,2,3],["apply",["qua:function","list"],["list",1,2,3]]]],null,["qua:assert",["qua:deep-equal",["list",1,1,1],["qua:map-list",["lambda",["#ign"],1],["list",1,2,3]]]],null,["qua:assert",["qua:deep-equal",["quote","foo"],["make-instance",["quote","symbol"],["qua:keyword","name"],["wat-string","foo"],["qua:keyword","ns"],["wat-string","v"]]]],["qua:assert",["qua:deep-equal",["qua:keyword","foo"],["make-instance",["quote","keyword"],["qua:keyword","name"],["wat-string","foo"]]]],null]
