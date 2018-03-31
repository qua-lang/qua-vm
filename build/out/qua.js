(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.qua = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports.main = [null,["%%def",["qua:function","def"],["qua:function","%%def"]],["def",["qua:function","car"],["qua:function","%%car"]],["def",["qua:function","cdr"],["qua:function","%%cdr"]],["def",["qua:function","cons"],["qua:function","%%cons"]],["def",["qua:function","eval"],["qua:function","%%eval"]],["def",["qua:function","make-environment"],["qua:function","%%make-environment"]],["def",["qua:function","progn"],["qua:function","%%progn"]],["def",["qua:function","qua:to-fsym"],["qua:function","%%to-fsym"]],["def",["qua:function","unwrap"],["qua:function","%%unwrap"]],["def",["qua:function","wrap"],["qua:function","%%wrap"]],null,["def",["qua:function","list*"],["qua:function","%%list*"]],null,["def",["qua:function","qua:assert"],["qua:function","%%assert"]],["def",["qua:function","qua:deep-equal"],["qua:function","%%deep-equal"]],["def",["qua:function","quote"],["%%vau",["x"],"#ign","x"]],["def",["qua:function","list"],["wrap",["%%vau","o","#ign","o"]]],["def",["qua:function","qua:make-macro-expander"],["wrap",["%%vau",["expander-function"],"#ign",["%%vau","operands","env",["eval",["eval",["cons","expander-function","operands"],["make-environment"]],"env"]]]]],null,["def",["qua:function","vau"],["qua:make-macro-expander",["%%vau",["params","env-param",".","body"],"#ign",["list",["qua:function","%%vau"],"params","env-param",["list*",["qua:function","progn"],"body"]]]]],["def",["qua:function","macro"],["qua:make-macro-expander",["vau",["params",".","body"],"#ign",["list",["qua:function","qua:make-macro-expander"],["list*",["qua:function","vau"],"params","#ign","body"]]]]],["def",["qua:function","defmacro"],["macro",["name","params",".","body"],["list",["qua:function","def"],["qua:to-fsym","name"],["list*",["qua:function","macro"],"params","body"]]]],["defmacro","qua:lambda",["params",".","body"],["list",["qua:function","wrap"],["list*",["qua:function","vau"],"params","#ign","body"]]],null]

},{}],2:[function(require,module,exports){
module.exports.main = [null,["qua:assert",["qua:deep-equal",1,["car",["cons",1,2]]]],["qua:assert",["qua:deep-equal",2,["cdr",["cons",1,2]]]],["qua:assert",["qua:deep-equal",1,["car",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",["list",2,3],["cdr",["list",1,2,3]]]],["qua:assert",["qua:deep-equal",1,["car",["list*",1,2,3]]]],["qua:assert",["qua:deep-equal",["cons",2,3],["cdr",["list*",1,2,3]]]],null,["def","e1",["make-environment"]],["eval",["list",["qua:function","def"],["quote","x"],1],"e1"],["qua:assert",["qua:deep-equal",1,["eval",["quote","x"],"e1"]]],["qua:assert",["qua:deep-equal","#void",["progn"]]],["qua:assert",["qua:deep-equal",1,["progn",1]]],["qua:assert",["qua:deep-equal",2,["progn",1,2]]],null,["def","e2",["make-environment"]],["def",["qua:function","fun2"],["wrap",["vau",["p"],"#ign","p"]]],["eval",["list",["qua:function","def"],["quote","x"],2],"e2"],["eval",["list",["qua:function","def"],["quote",["qua:function","fun2"]],["qua:function","fun2"]],"e2"],["qua:assert",["qua:deep-equal",2,["eval",["list",["qua:function","fun2"],["quote","x"]],"e2"]]],null]

},{}],3:[function(require,module,exports){
// Plugin for the Qua VM that adds the delimcc API for delimited control.
// Documentation: http://okmij.org/ftp/continuations/implementations.html
// Also adds continuation-aware implementations of qua:loop and qua:rescue.
module.exports = function(vm, e) {
    /* Continuations */
    function StackFrame(fun, next) { this.fun = fun; this.next = next;};
    function Resumption(k, f) { this.k = k; this.f = f; };
    function Suspension(prompt, handler) { this.prompt = prompt; this.handler = handler; this.k = null; };
    function isResumption(m) { return m instanceof Resumption; };
    function isSuspension(x) { return x instanceof Suspension; };
    function suspendFrame(sus, fun) { sus.k = new StackFrame(fun, sus.k); };
    function resumeFrame(k, f) { return k.fun(k.next, f); };
    vm.monadic = function(m, a, b) { // override vm.js
        if (isResumption(m)) {
            var val = resumeFrame(m.k, m.f);
        } else {
            var val = a();
        }
        if (isSuspension(val)) {
            suspendFrame(val, function(m) { return vm.monadic(m, a, b); });
            return val;
        }
        return b(val);
    };
    /* Delimited control */
    vm.PushPrompt = vm.wrap({
        qua_combine: function do_push_prompt(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var body = vm.elt(o, 1);
            if (isResumption(m)) {
                var val = resumeFrame(m.k, m.f);
            } else {
                var val = vm.combine(null, e, body, vm.NIL);
            }
            if (isSuspension(val)) {
                if (val.prompt === prompt) {
                    var continuation = val.k;
                    var handler = val.handler;
                    return vm.combine(null, e, handler, vm.cons(continuation, NIL));
                } else {
                    suspendFrame(val, function(m) { return do_push_prompt(self, m, e, o); });
                    return val;
                }
            }
            return val;
        }
    });
    vm.TakeSubcont = vm.wrap({
        qua_combine: function(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var handler = vm.elt(o, 1);
            var sus = new Suspension(prompt, handler);
            suspendFrame(sus, function(m) { return vm.combine(null, e, m.f, NIL); });
            return sus;
        }
    });
    vm.PushSubcont = vm.wrap({
        qua_combine: function do_push_subcont(self, m, e, o) {
            var thek = vm.elt(o, 0);
            var thef = vm.elt(o, 1);
            if (isResumption(m)) {
                var val = resumeFrame(m.k, m.f);
            } else {
                var val = resumeFrame(thek, thef);
            }
            if (isSuspension(val)) {
                suspendFrame(val, function(m) { return do_push_subcont(self, m, e, o); });
                return val;
            }
            return val;
        }
    });
    vm.PushPromptSubcont = vm.wrap({
        qua_combine: function do_push_prompt_subcont(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var thek = vm.elt(o, 1);
            var thef = vm.elt(o, 2);
            if (isResumption(m)) {
                var val = resumeFrame(m.k, m.f);
            } else {
                var val = resumeFrame(thek, thef);
            }
            if (isSuspension(val)) {
                if (val.prompt === prompt) {
                    var continuation = val.k;
                    var handler = val.handler;
                    return vm.combine(null, e, handler, vm.cons(continuation, NIL));
                } else {
                    suspendFrame(val, function(m) { return do_push_prompt_subcont(self, m, e, o); });
                    return val;
                }
            }
            return val;
        }
    });
    /* Simple control */
    vm.Loop = vm.wrap({
        qua_combine: function do_loop(self, m, e, o) {
            var body = vm.elt(o, 0);
            var first = true; // only resume once
            while (true) {
                if (first && isResumption(m)) {
                    var val = resumeFrame(m.k, m.f);
                } else {
                    var val = vm.combine(null, e, body, vm.NIL);
                }
                first = false;
                if (isSuspension(val)) {
                    suspendFrame(val, function(m) { return do_loop(self, m, e, o); });
                    return val;
                }
            }
        }
    });
    vm.raise = function(err, args) { throw err; };
    vm.Rescue = vm.wrap({
        qua_combine: function do_rescue(self, m, e, o) {
            var handler = vm.elt(o, 0);
            var body = vm.elt(o, 1);
            try {
                if (isResumption(m)) {
                    var val = resumeFrame(m.k, m.f);
                } else {
                    var val = vm.combine(null, e, body, vm.NIL);
                }
            } catch(exc) {
                // unwrap handler to prevent eval if exc is sym or cons
                var val = vm.combine(null, e, vm.unwrap(handler), vm.list(exc));
            }
            if (isSuspension(val)) {
                suspendFrame(val, function(m) { return do_rescue(self, m, e, o); });
                return val;
            }
            return val;
        }
    });
    vm.defun(e, vm.sym("%%loop"), vm.Loop);
    vm.defun(e, vm.sym("%%raise"), vm.jswrap(vm.raise));
    vm.defun(e, vm.sym("%%rescue"), vm.Rescue);
    vm.defun(e, vm.sym("%%push-prompt"), vm.PushPrompt);
    vm.defun(e, vm.sym("%%take-subcont"), vm.TakeSubcont);
    vm.defun(e, vm.sym("%%push-subcont"), vm.PushSubcont);
    vm.defun(e, vm.sym("%%push-prompt-subcont"), vm.PushPromptSubcont);
}

},{}],4:[function(require,module,exports){
// Plugin for the Qua VM that adds a second namespace for functions.
// This should be loaded before anything else so that all functions
// defined in other modules go into the function namespace.
module.exports = function(vm, e) {
    vm.FUN_NS = "f";
    vm.eval_operator = function(e, op) { // override vm.js
        if (op instanceof vm.Sym) {
            return vm.lookup(e, vm.to_fsym(op));
        } else {
            return vm.evaluate(null, e, op);
        }
    };
    vm.fsym = function(name) { return vm.sym(name, vm.FUN_NS); };
    vm.to_fsym = function(sym) { vm.assert_type(sym, vm.Sym); return vm.fsym(sym.name); };
    vm.defun = function(e, name, cmb) { // override vm.js
        vm.bind(e, vm.to_fsym(name), cmb);
    };
    vm.defun(e, vm.sym("%%to-fsym"), vm.jswrap(vm.to_fsym));
}

},{}],5:[function(require,module,exports){
var vm = require("./vm");
var parser = require("./parser");
var init_bytecode = require("../build/out/init.js").main;
var test_bytecode = require("../build/out/test.js").main;

var e = vm.make_env();
require("./lisp-2")(vm, e);
require("./cont")(vm, e);
require("./print")(vm, e);
require("./optim")(vm, e);
require("./test")(vm, e);
vm.init(e);
vm.eval(parse_bytecode([vm.sym("%%progn")].concat(init_bytecode)), e);
vm.eval(parse_bytecode([vm.sym("%%progn")].concat(test_bytecode)), e);

module.exports.vm = function() {
    return {
        "eval": function(str) { return vm.eval(parser.parse_sexp(str), e); }
    };
};

/* Bytecode parser */
function parse_bytecode(obj) {
    switch(Object.prototype.toString.call(obj)) {
    case "[object String]": 
        switch(obj) {
        case "#ign": return vm.IGN;
        case "#void": return vm.VOID;
        default: return vm.sym(obj);
        }
    case "[object Array]": return parse_bytecode_array(obj);
    default: return obj;
    }
}
function parse_bytecode_array(arr) {
    if ((arr.length == 2) && arr[0] === "wat-string") { return arr[1]; }
    if ((arr.length == 2) && arr[0] === "qua:function") { return vm.fsym(arr[1]); }
    var i = arr.indexOf(".");
    if (i === -1) return vm.array_to_list(arr.map(parse_bytecode));
    else { var front = arr.slice(0, i);
        return vm.array_to_list(front.map(parse_bytecode), parse_bytecode(arr[i + 1])); }
}

},{"../build/out/init.js":1,"../build/out/test.js":2,"./cont":3,"./lisp-2":4,"./optim":6,"./parser":7,"./print":8,"./test":9,"./vm":10}],6:[function(require,module,exports){
module.exports = function(vm, e) {
    function list_star() {
        var len = arguments.length; var c = len >= 1 ? arguments[len-1] : NIL;
        for (var i = len-1; i > 0; i--) c = vm.cons(arguments[i - 1], c); return c;
    };
    vm.defun(e, vm.sym("%%list*"), vm.jswrap(list_star));
}

},{}],7:[function(require,module,exports){
var jsparse = require("jsparse");
module.exports.parse_sexp = parse_sexp;

var ps = jsparse.ps; var choice = jsparse.choice; var range = jsparse.range; var action = jsparse.action; var sequence = jsparse.sequence; var join = jsparse.join; var join_action = jsparse.join_action; var negate = jsparse.negate; var repeat0 = jsparse.repeat0; var optional = jsparse.optional; var repeat1 = jsparse.repeat1; var wsequence = jsparse.wsequence; var whitespace = jsparse.whitespace; var ch = jsparse.ch; var butnot = jsparse.butnot;

/* S-expr parser */
function parse_sexp(s) {
    var res = program_stx(ps(s));
    if (res.remaining.index === s.length) return res.ast;
    else throw("parse error at " + res.remaining.index + " in " + s); }
var x_stx = function(input) { return x_stx(input); }; // forward decl.
var id_special_char =
    choice(":", "-", "&", "!", "=", ">", "<", "%", "+", "?", "/", "*", "$", "_", "#", ".", "@", "|", "~", "^", "'");
var id_char = choice(range("a", "z"), range("A", "Z"), range("0", "9"), id_special_char);
// Kludge: don't allow single dot as id, so as not to conflict with dotted pair stx.
var id_stx = action(join_action(butnot(repeat1(id_char), "."), ""), handle_identifier);
function handle_identifier(str) {
    if ((str[0] === ".") && (str.length > 1)) { return ["js-getter", ["wat-string", str.substring(1)]]; }
    else if (str[0] === "@") { return ["js-invoker", ["wat-string", str.substring(1)]]; }
    else if (str[0] === "$") { return ["js-global", ["wat-string", str.substring(1)]]; }
    else if (str.startsWith("#'")) { return ["qua:function", str.substring(2)]; }
    else return str; }
var escape_char = choice("\"", "\\", "n", "r", "t", "0");
var escape_sequence = action(sequence("\\", escape_char), function (ast) {
    switch(ast[1]) {
    case "n": return "\n";
    case "r": return "\r";
    case "t": return "\t";
    case "0": return "\0";
    default: return ast[1]; }});
var line_terminator = choice(ch("\r"), ch("\n"));
var string_char = choice(escape_sequence, line_terminator, negate("\""));
var string_stx = action(sequence("\"", join_action(repeat0(string_char), ""), "\""),
                        function (ast) { return ["wat-string", ast[1]]; });
var digits = join_action(repeat1(range("0", "9")), "");
var number_stx =
    action(sequence(optional(choice("+", "-")), digits, optional(join_action(sequence(".", digits), ""))),
           function (ast) {
               var sign = ast[0] ? ast[0] : "";
               var integral_digits = ast[1]; 
               var fractional_digits = ast[2] || "";
               return Number(sign + integral_digits + fractional_digits); });
function make_constant_stx(string, constant) { return action(string, function(ast) { return constant; }); }
var nil_stx = make_constant_stx("()", []);
var ign_stx = make_constant_stx("#ign", "#ign");
var void_stx = make_constant_stx("#void", "#void");
var t_stx = make_constant_stx("#t", true);
var f_stx = make_constant_stx("#f", false);
var null_stx = make_constant_stx("#null", null);
var undef_stx = make_constant_stx("#undefined", undefined);
var dot_stx = action(wsequence(".", x_stx), function (ast) { return ast[1]; });
var compound_stx = action(wsequence("(", repeat1(x_stx), optional(dot_stx), ")"),
                          function(ast) {
                              var exprs = ast[1];
                              var end = ast[2] ? [".", ast[2]] : [];
                              return exprs.concat(end); });
//var quote_stx = action(sequence("'", x_stx), function(ast) { return ["quote", ast[1]]; });
var cmt_stx = action(sequence(";", repeat0(negate(line_terminator)), optional(line_terminator)), nothing_action);
var whitespace_stx = action(choice(" ", "\n", "\r", "\t"), nothing_action);
function nothing_action(ast) { return null; } // HACK!
var x_stx = whitespace(choice(ign_stx, void_stx, nil_stx, t_stx, f_stx, null_stx, undef_stx, number_stx,
                              /*quote_stx,*/ compound_stx, id_stx, string_stx, cmt_stx));
var program_stx = whitespace(repeat0(choice(x_stx, whitespace_stx))); // HACK!

},{"jsparse":14}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
// Adds utility functions for testing the built-ins to a VM
var deep_equal = require("deep-equal");
module.exports = function(vm, e) {
    function assert(x) { if (!x) return vm.error("assertion failure"); }
    vm.defun(e, vm.sym("%%assert"), vm.jswrap(assert));
    vm.defun(e, vm.sym("%%deep-equal"), vm.jswrap(deep_equal));
}

},{"deep-equal":11}],10:[function(require,module,exports){
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
vm.map_list = function(list, fun) {
    if (list === vm.NIL) return vm.NIL;
    else return vm.cons(fun(vm.car(list)), vm.map_list(vm.cdr(list), fun));
};
vm.reverse_list = function(list) {
    var res = vm.NIL;
    while(list !== vm.NIL) { res = vm.cons(vm.car(list), res); list = vm.cdr(list); }
    return res;
};
vm.assert = function(x) { if (!x) vm.error("assertion failed"); };
vm.error = function(err) { throw new Error(err); };
/* JS type checks */
vm.assert_type = function(obj, type_spec) {
    if (vm.check_type(obj, type_spec)) return obj;
    else return vm.error("type error: " + type_spec, { obj: obj, type_spec: type_spec });
};
vm.check_type = function(obj, type_spec) {
    if (typeof(type_spec) === "string") {
        return (typeof(obj) === type_spec);
    } else if (Array.isArray(type_spec)) {
        vm.assert(type_spec.length === 1);
        var elt_type_spec = type_spec[0];
        vm.assert(Array.isArray(obj));
        obj.forEach(function(elt) { vm.assert_type(elt, elt_type_spec); });
    } else {
        return (obj instanceof type_spec);
    }
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
    vm.defun(e, vm.sym("%%eval"), vm.Eval);
    vm.defun(e, vm.sym("%%def"), vm.Def);
    vm.defun(e, vm.sym("%%progn"), vm.Progn);
    // Combiners
    vm.defun(e, vm.sym("%%vau"), vm.Vau);
    vm.defun(e, vm.sym("%%wrap"), vm.jswrap(vm.wrap));
    vm.defun(e, vm.sym("%%unwrap"), vm.jswrap(vm.unwrap));
    // Environments
    vm.defun(e, vm.sym("%%make-environment"), vm.jswrap(vm.make_env));
};
vm.eval = function(x, e) {
    return vm.evaluate(null, e, x); // change to x,e
};

},{}],11:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":12,"./lib/keys.js":13}],12:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],13:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],14:[function(require,module,exports){
// Copyright (C) 2007 Chris Double.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// DEVELOPERS AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

var jsparse;
try {
    jsparse = exports;
} catch(e) {
    jsparse = {};
}

jsparse.foldl = function foldl(f, initial, seq) {
    for(var i=0; i< seq.length; ++i)
        initial = f(initial, seq[i]);
    return initial;
}

jsparse.memoize = true;

jsparse.ParseState = (function() {
    function ParseState(input, index) {
        this.input = input;
        this.index = index || 0;
        this.length = input.length - this.index;
        this.cache = { };
        return this;
    }

    ParseState.prototype.from = function(index) {
        var r = new ParseState(this.input, this.index + index);
        r.cache = this.cache;
        r.length = this.length - index;
        return r;
    }

    ParseState.prototype.substring = function(start, end) {
        return this.input.substring(start + this.index, (end || this.length) + this.index);
    }

    ParseState.prototype.trimLeft = function() {
        var s = this.substring(0);
        var m = s.match(/^\s+/);
        return m ? this.from(m[0].length) : this;
    }

    ParseState.prototype.at = function(index) {
        return this.input.charAt(this.index + index);
    }

    ParseState.prototype.toString = function() {
        return 'PS"' + this.substring(0) + '"';
    }

    ParseState.prototype.getCached = function(pid) {
        if(!jsparse.memoize)
            return false;

        var p = this.cache[pid];
        if(p)
            return p[this.index];
        else
            return false;
    }

    ParseState.prototype.putCached = function(pid, cached) {
        if(!jsparse.memoize)
            return false;

        var p = this.cache[pid];
        if(p)
            p[this.index] = cached;
        else {
            p = this.cache[pid] = { };
            p[this.index] = cached;
        }
    }
    return ParseState;
})()

jsparse.ps = function ps(str) {
    return new jsparse.ParseState(str);
}

// 'r' is the remaining string to be parsed.
// 'matched' is the portion of the string that
// was successfully matched by the parser.
// 'ast' is the AST returned by the successfull parse.
jsparse.make_result = function make_result(r, matched, ast) {
    return { remaining: r, matched: matched, ast: ast };
}

jsparse.parser_id = 0;

// 'token' is a parser combinator that given a string, returns a parser
// that parses that string value. The AST contains the string that was parsed.
jsparse.token = function token(s) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var r = state.length >= s.length && state.substring(0,s.length) == s;
        if(r)
            cached = { remaining: state.from(s.length), matched: s, ast: s };
        else
            cached = false;
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Like 'token' but for a single character. Returns a parser that given a string
// containing a single character, parses that character value.
jsparse.ch = function ch(c) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        var r = state.length >= 1 && state.at(0) == c;
        if(r)
            cached = { remaining: state.from(1), matched: c, ast: c };
        else
            cached = false;
        savedState.putCached(pid, cached);
        return cached;
    };
}

// 'range' is a parser combinator that returns a single character parser
// (similar to 'ch'). It parses single characters that are in the inclusive
// range of the 'lower' and 'upper' bounds ("a" to "z" for example).
jsparse.range = function range(lower, upper) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        if(state.length < 1)
            cached = false;
        else {
            var ch = state.at(0);
            if(ch >= lower && ch <= upper)
                cached = { remaining: state.from(1), matched: ch, ast: ch };
            else
                cached = false;
        }
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Helper function to convert string literals to token parsers
// and perform other implicit parser conversions.
jsparse.toParser = function toParser(p) {
    return (typeof(p) == "string") ? jsparse.token(p) : p;
}

// Parser combinator that returns a parser that
// skips whitespace before applying parser.
jsparse.whitespace = function whitespace(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        cached = p(state.trimLeft());
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Parser combinator that passes the AST generated from the parser 'p'
// to the function 'f'. The result of 'f' is used as the AST in the result.
jsparse.action = function action(p, f) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var x = p(state);
        if(x) {
            x.ast = f(x.ast);
            cached = x;
        }
        else {
            cached = false;
        }
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Given a parser that produces an array as an ast, returns a
// parser that produces an ast with the array joined by a separator.
jsparse.join_action = function join_action(p, sep) {
    return jsparse.action(p, function(ast) { return ast.join(sep); });
}

// Given an ast of the form [ Expression, [ a, b, ...] ], convert to
// [ [ [ Expression [ a ] ] b ] ... ]
// This is used for handling left recursive entries in the grammar. e.g.
// MemberExpression:
//   PrimaryExpression
//   FunctionExpression
//   MemberExpression [ Expression ]
//   MemberExpression . Identifier
//   new MemberExpression Arguments
jsparse.left_factor = function left_factor(ast) {
    return jsparse.foldl(function(v, action) {
                     return [ v, action ];
                 },
                 ast[0],
                 ast[1]);
}

// Return a parser that left factors the ast result of the original
// parser.
jsparse.left_factor_action = function left_factor_action(p) {
    return jsparse.action(p, jsparse.left_factor);
}

// 'negate' will negate a single character parser. So given 'ch("a")' it will successfully
// parse any character except for 'a'. Or 'negate(range("a", "z"))' will successfully parse
// anything except the lowercase characters a-z.
jsparse.negate = function negate(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        if(state.length >= 1) {
            var r = p(state);
            if(!r)
                cached =  jsparse.make_result(state.from(1), state.at(0), state.at(0));
            else
                cached = false;
        }
        else {
            cached = false;
        }
        savedState.putCached(pid, cached);
        return cached;
    };
}

// 'end' is a parser that is successful if the input string is empty (ie. end of parse).
jsparse.end = function end(state) {
    if(state.length == 0)
        return jsparse.make_result(state, undefined, undefined);
    else
        return false;
}
jsparse.end_p = jsparse.end;

// 'nothing' is a parser that always fails.
jsparse.nothing = function nothing(state) {
    return false;
}
jsparse.nothing_p = jsparse.nothing;

// 'sequence' is a parser combinator that processes a number of parsers in sequence.
// It can take any number of arguments, each one being a parser. The parser that 'sequence'
// returns succeeds if all the parsers in the sequence succeeds. It fails if any of them fail.
jsparse.sequence = function sequence() {
    var parsers = [];
    for(var i = 0; i < arguments.length; ++i)
        parsers.push(jsparse.toParser(arguments[i]));
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached) {
            return cached;
        }

        var ast = [];
        var matched = "";
        var i;
        for(i=0; i< parsers.length; ++i) {
            var parser = parsers[i];
            var result = parser(state);
            if(result) {
                state = result.remaining;
                if(result.ast != undefined) {
                    ast.push(result.ast);
                    matched = matched + result.matched;
                }
            }
            else {
                break;
            }
        }
        if(i == parsers.length) {
            cached = jsparse.make_result(state, matched, ast);
        }
        else
            cached = false;
        savedState.putCached(pid, cached);
        return cached;
    };
}

