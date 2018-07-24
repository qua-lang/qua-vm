module.exports = function(vm, init_env) {
    vm.PRINT_ESCAPE = vm.make_dynamic(true);
    vm.unreadable_object_to_string = function(object) {
        var c = vm.class_of(object);
        var class_name = c.class_name || c.name; // FIXME: why?
        return "#[" + class_name + " " + object + "]";
    };
    vm.object_to_string = function(object) {
        switch(typeof(object)) {
        case "string":
            if (vm.dynamic(vm.PRINT_ESCAPE)) {
                return JSON.stringify(object);
            } else {
                return object;
            }
        case "number":
            return String(object);
        default:
            if (object && object.qua_to_string) {
                return object.qua_to_string(object);
            } else {
                return vm.unreadable_object_to_string(object);
            }
        }
    };
    vm.Sym.prototype.qua_to_string = function(sym) {
        switch(sym.ns) {
        case vm.VAR_NS: return sym.name;
        case vm.FUN_NS: return "#'" + sym.name;
        default: return vm.sym_key(sym);
        }
    };
    vm.Prim.prototype.qua_to_string = function(prim) {
        return "#[primitive " + prim.name + "]";
    };
    vm.Cons.prototype.qua_to_string = function(cons) {
        return "(" + vm.cons_to_string(cons) + ")"
    };
    vm.cons_to_string = function (c) {
        if (vm.cdr(c) === vm.NIL) {
            return vm.object_to_string(vm.car(c));
        } else if (vm.cdr(c) instanceof vm.Cons) {
            return vm.object_to_string(vm.car(c)) + " " + vm.cons_to_string(vm.cdr(c));
        } else {
            return vm.object_to_string(vm.car(c)) + " . " + vm.object_to_string(vm.cdr(c));
        }
    };
    vm.def(vm.init_env, "%%*print-escape*", vm.PRINT_ESCAPE);
    vm.defun(vm.init_env, "%%object-to-string", vm.jswrap(vm.object_to_string));
};
