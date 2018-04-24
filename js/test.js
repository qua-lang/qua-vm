// Adds utility functions for testing the built-ins to a VM
var deep_equal = require("deep-equal");
module.exports = function(vm, e) {
    vm.defun(e, vm.sym("%%assert"), vm.jswrap(vm.assert));
    vm.defun(e, vm.sym("%%deep-equal"), vm.jswrap(deep_equal));
};
