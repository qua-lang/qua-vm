var vm = require("./vm");
var parser = require("./read");
var init_bytecode = require("../build/out/init.js").main;
var test_bytecode = require("../build/out/test.js").main;

var e = vm.make_env();
require("./lisp-2")(vm, e);
require("./cont")(vm, e);
require("./alien")(vm, e);
require("./print")(vm, e);
require("./optim")(vm, e);
require("./test")(vm, e);
vm.init(e);
vm.eval(parse_bytecode([vm.sym("%%progn")].concat(init_bytecode)), e);
vm.eval(parse_bytecode([vm.sym("%%progn")].concat(test_bytecode)), e);

module.exports.vm = function() {
    return {
        "eval": function(str) { return vm.eval(parser.parse_sexp(str), e); }
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
    if ((arr.length == 2) && arr[0] === "qua:function") { return vm.fun_sym(arr[1]); }
    if ((arr.length == 2) && arr[0] === "qua:keyword") { return vm.keyword(arr[1]); }
    if ((arr.length == 2) && arr[0] === "qua:type-variable") { return vm.make_type_var(arr[1]); }
    var i = arr.indexOf(".");
    if (i === -1) return vm.array_to_list(arr.map(parse_bytecode));
    else { var front = arr.slice(0, i);
        return vm.array_to_list(front.map(parse_bytecode), parse_bytecode(arr[i + 1])); }
}
