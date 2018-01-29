module.exports = function(vm, e) {
    function list_star() {
        var len = arguments.length; var c = len >= 1 ? arguments[len-1] : NIL;
        for (var i = len-1; i > 0; i--) c = vm.cons(arguments[i - 1], c); return c;
    };
    vm.defun(e, vm.fsym("qua:list*"), vm.jswrap(list_star));
}
