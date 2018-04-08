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
        prototype: Object.create(null)
    };
    vm.StandardClass = { // the concrete class
        "qs_generic-class": vm.THE_GENERIC_CLASS_STANDARD_CLASS,
        "qs_type-arguments": [],
        prototype: Object.create(vm.THE_GENERIC_CLASS_STANDARD_CLASS.prototype)
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
        prototype: Object.create(null)
    };
    vm.GenericClass = { // the concrete class
        "qua_isa": vm.StandardClass,
        "qs_generic-class": vm.THE_GENERIC_CLASS_GENERIC_CLASS,
        "qs_type-arguments": [],
        prototype: Object.create(vm.THE_GENERIC_CLASS_GENERIC_CLASS.prototype)
    };
    vm.THE_GENERIC_CLASS_STANDARD_CLASS.qua_isa = vm.GenericClass;
    vm.THE_GENERIC_CLASS_GENERIC_CLASS.qua_isa = vm.GenericClass;
    /* Setup class hierarchy */
    vm.make_standard_class = function(name, direct_superclasses, slots) {
        var generic_class = eval("(function G() {})");
        //var generic_class = Object.create(vm.GenericClass.prototype);
        generic_class["qua_isa"] = vm.GenericClass;
        generic_class["qs_name"] = name;
        generic_class["qs_type-parameters"] = [];
        generic_class["qs_direct-superclasses"] = direct_superclasses;
        generic_class["qs_slots"] = slots;
        generic_class.prototype = Object.create(null);
        var concrete_class = eval("(function C() {})");
        //var concrete_class = Object.create(vm.StandardClass.prototype);
        concrete_class["qua_isa"] = vm.StandardClass;
        concrete_class["qs_generic-class"] = generic_class;
        concrete_class["qs_type-arguments"] = [];
        concrete_class.prototype = Object.create(generic_class.prototype);
        return concrete_class;
    };
    vm.Object = vm.make_standard_class("object", [], {});
    vm.StandardObject = vm.make_standard_class("standard-object", [], {});
    vm.BuiltInObject = vm.make_standard_class("built-in-object", [], {});
    vm.Class = vm.make_standard_class("class", ["standard-object"], {});
    vm.Number = vm.make_standard_class("number", ["built-in-object"], {});
    vm.String = vm.make_standard_class("string", ["built-in-object"], {});
    vm.Boolean = vm.make_standard_class("boolean", ["built-in-object"], {});
    /* Objects */
    vm.allocate_instance = function(cls) {
        //vm.assert_type(cls, vm.StandardClass);
        var obj = Object.create(cls.prototype);
        obj.qua_isa = cls;
        return obj;
    };
    vm.initialize_instance = function(obj, initargs) {
        for (name in initargs) {
            var value = initargs[name];
            obj["qs_" + name] = value;
        }
        return obj;
    };
    vm.make_instance = function(cls, initargs) {
        var obj = vm.allocate_instance(cls);
        return vm.initialize_instance(obj, initargs);
    };
    vm.class_of = function(obj) {
        if (obj && obj.qua_isa) {
            return obj.qua_isa;
        } else {
            switch (typeof(obj)) {
            case "string": return vm.STRING;
            case "number": return vm.NUMBER;
            case "boolean": return vm.BOOLEAN;
            default: return vm.error("classless object: " + obj);
            }
        }
    };
};
