var vm = module.exports;
/* Evaluation */
vm.evaluate = function(m, e, x) {
    if (x && x.qua_evaluate) return x.qua_evaluate(x, m, e); else return x;
};
vm.Sym = function Sym(name, ns) {
    this.name = vm.assert_type(name, "string");
    this.ns = vm.assert_type(ns, "string");
};
vm.Sym.prototype.qua_evaluate = function(self, m, e) {
    return vm.lookup(e, self);
};
vm.Cons = function Cons(car, cdr) { this.car = car; this.cdr = cdr; };
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
    if (todo === vm.NIL) { return vm.reverse_list(done); }
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
vm.Progn = {
    qua_combine: function(self, m, e, o) {
        if (o === vm.NIL) return vm.VOID; else return vm.progn(m, e, o);
    }
};
vm.progn = function(m, e, xs) {
    return vm.monadic(m,
                      function() { return vm.evaluate(null, e, vm.car(xs)); },
                      function(res) {
                          var cdr = vm.cdr(xs);
                          if (cdr === vm.NIL) return res; else return vm.progn(null, e, cdr);
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
vm.sym = function(name, ns) { return new vm.Sym(name, ns ? ns : vm.VAR_NS); };
vm.sym_key = function(sym) { return sym.name + "_" + sym.ns; };
vm.cons = function(car, cdr) { return new vm.Cons(car, cdr); };
vm.car = function(cons) { return vm.assert_type(cons, vm.Cons).car; };
vm.cdr = function(cons) { return vm.assert_type(cons, vm.Cons).cdr; };
vm.elt = function(cons, i) { return (i === 0) ? vm.car(cons) : vm.elt(vm.cdr(cons), i - 1); };
vm.Nil = function Nil() {}; vm.NIL = new vm.Nil();
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
    else return vm.error("unbound: " + sym.name);
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
    if (rhs !== vm.NIL) return vm.error("NIL expected, but got: " + rhs);
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
    var res = []; while(c !== vm.NIL) { res.push(vm.car(c)); c = vm.cdr(c); } return res;
};
vm.reverse_list = function(list) {
    var res = vm.NIL;
    while(list !== vm.NIL) { res = vm.cons(vm.car(list), res); list = vm.cdr(list); }
    return res;
};
vm.assert_type = function(obj, type_spec) {
    if (vm.check_type(obj, type_spec)) return obj;
    else return vm.error("type error: " + type_spec, { obj: obj, type_spec: type_spec });
};
vm.check_type = function(obj, type_spec) {
    if (typeof(type_spec) === "string") { return (typeof(obj) === type_spec); }
    else return (obj instanceof type_spec);
};
vm.raise = function(err, args) { throw new Error(err); };
vm.error = vm.raise;
/* API */
vm.make_env = function(parent) { return new vm.Env(parent); };
vm.def = vm.bind;
vm.defun = vm.bind;
vm.init = function(e) {
    // Forms
    vm.defun(e, vm.sym("qua:car"), vm.jswrap(vm.car));
    vm.defun(e, vm.sym("qua:cdr"), vm.jswrap(vm.cdr));
    vm.defun(e, vm.sym("qua:cons"), vm.jswrap(vm.cons));
    // Evaluation
    vm.defun(e, vm.sym("qua:eval"), vm.Eval);
    vm.defun(e, vm.sym("qua:def"), vm.Def);
    vm.defun(e, vm.sym("qua:progn"), vm.Progn);
    // Combiners
    vm.defun(e, vm.sym("qua:vau"), vm.Vau);
    vm.defun(e, vm.sym("qua:wrap"), vm.jswrap(vm.wrap));
    vm.defun(e, vm.sym("qua:unwrap"), vm.jswrap(vm.unwrap));
    // Environments
    vm.defun(e, vm.sym("qua:make-env"), vm.jswrap(vm.make_env));
    // Exceptions
    vm.defun(e, vm.sym("qua:raise"), vm.jswrap(vm.raise));
};
vm.eval = function(x, e) {
    return vm.evaluate(null, e, x);
};
