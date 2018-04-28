// Terminal IO
var readline = require("readline-sync");
module.exports = function(vm, e, parser) {
    vm.read_line = function() {
        return readline.question("> ");
    };
    vm.read = function() {
        return vm.parse_bytecode([vm.sym("%%progn")].concat(parser.parse_sexp(vm.read_line())));
    };
    vm.defun(e, vm.sym("%%read-line"), vm.jswrap(vm.read_line));
    vm.defun(e, vm.sym("%%read"), vm.jswrap(vm.read));
};