// Like sequence, but ignores whitespace between individual parsers.
jsparse.wsequence = function wsequence() {
    var parsers = [];
    for(var i=0; i < arguments.length; ++i) {
        parsers.push(jsparse.whitespace(jsparse.toParser(arguments[i])));
    }
    return jsparse.sequence.apply(null, parsers);
}

// 'choice' is a parser combinator that provides a choice between other parsers.
// It takes any number of parsers as arguments and returns a parser that will try
// each of the given parsers in order. The first one that succeeds results in a
// successfull parse. It fails if all parsers fail.
jsparse.choice = function choice() {
    var parsers = [];
    for(var i = 0; i < arguments.length; ++i)
        parsers.push(jsparse.toParser(arguments[i]));
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached) {
            return cached;
        }
        var i;
        for(i=0; i< parsers.length; ++i) {
            var parser=parsers[i];
            var result = parser(state);
            if(result) {
                break;
            }
        }
        if(i == parsers.length)
            cached = false;
        else
            cached = result;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// 'butnot' is a parser combinator that takes two parsers, 'p1' and 'p2'.
// It returns a parser that succeeds if 'p1' matches and 'p2' does not, or
// 'p1' matches and the matched text is longer that p2's.
// Useful for things like: butnot(IdentifierName, ReservedWord)
jsparse.butnot = function butnot(p1,p2) {
    var p1 = jsparse.toParser(p1);
    var p2 = jsparse.toParser(p2);
    var pid = jsparse.parser_id++;

    // match a but not b. if both match and b's matched text is shorter
    // than a's, a failed match is made
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var br = p2(state);
        if(!br) {
            cached = p1(state);
        } else {
            var ar = p1(state);

            if (ar) {
              if(ar.matched.length > br.matched.length)
                  cached = ar;
              else
                  cached = false;
            }
            else {
              cached = false;
            }
        }
        savedState.putCached(pid, cached);
        return cached;
    }
}

