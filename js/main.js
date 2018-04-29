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
require("./term")(vm, e, parser);
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
