// Node-specific code (Node is the "default architecture", due to the
// way Browserify's `package.json' browser field works, that lets us
// switch the contents of this file with those of `arch-browser.js' if
// we're doing a browser build.)
var fs = require("fs");
var path = require("path");
var readline = require("readline-sync");
module.exports = function(vm, init_env) {
    // Export some utils... might be better to just give `require' to
    // Lisp, and then do everything from there?
    vm.defun(init_env, "%%require", vm.jswrap(require));
    vm.defun(init_env, "%%read-file-sync", vm.jswrap(fs.readFileSync));
    // FIXME: any uses of this outside of this file are probably broken
    vm.read_line = function() { return readline.question("> "); };
    vm.defun(init_env, "%%read-line", vm.jswrap(vm.read_line));
};
