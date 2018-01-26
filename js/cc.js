// Plugin for the Qua VM that adds the delimcc API for delimited control.
// Documentation: http://okmij.org/ftp/continuations/implementations.html
module.exports = function(vm, e) {
    /* Continuations */
    function StackFrame(fun, next) { this.fun = fun; this.next = next;};
    function Resumption(k, f) { this.k = k; this.f = f; };
    function Suspension(prompt, handler) { this.prompt = prompt; this.handler = handler; this.k = null; };
    function isResumption(m) { return m instanceof Resumption; };
    function isSuspension(x) { return x instanceof Suspension; };
    function suspendFrame(sus, fun) { sus.k = new StackFrame(fun, sus.k); };
    function resumeFrame(m) { return m.k.fun(new Resumption(m.k.next, m.f)); };
    vm.monadic = function(m, a, b) {
        if (isResumption(m)) {
            var res = resumeFrame(m);
        } else {
            var res = a();
        }
        if (isSuspension(res)) {
            suspendFrame(res, function(m) { return vm.monadic(m, a, b); });
            return res;
        }
        return b(res);
    };
    vm.Loop = vm.wrap({
        qua_combine: function do_loop(self, m, e, o) {
            var body = vm.elt(o, 0);
            var first = true; // only resume once
            while (true) {
                if (first && isResumption(m)) {
                    var res = resumeFrame(m);
                } else {
                    var res = vm.combine(null, e, body, vm.NIL);
                }
                first = false;
                if (isSuspension(res)) {
                    suspendFrame(res, function(m) { return do_loop(self, m, e, o); });
                    return res;
                }
            }
        }
    });
    vm.Rescue = vm.wrap({
        qua_combine: function do_rescue(self, m, e, o) {
            var handler = vm.elt(o, 0);
            var body = vm.elt(o, 1);
            try {
                if (isResumption(m)) {
                    var res = resumeFrame(m);
                } else {
                    var res = vm.combine(null, e, body, vm.NIL);
                }
            } catch(exc) {
                // unwrap handler to prevent eval if exc is sym or cons
                var res = vm.combine(null, e, vm.unwrap(handler), vm.list(exc));
            }
            if (isSuspension(res)) {
                suspendFrame(res, function(m) { return do_rescue(self, m, e, o); });
                return res;
            }
            return res;
        }
    });
    /* Delimited Control */
    vm.PushPrompt = vm.wrap({
        qua_combine: function do_push_prompt(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var body = vm.elt(o, 1);
            if (isResumption(m)) {
                var res = resumeFrame(m);
            } else {
                var res = vm.combine(null, e, body, vm.NIL);
            }
            if (isSuspension(res)) {
                if (res.prompt === prompt) {
                    var continuation = res.k;
                    var handler = res.handler;
                    return vm.combine(null, e, handler, vm.cons(continuation, NIL));
                } else {
                    suspendFrame(res, function(m) { return do_push_prompt(self, m, e, o); });
                    return res;
                }
            }
            return res;
        }
    });
    vm.TakeSubcont = vm.wrap({
        qua_combine: function (self, m, e, o) {
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
                var res = resumeFrame(m);
            } else {
                var res = resumeFrame(new Resumption(thek, thef));
            }
            if (isSuspension(res)) {
                suspendFrame(res, function(m) { return do_push_subcont(self, m, e, o); });
                return res;
            }
            return res;
        }
    });
    vm.PushPromptSubcont = vm.wrap({
        qua_combine: function do_push_prompt_subcont(self, m, e, o) {
            var prompt = vm.elt(o, 0);
            var thek = vm.elt(o, 1);
            var thef = vm.elt(o, 2);
            if (isResumption(m)) {
                var res = resumeFrame(m);
            } else {
                var res = resumeFrame(new Resumption(thek, thef));
            }
            if (isSuspension(res)) {
                if (res.prompt === prompt) {
                    var continuation = res.k;
                    var handler = res.handler;
                    return vm.combine(null, e, handler, vm.cons(continuation, NIL));
                } else {
                    suspendFrame(res, function(m) { return do_push_prompt_subcont(self, m, e, o); });
                    return res;
                }
            }
            return res;
        }
    });
    vm.bind(e, vm.sym("qua:loop"), vm.Loop);
    vm.bind(e, vm.sym("qua:rescue"), vm.Rescue);
    vm.bind(e, vm.sym("qua:push-prompt"), vm.PushPrompt);
    vm.bind(e, vm.sym("qua:take-subcont"), vm.TakeSubcont);
    vm.bind(e, vm.sym("qua:push-subcont"), vm.PushSubcont);
    vm.bind(e, vm.sym("qua:push-prompt-subcont"), vm.PushPromptSubcont);
}
