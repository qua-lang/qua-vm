var vm = module.exports;
require("./util")(vm);
require("./obj")(vm);
require("./type")(vm);
// Instances of this class are thrown as JS exceptions to transfer a
// value from a RETURN-FROM expression to its enclosing BLOCK.
vm.Tag = vm.defclass("%%tag", ["standard-object"], { "id": {}, "val": {} });
/* Evaluation */
vm.evaluate = function(m, e, x) {
    if (x && x.qua_evaluate) {
        try {
            return x.qua_evaluate(x, m, e);
        } catch(exc) {
            if (exc instanceof vm.Tag) {
                throw exc;
            } else {
                return vm.error(exc, e);
            }
        }
    } else {
        return x;
    }
};
vm.THE_CLASS_SYM = vm.defclass("symbol", ["standard-object"], { "name": {}, "ns": {} });
vm.Sym = function Sym(name, ns) { this.qs_name = name; this.qs_ns = ns; };
vm.Sym.prototype.qua_evaluate = function(self, m, e) {
    return vm.lookup(e, self);
};
vm.THE_CLASS_CONS = vm.defclass("cons", ["standard-object"], { "car": {}, "cdr": {} });
vm.Cons = function Cons(car, cdr) { this.qs_car = car; this.qs_cdr = cdr; };
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
    if (cmb && cmb.qua_combine) {
        try {
            return cmb.qua_combine(cmb, m, e, o);
        } catch(exc) {
            if (exc instanceof vm.Tag) {
                throw exc;
            } else {
                return vm.error(exc, e);
            }
        }
    } else {
        return vm.error("not a combiner: " + cmb, e);
    }
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
                          function(val) { return vm.bind(e, lhs, val, vm.do_def); });
    }
};
vm.Setq = {
    qua_combine: function (self, m, e, o) {
        var lhs = vm.elt(o, 0);
        var rhs = vm.elt(o, 1);
        return vm.monadic(m,
                          function() { return vm.evaluate(null, e, rhs); },
                          function(val) { return vm.bind(e, lhs, val, vm.do_setq); });
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
/* Operator that calls JS function to do work */
vm.JSOperator = function(js_fn) { this.js_fn = vm.assert_type(js_fn, "function"); };
vm.JSOperator.prototype.qua_combine = function(self, m, e, o) {
    try {
        return self.js_fn.apply(null, vm.list_to_array(o));
    } catch(exc) {
        if (exc instanceof vm.Tag) {
            throw exc;
        } else {
            return vm.error(exc, e);
        }
    }
};
vm.jswrap = function(js_fn) { return vm.wrap(new vm.JSOperator(js_fn)); };
/* Forms */
vm.VAR_NS = "v";
vm.sym = function(name, ns) { var s = new vm.Sym(name, ns ? ns : vm.VAR_NS); s.qua_isa = vm.THE_CLASS_SYM; return s; };
vm.sym_key = function(sym) { return sym.qs_name + "_" + sym.qs_ns; };
vm.sym_name = function(sym) { return vm.assert_type(sym, vm.Sym).qs_name; };
vm.cons = function cons(car, cdr) { var c = new vm.Cons(car, cdr); c.qua_isa = vm.THE_CLASS_CONS; return c; }
vm.car = function(cons) { return vm.assert_type(cons, vm.Cons).qs_car; };
vm.cdr = function(cons) { return vm.assert_type(cons, vm.Cons).qs_cdr; };
vm.elt = function(cons, i) { return (i === 0) ? vm.car(cons) : vm.elt(vm.cdr(cons), i - 1); };
vm.THE_CLASS_KEYWORD = vm.defclass("keyword", ["standard-object"], { "name": {} });
vm.Keyword = function Keyword(name) { this.qs_name = name; }
vm.keyword = function(name) { var k = new vm.Keyword(name); k.qua_isa = vm.THE_CLASS_KEYWORD; return k; };
vm.Nil = function Nil() {}; vm.NIL = new vm.Nil();
vm.is_nil = function(obj) { return obj === vm.NIL; };
vm.Ign = function Ign() {}; vm.IGN = new vm.Ign();
vm.Void = function Void() {}; vm.VOID = new vm.Void();
/* Environments */
vm.Env = function(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
    this.parent = parent;
};
vm.lookup = function(e, sym) {
    vm.assert_type(e, vm.Env);
    vm.assert_type(sym, vm.Sym);
    var key = vm.sym_key(sym);
    if (key in e.bindings) return e.bindings[key];
    else return vm.error("unbound: " + sym.qs_name + " (" + sym.qs_ns + ")", e);
};
vm.bind = function(e, lhs, rhs, doit) {
    vm.assert_type(e, vm.Env);
    if (lhs.qua_bind) return lhs.qua_bind(lhs, e, rhs, doit ? doit : vm.do_def);
    else return vm.error("cannot match", { lhs: lhs, rhs: rhs }, e);
};
vm.do_def = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    return e.bindings[vm.sym_key(lhs)] = rhs;
};
vm.do_setq = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    if (Object.prototype.hasOwnProperty.call(e.bindings, vm.sym_key(lhs)))
        return vm.do_def(e, lhs, rhs);
    else if (e.parent)
        return vm.do_setq(e.parent, lhs, rhs);
    else
        return vm.error("cannot set unbound variable: " + lhs.qs_name, e);
};
vm.Sym.prototype.qua_bind = function(self, e, rhs, doit) {
    return doit(e, self, rhs);
};
vm.Cons.prototype.qua_bind = function(self, e, rhs, doit) {
    return vm.monadic(null,
                      function() { return vm.bind(e, vm.car(self), vm.car(rhs), doit); },
                      function() { return vm.bind(e, vm.cdr(self), vm.cdr(rhs), doit); });
};
vm.Nil.prototype.qua_bind = function(self, e, rhs, doit) {
    if (!vm.is_nil(rhs)) return vm.error("NIL expected, but got: " + JSON.stringify(rhs), e);
};
vm.Keyword.prototype.qua_bind = function(self, e, rhs, doit) {
    if (!(rhs && (rhs instanceof vm.Keyword) && (rhs.qs_name === self.qs_name))) {
        return vm.error(":" + self.qs_name + " expected, but got: " + JSON.stringify(rhs), e);
    }
};
vm.Ign.prototype.qua_bind = function(self, e, rhs, doit) {};
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
    vm.defun(e, vm.sym("%%setq"), vm.Setq);
    // Combiners
    vm.defun(e, vm.sym("%%vau"), vm.Vau);
    vm.defun(e, vm.sym("%%wrap"), vm.jswrap(vm.wrap));
    vm.defun(e, vm.sym("%%unwrap"), vm.jswrap(vm.unwrap));
    // Environments
    vm.defun(e, vm.sym("%%make-environment"), vm.jswrap(vm.make_env));
    // Object system
    vm.defun(e, vm.sym("%%concrete-class-of"), vm.jswrap(vm.concrete_class_of));
    vm.defun(e, vm.sym("%%ensure-class"), vm.jswrap(vm.defclass));
    vm.defun(e, vm.sym("%%find-concrete-class"), vm.jswrap(vm.find_concrete_class));
    vm.defun(e, vm.sym("%%find-generic-class"), vm.jswrap(vm.find_generic_class));
    vm.defun(e, vm.sym("%%find-method"), vm.jswrap(vm.find_method));
    vm.defun(e, vm.sym("%%generic-class-of"), vm.jswrap(vm.generic_class_of));
    vm.defun(e, vm.sym("%%make-instance"), vm.jswrap(vm.make_instance));
    vm.defun(e, vm.sym("%%put-method"), vm.jswrap(vm.put_method));
    vm.defun(e, vm.sym("%%set-slot-value"), vm.jswrap(vm.set_slot_value));
    vm.defun(e, vm.sym("%%slot-bound?"), vm.jswrap(vm.slot_bound_p));
    vm.defun(e, vm.sym("%%slot-value"), vm.jswrap(vm.slot_value));
    vm.defun(e, vm.sym("%%type?"), vm.jswrap(vm.typep));
    // Misc
    vm.def(e, vm.sym("%tag"), vm.Tag);
    vm.defun(e, vm.sym("%%eq"), vm.jswrap(function(a, b) { return a === b; }));
    vm.defun(e, vm.sym("%%print"), vm.jswrap(console.log));
    vm.defun(e, vm.sym("%%list-to-array"), vm.jswrap(vm.list_to_array));
};
vm.eval = function(x, e) {
    return vm.evaluate(null, e, x); // change to x,e
};
