// Native JS support
module.exports = function(vm, e) {
    vm.JSObject = vm.defclass("js:object", ["object"], {});
    vm.JSArray = vm.defclass("js:array", ["js:object"], {});
    vm.JSFunction = vm.defclass("js:function", ["js:object"], {});
    vm.JSNumber = vm.defclass("js:number", ["number", "js:object"], {});
    vm.JSString = vm.defclass("js:string", ["string", "js:object"], {});
    vm.JSNull = vm.defclass("js:null", ["js:object"], {});
    vm.JSUndefined = vm.defclass("js:undefined", ["js:object"], {});
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
                return vm.unknown_class_hook(proto);
            } else {
                return vm.JSObject;
            }
        }
        }
    };
    vm.JSGlobal = vm.jswrap(function(name) { return global[name]; }); // from Browserify
    vm.defun(e, vm.sym("%%js:apply"), vm.jswrap(function(fun, self, args) { return fun.apply(self, args); }));
    vm.defun(e, vm.sym("%%js:get"), vm.jswrap(function(obj, name) { return obj[name]; }));
    vm.defun(e, vm.sym("%%js:global"), vm.JSGlobal);
    vm.defun(e, vm.sym("%%js:set"), vm.jswrap(function(obj, name, val) { return obj[name] = val; }));
};
