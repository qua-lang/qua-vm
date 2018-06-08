// Terminal IO
var readline = require("readline-sync");
module.exports = function(vm, root_env) {
    vm.read_line = function() {
        return readline.question("> ");
    };
    vm.defun(root_env, vm.sym("%%read-line"), vm.jswrap(vm.read_line));
};
