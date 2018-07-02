// Browser-specific code.  The package.json's browser field contains a
// mapping so that this gets used instead of arch.js if we're doing a
// browser build.
module.exports = function(vm, root_env) {
    // Set the `qua' global var which is used to access Qua from JS.
    global.qua = require("./main.js");
    // Here we could do browser-specific exports to Lisp.
};
