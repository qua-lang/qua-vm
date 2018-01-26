var vm = require("./vm");
var io = require("./io");
var cc = require("./cc");
var init_bytecode = require("../build/out/init.js").main;

var e = vm.make_env();
vm.init(e);
//cc(vm, e);
vm.eval(parse_bytecode([vm.sym("qua:progn")].concat(init_bytecode)), e);
console.log(vm.lookup(e, vm.sym("answer")));

module.exports.vm = function() {
    return {
        "eval": function(str) { return vm.eval(io.parse_sexp(str), e); }
    };
};

/* Bytecode parser */
function parse_bytecode(obj) {
    switch(Object.prototype.toString.call(obj)) {
    case "[object String]": return obj === "#ignore" ? vm.IGN : vm.sym(obj);
    case "[object Array]": return parse_bytecode_array(obj);
    default: return obj; }
}
function parse_bytecode_array(arr) {
    if ((arr.length == 2) && arr[0] === "wat-string") { return arr[1]; }
    var i = arr.indexOf(".");
    if (i === -1) return vm.array_to_list(arr.map(parse_bytecode));
    else { var front = arr.slice(0, i);
        return vm.array_to_list(front.map(parse_bytecode), parse_bytecode(arr[i + 1])); }
}