// 'difference' is a parser combinator that takes two parsers, 'p1' and 'p2'.
// It returns a parser that succeeds if 'p1' matches and 'p2' does not. If
// both match then if p2's matched text is shorter than p1's it is successfull.
jsparse.difference = function difference(p1,p2) {
    var p1 = jsparse.toParser(p1);
    var p2 = jsparse.toParser(p2);
    var pid = jsparse.parser_id++;

    // match a but not b. if both match and b's matched text is shorter
    // than a's, a successfull match is made
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var br = p2(state);
        if(!br) {
            cached = p1(state);
        } else {
            var ar = p1(state);
            if(ar.matched.length >= br.matched.length)
                cached = br;
            else
                cached = ar;
        }
        savedState.putCached(pid, cached);
        return cached;
    }
}


// 'xor' is a parser combinator that takes two parsers, 'p1' and 'p2'.
// It returns a parser that succeeds if 'p1' or 'p2' match but fails if
// they both match.
jsparse.xor = function xor(p1, p2) {
    var p1 = jsparse.toParser(p1);
    var p2 = jsparse.toParser(p2);
    var pid = jsparse.parser_id++;

    // match a or b but not both
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var ar = p1(state);
        var br = p2(state);
        if(ar && br)
            cached = false;
        else
            cached = ar || br;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that takes one parser. It returns a parser that
// looks for zero or more matches of the original parser.
jsparse.repeat0 = function repeat0(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;

    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached) {
            return cached;
        }

        var ast = [];
        var matched = "";
        var result;
        while(result = p(state)) {
            ast.push(result.ast);
            matched = matched + result.matched;
            if(result.remaining.index == state.index)
                break;
            state = result.remaining;
        }
        cached = jsparse.make_result(state, matched, ast);
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that takes one parser. It returns a parser that
// looks for one or more matches of the original parser.
jsparse.repeat1 = function repeat1(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;

    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;

        var ast = [];
        var matched = "";
        var result= p(state);
        if(!result)
            cached = false;
        else {
            while(result) {
                ast.push(result.ast);
                matched = matched + result.matched;
                if(result.remaining.index == state.index)
                    break;
                state = result.remaining;
                result = p(state);
            }
            cached = jsparse.make_result(state, matched, ast);
        }
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that takes one parser. It returns a parser that
// matches zero or one matches of the original parser.
jsparse.optional = function optional(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        var r = p(state);
        cached = r || jsparse.make_result(state, "", false);
        savedState.putCached(pid, cached);
        return cached;
    }
}

// A parser combinator that ensures that the given parser succeeds but
// ignores its result. This can be useful for parsing literals that you
// don't want to appear in the ast. eg:
// sequence(expect("("), Number, expect(")")) => ast: Number
jsparse.expect = function expect(p) {
    return jsparse.action(p, function(ast) { return undefined; });
}

jsparse.chain = function chain(p, s, f) {
    var p = jsparse.toParser(p);

    return jsparse.action(jsparse.sequence(p, jsparse.repeat0(jsparse.action(jsparse.sequence(s, p), f))),
                  function(ast) { return [ast[0]].concat(ast[1]); });
}

// A parser combinator to do left chaining and evaluation. Like 'chain', it expects a parser
// for an item and for a seperator. The seperator parser's AST result should be a function
// of the form: function(lhs,rhs) { return x; }
// Where 'x' is the result of applying some operation to the lhs and rhs AST's from the item
// parser.
jsparse.chainl = function chainl(p, s) {
    var p = jsparse.toParser(p);
    return jsparse.action(jsparse.sequence(p, jsparse.repeat0(jsparse.sequence(s, p))),
                  function(ast) {
                      return jsparse.foldl(function(v, action) { return action[0](v, action[1]); }, ast[0], ast[1]);
                  });
}

// A parser combinator that returns a parser that matches lists of things. The parser to
// match the list item and the parser to match the seperator need to
// be provided. The AST is the array of matched items.
jsparse.list = function list(p, s) {
    return jsparse.chain(p, s, function(ast) { return ast[1]; });
}

// Like list, but ignores whitespace between individual parsers.
jsparse.wlist = function wlist() {
    var parsers = [];
    for(var i=0; i < arguments.length; ++i) {
        parsers.push(jsparse.whitespace(arguments[i]));
    }
    return jsparse.list.apply(null, parsers);
}

// A parser that always returns a zero length match
jsparse.epsilon_p = function epsilon_p(state) {
    return jsparse.make_result(state, "", undefined);
}

// Allows attaching of a function anywhere in the grammer. If the function returns
// true then parse succeeds otherwise it fails. Can be used for testing if a symbol
// is in the symbol table, etc.
jsparse.semantic = function semantic(f) {
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        cached = f() ? jsparse.make_result(state, "", undefined) : false;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// The and predicate asserts that a certain conditional
// syntax is satisfied before evaluating another production. Eg:
// sequence(and("0"), oct_p)
// (if a leading zero, then parse octal)
// It succeeds if 'p' succeeds and fails if 'p' fails. It never
// consume any input however, and doesn't put anything in the resulting
// AST.
jsparse.and = function and(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        var r = p(state);
        cached = r ? jsparse.make_result(state, "", undefined) : false;
        savedState.putCached(pid, cached);
        return cached;
    }
}

// The opposite of 'and'. It fails if 'p' succeeds and succeeds if
// 'p' fails. It never consumes any input. This combined with 'and' can
// be used for 'lookahead' and disambiguation of cases.
//
// Compare:
// sequence("a",choice("+","++"),"b")
//   parses a+b
//   but not a++b because the + matches the first part and peg's don't
//   backtrack to other choice options if they succeed but later things fail.
//
// sequence("a",choice(sequence("+", not("+")),"++"),"b")
//    parses a+b
//    parses a++b
//
jsparse.not = function not(p) {
    var p = jsparse.toParser(p);
    var pid = jsparse.parser_id++;
    return function(state) {
        var savedState = state;
        var cached = savedState.getCached(pid);
        if(cached)
            return cached;
        cached = p(state) ? false : jsparse.make_result(state, "", undefined);
        savedState.putCached(pid, cached);
        return cached;
    }
}


// For ease of use, it's sometimes nice to be able to not have to prefix all
// of the jsparse functions with `jsparse.` and since the original version of
// this library put everything in the toplevel namespace, this makes it easy
// to use this version with old code.
//
// The only caveat there is that changing `memoize` MUST be done on
// jsparse.memoize
//
// Typical usage:
//   jsparse.inject_into(window)
//
jsparse.inject_into = function inject_into(into) {
    for (var key in jsparse) {
        if (typeof jsparse[key] === 'function') {
            into[key] = jsparse[key];
        }
    }
}


},{}]},{},[5])(5)
});
