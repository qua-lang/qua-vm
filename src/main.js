// This is the main Qua file, that pulls together all components and
// creates a user environment in which Qua code can be evaluated.
//
// The major weakness is that only a single Qua VM per JS process is
// currently supported.  Changing this is simply a matter of
// refactoring `vm.js' so that it does its thing within a function,
// instead of globally.
var qua = module.exports;

// The boot bytecode is the precompiled version of the
// `bootstrap.lisp' file plus either `arch.lisp' or
// `arch-browser.lisp' depending on whether we run in Node or are
// doing a browser build.
var boot_bytecode = require("../build/out/bootstrap.json");

qua.vm = function() {
    // VM initialization: The `vm.init' function from the file `vm.js'
    // performs the major part of initialization: it populates a fresh
    // environment, called the init environment, with primitive bindings.
    var vm = require("./vm.js");
    vm.init();
    
    // Once that is done, we run some "plug-in" files, each of which
    // receives the VM module, and the created init environment, and can
    // add new primitive functionality to both.  Most of these are
    // plug-ins simply to keep the `vm.js' file a bit leaner and more
    // readable.  The only files where this is really required are the
    // `arch.js'/`arch-browser.js' files that get used depending on what
    // architecture we're building for with some Browserify magic in
    // `package.json'.
    require("./read.js")(vm, vm.init_env);  // S-Expression Parser
    require("./print.js")(vm, vm.init_env); // (Not Yet) Pretty Printer
    require("./arch.js")(vm, vm.init_env);  // Architecture-Specific Code
    
    // Main entry point, all evaluation goes through this.  Is_boot is
    // only used during boot, to disable pushing userspace
    // (PUSH-USERSPACE is only defined near the end of booting).
    vm.eval_sexp = function(x, e, is_boot) {
        if (!is_boot) {
            x = vm.list(vm.fun_sym("push-userspace"), x);
        }
        return vm.evaluate(e ? e : vm.init_env, x);
    };
    // Add some convenient wrappers
    vm.eval_string = function(s, e, is_boot) {
        return vm.eval_sexp(vm.parse_forms_progn(s), e, is_boot);
    };
    vm.eval_bytecode = function(c, e, is_boot) {
        return vm.eval_sexp(vm.parse_bytecode(c), e, is_boot);
    };

    // Finally, we run the Lisp boot bytecode, i.e. the preparsed Lisp
    // code from the file `bootstrap.lisp', that sets up the
    // user-level language.
    vm.eval_bytecode(boot_bytecode, vm.init_env, true);
    
    return vm;
};
