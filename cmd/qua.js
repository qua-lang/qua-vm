#!/usr/bin/env node
// This is the main entry point for the `qua' UNIX command.
var vm = require("../src/main").vm();
// ugh, there must be a better way?
vm.eval("(load \"lisp/repl.lisp\")");
