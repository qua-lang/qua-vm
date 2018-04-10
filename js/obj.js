module.exports = function(vm) {
    /* Bootstrap STANDARD-CLASS */
    vm.THE_GENERIC_CLASS_STANDARD_CLASS = {
        "qs_name": "standard-class",
        "qs_type-parameters": [],
        "qs_slots": {
            "generic-class": {},
            "type-arguments": {}
        },
        "qs_direct-superclasses": ["class"],
        prototype: {}
    };
    vm.StandardClass = { // the concrete class
        "qs_generic-class": vm.THE_GENERIC_CLASS_STANDARD_CLASS,
        "qs_type-arguments": [],
        prototype: vm.THE_GENERIC_CLASS_STANDARD_CLASS.prototype
    };
    vm.StandardClass.qua_isa = vm.StandardClass;
    /* Bootstrap GENERIC-CLASS */
    vm.THE_GENERIC_CLASS_GENERIC_CLASS = {
        "qs_name": "generic-class",
        "qs_type-parameters": [],
        "qs_slots": {
            "name": {},
            "type-parameters": {},
            "methods": {},
            "slots": {},
            "direct-superclasses": {}
        },
        "qs_direct-superclasses": ["class"],
        prototype: {}
    };
    vm.GenericClass = { // the concrete class
        qua_isa: vm.StandardClass,
        "qs_generic-class": vm.THE_GENERIC_CLASS_GENERIC_CLASS,
        "qs_type-arguments": [],
        prototype: vm.THE_GENERIC_CLASS_GENERIC_CLASS.prototype
    };
    vm.THE_GENERIC_CLASS_STANDARD_CLASS.qua_isa = vm.GenericClass;
    vm.THE_GENERIC_CLASS_GENERIC_CLASS.qua_isa = vm.GenericClass;
    /* Class registry */
    vm.GENERIC_CLASSES = {};
    vm.STANDARD_CLASSES = {};
    vm.defclass = function(name, direct_superclasses, slots) {
        vm.assert_type(name, "string");
        vm.assert_type(direct_superclasses, ["string"]);
        vm.assert_type(slots, "object");
        function generic_class() {};
        generic_class.qua_isa = vm.GenericClass;
        generic_class["qs_name"] = name;
        generic_class["qs_type-parameters"] = [];
        generic_class["qs_direct-superclasses"] = direct_superclasses;
        generic_class["qs_slots"] = slots;
        vm.GENERIC_CLASSES[name] = generic_class;
        function standard_class() {};
        standard_class.qua_isa = vm.StandardClass;
        standard_class["qs_generic-class"] = generic_class;
        standard_class["qs_type-arguments"] = [];
        vm.STANDARD_CLASSES[name] = standard_class;
        // A concrete class' prototype is essentially superfluous but
        // required to support JS's instanceof (which determines
        // whether a constructor function's prototype occurs in the
        // prototype chain of an object).  We can share it with the
        // generic class, since a concrete class cannot have methods.
        standard_class.prototype = generic_class.prototype;
        return standard_class;
    };
    vm.find_generic_class = function(name) {
        return vm.GENERIC_CLASSES[vm.generic_class_key(name)];
    };
    vm.find_standard_class = function(name) {
        return vm.STANDARD_CLASSES[vm.standard_class_key(name)];
    };
    // Classes, methods, and slots have names which can be specified
    // as strings or symbols from Lisp.  Internally, they're always
    // strings.
    vm.designate_string = function(name) {
        if (name instanceof vm.Sym) {
            return name.qs_name;
        } else if (name instanceof vm.Keyword) {
            return name.qs_name;
        } else {
            vm.assert_type(name, "string");
            return name;
        }
    };
    vm.generic_class_key = function(name) {
        return vm.designate_string(name);
    };
    vm.standard_class_key = function(name) {
        return vm.designate_string(name);
    };
    vm.method_key = function(name) {
        return "qm_" + vm.designate_string(name);
    };
    vm.slot_key = function(name) {
        return "qs_" + vm.designate_string(name);
    };
    vm.designate_generic_class = function(class_des) {
        if (vm.is_generic_class(class_des)) {
            return class_des;
        } else {
            return vm.find_generic_class(class_des);
        }
    }
    vm.designate_standard_class = function(class_des) {
        if (vm.is_standard_class(class_des)) {
            return class_des;
        } else {
            return vm.find_standard_class(class_des);
        }
    }
    /* Setup class hierarchy */
    vm.Object = vm.defclass("object", [], {});
    vm.StandardObject = vm.defclass("standard-object", ["object"], {});
    vm.Class = vm.defclass("class", ["standard-object"], {});
    vm.Combiner = vm.defclass("combiner", ["standard-object"], {});
    vm.Fexpr = vm.defclass("fexpr", ["combiner"], {});
    vm.Function = vm.defclass("function", ["combiner"], {});
    vm.Number = vm.defclass("number", ["object"], {});
    vm.String = vm.defclass("string", ["object"], {});
    vm.Boolean = vm.defclass("boolean", ["object"], {});
    vm.JSArray = vm.defclass("js-array", ["number"], {});
    vm.JSFunction = vm.defclass("js-function", ["number"], {});
    vm.JSNumber = vm.defclass("js-number", ["number"], {});
    vm.JSString = vm.defclass("js-string", ["string"], {});
    vm.Null = vm.defclass("null", ["string"], {});
    vm.Undefined = vm.defclass("undefined", ["string"], {});
    /* Objects */
    vm.make_instance = function(class_des, initargs) {
        var standard_class = vm.designate_standard_class(class_des);
        var obj = vm.allocate_instance(standard_class);
        return vm.initialize_instance(obj, initargs);
    };
    vm.allocate_instance = function(standard_class) {
        vm.assert(vm.is_standard_class(standard_class));
        var obj = Object.create(standard_class.prototype);
        obj.qua_isa = standard_class;
        return obj;
    };
    vm.initialize_instance = function(obj, initargs) {
        var initargs_dict = vm.designate_dict(initargs);
        for (name in initargs_dict) {
            var value = initargs_dict[name];
            vm.set_slot_value(obj, name, value);
        }
        return obj;
    };
    vm.class_of = function(obj) {
        if (obj && obj.qua_isa) {
            return obj.qua_isa;
        } else {
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
        }
    };
    vm.designate_dict = function(dict_des) {
        if (vm.is_list(dict_des)) {
            return vm.plist_to_dict(dict_des);
        } else {
            vm.assert_type(dict_des, "object");
            return dict_des;
        }
    };
    vm.plist_to_dict = function(plist) {
        var arr = vm.list_to_array(plist);
        var dict = Object.create(null);
        for (var i = 0; i < arr.length; i = i + 2) {
            var indicator = vm.designate_string(arr[i]);
            var property = arr[i + 1];
            dict[indicator] = property;
        }
        return dict;
    };
    // Instanceof does not work for properly for the STANDARD-CLASS
    // and GENERIC-CLASS classes themselves, so we need these crutches
    // to determine if an object is a class.
    vm.is_standard_class = function(obj) {
        return obj && (obj.qua_isa === vm.StandardClass);
    };
    vm.is_generic_class = function(obj) {
        return obj && (obj.qua_isa === vm.GenericClass);
    };
    /* Methods */
    vm.put_method = function(generic_class, name, combiner) {
        vm.assert(vm.is_generic_class(generic_class));
        vm.assert_type(name, "string");
        vm.assert((combiner instanceof vm.Opv) || (combiner instanceof vm.Apv));
        generic_class.prototype["qm_" + name] = combiner;
        return combiner;
    };
    vm.call_method = function(obj, name, args, environment) {
        vm.assert_type(name, "string");
        var method = vm.compute_effective_method(obj, name);
        if (method) {
            return vm.combine(null, environment, method, args);
        } else {
            return vm.method_not_found_hook(obj, name);
        }
    };
    vm.find_method = function(obj, name) {
        var key = vm.method_key(name);
        if (obj && obj[key]) {
            return obj[key];
        } else {
            return vm.find_method_using_standard_class(obj, vm.class_of(obj), name);
        }
    };
    vm.find_method_using_standard_class = function(obj, cls, name) {
        vm.assert(vm.is_standard_class(cls));
        return vm.find_method_using_generic_class(obj, cls["qs_generic-class"], name);
    };
    vm.find_method_using_generic_class = function(obj, gcls, name) {
        vm.assert(vm.is_generic_class(gcls));
        var key = vm.method_key(name);
        if (gcls.prototype[key]) {
            return gcls.prototype[key];
        } else {
            var methods = vm.find_superclass_methods(obj, gcls, name);
            switch (methods.length) {
            case 0: return null;
            case 1: return methods[0];
            default: return vm.ambiguous_method_hook(obj, name);
            }
        }
    };
    vm.find_superclass_methods = function(obj, gcls, name) {
        var methods = [];
        var superclass_names = gcls["qs_direct-superclasses"];
        superclass_names.forEach(function(superclass_name) {
                var gsuper = vm.GENERIC_CLASSES[vm.generic_class_key(superclass_name)];
                vm.assert(vm.is_generic_class(gsuper));
                var method = vm.find_method_using_generic_class(obj, gsuper, name);
                if (method) {
                    methods.push(method);
                }
            });
        return methods;
    };
    /* Slots */
    vm.slot_value = function(obj, name) {
        var key = vm.slot_key(name);
        if (obj.hasOwnProperty(key)) {
            return obj[key];
        } else {
            return vm.slot_unbound_hook(obj, name);
        }
    };
    vm.set_slot_value = function(obj, name, value) {
        var key = vm.slot_key(name);
        try {
            obj[key] = value;
            return value;
        } catch(exc) {
            return vm.set_slot_value_error_hook(obj, name, value, exc);
        };
    };
    vm.slot_boundp = function(obj, name) {
        var key = vm.slot_key(name);
        return obj.hasOwnProperty(key);
    };
    vm.slot_unbound_hook = function(obj, name) {
        return vm.error("slot unbound: " + vm.designate_string(name));
    };
};
