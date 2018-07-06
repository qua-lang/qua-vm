// Plugin for the Qua VM that adds the delimcc API for delimited control.
// Documentation: http://okmij.org/ftp/continuations/implementations.html
// Also adds continuation-aware implementations of loops, exception handling,
// and dynamically-scoped variables.
module.exports = function(vm, init_env) {
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
            var oldVal = dynvar.qs_val;
            dynvar.qs_val = val;
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
                dynvar.qs_val = oldVal;
            }
        }
    });
    // Export to Lisp
    vm.defun(init_env, vm.sym("%%push-prompt"), vm.PushPrompt);
    vm.defun(init_env, vm.sym("%%take-subcont"), vm.TakeSubcont);
    vm.defun(init_env, vm.sym("%%push-subcont"), vm.PushSubcont);
    vm.defun(init_env, vm.sym("%%push-prompt-subcont"), vm.PushPromptSubcont);
    vm.defun(init_env, vm.sym("%%loop"), vm.Loop);
    vm.defun(init_env, vm.sym("%%raise"), vm.Raise);
    vm.defun(init_env, vm.sym("%%rescue"), vm.Rescue);
    vm.defun(init_env, vm.sym("%%dynamic-bind"), vm.DynamicBind);
};
