// This is the main file, that pulls together all components and
// creates a Qua VM.  While the code in the individual components is
// not too shabby, the way this file connects them together is
// definitely sub-par.
var parser = require("./read");
var init_bytecode = require("../build/out/init.json");
var user_bytecode = require("qua-user-code");

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
require("./optim")(vm, root_env);
require("./arch")(vm, root_env);
// FIXME: this should only be included if we're actually a test build
require("./test")(vm, root_env);

vm.time("run init bytecode",
        function() { vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(init_bytecode)), root_env); });

// FIXME: This should use USER-EVAL
vm.time("run user bytecode",
        function() { vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(user_bytecode)), root_env) });

module.exports.vm = function() {
    return {
        // TODO: should this call USER-EVAL?
        "eval": function(str) { return vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(parser.parse_sexp(str))), root_env); }
    };
};
