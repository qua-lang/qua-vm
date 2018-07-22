module.exports = function(vm, init_env) {
    vm.PRINT_ESCAPE = vm.make_dynamic(true);
    vm.unreadable_object_to_string = function(object) {
        return "#[" + vm.class_of(object).name + " " + object + "]";
    };
    vm.defun(vm.init_env, "%%object-to-string", vm.jswrap(vm.unreadable_object_to_string));
};
