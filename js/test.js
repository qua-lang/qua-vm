// Adds utility functions for testing the built-ins to a VM
var deep_equal = require("deep-equal");
module.exports = function(vm, e) {
    function assert(x) { if (!x) vm.error("assertion failure"); }
    vm.bind(e, vm.fsym("qua:assert"), vm.jswrap(assert));
    vm.bind(e, vm.fsym("qua:deep-equal"), vm.jswrap(deep_equal));
}
