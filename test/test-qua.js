#!/usr/bin/env node
require("../src/main").vm().eval("(load \"test/lisp/test.lisp\") (load \"test/lisp/test-node.lisp\")");
