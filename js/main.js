var parser = require("./read");
var init_bytecode = require("../build/out/init.json");
var test_bytecode = require("../build/out/test.json");

var vm = {};
// Where should this go? Whole init process = borked
vm.Env = function(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
    this.parent = parent;
};
vm.make_env = function(parent) { return new vm.Env(parent); };
var root_env = vm.make_env();
require("./util")(vm, root_env);
require("./obj")(vm, root_env);
require("./type")(vm, root_env);
require("./vm")(vm, root_env);
require("./cont")(vm, root_env);
require("./alien")(vm, root_env);
require("./read")(vm, root_env);
require("./print")(vm, root_env);
require("./optim")(vm, root_env);
if (!process.browser) {
    require("./node")(vm, root_env);
    require("./termio")(vm, root_env);
}
require("./test")(vm, root_env);

vm.time("run initialization",
        function() { vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(init_bytecode)), root_env); });

vm.time("run tests",
        function() { vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(test_bytecode)), root_env) });

module.exports.vm = function() {
    return {
        // TODO: should this call USER-EVAL?
        "eval": function(str) { return vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(parser.parse_sexp(str))), root_env); }
    };
};
