#!/usr/bin/env node
// This is the main entry point for the `qua' UNIX command.
console.log(require("../src/main.js").vm().eval_string("(load \"lisp/repl.lisp\")"));
