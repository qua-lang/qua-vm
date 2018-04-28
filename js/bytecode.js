/* Bytecode parser */
module.exports = function(vm) {
    vm.parse_bytecode = function(obj) {
        switch(Object.prototype.toString.call(obj)) {
        case "[object String]": 
            switch(obj) {
            case "#ign": return vm.IGN;
            case "#void": return vm.VOID;
            default: return vm.sym(obj);
            }
        case "[object Array]": return vm.parse_bytecode_array(obj);
        default: return obj;
        }
    }
    vm.parse_bytecode_array = function(arr) {
        if ((arr.length == 2) && arr[0] === "wat-string") { return arr[1]; }
        if ((arr.length == 2) && arr[0] === "qua-function") { return vm.fun_sym(arr[1]); }
        if ((arr.length == 2) && arr[0] === "qua-keyword") { return vm.keyword(arr[1]); }
        var i = arr.indexOf(".");
        if (i === -1) return vm.array_to_list(arr.map(vm.parse_bytecode));
        else { var front = arr.slice(0, i);
               return vm.array_to_list(front.map(vm.parse_bytecode), vm.parse_bytecode(arr[i + 1])); }
    }
};
