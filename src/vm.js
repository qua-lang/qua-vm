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
vm.sym = function(name, ns) { var s = new vm.Sym(name, ns ? ns : vm.VAR_NS); return s; };
vm.fun_sym = function(name) { return vm.sym(name, vm.FUN_NS); };
vm.type_sym = function(name) { return vm.sym(name, vm.TYPE_NS); };
vm.sym_key = function(sym) { return sym.ns + ":" + sym.name; };
vm.sym_name = function(sym) { return vm.assert_type(sym, vm.Sym).name; };
vm.to_fun_sym = function(sym) { return vm.fun_sym(vm.assert_type(sym, vm.Sym).name); };
vm.to_type_sym = function(sym) { return vm.type_sym(vm.assert_type(sym, vm.Sym).name); };
/* Keywords */
vm.Keyword = function Keyword(name) {
    this.name = name;
};
vm.keyword = function(name) { return new vm.Keyword(name); };
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
/* Evaluation */
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
    } else if (cmb instanceof Function) {
	return vm.combine(e, vm.jswrap(cmb), o);
    } else {
        return vm.error("not a combiner: " + cmb, e);
    }
};
vm.Opv = function Opv(p, ep, x, e) {
    this.p = p;   // Parameter tree
    this.ep = ep; // Environment parameter
    this.x = x;   // Body expression
    this.e = e;   // Lexical definition environment
};
vm.Apv = function(cmb) { this.cmb = cmb; };
vm.wrap = function(cmb) { return new vm.Apv(cmb); };
vm.unwrap = function(apv) { return apv.cmb; };
vm.Opv.prototype.qua_combine = function(self, e, o) {
    var xe = vm.make_env(self.e);
    return vm.monadic(function() { return vm.bind(xe, self.p, o); },
                      function() {
                          return vm.monadic(function() { return vm.bind(xe, self.ep, e); },
                                            function() { return vm.evaluate(xe, self.x); }); });
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
// A continuation or stack frame is created in order to freeze
// (suspend, capture) a computation so that we can treat it as a
// data structure, and later resume it again and turn it back into
// control flow.  A stack frame consists of a work function that
// "does something" which is specially created by each distinct
// language primitive, and an inner suspended stack frame.  The
// innermost stack frame is always the one created by the
// %%TAKE-SUBCONT expression that effected the continuation
// capture.  (For this innermost stack frame, .inner is null.)
function StackFrame(work_fun, inner) {
    // primitive-specific JS function
    this.work_fun = work_fun;
    // next stack frame or null for innermost %%TAKE-SUBCONT frame
    this.inner = inner;
};
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
function suspendFrame(sus, work_fun) {
    sus.k = new StackFrame(work_fun, sus.k);
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
// vm.monadic() is a basic building block for many language
// primitives that need to do two or more operations that may
// capture a continuation in sequence.  Examples are PROGN that
// needs to evaluate the first and then the rest of its body
// expressions, and IF that needs to evaluate the test expression
// before evaluating either the then or the else expression
// depending on the result of the test.  Looking at vm.monadic in
// details is instructive because it shows in a pure form the
// general protocol that language primitives have to honor in
// order to the able to suspend and resume themselves.
// (Primitives like %%RESCUE with more complex control flow
// requirements cannot use vm.monadic but follow this same
// protocol.)
//
// So, we have two thunks, A and B, that we want to call so that B
// receives the result of A(), i.e. B(A()).  We also have the two
// protocol parameters K (continuation, outermost stack frame) and
// F (stimulus function) which are only relevant and passed in if
// we are resuming a continuation.  (If we are not resuming they
// are undefined.)
vm.monadic = function(a, b, k, f) {
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
	    return vm.monadic(a, b, k, f);
	};
        suspendFrame(val, work_fun);
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
// 
// Analyze the result of the body thunk and if it's a suspension,
// check if it matches our, the pushed, prompt.  If it matches,
// call the suspension's user-supplied handler function with the
// continuation accumulated during the unwind from the originating
// inner %%TAKE-SUBCONT.
vm.PushPrompt = vm.wrap({
    qua_combine: function do_push_prompt(self, e, o, k, f) {
        var prompt = vm.elt(o, 0);
        var body_thunk = vm.elt(o, 1);
        if (k instanceof StackFrame) {
            var val = resumeFrame(k, f);
        } else {
            var val = vm.combine(e, body_thunk, vm.NIL);
        }
        if (val instanceof Suspension) {
            if (val.prompt === prompt) {
                var continuation = val.k;
                var handler = val.handler;
                return vm.combine(e, handler, vm.cons(continuation, vm.NIL));
            } else {
                suspendFrame(val, function(k, f) {
		    return do_push_prompt(self, e, o, k, f);
		});
                return val;
            }
        }
        return val;
    }
});
// %%TAKE-SUBCONT prompt handler
//
// Abort up to prompt and call handler with captured continuation.
//
// Inject a suspension that will lead to the call of the
// user-supplied handler at the outer %%PUSH-PROMPT with matching
// prompt.  The innermost stack frame's work function will call
// the protocol parameter F, the user-supplied stimulus function
// passed in during continiation resumption/composition, thereby
// completing resumption and entering back into normal evaluation.
vm.TakeSubcont = vm.wrap({
    qua_combine: function(self, e, o, k, f) {
        var prompt = vm.elt(o, 0);
        var handler = vm.elt(o, 1);
        var sus = new Suspension(prompt, handler);
        suspendFrame(sus, function(k, f) {
	    return vm.combine(e, f, vm.NIL);
	});
        return sus;
    }
});
// %%PUSH-SUBCONT k f
//
// Resume into a user-supplied continuation, calling the
// "stimulus" thunk F within the newly established stack context
// (this is accomplished by the stack frame pushed by
// %%TAKE-SUBCONT, which ultimately calls the passed-in F, see
// lines above).
vm.PushSubcont = vm.wrap({
    qua_combine: function do_push_subcont(self, e, o, k, f) {
        var thek = vm.elt(o, 0);
        var thef = vm.elt(o, 1);
        if (k instanceof StackFrame) {
            var val = resumeFrame(k, f);
        } else {
            var val = resumeFrame(thek, thef);
        }
        if (val instanceof Suspension) {
            suspendFrame(val, function(k, f) {
		return do_push_subcont(self, e, o, k, f);
	    });
            return val;
        }
        return val;
    }
});
// %%PUSH-PROMPT-SUBCONT prompt k f
//
// Manually fused version of pushing a prompt and continuation in
// one fell swoop, to work around stack overflow issue for
// server-type apps, see Oleg's paper.
vm.PushPromptSubcont = vm.wrap({
    qua_combine: function do_push_prompt_subcont(self, e, o, k, f) {
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
                suspendFrame(val, function(k, f) {
		    return do_push_prompt_subcont(self, e, o, k, f);
		});
                return val;
            }
        }
        return val;
    }
});
/* Simple control */
// %%LOOP thunk
//
// Call thunk repeatedly.
vm.Loop = vm.wrap({
    qua_combine: function do_loop(self, e, o, k, f) {
        var body = vm.elt(o, 0);
        var first = true; // only resume once
        while (true) {
            if (first && (k instanceof StackFrame)) {
                var val = resumeFrame(k, f);
            } else {
                var val = vm.combine(e, body, vm.NIL);
            }
            first = false;
            if (val instanceof Suspension) {
                suspendFrame(val, function(k, f) {
		    return do_loop(self, e, o, k, f);
		});
                return val;
            }
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
vm.Rescue = vm.wrap({
    qua_combine: function do_rescue(self, e, o, k, f) {
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
                // let panics through, do not pass them to user handler
                throw exc;
            } else {
                // unwrap handler to prevent double eval of exception
                // TODO: murky
                var val = vm.combine(e, vm.unwrap(handler), vm.list(exc));
            }
        }
        if (val instanceof Suspension) {
            suspendFrame(val, function(k, f) {
		return do_rescue(self, e, o, k, f);
	    });
            return val;
        }
        return val;
    }
});
/* Dynamic Variables */
// %%DYNAMIC-BIND dynvar new-val body-thunk
//
// Bind a single dynamic variable to a new value during the
// execution of a body thunk.  For now, any standard object with a
// VAL slot can be used as a dynamic variable, this will probably
// change.
vm.DynamicBind = vm.wrap({
    qua_combine: function dynamic_bind(self, e, o, k, f) {
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
                suspendFrame(res, function(k, f) {
		    return dynamic_bind(self, e, o, k, f);
		});
                return res;
            } else {
                return res;
            }
        } finally {
            dynvar.val = oldVal;
        }
    }
});
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
    if (!(rhs && (rhs instanceof vm.Keyword) && (rhs.name === self.name))) {
        return vm.error(":" + self.name + " expected, but got: " + JSON.stringify(rhs), e);
    }
};
vm.Ign.prototype.qua_bind = function(self, e, rhs, doit) {};
/* COLA object model */
vm.vtable_allocate = function(self) {
    var object = Object.create(null);
    object.qua_isa = self;
    return object;
};
vm.vtable_delegated = function(self, name) {
    if (self !== null) {
	var child = vm.vtable_allocate(self.qua_isa);
    } else {
	var child = vm.vtable_allocate(null); // for bootstrap
    }
    child.parent = self;
    child.methods = Object.create(null);
    child.name = name;
    return child;
};
vm.vtable_lookup = function(self, msg_name) {
    if (msg_name in self.methods) {
	return self.methods[msg_name];
    } else {
	return vm.send(self.parent, "lookup-method", vm.list(msg_name));    
    }
};
vm.send = function(object, msg_name, args) {
    var method = vm.bind_method(object, msg_name);
    return vm.combine(vm.make_env(), method, args);
};
vm.bind_method = function(object, msg_name) {
    var vt = vm.vtable_of(object);
    if ((msg_name === "lookup-method") && (object === vm.VtableVT)) {
	var method = vm.vtable_lookup(vt, "lookup-method");
    } else {
	var method = vm.send(vt, "lookup-method", vm.list(msg_name));
    }
};
vm.vtable_of = function(object) {
    if (object && object.qua_isa) {
	return object.qua_isa;
    } else {
	return vm.concrete_class_of_hook(object);
    }
};
vm.make_instance = function(vt, initargs) {
    var obj = vm.vtable_allocate(vt);
    for (name in initargs) {
        var value = initargs[name];
        obj[name] = value;
    }
    return obj;
};
vm.put_method = function(vt, name, method) {
    vt.methods[name] = method;
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
    obj = (obj !== undefined) ? obj : Object.create(null);
    if (plist === vm.NIL) {
        return obj;
    } else {
        var name = vm.assert_type(vm.elt(plist, 0), vm.Keyword);
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
        if ((exc instanceof vm.Tag) || (exc instanceof vm.Panic)) {
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
        // fall through
    }
    // if nothing else worked, panic
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
/* JS Native Interface */
// Returns a JS function that calls the given Lisp operator with
// the arguments passed to the function.
vm.js_function = function(cmb) {
    return function() {
        var args = vm.array_to_list(Array.prototype.slice.call(arguments));
        return vm.combine(vm.make_env(), cmb, args);
    }
};
// Detect JS built-in types and make them appear to object system
// as objects with (synthetic) Lisp classes (define above).
vm.concrete_class_of_hook = function(obj) {
    switch (typeof(obj)) {
    case "string": return vm.JSString;
    case "number": return vm.JSNumber;
    case "boolean": return vm.Boolean;
    case "function": return vm.JSFunction;
    case "undefined": return vm.JSUndefined;
    default:
        if (obj === null) {
            return vm.JSNull;
        } else if (Array.isArray(obj)) {
            return vm.JSArray;
        } else {
            var proto = Object.getPrototypeOf(obj);
            if (proto) {
                return vm.unknown_class_hook(obj);
            } else {
                return vm.JSObject;
            }
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
// This definitely should be done from Lisp.
vm.own_property_p = function(obj, name) { return Object.prototype.hasOwnProperty.call(obj, name); };
/* API */
vm.def = vm.bind;
vm.defun = function(e, name, cmb) { vm.assert(cmb); vm.def(e, vm.fun_sym(name), cmb); };
vm.deftype = function(e, type, name) { vm.assert(type); vm.def(e, vm.type_sym(name), type); };
// Populates a fresh init environment with the VM primitives.
vm.init = function() {
    var init_env = vm.make_env();
    // Bootstrap object model
    vm.VTable = vm.vtable_delegated(null, "standard-class");
    vm.VTable.qua_isa = vm.VTable;
    vm.Object = vm.vtable_delegated(null, "standard-object");
    vm.Object.qua_isa = vm.VTable;
    vm.VTable.parent = vm.Object;
    vm.deftype(init_env, vm.Object, "standard-object");
    vm.deftype(init_env, vm.VTable, "standard-class");
    // Bless built-in types as Lisp types
    function define_builtin_type(type, parent, name) {
	type.qua_isa = vm.VTable;
	type.methods = Object.create(null);
	type.parent = parent;
	type.name = name;
	vm.deftype(init_env, type, name);
    }
    vm.List = vm.vtable_delegated(vm.Object, "list");
    vm.deftype(init_env, vm.List, "list");
    define_builtin_type(vm.Cons, vm.List, "cons");
    define_builtin_type(vm.Nil, vm.List, "nil");
    // Synthetic/virtual classes given to JS built-in objects, so we
    // can define methods on them.
    function define_js_type(parent, name) {
	var vt = vm.vtable_delegated(parent, name);
	vm.deftype(init_env, vt, name);
	return vt;
    }
    vm.JSObject = define_js_type(vm.Object, "js-array");
    vm.JSArray = define_js_type(vm.JSObject, "js-array");
    vm.JSFunction = define_js_type(vm.JSObject, "js-function");
    vm.JSNumber = define_js_type(vm.JSObject, "js-number");
    vm.JSString = define_js_type(vm.JSObject, "js-string");
    vm.JSNull = define_js_type(vm.JSObject, "js-null");
    vm.JSUndefined = define_js_type(vm.JSObject, "js-undefined");
    // Forms
    vm.defun(init_env, "%%car", vm.jswrap(vm.car));
    vm.defun(init_env, "%%cdr", vm.jswrap(vm.cdr));
    vm.defun(init_env, "%%cons", vm.jswrap(vm.cons));
    vm.defun(init_env, "%%to-fun-sym", vm.jswrap(vm.to_fun_sym));
    vm.defun(init_env, "%%to-type-sym", vm.jswrap(vm.to_type_sym));
    // Evaluation
    vm.defun(init_env, "%%def", vm.Def);
    vm.defun(init_env, "%%eval", vm.Eval);
    vm.defun(init_env, "%%if", vm.If);
    vm.defun(init_env, "%%progn", vm.Progn);
    vm.defun(init_env, "%%setq", vm.Setq);
    // Combiners
    vm.defun(init_env, "%%vau", vm.Vau);
    vm.defun(init_env, "%%wrap", vm.jswrap(vm.wrap));
    vm.defun(init_env, "%%unwrap", vm.jswrap(vm.unwrap));
    // Environments
    vm.defun(init_env, "%%make-environment", vm.jswrap(vm.make_env));
    // Continuations
    vm.defun(init_env, "%%push-prompt", vm.PushPrompt);
    vm.defun(init_env, "%%take-subcont", vm.TakeSubcont);
    vm.defun(init_env, "%%push-subcont", vm.PushSubcont);
    vm.defun(init_env, "%%push-prompt-subcont", vm.PushPromptSubcont);
    vm.defun(init_env, "%%loop", vm.Loop);
    vm.defun(init_env, "%%raise", vm.Raise);
    vm.defun(init_env, "%%rescue", vm.Rescue);
    vm.defun(init_env, "%%dynamic-bind", vm.DynamicBind);
    // Object system
    vm.defun(init_env, "%%make-instance", vm.jswrap(vm.make_instance));
    vm.defun(init_env, "%%put-method", vm.jswrap(vm.put_method));
    vm.defun(init_env, "%%send", vm.jswrap(vm.send));
    vm.defun(init_env, "%%set-slot-value", vm.jswrap(vm.js_set));
    vm.defun(init_env, "%%slot-bound?", vm.jswrap(vm.own_property_p));
    vm.defun(init_env, "%%slot-value", vm.jswrap(vm.js_get));
    vm.defun(init_env, "%%vtable-allocate", vm.jswrap(vm.vtable_allocate));
    vm.defun(init_env, "%%vtable-delegated", vm.jswrap(vm.vtable_delegated));
    vm.defun(init_env, "%%vtable-of", vm.jswrap(vm.vtable_of));
    // JSNI
    vm.defun(init_env, "%%js-apply", vm.jswrap(vm.js_apply));
    vm.defun(init_env, "%%js-binop", vm.jswrap(vm.js_binop));
    vm.defun(init_env, "%%js-function", vm.jswrap(vm.js_function));
    vm.defun(init_env, "%%js-get", vm.jswrap(vm.js_get));
    vm.defun(init_env, "%%js-global", vm.jswrap(vm.js_global));
    vm.defun(init_env, "%%js-new", vm.jswrap(vm.js_new));
    vm.defun(init_env, "%%js-set", vm.jswrap(vm.js_set));
    vm.defun(init_env, "%%own-property?", vm.jswrap(vm.own_property_p));
    // Misc
    vm.defun(init_env, "%%eq", vm.jswrap(function(a, b) { return a === b; }));
    vm.defun(init_env, "%%panic", vm.jswrap(vm.panic));
    vm.defun(init_env, "%%print", vm.jswrap(console.log));
    // List optims
    vm.defun(init_env, "%%list*", vm.jswrap(vm.list_star));
    vm.defun(init_env, "%%list-to-array", vm.jswrap(vm.list_to_array));
    vm.defun(init_env, "%%plist-to-js-object", vm.jswrap(vm.plist_to_js_object));
    vm.defun(init_env, "%%reverse-list", vm.jswrap(vm.reverse_list));
    // Temporary, till we find a better place
    vm.defun(init_env, "%%assert", vm.jswrap(vm.assert));
    vm.defun(init_env, "%%parse-bytecode", vm.jswrap(vm.parse_bytecode));
    return init_env;
};
vm.eval = function(x, e) {
    return vm.evaluate(e, x); // change to x,e
};
