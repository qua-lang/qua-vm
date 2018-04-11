// Adds utility functions for testing the built-ins to a VM
var deep_equal = require("deep-equal");
module.exports = function(vm, e) {
    function assert(x) { if (!x) return vm.error("assertion failure"); }
    vm.defun(e, vm.sym("%%assert"), vm.jswrap(assert));
    vm.defun(e, vm.sym("%%deep-equal"), vm.jswrap(deep_equal));
    vm.defun(e, vm.sym("%%pr"), vm.jswrap(console.log));
}
