// This is the main file, that pulls together all components and
// creates a user environment in which Qua code can be evaluated.
var qua = module.exports;

// The boot bytecode is the precompiled version of the
// `bootstrap.lisp' file.
var boot_bytecode = require("../build/out/bootstrap.json");

qua.vm = function() {
    // VM initialization: The `vm.init' function from the file `vm.js'
    // performs the major part of initialization: it populates a fresh
    // environment, called the boot environment, with primitive bindings.
    var vm = require("./vm");
    var boot_env = vm.init();
    
    // Once that is done, we run some "plug-in" files, each of which
    // receives the VM module, and the created boot environment, and can
    // add new primitive functionality to both.  Most of these are
    // plug-ins simply to keep the `vm.js' file a bit leaner and more
    // readable.  The only files where this is really required are the
    // `arch.js'/`arch-browser.js' files that get used depending on what
    // architecture we're building for with some Browserify magic in
    // `package.json'.
    require("./read")(vm, boot_env);  // S-Expression Parser
    require("./arch")(vm, boot_env);  // Architecture-Specific Code
    
    // Finally, we run the Lisp boot bytecode, i.e. the Lisp code from the
    // file `bootstrap.lisp'.
    vm.time("run boot bytecode",
            function() {
		vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(boot_bytecode)), boot_env);
	    });
    
    return {
	"vm": vm,
	"boot_env": boot_env,
        "eval": function(expr) {
	    if (typeof(expr) === "string") {
		expr = vm.parse_sexp(expr);
	    }
	    return vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(expr)), boot_env);
	}
    };
};
