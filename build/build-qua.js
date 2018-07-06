#!/usr/bin/env node

// Write boot bytecode file so we can init VM
require("./bytefile").write_bytecode_file(["lisp/bootstrap.lisp", "lisp/arch.lisp"],
					  "build/out/init.json");

// Run build script written in Lisp that does actual build steps
require("../src/main").vm().eval("(load \"build/build-qua.lisp\")");
