var fs = require("fs");
var parser = require("../js/parser");
console.log("module.exports.main = " + JSON.stringify(parser.parse_sexp(fs.readFileSync("qua/test.qua", "utf8"))));
