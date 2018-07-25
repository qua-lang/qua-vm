#!/usr/bin/env node
require("../src/main.js").vm().eval_string("(load \"test/lisp/test.lisp\") (load \"test/lisp/test-node.lisp\")");
