module.exports = function(vm) {
    vm.Panic = function Panic(message) {
        this.message = message;
    };
    vm.Panic.prototype.toString = function() {
        return this.message.toString();
    };
    vm.assert_type = function(obj, type_spec) {
        if (vm.check_type(obj, type_spec)) return obj;
        else return vm.panic("type error: " + obj + " should be " + type_spec + " but is " + obj);
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
            var invoke_debugger = vm.lookup(e, vm.fun_sym("invoke-debugger"), false);
            if (invoke_debugger) {
                return vm.combine(null, e, invoke_debugger, vm.list(err));
            } else {
                console.log("INVOKE-DEBUGGER not bound");
            }
        } else {
            console.log("No environment passed to vm.error()");
        }
        vm.panic(err);
    };
    vm.panic = function(err) { throw new vm.Panic(err); };
    vm.time = function(name, fun) {
        var start = new Date().getTime();
        fun();
        var end = new Date().getTime();
        var time = end - start;
        console.log(name + ": "  + time + "ms");
    };
};
