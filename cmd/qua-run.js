#!/usr/bin/env node
// HACKCKCKKCKCKCK -- why is this so horrible?
require("../src/main.js").vm().eval_string("(load \"" + process.argv[2] + "\")");
