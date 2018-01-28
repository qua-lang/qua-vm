var fs = require("fs");
var io = require("../js/io");
console.log("module.exports.main = " + JSON.stringify(io.parse_sexp(fs.readFileSync("qua/test.qua", "utf8"))));
