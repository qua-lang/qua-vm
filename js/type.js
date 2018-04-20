// Type system
module.exports = function(vm) {
    vm.Type = vm.defclass("qua:type", ["standard-object"], {});
    vm.TypeVar = vm.defclass("qua:type-variable", ["qua:type"], { "name": {} });
    vm.TypeVar.prototype = Object.create(vm.Type.prototype);
    vm.ClassType = vm.defclass("qua:class-type", ["qua:type"], { "name": {}, "generic-parameters": {} });
    vm.ClassType.prototype = Object.create(vm.Type.prototype);
    vm.GenericParameter = vm.defclass("qua:generic-parameter", ["qua:type"], { "in-type": {}, "out-type": {} });
};
