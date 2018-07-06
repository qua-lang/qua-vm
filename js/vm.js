// Interpreter core
var vm = module.exports;
/* Object system */
/* Bootstrap CONCRETE-CLASS */
vm.THE_GENERIC_CLASS_CONCRETE_CLASS = {
    "qs_name": "concrete-class",
    "qs_type-parameters": [],
    "qs_slots": {
        "generic-class": Object.create(null),
        "type-arguments": Object.create(null)
    },
    "qs_direct-superclasses": ["class"],
    prototype: Object.create(null)
};
vm.ConcreteClass = { // the concrete class
    "qs_generic-class": vm.THE_GENERIC_CLASS_CONCRETE_CLASS,
    "qs_type-arguments": [],
    prototype: vm.THE_GENERIC_CLASS_CONCRETE_CLASS.prototype
};
vm.ConcreteClass.qua_isa = vm.ConcreteClass;
/* Bootstrap GENERIC-CLASS */
vm.THE_GENERIC_CLASS_GENERIC_CLASS = {
    "qs_name": "generic-class",
    "qs_type-parameters": [],
    "qs_slots": {
        "name": Object.create(null),
        "type-parameters": Object.create(null),
        "methods": Object.create(null),
        "slots": Object.create(null),
        "direct-superclasses": Object.create(null)
    },
    "qs_direct-superclasses": ["class"],
    prototype: Object.create(null)
};
vm.GenericClass = { // the concrete class
    qua_isa: vm.ConcreteClass,
    "qs_generic-class": vm.THE_GENERIC_CLASS_GENERIC_CLASS,
    "qs_type-arguments": [],
    prototype: vm.THE_GENERIC_CLASS_GENERIC_CLASS.prototype
};
vm.THE_GENERIC_CLASS_CONCRETE_CLASS.qua_isa = vm.GenericClass;
vm.THE_GENERIC_CLASS_GENERIC_CLASS.qua_isa = vm.GenericClass;
/* Class registry */
vm.GENERIC_CLASSES = Object.create(null);
vm.CONCRETE_CLASSES = Object.create(null);
vm.defclass = function(name, direct_superclasses, slots) {
    name = vm.designate_string(name);
    function generic_class() {};
    generic_class.qua_isa = vm.GenericClass;
    generic_class["qs_name"] = name;
    generic_class["qs_type-parameters"] = [];
    generic_class["qs_direct-superclasses"] =
        direct_superclasses.map(vm.designate_string);
    generic_class["qs_slots"] = slots ? slots : Object.create(null);
    var concrete_class = vm.js_make_constructor(name, Object.keys(generic_class["qs_slots"]));
    concrete_class.qua_isa = vm.ConcreteClass;
    concrete_class["qs_generic-class"] = generic_class;
    concrete_class["qs_type-arguments"] = [];
    concrete_class.prototype.toString = function() { return "#[" + name + "]"; };
    concrete_class.prototype.qua_isa = concrete_class;
    vm.GENERIC_CLASSES[name] = generic_class;
    vm.CONCRETE_CLASSES[name] = concrete_class;
    return concrete_class;
};
vm.js_make_constructor = function(name, prop_names) {
    var param_names = prop_names.map(vm.mangle).join(",");
    var param_inits = prop_names.map(function(prop_name) {
        return "this['qs_" + prop_name + "']=" + vm.mangle(prop_name) + ";"; }).join("");
    return eval("(function Qua_" + vm.mangle(name) + "(" + param_names + "){" + param_inits + "})");
};
vm.mangle = function(name) {
    return name.replace(/-/g, "_").replace(/%/g, "P");
}
vm.find_concrete_class = function(name) {
    var key = vm.concrete_class_key(name);
    var c = vm.CONCRETE_CLASSES[key];
    if (c !== undefined) { return c; } else { return vm.error("concrete class not found: " + key, init_env); }
};
vm.find_generic_class = function(name) {
    var key = vm.generic_class_key(name);
    var c = vm.GENERIC_CLASSES[key];
    if (c !== undefined) { return c; } else { return vm.error("generic class not found: " + key, init_env); }
};
// Classes, methods, and slots have names which can be specified
// as symbols, keywords, strings, or class types from Lisp.
// Internally, they're always strings.
vm.designate_string = function(name) {
    if (name.hasOwnProperty("qs_name")) {
        return name.qs_name;
    } else {
//        vm.assert_type(name, "string");
        return name;
    }
};
vm.concrete_class_key = function(name) {
    return vm.designate_string(name);
};
vm.generic_class_key = function(name) {
    return vm.designate_string(name);
};
vm.method_key = function(name) {
    return "qm_" + vm.designate_string(name);
};
vm.slot_key = function(name) {
    return "qs_" + vm.designate_string(name);
};
vm.designate_concrete_class = function(class_des) {
    if (vm.is_concrete_class(class_des)) {
        return class_des;
    } else {
        return vm.find_concrete_class(class_des);
    }
};
vm.designate_generic_class = function(class_des) {
    if (vm.is_generic_class(class_des)) {
        return class_des;
    } else {
        return vm.find_generic_class(class_des);
    }
};
// Instanceof does not work for properly for the CONCRETE-CLASS
// and GENERIC-CLASS classes themselves, so we need these crutches
// to determine if an object is a class.
vm.is_concrete_class = function(obj) {
    return obj && (obj.qua_isa === vm.ConcreteClass);
};
vm.is_generic_class = function(obj) {
    return obj && (obj.qua_isa === vm.GenericClass);
};
/* Objects */
vm.make_instance = function(class_des, initargs) {
    var concrete_class = vm.designate_concrete_class(class_des);
    var obj = vm.allocate_instance(concrete_class);
    return vm.initialize_instance(obj, initargs);
};
vm.allocate_instance = function(concrete_class) {
    vm.assert(vm.is_concrete_class(concrete_class));
    var obj = Object.create(concrete_class.prototype);
    return obj;
};
vm.initialize_instance = function(obj, initargs) {
    var initargs_dict = vm.assert_type(initargs, "object");
    for (name in initargs_dict) {
        var value = initargs_dict[name];
        vm.set_slot_value(obj, name, value);
    }
    return obj;
};
vm.concrete_class_of = function(obj) {
    if (obj && obj.qua_isa) {
        return obj.qua_isa;
    } else {
        return vm.concrete_class_of_hook(obj);
    }
};
vm.concrete_class_of_hook = function(obj) { vm.panic("object is missing class: " + obj); };
vm.unknown_class_hook = function(obj) { vm.panic("unknown class: " + obj); };
vm.generic_class_of = function(obj) {
    var ccls = vm.concrete_class_of(obj);
    vm.assert(vm.is_concrete_class(ccls));
    return ccls["qs_generic-class"];
};
/* Methods */
vm.put_method = function(generic_class, name, combiner) {
    generic_class = vm.designate_generic_class(generic_class);
    vm.assert(vm.is_generic_class(generic_class));
    vm.assert((combiner instanceof vm.Opv) || (combiner instanceof vm.Apv));
    generic_class.prototype[vm.method_key(name)] = combiner;
    return combiner;
};
vm.find_method = function(obj, name) {
    var key = vm.method_key(name);
    if (obj && obj[key]) {
        return obj[key];
    } else {
        return vm.find_method_using_concrete_class(obj, vm.concrete_class_of(obj), name);
    }
};
vm.find_method_using_concrete_class = function(obj, cls, name) {
    vm.assert(vm.is_concrete_class(cls));
    return vm.find_method_using_generic_class(obj, cls["qs_generic-class"], name);
};
vm.find_method_using_generic_class = function(obj, gcls, name) {
    vm.assert(vm.is_generic_class(gcls));
    var key = vm.method_key(name);
    if (gcls.prototype[key]) {
        return gcls.prototype[key];
    } else {
        var methods = vm.find_superclass_methods(obj, gcls, name);
        switch (methods.length) {
        case 0: return vm.error("method not found: " + key, init_env);
        case 1: return methods[0];
        default: return vm.ambiguous_method_hook(obj, name);
        }
    }
};
vm.find_superclass_methods = function(obj, gcls, name) {
    var methods = [];
    var superclass_names = gcls["qs_direct-superclasses"];
    superclass_names.forEach(function(superclass_name) {
        var gsuper = vm.GENERIC_CLASSES[vm.generic_class_key(superclass_name)];
        vm.assert(vm.is_generic_class(gsuper));
        // TODO: not reentrant
        var method = vm.find_method_using_generic_class(obj, gsuper, name);
        if (method) {
            methods.push(method);
        }
    });
    return methods;
};
/* Slots */
vm.slot_value = function(obj, name) {
    var key = vm.slot_key(name);
    if (obj.hasOwnProperty(key)) {
        return obj[key];
    } else {
        return vm.slot_unbound_hook(obj, name);
    }
};
vm.set_slot_value = function(obj, name, value) {
    var key = vm.slot_key(name);
    try {
        obj[key] = value;
        return value;
    } catch(exc) {
        return vm.set_slot_value_error_hook(obj, name, value, exc);
    };
};
vm.slot_bound_p = function(obj, name) {
    var key = vm.slot_key(name);
    return obj && obj.hasOwnProperty(key);
};
vm.slot_unbound_hook = function(obj, name) {
    return vm.error("slot unbound: " + vm.designate_string(name));
};
/* Types */
vm.Type = vm.defclass("%type", ["standard-object"], {});
vm.TypeVar = vm.defclass("%type-variable", ["%type"], { "name": {} });
vm.ClassType = vm.defclass("%class-type", ["%type"], { "name": {}, "generic-params": {} });
vm.GenericParam = vm.defclass("%generic-param", ["standard-object"], { "in-type": {}, "out-type": {} });
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
        return vm.error("Illegal type designator: " + JSON.stringify(type_designator), init_env);
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
/* Environments */
vm.Env = function(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
    this.parent = parent;
};
vm.make_env = function(parent) { return new vm.Env(parent); };
/* Setup class hierarchy - still in flux */
vm.Object = vm.defclass("object", []);
vm.StandardObject = vm.defclass("standard-object", ["object"]);
vm.Class = vm.defclass("class", ["standard-object"]);
vm.Combiner = vm.defclass("combiner", ["standard-object"]);
vm.Fexpr = vm.defclass("fexpr", ["combiner"]);
vm.Function = vm.defclass("function", ["combiner"]);
vm.Number = vm.defclass("number", ["object"]);
vm.String = vm.defclass("string", ["object"]);
vm.Boolean = vm.defclass("boolean", ["object"]);
vm.Sym = vm.defclass("symbol", ["object"], { "name": {}, "ns": {} });
vm.Keyword = vm.defclass("keyword", ["object"], { "name": {} });
vm.List = vm.defclass("list", ["object"], {});
vm.Cons = vm.defclass("cons", ["list"], { "car": {}, "cdr": {} });
vm.Nil = vm.defclass("nil", ["list"], {}); vm.NIL = new vm.Nil();
vm.Ign = vm.defclass("ign", ["object"], {}); vm.IGN = new vm.Ign();
vm.Void = vm.defclass("void", ["object"], {}); vm.VOID = new vm.Void();
// Instances of this class are thrown as JS exceptions to transfer a
// value from a RETURN-FROM expression to its enclosing BLOCK.
vm.Tag = vm.defclass("%%tag", ["standard-object"], { "id": {}, "val": {} });
/* Evaluation */
vm.trap_exceptions = function(thunk) {
    try {
        return thunk();
    } catch(exc) {
        if ((exc instanceof vm.Tag) || (exc instanceof vm.Panic)) {
            // let nonlocal exits and panics through
            throw exc;
        } else {
            // pipe all other evaluation exceptions into condition system
            return vm.error(exc);
        }
    }
};
vm.evaluate = function(e, x) {
    if (x && x.qua_evaluate) {
        return vm.trap_exceptions(function() { return x.qua_evaluate(x, e); });
    } else {
        return x;
    }
};
vm.Sym.prototype.qua_evaluate = function(self, e) {
    return vm.lookup(e, self);
};
vm.Cons.prototype.qua_evaluate = function(self, e) {
    return vm.monadic(function() { return vm.eval_operator(e, vm.car(self)); },
                      function(cmb) { return vm.combine(e, cmb, vm.cdr(self)); });
};
vm.eval_operator = function(e, op) {
    if (op instanceof vm.Sym) {
        return vm.lookup(e, vm.to_fun_sym(op));
    } else {
        return vm.evaluate(e, op);
    }
};
/* Combiners */
vm.combine = function(e, cmb, o) {
    if (cmb && cmb.qua_combine) {
        return vm.trap_exceptions(function() { return cmb.qua_combine(cmb, e, o); });
    } else {
        return vm.error("not a combiner: " + cmb, e);
    }
};
vm.Opv = vm.defclass("opv", ["standard-object"], { "p": {}, "ep": {}, "x": {}, "e": {} });
vm.Apv = function(cmb) { this.cmb = cmb; };
vm.wrap = function(cmb) { return new vm.Apv(cmb); };
vm.unwrap = function(apv) { return apv.cmb; };
vm.Opv.prototype.qua_combine = function(self, e, o) {
    var xe = vm.make_env(self.qs_e);
    return vm.monadic(function() { return vm.bind(xe, self.qs_p, o); },
                      function() {
                          return vm.monadic(function() { return vm.bind(xe, self.qs_ep, e); },
                                            function() { return vm.evaluate(xe, self.qs_x); }); });
};
vm.Apv.prototype.qua_combine = function(self, e, o) {
    return vm.monadic(function() { return vm.eval_args(e, o, vm.NIL); },
                      function(args) { return vm.combine(e, self.cmb, args); });
};
vm.eval_args = function(e, todo, done) {
    if (vm.is_nil(todo)) { return vm.reverse_list(done); }
    return vm.monadic(function() { return vm.evaluate(e, vm.car(todo)); },
                      function(arg) { return vm.eval_args(e, vm.cdr(todo), vm.cons(arg, done)); });
};
/* Built-in combiners */
vm.Vau = {
    qua_combine: function(self, e, o) {
        var p = vm.elt(o, 0);
        var ep = vm.elt(o, 1);
        var x = vm.elt(o, 2);
        return new vm.Opv(p, ep, x, e);
    }
};
vm.Def = {
    qua_combine: function (self, e, o) {
        var lhs = vm.elt(o, 0);
        var rhs = vm.elt(o, 1);
        return vm.monadic(function() { return vm.evaluate(e, rhs); },
                          function(val) { return vm.bind(e, lhs, val, vm.do_def); });
    }
};
vm.Setq = {
    qua_combine: function (self, e, o) {
        var lhs = vm.elt(o, 0);
        var rhs = vm.elt(o, 1);
        return vm.monadic(function() { return vm.evaluate(e, rhs); },
                          function(val) { return vm.bind(e, lhs, val, vm.do_setq); });
    }
};
vm.Eval = vm.wrap({
    qua_combine: function(self, e, o) {
        var x = vm.elt(o, 0);
        var e = vm.elt(o, 1);
        return vm.evaluate(e, x);
    }
});
vm.If = {
    qua_combine: function(self, e, o) {
        return vm.monadic(function() { return vm.evaluate(e, vm.elt(o, 0)); },
                          function(test_result) {
                              return vm.evaluate(e, test_result ? vm.elt(o, 1) : vm.elt(o, 2));
                          });
    }
};
vm.Progn = {
    qua_combine: function(self, e, o) {
        if (vm.is_nil(o)) return vm.VOID; else return vm.progn(e, o);
    }
};
vm.progn = function(e, xs) {
    return vm.monadic(function() { return vm.evaluate(e, vm.car(xs)); },
                      function(res) {
                          var cdr = vm.cdr(xs);
                          if (vm.is_nil(cdr)) return res; else return vm.progn(e, cdr);
                      });
};
/* Operator that calls JS function to do work */
vm.JSOperator = function(js_fn) { this.js_fn = vm.assert_type(js_fn, "function"); };
vm.JSOperator.prototype.qua_combine = function(self, e, o) {
    return vm.trap_exceptions(function() {
        return self.js_fn.apply(null, vm.list_to_array(o));
    });
};
vm.jswrap = function(js_fn) { return vm.wrap(new vm.JSOperator(js_fn)); };
/* Forms */
vm.VAR_NS = "v";
vm.FUN_NS = "f";
vm.sym = function(name, ns) { var s = new vm.Sym(name, ns ? ns : vm.VAR_NS); return s; };
vm.fun_sym = function(name) { return vm.sym(name, vm.FUN_NS); };
vm.sym_key = function(sym) { return sym.qs_name + "_" + sym.qs_ns; };
vm.sym_name = function(sym) { return vm.assert_type(sym, vm.Sym).qs_name; };
vm.to_fun_sym = function(sym) { return vm.fun_sym(vm.assert_type(sym, vm.Sym).qs_name); };
vm.cons = function cons(car, cdr) { var c = new vm.Cons(car, cdr); return c; }
vm.car = function(cons) { return vm.assert_type(cons, vm.Cons).qs_car; };
vm.cdr = function(cons) { return vm.assert_type(cons, vm.Cons).qs_cdr; };
vm.elt = function(cons, i) { return (i === 0) ? vm.car(cons) : vm.elt(vm.cdr(cons), i - 1); };
vm.keyword = function(name) { var k = new vm.Keyword(name); return k; };
vm.is_nil = function(obj) { return obj === vm.NIL; };
/* Environments */
vm.lookup = function(e, sym, default_val) {
    vm.assert_type(e, vm.Env);
    vm.assert_type(sym, vm.Sym);
    var key = vm.sym_key(sym);
    if (key in e.bindings) return e.bindings[key];
    else if (default_val !== undefined) return default_val;
    else return vm.error("unbound variable: " + vm.sym_key(sym));
};
vm.bind = function(e, lhs, rhs, doit) {
    vm.assert_type(e, vm.Env);
    if (lhs.qua_bind) return lhs.qua_bind(lhs, e, rhs, doit ? doit : vm.do_def);
    else return vm.error("cannot match", { lhs: lhs, rhs: rhs }, e);
};
vm.do_def = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    e.bindings[vm.sym_key(lhs)] = rhs;
    return rhs;
};
vm.do_setq = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    if (Object.prototype.hasOwnProperty.call(e.bindings, vm.sym_key(lhs)))
        return vm.do_def(e, lhs, rhs);
    else if (e.parent)
        return vm.do_setq(e.parent, lhs, rhs);
    else
        return vm.error("cannot set unbound variable: " + vm.sym_key(lhs), e);
};
vm.Sym.prototype.qua_bind = function(self, e, rhs, doit) {
    return doit(e, self, rhs);
};
vm.Cons.prototype.qua_bind = function(self, e, rhs, doit) {
    return vm.monadic(function() { return vm.bind(e, vm.car(self), vm.car(rhs), doit); },
                      function() { return vm.bind(e, vm.cdr(self), vm.cdr(rhs), doit); });
};
vm.Nil.prototype.qua_bind = function(self, e, rhs, doit) {
    if (!vm.is_nil(rhs)) return vm.error("NIL expected, but got: " + JSON.stringify(rhs), e);
};
// This is cute, but probably too much trouble.
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
/* Util Dumping Ground */
vm.assert_type = function(obj, type_spec) {
    if (vm.check_type(obj, type_spec)) return obj;
    else return vm.error("type error: " + obj + " should be " + type_spec + " but is " + obj, e);
};
vm.check_type = function(obj, type_spec) {
    if (typeof(type_spec) === "string") {
        return (typeof(obj) === type_spec);
    } else if (Array.isArray(type_spec)) {
        vm.assert(type_spec.length === 1);
        vm.assert(Array.isArray(obj));
        var elt_type_spec = type_spec[0];
        obj.forEach(function(elt) { vm.assert_type(elt, elt_type_spec); });
        return true;
    } else {
        return (obj instanceof type_spec);
    }
};
vm.assert = function(x) { if (!x) vm.panic("assertion failed"); };
vm.Panic = function Panic(exc) {
    vm.assert_type(exc, Error);
    this.exc = exc;
};
vm.Panic.prototype.toString = function() {
    return this.exc.stack;
};
vm.error = function(err, e) {
    if (vm.check_type(e, vm.Env)) {
        // call into userspace ERROR function if we have an environment
        var error = vm.lookup(e, vm.fun_sym("error"), false);
        if (error) {
            return vm.combine(e, error, vm.list(err));
        } else {
            console.log("ERROR not bound");
            // fall through
        }
    } else {
        console.log("No environment passed to vm.error()");
        // fall through
    }
    // if nothing else worked, panic
    vm.panic(err);
};
// Unconditionally abort up to the next exception handler outside
// of the VM.  Bypasses any intervening %%RESCUE handlers to
// prevent user code from interfering with the unwinding.
vm.panic = function(err) {
    console.log("vm.panic", err);
    err = (err instanceof Error) ? err : new Error(err);
    throw new vm.Panic(err);
};
vm.time = function(name, fun) {
    var start = new Date().getTime();
    fun();
    var end = new Date().getTime();
    var time = end - start;
    console.log(name + ": "  + time + "ms");
};
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
};
vm.parse_bytecode_array = function(arr) {
    if ((arr.length == 2) && arr[0] === "wat-string") { return arr[1]; }
    if ((arr.length == 2) && arr[0] === "qua-function") { return vm.fun_sym(arr[1]); }
    if ((arr.length == 2) && arr[0] === "qua-keyword") { return vm.keyword(arr[1]); }
    var i = arr.indexOf(".");
    if (i === -1) return vm.array_to_list(arr.map(vm.parse_bytecode));
    else { var front = arr.slice(0, i);
           return vm.array_to_list(front.map(vm.parse_bytecode), vm.parse_bytecode(arr[i + 1])); }
};
/* API */
vm.def = vm.bind;
vm.defun = function(e, name, cmb) { vm.def(e, vm.to_fun_sym(name), cmb); };
// Populates a fresh init environment with the VM primitives.
vm.init = function() {
    var init_env = vm.make_env();
    // Forms
    vm.defun(init_env, vm.sym("%%car"), vm.jswrap(vm.car));
    vm.defun(init_env, vm.sym("%%cdr"), vm.jswrap(vm.cdr));
    vm.defun(init_env, vm.sym("%%cons"), vm.jswrap(vm.cons));
    vm.defun(init_env, vm.sym("%%to-fun-sym"), vm.jswrap(vm.to_fun_sym));
    // Evaluation
    vm.defun(init_env, vm.sym("%%def"), vm.Def);
    vm.defun(init_env, vm.sym("%%eval"), vm.Eval);
    vm.defun(init_env, vm.sym("%%if"), vm.If);
    vm.defun(init_env, vm.sym("%%progn"), vm.Progn);
    vm.defun(init_env, vm.sym("%%setq"), vm.Setq);
    // Combiners
    vm.defun(init_env, vm.sym("%%vau"), vm.Vau);
    vm.defun(init_env, vm.sym("%%wrap"), vm.jswrap(vm.wrap));
    vm.defun(init_env, vm.sym("%%unwrap"), vm.jswrap(vm.unwrap));
    // Environments
    vm.defun(init_env, vm.sym("%%make-environment"), vm.jswrap(vm.make_env));
    // Object system
    vm.defun(init_env, vm.sym("%%concrete-class-of"), vm.jswrap(vm.concrete_class_of));
    vm.defun(init_env, vm.sym("%%ensure-class"), vm.jswrap(vm.defclass));
    vm.defun(init_env, vm.sym("%%find-concrete-class"), vm.jswrap(vm.find_concrete_class));
    vm.defun(init_env, vm.sym("%%find-generic-class"), vm.jswrap(vm.find_generic_class));
    vm.defun(init_env, vm.sym("%%find-method"), vm.jswrap(vm.find_method));
    vm.defun(init_env, vm.sym("%%generic-class-of"), vm.jswrap(vm.generic_class_of));
    vm.defun(init_env, vm.sym("%%make-instance"), vm.jswrap(vm.make_instance));
    vm.defun(init_env, vm.sym("%%put-method"), vm.jswrap(vm.put_method));
    vm.defun(init_env, vm.sym("%%set-slot-value"), vm.jswrap(vm.set_slot_value));
    vm.defun(init_env, vm.sym("%%slot-bound?"), vm.jswrap(vm.slot_bound_p));
    vm.defun(init_env, vm.sym("%%slot-value"), vm.jswrap(vm.slot_value));
    vm.defun(init_env, vm.sym("%%type?"), vm.jswrap(vm.typep));
    // Misc
    vm.defun(init_env, vm.sym("%%panic"), vm.panic);
    vm.defun(init_env, vm.sym("%%eq"), vm.jswrap(function(a, b) { return a === b; }));
    vm.defun(init_env, vm.sym("%%print"), vm.jswrap(console.log));
    vm.defun(init_env, vm.sym("%%list-to-array"), vm.jswrap(vm.list_to_array));
    vm.defun(init_env, vm.sym("%%reverse-list"), vm.jswrap(vm.reverse_list));
    // Temporary, till we find a better place
    vm.defun(init_env, vm.sym("%%parse-bytecode"), vm.jswrap(vm.parse_bytecode));
    return init_env;
};
vm.eval = function(x, e) {
    return vm.evaluate(e, x); // change to x,e
};
