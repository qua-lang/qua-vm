#!/usr/bin/env node
// HACKCKCKKCKCKCK -- why is this so horrible?
require("../src/main").vm().eval("(load \"" + process.argv[2] + "\")");
