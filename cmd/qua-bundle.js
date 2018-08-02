#!/usr/bin/env node
// qua-bundle file.lisp bundle.js
// Builds a browser bundle from a Lisp file
var vm = require("../src/main.js").vm();
var filename = vm.assert_type(process.argv[2], "string");
var bundlename = vm.assert_type(process.argv[3], "string");
// We should really allow #!/usr/bin/env qua so we can get rid of this crap.
console.log(vm.eval_bytecode(["push-userspace",
                              ["load", ["qua-string", __dirname + "/../build/build.lisp"]],
                              ["write-bytecode-file",
                               ["js-array", ["qua-string", filename]],
                               ["qua-string", filename + ".json"]],
                              ["build-browser-image",
                               ["qua-string", __dirname + "/../build/browser-template.js"],
                               ["qua-string", "./" + filename + ".json"],
                               ["qua-string", bundlename],
                               false],
                              vm.VOID]));
