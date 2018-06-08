#!/usr/bin/env node
var vm = require("./main").vm();
// ugh, there must be a better way?
vm.eval("(load-system \"lisp/qua-node-repl.system.lisp\")");
