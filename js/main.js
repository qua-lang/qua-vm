var parser = require("./read");
var init_bytecode = require("../build/out/init.js").main;
var test_bytecode = require("../build/out/test.js").main;

var vm = {};
vm.Env = function(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
    this.parent = parent;
};
vm.make_env = function(parent) { return new vm.Env(parent); };
var e = vm.make_env();
require("./util")(vm, e);
require("./obj")(vm, e);
require("./vm")(vm, e);
require("./lisp-2")(vm, e);
require("./type")(vm, e);
require("./cont")(vm, e);
require("./alien")(vm, e);
require("./print")(vm, e);
require("./optim")(vm, e);
if (!process.browser) {
    require("./termio")(vm, e, parser);
}
require("./test")(vm, e);
vm.init(e);

vm.time("run initialization",
        function() { vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(init_bytecode)), e); });

if (!process.browser) {
    vm.time("run tests",
            function() { vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(test_bytecode)), e) });
}

module.exports.vm = function() {
    return {
        "eval": function(str) { return vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(parser.parse_sexp(str))), e); }
    };
};
