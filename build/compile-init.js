var fs = require("fs");
var parser = require("../js/read");
console.log("module.exports.main = " + JSON.stringify(parser.parse_sexp(fs.readFileSync("lisp/init.lisp", "utf8"))));
