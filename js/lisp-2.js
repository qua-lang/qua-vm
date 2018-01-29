// Plugin for the Qua VM that adds a second namespace for functions.
// This should be loaded before anything else so that all functions
// from other modules go into the function namespace.
module.exports = function(vm, e) {
    vm.FUN_NS = "f";
    vm.eval_operator = function(e, op) {
        if (op instanceof vm.Sym) {
            return vm.lookup(e, vm.to_fsym(op));
        } else {
            return vm.evaluate(null, e, op);
        }
    };
    vm.fsym = function(name) { return vm.sym(name, vm.FUN_NS); };
    vm.to_fsym = function(sym) { vm.assert_type(sym, vm.Sym); return vm.fsym(sym.name); };
    vm.defun = function(e, name, cmb) {
        vm.bind(e, vm.to_fsym(name), cmb);
    };
    vm.defun(e, vm.sym("qua:to-fsym"), vm.jswrap(vm.to_fsym));
}
