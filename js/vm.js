var vm = module.exports;
require("./util")(vm);
require("./obj")(vm);
/* Evaluation */
vm.evaluate = function(m, e, x) {
    if (x && x.qua_evaluate) return x.qua_evaluate(x, m, e); else return x;
};
vm.Sym = vm.defclass("symbol", ["standard-object"], { "name": {}, "ns": {} });
vm.Sym.prototype.qua_evaluate = function(self, m, e) {
    return vm.lookup(e, self);
};
vm.Cons = vm.defclass("cons", ["standard-object"], { "car": {}, "cdr": {} });
vm.Cons.prototype.qua_evaluate = function(self, m, e) {
    return vm.monadic(m,
                      function() { return vm.eval_operator(e, vm.car(self)); },
                      function(cmb) { return vm.combine(null, e, cmb, vm.cdr(self)); });
};
vm.eval_operator = function(e, op) {
    return vm.evaluate(null, e, op);
};
/* Combiners */
vm.combine = function(m, e, cmb, o) {
    if (cmb && cmb.qua_combine) return cmb.qua_combine(cmb, m, e, o);
    else return vm.error("not a combiner: " + cmb);
};
vm.Opv = function(p, ep, x, e) { this.p = p; this.ep = ep; this.x = x; this.e = e; };
vm.Apv = function(cmb) { this.cmb = cmb; };
vm.wrap = function(cmb) { return new vm.Apv(cmb); };
vm.unwrap = function(apv) { return apv.cmb; };
vm.Opv.prototype.qua_combine = function(self, m, e, o) {
    var xe = vm.make_env(self.e);
    return vm.monadic(m,
                      function() { return vm.bind(xe, self.p, o); },
                      function() {
                          return vm.monadic(m,
                                            function() { return vm.bind(xe, self.ep, e); },
                                            function() { return vm.evaluate(null, xe, self.x); }); });
};
vm.Apv.prototype.qua_combine = function(self, m, e, o) {
    return vm.monadic(m,
                      function() { return vm.eval_args(null, e, o, vm.NIL); },
                      function(args) { return vm.combine(null, e, self.cmb, args); });
};
vm.eval_args = function(m, e, todo, done) {
    if (vm.is_nil(todo)) { return vm.reverse_list(done); }
    return vm.monadic(m, 
                      function() { return vm.evaluate(null, e, vm.car(todo)); },
                      function(arg) { return vm.eval_args(null, e, vm.cdr(todo), vm.cons(arg, done)); });
};
/* Built-in combiners */
vm.Vau = {
    qua_combine: function(self, m, e, o) {
        var p = vm.elt(o, 0);
        var ep = vm.elt(o, 1);
        var x = vm.elt(o, 2);
        return new vm.Opv(p, ep, x, e);
    }
};
vm.Def = {
    qua_combine: function (self, m, e, o) {
        var lhs = vm.elt(o, 0);
        var rhs = vm.elt(o, 1);
        return vm.monadic(m,
                          function() { return vm.evaluate(null, e, rhs); },
                          function(val) { return vm.bind(e, lhs, val); });
    }
};
vm.Eval = vm.wrap({
        qua_combine: function(self, m, e, o) {
            var x = vm.elt(o, 0);
            var e = vm.elt(o, 1);
            return vm.evaluate(m, e, x);
        }
    });
