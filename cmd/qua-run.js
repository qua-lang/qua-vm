#!/usr/bin/env node
// qua-run file.lisp
// Runs a Qua file and quits.
// HACKCKCKKCKCKCK -- why is this so horrible?
require("../src/main.js").vm().eval_string("(push-userspace (load \"" + process.argv[2] + "\"))");
