module.exports.main = [null,["qua:def",["qua:function","qua:quote"],["qua:vau",["x"],"#ign","x"]],["qua:def",["qua:function","qua:list"],["qua:wrap",["qua:vau","o","#ign","o"]]],["qua:def",["qua:function","qua:make-macro-expander"],["qua:wrap",["qua:vau",["f"],"#ign",["qua:vau","o","e",["qua:eval",["qua:eval",["qua:cons","f","o"],["qua:make-env"]],"e"]]]]],["qua:def",["qua:function","vau"],["qua:make-macro-expander",["qua:vau",["p","ep",".","x"],"#ign",["qua:list",["qua:function","qua:vau"],"p","ep",["qua:list*",["qua:function","qua:progn"],"x"]]]]],["qua:def",["qua:function","macro"],["qua:make-macro-expander",["vau",["p",".","x"],"#ign",["qua:list",["qua:function","qua:make-macro-expander"],["qua:list*",["qua:function","vau"],"p","#ign","x"]]]]],["qua:def",["qua:function","defmacro"],["macro",["name","p",".","x"],["qua:list",["qua:function","qua:def"],["qua:to-fsym","name"],["qua:list*",["qua:function","macro"],"p","x"]]]],["defmacro","lambda",["p",".","x"],["qua:list",["qua:function","qua:wrap"],["qua:list*",["qua:function","vau"],"p","#ign","x"]]],["qua:def",["qua:function","foo"],["lambda",[],12]],["qua:def","answer",["foo"]],["qua:assert",["qua:deep-equal","answer",11]],null]
