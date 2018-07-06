// This is the main file, that pulls together all components and
// creates a user environment in which Qua code can be evaluated.

// The boot bytecode is the precompiled version of the
// `bootstrap.lisp' file.
var boot_bytecode = require("../build/out/bootstrap.json");

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
require("./cont")(vm, boot_env);  // Continuations
require("./alien")(vm, boot_env); // JavaScript Native Interface
require("./read")(vm, boot_env);  // S-Expression Parser
require("./optim")(vm, boot_env); // Optimizations
require("./arch")(vm, boot_env);  // Architecture-Specific Code
// FIXME: this should only be included if we're actually a test build
require("./test")(vm, boot_env);  // VM Testing Support

// Finally, we run the Lisp boot bytecode, i.e. the Lisp code from the
// file `bootstrap.lisp'.
vm.time("run boot bytecode",
        function() {
	    vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(boot_bytecode)), boot_env);
	});

// This is still a hack to be addressed.
module.exports.vm = function() {
    return {
        "eval": function(expr) {
	    if (typeof(expr) === "string") {
		expr = vm.parse_sexp(expr);
	    }
	    return vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(expr)), boot_env);
	}
    };
};