vm.If = {
    qua_combine: function(self, m, e, o) {
        return vm.monadic(m,  
                          function() { return vm.evaluate(null, e, vm.elt(o, 0)); },
                          function(test) {
                              return vm.evaluate(null, e, test ? vm.elt(o, 1) : vm.elt(o, 2));
                          });
    }
};
vm.Progn = {
    qua_combine: function(self, m, e, o) {
        if (vm.is_nil(o)) return vm.VOID; else return vm.progn(m, e, o);
    }
};
vm.progn = function(m, e, xs) {
    return vm.monadic(m,
                      function() { return vm.evaluate(null, e, vm.car(xs)); },
                      function(res) {
                          var cdr = vm.cdr(xs);
                          if (vm.is_nil(cdr)) return res; else return vm.progn(null, e, cdr);
                      });
};
/* JS function combiners */
vm.JSFun = function(jsfun) { this.jsfun = vm.assert_type(jsfun, "function"); };
vm.JSFun.prototype.qua_combine = function(self, m, e, o) {
    return self.jsfun.apply(null, vm.list_to_array(o));
};
vm.jswrap = function(jsfun) { return vm.wrap(new vm.JSFun(jsfun)); };
/* Forms */
vm.VAR_NS = "v";
vm.sym = function(name, ns) {
    return vm.make_instance(vm.Sym, { name: name, ns: ns ? ns : vm.VAR_NS });
};
vm.sym_key = function(sym) { return sym.qs_name + "_" + sym.qs_ns; };
vm.cons = function(car, cdr) { return vm.make_instance(vm.Cons, { car: car, cdr: cdr }); };
vm.car = function(cons) { return vm.assert_type(cons, vm.Cons).qs_car; };
vm.cdr = function(cons) { return vm.assert_type(cons, vm.Cons).qs_cdr; };
vm.elt = function(cons, i) { return (i === 0) ? vm.car(cons) : vm.elt(vm.cdr(cons), i - 1); };
vm.Keyword = vm.defclass("keyword", ["standard-object"], { "name": {} });
vm.keyword = function(name) { return vm.make_instance(vm.Keyword, { name: name }); };
vm.Nil = function Nil() {}; vm.NIL = new vm.Nil();
vm.is_nil = function(obj) { return obj === vm.NIL; };
vm.Ign = function Ign() {}; vm.IGN = new vm.Ign();
vm.Void = function Void() {}; vm.VOID = new vm.Void();
/* Environments */
vm.Env = function(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
};
vm.lookup = function(e, sym) {
    vm.assert_type(e, vm.Env);
    vm.assert_type(sym, vm.Sym);
    var key = vm.sym_key(sym);
    if (key in e.bindings) return e.bindings[key];
    else return vm.error("unbound: " + sym.qs_name + " (" + sym.qs_ns + ")");
};
vm.bind = function(e, lhs, rhs) {
    vm.assert_type(e, vm.Env);
    if (lhs.qua_bind) return lhs.qua_bind(lhs, e, rhs);
    else return vm.error("cannot match", { lhs: lhs, rhs: rhs });
};
vm.Sym.prototype.qua_bind = function(self, e, rhs) {
    return e.bindings[vm.sym_key(self)] = rhs;
};
vm.Cons.prototype.qua_bind = function(self, e, rhs) {
    return vm.monadic(null,
                      function() { return vm.bind(e, vm.car(self), vm.car(rhs)); },
                      function() { return vm.bind(e, vm.cdr(self), vm.cdr(rhs)); });
};
vm.Nil.prototype.qua_bind = function(self, e, rhs) {
    if (!vm.is_nil(rhs)) return vm.error("NIL expected, but got: " + JSON.stringify(rhs));
};
vm.Ign.prototype.qua_bind = function(self, e, rhs) {};
/* Utilities */
vm.list = function() {
    return vm.array_to_list(Array.prototype.slice.call(arguments));
};
vm.array_to_list = function(array, end) {
    var c = end ? end : vm.NIL;
    for (var i = array.length; i > 0; i--) c = vm.cons(array[i - 1], c); return c;
};
vm.list_to_array = function(c) {
    var res = []; while(!vm.is_nil(c)) { res.push(vm.car(c)); c = vm.cdr(c); } return res;
};
vm.reverse_list = function(list) {
    var res = vm.NIL;
    while(!vm.is_nil(list)) { res = vm.cons(vm.car(list), res); list = vm.cdr(list); }
    return res;
};
vm.is_list = function(obj) {
    return vm.is_nil(obj) || obj instanceof vm.Cons;
};
/* API */
vm.make_env = function(parent) { return new vm.Env(parent); };
vm.def = vm.bind;
vm.defun = vm.bind;
vm.init = function(e) {
    // Forms
    vm.defun(e, vm.sym("%%car"), vm.jswrap(vm.car));
    vm.defun(e, vm.sym("%%cdr"), vm.jswrap(vm.cdr));
    vm.defun(e, vm.sym("%%cons"), vm.jswrap(vm.cons));
    // Evaluation
    vm.defun(e, vm.sym("%%def"), vm.Def);
    vm.defun(e, vm.sym("%%eval"), vm.Eval);
    vm.defun(e, vm.sym("%%if"), vm.If);
    vm.defun(e, vm.sym("%%progn"), vm.Progn);
    // Combiners
    vm.defun(e, vm.sym("%%vau"), vm.Vau);
    vm.defun(e, vm.sym("%%wrap"), vm.jswrap(vm.wrap));
    vm.defun(e, vm.sym("%%unwrap"), vm.jswrap(vm.unwrap));
    // Environments
    vm.defun(e, vm.sym("%%make-environment"), vm.jswrap(vm.make_env));
    // Object system
    vm.defun(e, vm.sym("%%call-method"), vm.jswrap(vm.call_method));
    vm.defun(e, vm.sym("%%class-of"), vm.jswrap(vm.class_of));
    vm.defun(e, vm.sym("%%find-generic-class"), vm.jswrap(vm.find_generic_class));
    vm.defun(e, vm.sym("%%find-standard-class"), vm.jswrap(vm.find_standard_class));
    vm.defun(e, vm.sym("%%make-instance"), vm.jswrap(vm.make_instance));
    vm.defun(e, vm.sym("%%put-method"), vm.jswrap(vm.put_method));
    vm.defun(e, vm.sym("%%set-slot-value"), vm.jswrap(vm.set_slot_value));
    vm.defun(e, vm.sym("%%slot-boundp"), vm.jswrap(vm.slot_boundp));
    vm.defun(e, vm.sym("%%slot-value"), vm.jswrap(vm.slot_value));
    // Misc
    vm.defun(e, vm.sym("%%eq"), vm.jswrap(function(a, b) { return a === b; }));
};
vm.eval = function(x, e) {
    return vm.evaluate(null, e, x); // change to x,e
};
