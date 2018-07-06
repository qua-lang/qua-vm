// Adds utility functions for testing the built-ins to a VM
var deep_equal = require("deep-equal");
module.exports = function(vm, init_env) {
    vm.defun(init_env, vm.sym("%%assert"), vm.jswrap(vm.assert));
    vm.defun(init_env, vm.sym("%%deep-equal"), vm.jswrap(deep_equal));
};
