// This file contains support for calling into JS from Lisp, and vice
// versa, as well as accessing JS global variables, operators, etc.
// As with most things, some of this stuff could probably be done
// equally well from Lisp userspace.
module.exports = function(vm, root_env) {
    // Overwrite VM's core combination function so it can call JS
    // functions just like normal Lisp operators.
    vm.original_combine = vm.combine;
    vm.combine = function(e, cmb, o) {
        if (cmb instanceof Function) return vm.combine(e, vm.jswrap(cmb), o);
        else return vm.original_combine(e, cmb, o);
    };
    // Returns a JS function that calls the given Lisp operator with
    // the arguments passed to the function.
    vm.js_function = function(cmb) {
        return function() {
            var args = vm.array_to_list(Array.prototype.slice.call(arguments));
            return vm.combine(vm.make_env(), cmb, args);
        }
    };
    // Synthetic/virtual classes given to JS built-in objects, so we
    // can define Lisp methods on them.
    vm.JSObject = vm.defclass("js-object", ["object"], {});
    vm.JSArray = vm.defclass("js-array", ["js-object"], {});
    vm.JSFunction = vm.defclass("js-function", ["js-object"], {});
    vm.JSNumber = vm.defclass("js-number", ["number", "js-object"], {});
    vm.JSString = vm.defclass("js-string", ["string", "js-object"], {});
    vm.JSNull = vm.defclass("js-null", ["js-object"], {});
    vm.JSUndefined = vm.defclass("js-undefined", ["js-object"], {});
    // Detect JS built-in types and make them appear to object system
    // as objects with (synthetic) Lisp classes (define above).
    vm.concrete_class_of_hook = function(obj) { // override obj.js
        switch (typeof(obj)) {
        case "string": return vm.JSString;
        case "number": return vm.JSNumber;
        case "boolean": return vm.Boolean;
        case "function": return vm.JSFunction;
        case "undefined": return vm.JSUndefined;
        default:
        if (obj === null) {
            return vm.JSNull;
        } else if (Array.isArray(obj)) {
            return vm.JSArray;
        } else {
            var proto = Object.getPrototypeOf(obj);
            if (proto) {
                return vm.unknown_class_hook(obj);
            } else {
                return vm.JSObject;
            }
        }
        }
    };
    // Implements the semantics of the `$some_global' syntax for
    // accessing JS global variables.
    vm.js_global = function(name) { return global[name]; }; // from Browserify
    // Creates a Lisp operator whose body executes a JS binary operator.
    vm.js_binop = function(op) {
	return vm.jswrap(new Function("a", "b", "return (a " + op + " b)")); };
    // Creates a new JS object with a given constructor.
    vm.js_new = function(ctor) {
        var factoryFunction = ctor.bind.apply(ctor, arguments);
        return new factoryFunction(); }
    // This definitely should be done from Lisp.
    vm.own_property_p = function(obj, name) {
        return Object.prototype.hasOwnProperty.call(obj, vm.designate_string(name)); };
    // Export to Lisp.
    vm.defun(root_env, vm.sym("%%js-apply"), vm.jswrap(function(fun, self, args) { return fun.apply(self, args); }));
    vm.defun(root_env, vm.sym("%%js-binop"), vm.jswrap(vm.js_binop));
    vm.defun(root_env, vm.sym("%%js-function"), vm.jswrap(vm.js_function));
    vm.defun(root_env, vm.sym("%%js-get"), vm.jswrap(function(obj, name) { return obj[name]; }));
    vm.defun(root_env, vm.sym("%%js-global"), vm.jswrap(vm.js_global));
    vm.defun(root_env, vm.sym("%%js-new"), vm.jswrap(vm.js_new));
    vm.defun(root_env, vm.sym("%%js-set"), vm.jswrap(function(obj, name, val) { return obj[name] = val; }));
    vm.defun(root_env, vm.sym("%%own-property?"), vm.jswrap(vm.own_property_p));
};
