#!/usr/bin/env node
// Runs a Qua file and quits.
// HACKCKCKKCKCKCK -- why is this so horrible?
console.log(require("../src/main.js").vm().eval_string("(load \"" + process.argv[2] + "\")"));
