// Type system
module.exports = function(vm) {
    vm.Type = vm.defclass("qua:type", ["standard-object"], {});
    vm.TypeVar = vm.defclass("qua:type-variable", ["qua:type"], { "name": {} });
    vm.TypeVar.prototype = Object.create(vm.TypeVar.prototype);
    vm.ClassType = vm.defclass("qua:class-type", ["qua:type"], { "name": {}, "generic-params": {} });
    vm.ClassType.prototype = Object.create(vm.ClassType.prototype);
    vm.GenericParam = vm.defclass("qua:generic-param", ["standard-object"], { "in-type": {}, "out-type": {} });
    vm.typep = function(obj, type_designator) {
        var gcls = vm.generic_class_of(obj);
        var type = vm.designate_type(type_designator);
        return vm.subclassp(gcls, type);
    };
    vm.designate_type = function(type_designator) {
        if (type_designator instanceof vm.Type) {
            return type_designator;
        } else {
            return vm.parse_type_spec(type_designator);
        }
    };
    vm.parse_type_spec = function(type_designator) {
        if (type_designator instanceof vm.Sym) {
            return vm.find_generic_class(type_designator);
        } else {
            return vm.error("Illegal type designator: " + type_designator);
        }
    };
};
