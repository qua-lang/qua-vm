module.exports = function(vm, e) {
    vm.defun(e, vm.sym("%%require"), vm.jswrap(require));
};
