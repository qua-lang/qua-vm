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
// file `bootstrap.lisp'.  This code actually creates the user
// environment, which is distinct from the boot environment, and is
// the environment in which all user code is evaluated.  The boot code
// defines a function `USER-EVAL' that closes over the user
// environment and is used by the VM to evaluate user code.  This
// separation of boot and user environments has the purpose of
// forbidding user access to VM primitives by default, unless they are
// explicitly exported by the boot code to the user environment it
// creates.
vm.time("run boot bytecode",
        function() {
	    vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(boot_bytecode)), boot_env);
	});

module.exports.vm = function() {
    return {
        // TODO: should this call USER-EVAL?
        "eval": function(str) { return vm.eval(vm.parse_bytecode([vm.sym("%%progn")].concat(vm.parse_sexp(str))), boot_env); }
    };
};
