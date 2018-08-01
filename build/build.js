#!/usr/bin/env node

// Main build script.  This calls into Lisp ASAP.

// Write boot bytecode file so we can init VM
require("./bytefile.js").write_bytecode_file(["lisp/bootstrap.lisp", "lisp/arch.lisp"],
					     "build/out/bootstrap.json");

// Run build script written in Lisp that does actual build steps
require("../src/main.js").vm().eval_string("(load \"build/build.lisp\") (build)");
