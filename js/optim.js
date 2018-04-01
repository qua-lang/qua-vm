module.exports = function(vm, e) {
    vm.list_star = function() {
        var len = arguments.length; var c = len >= 1 ? arguments[len-1] : NIL;
        for (var i = len-1; i > 0; i--) c = vm.cons(arguments[i - 1], c); return c;
    };
    vm.defun(e, vm.sym("%%list*"), vm.jswrap(vm.list_star));
}
