// Terminal IO
var readline = require("readline-sync");
module.exports = function(vm, e, parser) {
    vm.read_line = function() {
        return readline.question("> ");
    };
    vm.defun(e, vm.sym("%%read-line"), vm.jswrap(vm.read_line));
};
