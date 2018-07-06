#!/usr/bin/env node
// This is the main entry point for the `qua' UNIX command.
require("../src/main").vm().eval("(load \"lisp/repl.lisp\")");
