// Object system
module.exports = function(vm) {
    /* Bootstrap CONCRETE-CLASS */
    vm.THE_GENERIC_CLASS_CONCRETE_CLASS = {
        "qs_name": "concrete-class",
        "qs_type-parameters": [],
        "qs_slots": {
            "generic-class": Object.create(null),
            "type-arguments": Object.create(null)
        },
        "qs_direct-superclasses": ["class"],
        prototype: Object.create(null)
    };
    vm.ConcreteClass = { // the concrete class
        "qs_generic-class": vm.THE_GENERIC_CLASS_CONCRETE_CLASS,
        "qs_type-arguments": [],
        prototype: vm.THE_GENERIC_CLASS_CONCRETE_CLASS.prototype
    };
    vm.ConcreteClass.qua_isa = vm.ConcreteClass;
    /* Bootstrap GENERIC-CLASS */
    vm.THE_GENERIC_CLASS_GENERIC_CLASS = {
        "qs_name": "generic-class",
        "qs_type-parameters": [],
        "qs_slots": {
            "name": Object.create(null),
            "type-parameters": Object.create(null),
            "methods": Object.create(null),
            "slots": Object.create(null),
            "direct-superclasses": Object.create(null)
        },
        "qs_direct-superclasses": ["class"],
        prototype: Object.create(null)
    };
    vm.GenericClass = { // the concrete class
        qua_isa: vm.ConcreteClass,
        "qs_generic-class": vm.THE_GENERIC_CLASS_GENERIC_CLASS,
        "qs_type-arguments": [],
        prototype: vm.THE_GENERIC_CLASS_GENERIC_CLASS.prototype
    };
    vm.THE_GENERIC_CLASS_CONCRETE_CLASS.qua_isa = vm.GenericClass;
    vm.THE_GENERIC_CLASS_GENERIC_CLASS.qua_isa = vm.GenericClass;
    /* Class registry */
    vm.GENERIC_CLASSES = Object.create(null);
    vm.CONCRETE_CLASSES = Object.create(null);
    vm.defclass = function(name, direct_superclasses, slots) {
        vm.assert_type(name, "string");
        vm.assert_type(direct_superclasses, ["string"]);
        function generic_class() {};
        generic_class.qua_isa = vm.GenericClass;
        generic_class["qs_name"] = name;
        generic_class["qs_type-parameters"] = [];
        generic_class["qs_direct-superclasses"] = direct_superclasses;
        generic_class["qs_slots"] = slots ? slots : Object.create(null);
        vm.GENERIC_CLASSES[name] = generic_class;
        function concrete_class() {};
        concrete_class.qua_isa = vm.ConcreteClass;
        concrete_class["qs_generic-class"] = generic_class;
        concrete_class["qs_type-arguments"] = [];
        vm.CONCRETE_CLASSES[name] = concrete_class;
        // A concrete class' prototype is essentially superfluous but
        // required to support JS's instanceof (which determines
        // whether a constructor function's prototype occurs in the
        // prototype chain of an object).  We can share it with the
        // generic class, since a concrete class cannot have methods.
        concrete_class.prototype = generic_class.prototype;
        return concrete_class;
    };
    vm.find_concrete_class = function(name) {
        return vm.CONCRETE_CLASSES[vm.concrete_class_key(name)];
    };
    vm.find_generic_class = function(name) {
        return vm.GENERIC_CLASSES[vm.generic_class_key(name)];
    };
    // Classes, methods, and slots have names which can be specified
    // as symbols, keywords, or strings from Lisp.  Internally,
    // they're always strings.
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
    vm.concrete_class_key = function(name) {
        return vm.designate_string(name);
    };
    vm.generic_class_key = function(name) {
        return vm.designate_string(name);
    };
    vm.method_key = function(name) {
        return "qm_" + vm.designate_string(name);
    };
    vm.slot_key = function(name) {
        return "qs_" + vm.designate_string(name);
    };
    vm.designate_concrete_class = function(class_des) {
        if (vm.is_concrete_class(class_des)) {
            return class_des;
        } else {
            return vm.find_concrete_class(class_des);
        }
    };
    vm.designate_generic_class = function(class_des) {
        if (vm.is_generic_class(class_des)) {
            return class_des;
        } else {
            return vm.find_generic_class(class_des);
        }
    };
    /* Setup class hierarchy */
    vm.Object = vm.defclass("object", []);
    vm.StandardObject = vm.defclass("standard-object", ["object"]);
    vm.Class = vm.defclass("class", ["standard-object"]);
    vm.Combiner = vm.defclass("combiner", ["standard-object"]);
    vm.Fexpr = vm.defclass("fexpr", ["combiner"]);
    vm.Function = vm.defclass("function", ["combiner"]);
    vm.Number = vm.defclass("number", ["object"]);;
    vm.String = vm.defclass("string", ["object"]);
    vm.Boolean = vm.defclass("boolean", ["object"]);
    /* Objects */
    vm.make_instance = function(class_des, initargs) {
        var concrete_class = vm.designate_concrete_class(class_des);
        var obj = vm.allocate_instance(concrete_class);
        return vm.initialize_instance(obj, initargs);
    };
    vm.allocate_instance = function(concrete_class) {
        vm.assert(vm.is_concrete_class(concrete_class));
        var obj = Object.create(concrete_class.prototype);
        obj.qua_isa = concrete_class;
        return obj;
    };
    vm.initialize_instance = function(obj, initargs) {
        var initargs_dict = vm.assert_type(initargs, "object");
        for (name in initargs_dict) {
            var value = initargs_dict[name];
            vm.set_slot_value(obj, name, value);
        }
        return obj;
    };
    vm.concrete_class_of = function(obj) {
        if (obj && obj.qua_isa) {
            return obj.qua_isa;
        } else {
            return vm.concrete_class_of_hook(obj);
        }
    };
    vm.concrete_class_of_hook = function(obj) { vm.panic("object is missing class: " + obj); };
    vm.unknown_class_hook = function(obj) { vm.panic("unknown class: " + obj); };
    vm.generic_class_of = function(obj) {
        var ccls = vm.concrete_class_of(obj);
        vm.assert(vm.is_concrete_class(ccls));
        return ccls["qs_generic-class"];
    };
    // Instanceof does not work for properly for the CONCRETE-CLASS
    // and GENERIC-CLASS classes themselves, so we need these crutches
    // to determine if an object is a class.
    vm.is_concrete_class = function(obj) {
        return obj && (obj.qua_isa === vm.ConcreteClass);
    };
    vm.is_generic_class = function(obj) {
        return obj && (obj.qua_isa === vm.GenericClass);
    };
    /* Methods */
    vm.put_method = function(generic_class, name, combiner) {
        vm.assert(vm.is_generic_class(generic_class));
        vm.assert((combiner instanceof vm.Opv) || (combiner instanceof vm.Apv));
        generic_class.prototype[vm.method_key(name)] = combiner;
        return combiner;
    };
    vm.find_method = function(obj, name) {
        var key = vm.method_key(name);
        if (obj && obj[key]) {
            return obj[key];
        } else {
            return vm.find_method_using_concrete_class(obj, vm.concrete_class_of(obj), name);
        }
    };
    vm.find_method_using_concrete_class = function(obj, cls, name) {
        vm.assert(vm.is_concrete_class(cls));
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
                // TODO: not reentrant
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
    vm.slot_bound_p = function(obj, name) {
        var key = vm.slot_key(name);
        return obj && obj.hasOwnProperty(key);
    };
    vm.slot_unbound_hook = function(obj, name) {
        return vm.error("slot unbound: " + vm.designate_string(name));
    };
};
