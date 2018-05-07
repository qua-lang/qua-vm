var fs = require("fs");
var path = require("path");
module.exports = function(vm, e) {
    vm.defun(e, vm.sym("%%require"), vm.jswrap(require));
    vm.defun(e, vm.sym("%%read-file-sync"), vm.jswrap(fs.readFileSync));
};
