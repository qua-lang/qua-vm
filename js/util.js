module.exports = function(vm, e) {
    vm.Panic = function Panic(exc) {
        vm.assert_type(exc, Error);
        this.exc = exc;
    };
    vm.Panic.prototype.toString = function() {
        return this.exc.stack;
    };
    vm.assert_type = function(obj, type_spec) {
        if (vm.check_type(obj, type_spec)) return obj;
        else return vm.error("type error: " + obj + " should be " + type_spec + " but is " + obj, e);
    };
    vm.check_type = function(obj, type_spec) {
        if (typeof(type_spec) === "string") {
            return (typeof(obj) === type_spec);
        } else if (Array.isArray(type_spec)) {
            vm.assert(type_spec.length === 1);
            vm.assert(Array.isArray(obj));
            var elt_type_spec = type_spec[0];
            obj.forEach(function(elt) { vm.assert_type(elt, elt_type_spec); });
            return true;
        } else {
            return (obj instanceof type_spec);
        }
    };
    vm.assert = function(x) { if (!x) vm.panic("assertion failed"); };
    vm.error = function(err, e) {
        if (vm.check_type(e, vm.Env)) {
            var error = vm.lookup(e, vm.fun_sym("error"), false);
            if (error) {
                return vm.combine(null, e, error, vm.list(err));
            } else {
                console.log("ERROR not bound");
            }
        } else {
            console.log("No environment passed to vm.error()");
        }
        vm.panic(err);
    };
    vm.panic = function(err) {
        console.log("vm.panic", err);
        throw new vm.Panic(new Error(err));
    };
    vm.time = function(name, fun) {
        var start = new Date().getTime();
        fun();
        var end = new Date().getTime();
        var time = end - start;
        console.log(name + ": "  + time + "ms");
    };
    vm.parse_bytecode = function(obj) {
        switch(Object.prototype.toString.call(obj)) {
        case "[object String]": 
            switch(obj) {
            case "#ign": return vm.IGN;
            case "#void": return vm.VOID;
            default: return vm.sym(obj);
            }
        case "[object Array]": return vm.parse_bytecode_array(obj);
        default: return obj;
        }
    };
    vm.parse_bytecode_array = function(arr) {
        if ((arr.length == 2) && arr[0] === "wat-string") { return arr[1]; }
        if ((arr.length == 2) && arr[0] === "qua-function") { return vm.fun_sym(arr[1]); }
        if ((arr.length == 2) && arr[0] === "qua-keyword") { return vm.keyword(arr[1]); }
        var i = arr.indexOf(".");
        if (i === -1) return vm.array_to_list(arr.map(vm.parse_bytecode));
        else { var front = arr.slice(0, i);
               return vm.array_to_list(front.map(vm.parse_bytecode), vm.parse_bytecode(arr[i + 1])); }
    };
};
