// Adds utility functions for testing the built-ins to a VM
var deep_equal = require("deep-equal");
module.exports = function(vm, root_env) {
    vm.defun(root_env, vm.sym("%%assert"), vm.jswrap(vm.assert));
    vm.defun(root_env, vm.sym("%%deep-equal"), vm.jswrap(deep_equal));
};
