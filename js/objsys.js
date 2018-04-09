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
    /* Setup class hierarchy */
    vm.defclass = function(name, direct_superclasses, slots) {
        function generic_class() {};
        generic_class.qua_isa = vm.GenericClass;
        generic_class["qs_name"] = name;
        generic_class["qs_type-parameters"] = [];
        generic_class["qs_direct-superclasses"] = direct_superclasses;
        generic_class["qs_slots"] = slots;
        function concrete_class() {};
        concrete_class.qua_isa = vm.StandardClass;
        concrete_class["qs_generic-class"] = generic_class;
        concrete_class["qs_type-arguments"] = [];
        concrete_class.prototype = generic_class.prototype;
        return concrete_class;
    };
    vm.Object = vm.defclass("object", [], {});
    vm.StandardObject = vm.defclass("standard-object", [], {});
    vm.BuiltInObject = vm.defclass("built-in-object", [], {});
    vm.Class = vm.defclass("class", ["standard-object"], {});
    vm.Number = vm.defclass("number", ["built-in-object"], {});
    vm.String = vm.defclass("string", ["built-in-object"], {});
    vm.Boolean = vm.defclass("boolean", ["built-in-object"], {});
    /* Objects */
    vm.allocate_instance = function(concrete_class) {
        var obj = Object.create(concrete_class.prototype);
        obj.qua_isa = concrete_class;
        return obj;
    };
    vm.initialize_instance = function(obj, initargs) {
        for (name in initargs) {
            var value = initargs[name];
            obj["qs_" + name] = value;
        }
        return obj;
    };
    vm.make_instance = function(concrete_class, initargs) {
        var obj = vm.allocate_instance(concrete_class);
        return vm.initialize_instance(obj, initargs);
    };
    vm.class_of = function(obj) {
        if (obj && obj.qua_isa) {
            return obj.qua_isa;
        } else {
            switch (typeof(obj)) {
            case "string": return vm.String;
            case "number": return vm.Number;
            case "boolean": return vm.Boolean;
            default: return vm.error("classless object: " + obj);
            }
        }
    };
};
