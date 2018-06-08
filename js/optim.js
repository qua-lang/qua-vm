module.exports = function(vm, root_env) {
    vm.list_star = function() {
        var len = arguments.length; var c = len >= 1 ? arguments[len-1] : vm.NIL;
        for (var i = len-1; i > 0; i--) c = vm.cons(arguments[i - 1], c); return c;
    };
    vm.plist_to_js_object = function(plist, obj) {
        obj = (obj !== undefined) ? obj : Object.create(null);
        if (plist === vm.NIL) {
            return obj;
        } else {
            var name = vm.assert_type(vm.elt(plist, 0), vm.Keyword);
            var value = vm.elt(plist, 1);
            obj[vm.designate_string(name)] = value;
            return vm.plist_to_js_object(vm.cdr(vm.cdr(plist)), obj);
        }
    };
    vm.defun(root_env, vm.sym("%%list*"), vm.jswrap(vm.list_star));
    vm.defun(root_env, vm.sym("%%plist-to-js-object"), vm.jswrap(vm.plist_to_js_object));
};
