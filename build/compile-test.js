var fs = require("fs");
var parser = require("../js/parser");
console.log("module.exports.main = " + JSON.stringify(parser.parse_sexp(fs.readFileSync("lisp/test.lisp", "utf8"))));
