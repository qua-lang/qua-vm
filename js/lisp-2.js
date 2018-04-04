// Plugin for the Qua VM that adds a second namespace for functions.
// This should be loaded before anything else so that primitive
// functions defined in other modules go into the function namespace.
module.exports = function(vm, e) {
    // Add function namespace in addition to variable namespace.
    vm.FUN_NS = "f";
    // If the first element of a list form being evaluated is a
    // symbol, look up the symbol in the function namespace instead of
    // the variable namespace.
    vm.original_eval_operator = vm.eval_operator;
    vm.eval_operator = function(e, op) { // override vm.js
        if (op instanceof vm.Sym) {
            return vm.lookup(e, vm.to_fun_sym(op));
        } else {
            return vm.original_eval_operator(e, op);
        }
    };
    // Create a symbol in the function namespace.
    vm.fun_sym = function(name) { return vm.sym(name, vm.FUN_NS); };
    // Return a symbol that has the same name as the argument symbol,
    // but in the function namespace.
    vm.to_fun_sym = function(sym) {
        return vm.fun_sym(vm.assert_type(sym, vm.Sym).name);
    };
    // Override the VM's function definition utility so that it puts
    // primitive functions into the function namespace.
    vm.original_defun = vm.defun;
    vm.defun = function(e, name, cmb) { // override vm.js
        vm.original_defun(e, vm.to_fun_sym(name), cmb);
    };
    // Primitives:
    vm.defun(e, vm.sym("%%to-fun-sym"), vm.jswrap(vm.to_fun_sym));
};
