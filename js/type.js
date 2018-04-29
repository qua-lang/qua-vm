// Type system
module.exports = function(vm, e) {
    vm.typep = function(obj, type_designator) {
        var gcls = vm.generic_class_of(obj);
        var class_type = vm.designate_type(type_designator);
        vm.assert_type(class_type, vm.ClassType);
        var other_gcls = vm.find_generic_class(vm.slot_value(class_type, "name"));
        return vm.generic_subclassp(gcls, other_gcls);
    };
    vm.designate_type = function(type_designator) {
        if (type_designator instanceof vm.ClassType) {
            return type_designator;
        } else if (type_designator instanceof vm.Sym) {
            return vm.make_instance(vm.ClassType,
                                    { "name": vm.sym_name(type_designator),
                                      "generic-params": [] });
        } else {
            return vm.error("Illegal type designator: " + JSON.stringify(type_designator));
        }
    };
    vm.generic_subclassp = function(generic_class, other_class) {
        vm.assert(vm.is_generic_class(generic_class));
        vm.assert(vm.is_generic_class(other_class));
        if (generic_class === other_class) {
            return true;
        } else {
            var tag = {};
            var superclass_names = generic_class["qs_direct-superclasses"];
            try {
                superclass_names.forEach(function(superclass_name) {
                        var superclass = vm.GENERIC_CLASSES[vm.generic_class_key(superclass_name)];
                        vm.assert(vm.is_generic_class(superclass));
                        if (vm.generic_subclassp(superclass, other_class)) {
                            throw tag;
                        }
                    });
            } catch(exc) {
                if (exc === tag) {
                    return true;
                } else {
                    throw exc;
                }
            }
            return false;
        }
    };
};
