// Type system
module.exports = function(vm) {
    vm.Type = vm.defclass("qua:type", ["standard-object"], {});
    vm.TypeVar = vm.defclass("qua:type-variable", ["qua:type"], { "name": {} });
    vm.TypeVar.prototype = Object.create(vm.TypeVar.prototype);
    vm.ClassType = vm.defclass("qua:class-type", ["qua:type"], { "name": {}, "generic-params": {} });
    vm.ClassType.prototype = Object.create(vm.ClassType.prototype);
    vm.GenericParam = vm.defclass("qua:generic-param", ["standard-object"], { "in-type": {}, "out-type": {} });
};
