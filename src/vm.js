///// QUA
// Interpreter core
var vm = module.exports;
/* Symbols */
vm.Sym = function Sym(name, ns) {
    this.name = name;
    this.ns = ns;
};
vm.VAR_NS = "variable";
vm.FUN_NS = "function";
vm.TYPE_NS = "type";
vm.KWD_NS = "keyword";
vm.sym = function(name, ns) { var s = new vm.Sym(name, ns ? ns : vm.VAR_NS); return s; };
vm.sym_key = function(sym) { return sym.ns + ":" + sym.name; };
vm.sym_name = function(sym) { return vm.assert_type(sym, vm.Sym).name; };
vm.fun_sym = function(name) { return vm.sym(name, vm.FUN_NS); };
vm.type_sym = function(name) { return vm.sym(name, vm.TYPE_NS); };
vm.to_fun_sym = function(sym) { return vm.fun_sym(vm.assert_type(sym, vm.Sym).name); };
vm.to_type_sym = function(sym) { return vm.type_sym(vm.assert_type(sym, vm.Sym).name); };
vm.keyword = function(name) { return vm.sym(name, vm.KWD_NS); };
/* Lists */
vm.Cons = function Cons(car, cdr) {
    this.car = car;
    this.cdr = cdr;
};
vm.Nil = function Nil() {}; vm.NIL = new vm.Nil();
vm.cons = function cons(car, cdr) { var c = new vm.Cons(car, cdr); return c; }
vm.car = function(cons) { return vm.assert_type(cons, vm.Cons).car; };
vm.cdr = function(cons) { return vm.assert_type(cons, vm.Cons).cdr; };
vm.elt = function(cons, i) { return (i === 0) ? vm.car(cons) : vm.elt(vm.cdr(cons), i - 1); };
vm.is_nil = function(obj) { return obj === vm.NIL; };
/* Add'l forms */
vm.Ign = function Ign() {}; vm.IGN = new vm.Ign();
vm.Void = function Void() {}; vm.VOID = new vm.Void();
vm.Any = function Any() {}; vm.ANY = new vm.Any();
/* Evaluation */
vm.evaluate = function(e, x) {
    if (x && x.qua_evaluate) {
        return vm.trap_exceptions(function() { return x.qua_evaluate(x, e); });
    } else {
        return x;
    }
};
vm.Sym.prototype.qua_evaluate = function(self, e) {
    if (self.ns === vm.KWD_NS) {
	return self;
    } else {
	return vm.lookup(e, self);
    }
};
vm.Cons.prototype.qua_evaluate = function(self, e) {
    return vm.monadic(function() { return vm.eval_operator(e, vm.car(self)); },
                      function(cmb) { return vm.combine(e, cmb, vm.cdr(self)); },
		      dbg_info(e, self));
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
    } else if (cmb instanceof Function) {
	// make JS functions transparently usable like Lisp functions
	return vm.combine(e, vm.jswrap(cmb), o);
    } else {
        return vm.error("not a combiner: " + cmb);
    }
};
vm.Fexpr = function Fexpr(p, ep, x, e) {
    this.p = p;   // Parameter tree
    this.ep = ep; // Environment parameter
    this.x = x;   // Body expression
    this.e = e;   // Lexical definition environment
};
vm.Function = function(cmb) { this.cmb = cmb; };
vm.wrap = function(cmb) { return new vm.Function(cmb); };
vm.unwrap = function(fun) { return fun.cmb; };
vm.Fexpr.prototype.qua_combine = function(self, e, o) {
    var xe = vm.make_env(self.e);
    return vm.monadic(function() { return vm.bind(xe, self.p, o); },
                      function() {
                          return vm.monadic(function() { return vm.bind(xe, self.ep, e); },
                                            function() { return vm.evaluate(xe, self.x); },
					    dbg_info(e, self.x));
		      },
		      dbg_info(e, self));
};
vm.Function.prototype.qua_combine = function(self, e, o) {
    return vm.monadic(function() { return vm.eval_args(e, o, vm.NIL); },
                      function(args) { return vm.combine(e, self.cmb, args); },
		      dbg_info(e, self));
};
vm.eval_args = function(e, todo, done) {
    if (vm.is_nil(todo)) { return vm.reverse_list(done); }
    return vm.monadic(function() { return vm.evaluate(e, vm.car(todo)); },
                      function(arg) {
			  return vm.eval_args(e, vm.cdr(todo), vm.cons(arg, done));
		      },
                      dbg_info(e, vm.car(todo)));
};
/* Built-in combiners */
vm.Prim = function Prim(name, fn) {
    this.name = name;
    this.qua_combine = fn;
};
vm.prim = function(name, fn) { return new vm.Prim(name, fn); }
vm.Vau = vm.prim("%%vau", function(self, e, o) {
    var p = vm.elt(o, 0);
    var ep = vm.elt(o, 1);
    var x = vm.elt(o, 2);
    return new vm.Fexpr(p, ep, x, e);
});
vm.Def = vm.prim("%%def", function (self, e, o) {
    var lhs = vm.elt(o, 0);
    var rhs = vm.elt(o, 1);
    return vm.monadic(function() { return vm.evaluate(e, rhs); },
                      function(val) { return vm.bind(e, lhs, val, vm.do_def); },
		      dbg_info(e, self));
});
vm.Setq = vm.prim("%%setq", function (self, e, o) {
    var lhs = vm.elt(o, 0);
    var rhs = vm.elt(o, 1);
    return vm.monadic(function() { return vm.evaluate(e, rhs); },
                      function(val) { return vm.bind(e, lhs, val, vm.do_setq); },
		      dbg_info(e, self));
});
vm.Eval = vm.wrap(vm.prim("%%eval", function(self, e, o) {
    var x = vm.elt(o, 0);
    var e = vm.elt(o, 1);
    return vm.evaluate(e, x);
}));
vm.If = vm.prim("%%if", function(self, e, o) {
    return vm.monadic(function() { return vm.evaluate(e, vm.elt(o, 0)); },
                      function(test_result) {
                          return vm.evaluate(e, test_result ? vm.elt(o, 1) : vm.elt(o, 2));
                      },
		      dbg_info(e, self));
});
vm.Progn = vm.prim("%%progn", function(self, e, o) {
    if (vm.is_nil(o)) return vm.VOID; else return vm.progn(e, o);
});
vm.progn = function(e, xs) {
    return vm.monadic(function() { return vm.evaluate(e, vm.car(xs)); },
                      function(res) {
                          var cdr = vm.cdr(xs);
                          if (vm.is_nil(cdr)) return res; else return vm.progn(e, cdr);
                      },
		      dbg_info(e, vm.car(xs)));
};
/* Operator that calls JS function to do work */
vm.JSOperator = function(js_fn) { this.js_fn = js_fn; };
vm.JSOperator.prototype.qua_combine = function(self, e, o) {
    return vm.trap_exceptions(function() {
        return self.js_fn.apply(null, vm.list_to_array(o));
    });
};
vm.jswrap = function(js_fn) {
    if (typeof(js_fn) !== "function") { vm.error("not a function"); }
    return vm.wrap(new vm.JSOperator(js_fn)); };
