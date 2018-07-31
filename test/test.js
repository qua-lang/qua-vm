#!/usr/bin/env node
console.log(require("../src/main.js").vm().eval_string("(push-userspace (load \"test/lisp/test.lisp\") (load \"test/lisp/test-node.lisp\"))"));
