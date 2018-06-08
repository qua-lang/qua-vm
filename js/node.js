var fs = require("fs");
var path = require("path");
module.exports = function(vm, root_env) {
    vm.defun(root_env, vm.sym("%%require"), vm.jswrap(require));
    vm.defun(root_env, vm.sym("%%read-file-sync"), vm.jswrap(fs.readFileSync));
};