/* Continuations */
// A continuation or stack frame is created in order to suspend
// (capture) a computation so that we can treat it as a data
// structure, and later resume (compose) it again and turn it back
// into control flow.  A stack frame consists of a work function, that
// restores the stack frame on resumption which is specially created
// by each distinct language primitive, and an inner suspended stack
// frame.  The innermost stack frame is always the one created by the
// %%TAKE-SUBCONT expression that effected the continuation capture.
function StackFrame(work_fun, inner, dbg_info) {
    // primitive-specific JS function that will be called to resume this frame
    this.work_fun = work_fun;
    // next stack frame or null for innermost %%TAKE-SUBCONT frame
    this.inner = inner;
    // attach some debugging info to this frame (not needed operationally)
    this.dbg_info = dbg_info;
};
function DbgInfo(env, expr) {
    this.env = env;   // lexical environment of stack frame
    this.expr = expr; // source form
};
function dbg_info(env, expr) { return new DbgInfo(env, expr); }
// A suspension is a helper object created for the capture of a
// continuation and passed from the inside out.  A %%TAKE-SUBCONT
// call will return a fresh suspension, and the outer caller will
// react specially to receiving such a suspension from the callee
// instead of an ordinary return value -- usually by pushing a
// stack frame with a primitive-specific work function onto the
// suspension, and itself returning the suspension to its caller.
// In other words, every language primitive knows how to reify
// itself as a (later resumable) stack frame in case an inner
// expression is suspended.  Eventually, the outer %%PUSH-PROMPT
// expression whose prompt matches the suspension's will call the
// suspension's handler function (i.e., the Lisp function supplied
// by the user to %%TAKE-SUBCONT that gets to determine what
// happens once we reach the prompt) with the continuation
// accumulated during the capture.
function Suspension(prompt, handler) {
    // capture up to this prompt (EQ)
    this.prompt = prompt;
    // call this handler with captured continuation once we reach prompt
    this.handler = handler;
    // continuation / outermost stack frame accumulated during unwind/capture
    this.k = null;
};
// During continuation capture, destructively push a new outer
// stack frame with a primitive-specific work function onto a
// suspension's continuation.
function suspendFrame(sus, work_fun, dbg_info) {
    sus.k = new StackFrame(work_fun, sus.k, dbg_info);
};
// During continuation resumption, call the primitive-specific
// work function of the outermost stack frame with the next inner
// frame, and the user-supplied "stimulus" function (F).  The next
// inner frame will do the same, until we reach the innermost
// stack frame, created by a %%TAKE-SUBCONT expression.  This
// innermost frame will call the stimulus function within the
// newly composed context and return its value, giving the user
// control over what happens once a continuation has been composed
// onto the current stack.
function resumeFrame(k, f) {
    return k.work_fun(k.inner, f);
};
// vm.monadic() is a basic building block for many language primitives
// that need to do two or more operations that may capture a
// continuation in sequence.  Examples are PROGN that needs to
// evaluate the first and then the rest of its body expressions, and
// IF that needs to evaluate the test expression before evaluating
// either the then or the else expression depending on the result of
// the test.  Looking at vm.monadic in details is instructive because
// it shows in a pure form the general protocol that language
// primitives have to honor in order to the able to suspend and resume
// themselves.  (Primitives like %%PUSH-PROMPT and %%RESCUE with more
// complex control flow requirements cannot use vm.monadic but follow
// this same protocol.)
//
// So, we have two thunks, A and B, that we want to call so that B
// receives the result of A(), i.e. B(A()).  We also have the two
// protocol parameters K (continuation, outermost stack frame) and
// F (stimulus function) which are only relevant and passed in if
// we are resuming a continuation.  (If we are not resuming they
// are undefined.)
vm.monadic = function(a, b, dbg_info, k, f) {
    // Caller passed in continuation?  This means we are resuming.
    // In other words, a previous call to A() led to a suspension
    // which we returned, and now the caller is passing in the
    // then-captured continuation again for resumption via
    // resumeFrame(k, f).
    if (k instanceof StackFrame) {
        // Resume into inner stack frames until exhausted, calling
        // stimulus function F in innermost context.  Here we are
        // reconstructing the control state of our previously
        // suspended inner expression A, ultimately giving control
        // to the caller as to what happens once the continuation
        // has been fully composed again onto the current stack.
        var val = resumeFrame(k, f);
    } else {
        // Otherwise, we are just normally executing,
        // so execute first expression/thunk.
        var val = a();
    }
    // Did the first expression suspend (lead to a %%TAKE-SUBCONT)?
    if (val instanceof Suspension) {
        // If it did, we suspend ourselves -- i.e. push an outer
        // stack frame onto to the already accumulated
        // continuation whose work function remembers what we were
        // doing prior to suspension and will restore us back to
        // this point when resumed.
	//
	// The work function closure remembers our parameters A
	// and B, and in effect will repeat the original, current
	// call to vm.monadic when the captured continuation is
	// resumed at a future point.
	var work_fun = function(k, f) {
	    return vm.monadic(a, b, dbg_info, k, f);
	};
        suspendFrame(val, work_fun, dbg_info);
        // Pass suspension back to caller.
        return val;
    } else {
        // First expression didn't suspend, we can just pass its
        // result to second expression.
        return b(val);
    }
};
/* Delimited control */
// %%PUSH-PROMPT prompt body-thunk => result
//
// Push a prompt and call the body thunk within this delimited
// context.
vm.PushPrompt = vm.wrap(vm.prim("%%push-prompt", function do_push_prompt(self, e, o, k, f) {
    var prompt = vm.elt(o, 0);
    var body_thunk = vm.elt(o, 1);
    if (k instanceof StackFrame) {
        var val = resumeFrame(k, f);
    } else {
        var val = vm.combine(e, body_thunk, vm.NIL);
    }
    if (val instanceof Suspension) {
	// Analyze the result of the body thunk and if it's a suspension,
	// check if it matches our, the pushed, prompt.  If it matches,
	// call the suspension's user-supplied handler function with the
	// continuation accumulated during the unwind from the originating
	// inner %%TAKE-SUBCONT.
        if (val.prompt === prompt) {
            var continuation = val.k;
            var handler = val.handler;
            return vm.combine(e, handler, vm.cons(continuation, vm.NIL));
        } else {
            suspendFrame(
		val,
		function(k, f) {
		    return do_push_prompt(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return val;
        }
    }
    return val;
}));
// %%TAKE-SUBCONT prompt handler
//
// Abort up to prompt and call handler with captured continuation.
vm.TakeSubcont = vm.wrap(vm.prim("%%take-subcont", function(self, e, o, k, f) {
    var prompt = vm.elt(o, 0);
    var handler = vm.elt(o, 1);
    // Inject a suspension that will lead to the call of the
    // user-supplied handler at the outer %%PUSH-PROMPT with matching
    // prompt.  The innermost stack frame's work function we define
    // will call the protocol parameter F, the user-supplied stimulus
    // function passed in during continuation resumption/composition,
    // thereby completing resumption and entering back into normal
    // evaluation.
    var sus = new Suspension(prompt, handler);
    suspendFrame(
	sus,
	function(k, f) {
	    // As final step of continuation resumption, call
	    // user-supplied stimulus function in innermost context.
	    return vm.combine(e, f, vm.NIL);
	},
	dbg_info(e, self)
    );
    return sus;
}));
// %%PUSH-SUBCONT k f
//
// Compose a delimited continuation onto the current stack and when
// done, call user-supplied thunk inside new context.
vm.PushSubcont = vm.wrap(vm.prim("%%push-subcont", function do_push_subcont(self, e, o, k, f) {
    var thek = vm.elt(o, 0);
    var thef = vm.elt(o, 1);
    if (k instanceof StackFrame) {
        var val = resumeFrame(k, f);
    } else {
	// Resume into a user-supplied continuation, calling the
	// "stimulus" thunk F within the newly established stack
	// context (this is accomplished by the innermost stack
	// frame's work function defined by %%TAKE-SUBCONT, which
	// ultimately calls the passed-in F).
        var val = resumeFrame(thek, thef);
    }
    if (val instanceof Suspension) {
        suspendFrame(
	    val,
	    function(k, f) {
		return do_push_subcont(self, e, o, k, f);
	    },
	    dbg_info(e, self)
	);
        return val;
    }
    return val;
}));
// %%PUSH-PROMPT-SUBCONT prompt k f
//
// Manually fused version of pushing a prompt and continuation in
// one fell swoop, to work around stack overflow issue for
// server-type apps, see Oleg's paper.
vm.PushPromptSubcont = vm.wrap(vm.prim("%%push-prompt-subcont", function do_push_prompt_subcont(self, e, o, k, f) {
    var prompt = vm.elt(o, 0);
    var thek = vm.elt(o, 1);
    var thef = vm.elt(o, 2);
    if (k instanceof StackFrame) {
        var val = resumeFrame(k, f);
    } else {
        var val = resumeFrame(thek, thef);
    }
    if (val instanceof Suspension) {
        if (val.prompt === prompt) {
            var continuation = val.k;
            var handler = val.handler;
            return vm.combine(e, handler, vm.cons(continuation, vm.NIL));
        } else {
            suspendFrame(
		val,
		function(k, f) {
		    return do_push_prompt_subcont(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return val;
        }
    }
    return val;
}));
/* Simple control */
// %%LOOP body
//
// Evaluate the body expression repeatedly.
vm.Loop = vm.prim("%%loop", function do_loop(self, e, o, k, f) {
    var body = vm.elt(o, 0);
    var first = true; // only resume once
    while (true) {
        if (first && (k instanceof StackFrame)) {
            var val = resumeFrame(k, f);
        } else {
            var val = vm.evaluate(e, body);
        }
        first = false;
        if (val instanceof Suspension) {
            suspendFrame(
		val,
		function(k, f) {
		    return do_loop(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return val;
        }
    }
});
// %%RAISE obj
//
// Throw something as a JS exception.
vm.Raise = vm.jswrap(function(err) { throw err; });
// %%RESCUE handler-fun body-thunk
//
// Call HANDLER-FUN if a JS exception is thrown during BODY-THUNK
// (except VM panics, let those through so that user can't
// interfere with panicking).
vm.Rescue = vm.wrap(vm.prim("%%rescue", function do_rescue(self, e, o, k, f) {
    var handler = vm.elt(o, 0);
    var body = vm.elt(o, 1);
    try {
        if (k instanceof StackFrame) {
            var val = resumeFrame(k, f);
        } else {
            var val = vm.combine(e, body, vm.NIL);
        }
    } catch(exc) {
        if (exc instanceof vm.Panic) {
            throw exc;
        } else {
            var val = vm.combine(e, vm.unwrap(handler), vm.list(exc));
        }
    }
    if (val instanceof Suspension) {
        suspendFrame(
	    val,
	    function(k, f) {
		return do_rescue(self, e, o, k, f);
	    },
	    dbg_info(e, self)
	);
        return val;
    }
    return val;
}));
/* Continuation Barriers */
// %%CONTINUATION-BARRIER expr
//
// Evaluate an expression and prevent it from capturing continuations
// to prompts outside of the barrier.
vm.ContinuationBarrier = vm.prim("%%continuation-barrier", function(self, e, o, k, f) {
    var x = vm.elt(o, 0);
    var res = vm.evaluate(e, x);
    if (res instanceof Suspension) {
        // Could do better here: instead of panicking, signal a
        // condition.  But this might have weird interactions with the
        // debugger and/or condition system.
        vm.panic("Continuation attemped to escape. Forgot to push a prompt?");
    } else {
        return res;
    }
});
/* Dynamic Variables */
vm.DV = function DV(value) { this.val = value; }
vm.make_dynamic = function(initial_value) {
    return new vm.DV(initial_value);
};
vm.dynamic = function(dv) { return vm.assert_type(dv, vm.DV).val; };
// %%PROGV dynvar new-val body-thunk
//
// Bind a single dynamic variable to a new value during the
// execution of a body thunk.
vm.Progv = vm.wrap(vm.prim("%%progv", function dynamic_bind(self, e, o, k, f) {
    var dynvar = vm.elt(o, 0);
    var val = vm.elt(o, 1);
    var thunk = vm.elt(o, 2);
    var oldVal = dynvar.val;
    dynvar.val = val;
    try {
        if (k instanceof StackFrame) {
            var res = resumeFrame(k, f);
        } else {
            var res = vm.combine(e, thunk, vm.NIL);
        }
        if (res instanceof Suspension) {
            suspendFrame(
		res,
		function(k, f) {
		    return dynamic_bind(self, e, o, k, f);
		},
		dbg_info(e, self)
	    );
            return res;
        } else {
            return res;
        }
    } finally {
        dynvar.val = oldVal;
    }
}));
/* Environments */
vm.Env = function Env(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
    this.parent = parent;
};
vm.make_env = function(parent) { return new vm.Env(parent); };
vm.lookup = function(e, sym, default_val) {
    vm.assert_type(e, vm.Env);
    vm.assert_type(sym, vm.Sym);
    var key = vm.sym_key(sym);
    if (key in e.bindings) return e.bindings[key];
    else if (default_val !== undefined) return default_val;
    else return vm.error("unbound " + sym.ns + ": " + sym.name);
};
vm.bind = function(e, lhs, rhs, doit) {
    vm.assert_type(e, vm.Env);
    if (lhs.qua_bind) return lhs.qua_bind(lhs, e, rhs, doit ? doit : vm.do_def);
    else return vm.error("cannot match", { lhs: lhs, rhs: rhs });
};
vm.do_def = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    e.bindings[vm.sym_key(lhs)] = rhs;
    return rhs;
};
vm.do_setq = function(e, lhs, rhs) {
    vm.assert_type(lhs, vm.Sym);
    if (vm.has_own_property(e.bindings, vm.sym_key(lhs)))
        return vm.do_def(e, lhs, rhs);
    else if (e.parent)
        return vm.do_setq(e.parent, lhs, rhs);
    else
        return vm.error("cannot set unbound variable: " + vm.sym_key(lhs));
};
vm.Sym.prototype.qua_bind = function(self, e, rhs, doit) {
    if (self.ns === vm.KWD_NS) {
	if (!(rhs && (rhs.ns === vm.KWD_NS) && (rhs.name === self.name))) {
            return vm.error(":" + self.name + " expected, but got: " + JSON.stringify(rhs));
	}
    } else {
	return doit(e, self, rhs);
    }
};
vm.Cons.prototype.qua_bind = function(self, e, rhs, doit) {
    return vm.monadic(function() { return vm.bind(e, vm.car(self), vm.car(rhs), doit); },
		      function() { return vm.bind(e, vm.cdr(self), vm.cdr(rhs), doit); },
		      dbg_info(e, self));
};
vm.Nil.prototype.qua_bind = function(self, e, rhs, doit) {
    if (!vm.is_nil(rhs)) return vm.error("NIL expected, but got: " + JSON.stringify(rhs));
};
vm.Ign.prototype.qua_bind = function(self, e, rhs, doit) {};
/* Object model */
vm.mangle_name = function(name) {
    return name.replace(/-/g, "_").replace(/%/g, "P");
};
vm.make_class = function(metaclass, name) {
    var c = eval("(function Qua_" + vm.mangle_name(name) + "(){})");
    c.qua_isa = metaclass;
    c.name = name;
    c.methods = Object.create(null);
    return c;
};
vm.allocate_instance = function(c) {
    var obj = new c();
    obj.qua_isa = c;
    return obj;
};
vm.make_instance = function(c, initargs) {
    var obj = vm.allocate_instance(c);
    for (name in initargs) {
        var value = initargs[name];
        obj[name] = value;
    }
    return obj;
};
vm.class_of = function(obj) {
    if (obj && obj.qua_isa) {
	return obj.qua_isa;
    } else {
	// generate pseudo-classes for JS built-ins
	return vm.synthetic_class_of(obj);
    }
};
vm.put_method = function(c, name, method) {
    c.methods[name] = method;
};
vm.send_message = function(rcv, msg, args) { // args has to include rcv as first elt
    // The use of vm.monadic here is probably a hint that this should
    // be implemented in Lisp.
    return vm.monadic(
	function() {
	    var c = vm.class_of(rcv);
	    var metaclass = vm.class_of(c);
	    if (metaclass === vm.STR_CLS) {
		return vm.builtin_lookup(rcv, msg);
	    } else {
		return vm.send_message(c, "compute-method",
				       vm.list(c, rcv, msg, args));
	    }
	},
	function(method) {
	    return vm.combine(vm.make_env(), vm.unwrap(method), args);
	}
    );
};
vm.builtin_lookup = function(rcv, msg) {
    vm.assert_type(msg, "string");
    var c = vm.class_of(rcv);
    if (c.methods[msg]) {
	return c.methods[msg];
    } else if (vm.OBJ.methods[msg]) {
	return vm.OBJ.methods[msg];
    } else {
	return vm.error("builtin lookup failed: " + msg);
    }
};
/* Slots */
vm.slot_key = function(name) { return name; };
vm.slot_value = function(obj, name) {
    var key = vm.slot_key(name);
    if (vm.has_own_property(obj, key)) {
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
    return vm.has_own_property(obj, name);
};
vm.slot_unbound_hook = function(obj, name) {
    return vm.error("slot unbound: " + name);
};
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
vm.list_star = function() {
    var len = arguments.length; var c = len >= 1 ? arguments[len-1] : vm.NIL;
    for (var i = len-1; i > 0; i--) c = vm.cons(arguments[i - 1], c); return c;
};
vm.plist_to_js_object = function(plist, obj) {
    obj = (obj !== undefined) ? obj : {};
    if (plist === vm.NIL) {
        return obj;
    } else {
        var name = vm.assert_type(vm.elt(plist, 0), vm.Sym);
        var value = vm.elt(plist, 1);
        obj[name.name] = value;
        return vm.plist_to_js_object(vm.cdr(vm.cdr(plist)), obj);
    }
};
/* Exception handling and nonlocal exits */
// Instances of this class are thrown as JS exceptions to transfer a
// value from a RETURN-FROM expression to its enclosing BLOCK.
vm.Tag = function Tag(id, val) {
    this.id = id;
    this.val = val;
};
vm.trap_exceptions = function(thunk) {
    try {
        return thunk();
    } catch(exc) {
        if ((exc.qua_isa === vm.Tag) || (exc instanceof vm.Panic)) {
            // let nonlocal exits and panics through
            throw exc;
        } else {
            // pipe all other evaluation exceptions into condition system
            return vm.error(exc);
        }
    }
};
vm.Panic = function Panic(exc) {
    vm.assert_type(exc, Error);
    this.exc = exc;
};
vm.Panic.prototype.toString = function() {
    return this.exc.stack;
};
vm.error = function(err) {
    // Call into user ERROR handler if defined...
    if (vm.init_env) {
	var error = vm.lookup(vm.init_env, vm.fun_sym("error"), false);
	if (error) {
            return vm.combine(vm.make_env(), error, vm.list(err));
	}
    }
    // ...otherwise panic.
    console.log("Panic at boot");
    vm.panic(err);
};
// Unconditionally abort up to the next exception handler outside
// of the VM.  Bypasses any intervening %%RESCUE handlers to
// prevent user code from interfering with the unwinding.
vm.panic = function(err) {
    console.log("vm.panic:", err);
    err = (err instanceof Error) ? err : new Error(err);
    throw new vm.Panic(err);
};
/* Util Dumping Ground */
vm.has_own_property = function(obj, name) {
    return obj && Object.prototype.hasOwnProperty.call(obj, name); // WHY?
};
vm.assert_type = function(obj, type_spec) {
    if (vm.check_type(obj, type_spec)) return obj;
    else {
	return vm.error("type error: " + obj + " should be " + type_spec + " but is " + obj);
    }
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
vm.time = function(name, fun) {
    var start = new Date().getTime();
    fun();
    var end = new Date().getTime();
    var time = end - start;
    console.log(name + ": "  + time + "ms");
};
/* JS Native Interface */
// Returns a JS function that, when called, calls the given Lisp
// operator with `this' and the arguments passed to the function.
vm.js_function = function(cmb) {
    return function() {
        var args = vm.array_to_list(Array.prototype.slice.call(arguments));
        return vm.combine(vm.make_env(), cmb, vm.cons(this, args));
    };
};
// Detect JS built-in types and make them appear to object system
// as objects with (pseudo) Lisp classes.
vm.synthetic_class_of = function(obj) {
    switch (typeof(obj)) {
    case "string": return vm.JSString;
    case "number": return vm.JSNumber;
    case "boolean": return vm.JSBoolean;
    case "function": return vm.JSFunction;
    case "undefined": return vm.JSUndefined;
    default:
        if (obj === null) {
            return vm.JSNull;
        } else if (Array.isArray(obj)) {
            return vm.JSArray;
        } else {
            return vm.JSObject;
        }
    }
};
// Applies JS function.
vm.js_apply = function(fun, thiz, args) { return fun.apply(thiz, args); };
// Creates a Lisp operator whose body executes a JS binary operator.
vm.js_binop = function(op) {
    return vm.jswrap(new Function("a", "b", "return (a " + op + " b)")); };
// Reads a JS property, implementation of `.some_property' syntax.
vm.js_get = function(obj, name) { return obj[name]; };
// Reads a JS global variable, implementation of the `$some_global' syntax.
vm.js_global = function(name) { return global[name]; }; // from Browserify
// Creates a new JS object with a given constructor.
vm.js_new = function(ctor) {
    var factoryFunction = ctor.bind.apply(ctor, arguments);
    return new factoryFunction(); }
// Writes a JS property, implementation of `(setf (.property_name ...) ...)'.
vm.js_set = function(obj, name, val) { return obj[name] = val; };
/* API */
vm.def = function(e, name, val) { vm.bind(e, vm.sym(name), val); };
vm.defun = function(e, name, cmb) { vm.assert(cmb); vm.bind(e, vm.fun_sym(name), cmb); };
vm.deftype = function(e, name, type) { vm.assert(type); vm.bind(e, vm.type_sym(name), type); };
// Populates a fresh init environment with the VM primitives.
vm.init = function() {
    vm.init_env = vm.make_env();
    // Bootstrap object model
    vm.STR_CLS = vm.make_class(null, "structure-class");
    vm.STR_CLS.qua_isa = vm.STR_CLS;
    vm.OBJ = vm.make_class(vm.STR_CLS, "object");
    vm.deftype(vm.init_env, "object", vm.OBJ);
    vm.deftype(vm.init_env, "structure-class", vm.STR_CLS);
    // Bless built-in types as Lisp types
    function define_builtin_type(type, name) {
	type.qua_isa = vm.STR_CLS;
	type.name = name;
        type.class_name = name;
	type.methods = Object.create(null);
	type.prototype.qua_isa = type;
	vm.deftype(vm.init_env, name, type);
    }
    define_builtin_type(vm.Cons, "cons");
    define_builtin_type(vm.DV, "dynamic");
    define_builtin_type(vm.Env, "environment");
    define_builtin_type(vm.Fexpr, "fexpr");
    define_builtin_type(vm.Function, "function");
    define_builtin_type(vm.Ign, "ignore");
    define_builtin_type(vm.JSOperator, "js-operator");
    define_builtin_type(vm.Nil, "nil");
    define_builtin_type(vm.Prim, "built-in");
    define_builtin_type(vm.Sym, "symbol");
    define_builtin_type(vm.Tag, "%%tag");
    define_builtin_type(vm.Void, "void");
    define_builtin_type(vm.Any, "any");
    define_builtin_type(StackFrame, "continuation");
    // Synthetic/virtual classes given to JS built-in objects, so we
    // can define methods on them.
    function define_js_type(name) {
	var c = vm.make_class(vm.STR_CLS, name);
	vm.deftype(vm.init_env, name, c);
	return c;
    }
    vm.JSObject = define_js_type("js-object");
    vm.JSArray = define_js_type("js-array");
    vm.JSFunction = define_js_type("js-function");
    vm.JSBoolean = define_js_type("boolean");
    vm.JSNumber = define_js_type("number");
    vm.JSString = define_js_type("string");
    vm.JSNull = define_js_type("js-null");
    vm.JSUndefined = define_js_type("js-undefined");
    // Forms
    vm.defun(vm.init_env, "%%car", vm.jswrap(vm.car));
    vm.defun(vm.init_env, "%%cdr", vm.jswrap(vm.cdr));
    vm.defun(vm.init_env, "%%cons", vm.jswrap(vm.cons));
    vm.defun(vm.init_env, "%%make-symbol", vm.jswrap(vm.sym));
    vm.defun(vm.init_env, "%%to-fun-sym", vm.jswrap(vm.to_fun_sym));
    vm.defun(vm.init_env, "%%to-type-sym", vm.jswrap(vm.to_type_sym));
    // Combiners & environments
    vm.defun(vm.init_env, "%%make-environment", vm.jswrap(vm.make_env));
    vm.defun(vm.init_env, "%%unwrap", vm.jswrap(vm.unwrap));
    vm.defun(vm.init_env, "%%vau", vm.Vau);
    vm.defun(vm.init_env, "%%wrap", vm.jswrap(vm.wrap));
    // Evaluation
    vm.defun(vm.init_env, "%%def", vm.Def);
    vm.defun(vm.init_env, "%%eval", vm.Eval);
    vm.defun(vm.init_env, "%%if", vm.If);
    vm.defun(vm.init_env, "%%loop", vm.Loop);
    vm.defun(vm.init_env, "%%progn", vm.Progn);
    vm.defun(vm.init_env, "%%raise", vm.Raise);
    vm.defun(vm.init_env, "%%rescue", vm.Rescue);
    vm.defun(vm.init_env, "%%setq", vm.Setq);
    // Dynamic variables
    vm.defun(vm.init_env, "%%dynamic", vm.jswrap(vm.dynamic));
    vm.defun(vm.init_env, "%%make-dynamic", vm.jswrap(vm.make_dynamic));
    vm.defun(vm.init_env, "%%progv", vm.Progv);
    // Continuations
    vm.defun(vm.init_env, "%%push-prompt", vm.PushPrompt);
    vm.defun(vm.init_env, "%%push-prompt-subcont", vm.PushPromptSubcont);
    vm.defun(vm.init_env, "%%push-subcont", vm.PushSubcont);
    vm.defun(vm.init_env, "%%take-subcont", vm.TakeSubcont);
    vm.defun(vm.init_env, "%%continuation-barrier", vm.ContinuationBarrier);
    // Object system
    vm.defun(vm.init_env, "%%class-of", vm.jswrap(vm.class_of));
    vm.defun(vm.init_env, "%%make-class", vm.jswrap(vm.make_class));
    vm.defun(vm.init_env, "%%make-instance", vm.jswrap(vm.make_instance));
    vm.defun(vm.init_env, "%%put-method", vm.jswrap(vm.put_method));
    vm.defun(vm.init_env, "%%send-message", vm.jswrap(vm.send_message));
    vm.defun(vm.init_env, "%%set-slot-value", vm.jswrap(vm.set_slot_value));
    vm.defun(vm.init_env, "%%slot-bound?", vm.jswrap(vm.slot_bound_p));
    vm.defun(vm.init_env, "%%slot-value", vm.jswrap(vm.slot_value));
    // JSNI
    vm.defun(vm.init_env, "%%js-apply", vm.jswrap(vm.js_apply));
    vm.defun(vm.init_env, "%%js-binop", vm.jswrap(vm.js_binop));
    vm.defun(vm.init_env, "%%js-function", vm.jswrap(vm.js_function));
    vm.defun(vm.init_env, "%%js-get", vm.jswrap(vm.js_get));
    vm.defun(vm.init_env, "%%js-global", vm.jswrap(vm.js_global));
    vm.defun(vm.init_env, "%%js-new", vm.jswrap(vm.js_new));
    vm.defun(vm.init_env, "%%js-set", vm.jswrap(vm.js_set));
    vm.defun(vm.init_env, "%%own-property?", vm.jswrap(vm.has_own_property));
    // Misc
    vm.defun(vm.init_env, "%%eq", vm.jswrap(function(a, b) { return a === b; }));
    vm.defun(vm.init_env, "%%panic", vm.jswrap(vm.panic));
    vm.defun(vm.init_env, "%%print", vm.jswrap(console.log));
    // List optims
    vm.defun(vm.init_env, "%%list*", vm.jswrap(vm.list_star));
    vm.defun(vm.init_env, "%%list-to-array", vm.jswrap(vm.list_to_array));
    vm.defun(vm.init_env, "%%array-to-list", vm.jswrap(vm.array_to_list));
    vm.defun(vm.init_env, "%%plist-to-js-object", vm.jswrap(vm.plist_to_js_object));
    vm.defun(vm.init_env, "%%reverse-list", vm.jswrap(vm.reverse_list));
};
