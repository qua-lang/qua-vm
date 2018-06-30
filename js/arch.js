// Node-specific code (Node is the "default architecture", due to the
// way Browserify package.json browser field works).
var fs = require("fs");
var path = require("path");
var readline = require("readline-sync");
module.exports = function(vm, root_env) {
    vm.defun(root_env, vm.sym("%%require"), vm.jswrap(require));
    vm.defun(root_env, vm.sym("%%read-file-sync"), vm.jswrap(fs.readFileSync));
    // FIXME: any uses of this outside of this file are probably broken
    vm.read_line = function() { return readline.question("> "); };
    vm.defun(root_env, vm.sym("%%read-line"), vm.jswrap(vm.read_line));
};
