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
    vm.GENERIC_CLASS_TABLE = {};
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
        vm.GENERIC_CLASS_TABLE[name] = generic_class;
        function standard_class() {};
        standard_class.qua_isa = vm.StandardClass;
        standard_class["qs_generic-class"] = generic_class;
        standard_class["qs_type-arguments"] = [];
        // A concrete class' prototype is essentially superfluous but
        // required to support JS's instanceof (which determines
        // whether a constructor function's prototype occurs in the
        // prototype chain of an object).  We can share it with the
        // generic class, since a concrete class cannot have methods.
        standard_class.prototype = generic_class.prototype;
        return standard_class;
    };
    /* Setup class hierarchy */
    vm.Object = vm.defclass("object", [], {});
    vm.StandardObject = vm.defclass("standard-object", ["object"], {});
    vm.Class = vm.defclass("class", ["standard-object"], {});
    vm.Combiner = vm.defclass("combiner", ["standard-object"], {});
    vm.Fexpr = vm.defclass("fexpr", ["combiner"], {});
    vm.Function = vm.defclass("function", ["combiner"], {});
    vm.Number = vm.defclass("number", ["object"], {});
    vm.String = vm.defclass("string", ["object"], {});
    vm.JSNumber = vm.defclass("js-number", ["number"], {});
    vm.JSString = vm.defclass("js-string", ["string"], {});
    vm.Boolean = vm.defclass("boolean", ["object"], {});
    /* Objects */
    vm.allocate_instance = function(standard_class) {
        vm.assert(vm.is_standard_class(standard_class));
        var obj = Object.create(standard_class.prototype);
        obj.qua_isa = standard_class;
        return obj;
    };
    vm.initialize_instance = function(obj, initargs) {
        vm.assert_type(initargs, "object");
        for (name in initargs) {
            var value = initargs[name];
            obj["qs_" + name] = value;
        }
        return obj;
    };
    vm.make_instance = function(standard_class, initargs) {
        var obj = vm.allocate_instance(standard_class);
        return vm.initialize_instance(obj, initargs);
    };
    vm.class_of = function(obj) {
        if (obj && obj.qua_isa) {
            return obj.qua_isa;
        } else {
            switch (typeof(obj)) {
            case "string": return vm.JSString;
            case "number": return vm.JSNumber;
            case "boolean": return vm.Boolean;
            default: vm.panic("classless object: " + obj);
            }
        }
    };
    // At the moment, instanceof does not work for properly for the
    // STANDARD-CLASS and GENERIC-CLASS classes themselves, so we need
    // this crutch to determine if an object is a class.
    vm.is_class = function(obj) {
        return vm.is_standard_class(obj) || vm.is_generic_class(obj);
    };
    vm.is_standard_class = function(obj) {
        return obj && (obj.qua_isa === vm.StandardClass);
    };
    vm.is_generic_class = function(obj) {
        return obj && (obj.qua_isa === vm.GenericClass);
    };
    vm.assert_is_class = function(obj) {
        vm.assert(vm.is_class(obj));
    };
    /* Methods */
    vm.find_method = function(obj, name) {
        vm.assert_type(name, "string");
        if (obj && obj["qm_" + name]) {
            return obj["qm_" + name];
        } else {
            return vm.find_method_using_standard_class(obj, vm.class_of(obj), name);
        }
    };
    vm.find_method_using_standard_class = function(obj, standard_class, name) {
        if (standard_class.prototype["qm_" + name]) {
            return standard_class.prototype["qm_" + name];
        } else {
            return vm.find_method_using_generic_class(obj, standard_class["qs_generic-class"], name);
        }
    };
    vm.find_method_using_generic_class = function(obj, generic_class, name) {
        var methods = vm.find_methods_using_superclasses(obj, generic_class, name);
        switch (methods.length) {
        case 0: return vm.method_not_found_error(obj, name);
        case 1: return methods[0];
        default: return vm.ambiguous_method_error(obj, name);
        }
    };
    vm.find_methods_using_superclasses = function(obj, generic_class, name) {
        var methods = [];
        var superclass_names = generic_class["qs_direct-superclasses"];
        superclass_names.forEach(function(superclass_name) {
                var superclass = vm.GENERIC_CLASS_TABLE[superclass_name];
                if (!superclass) vm.panic("class not found: " + superclass_name);
                
            });
        return methods;
    };
};
