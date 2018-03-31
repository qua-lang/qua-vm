module.exports = function(vm, e) {
    vm.to_sexp = function(obj) {
        return obj.qua_to_sexp(obj);
    };
    vm.to_str = function(sexp) {
        return sexp.qua_to_str(sexp);
    };
    vm.Sym.prototype.qua_to_str = function(self) { return self.name; };
    vm.Cons.prototype.qua_to_str = function(self) {
        var elements = vm.map_list(self, vm.to_str);
        return "(" + vm.list_to_array(elements).join(" ") + ")";
    };
}
