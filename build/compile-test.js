var fs = require("fs");
var parser = require("../js/read");
var paths = ["lisp/test.lisp"];
paths.push("lisp/repl.lisp");
var code = paths.map(file).join("\n");

function file(path) {
    return fs.readFileSync(path, "utf8");
}

console.log("module.exports.main = " + JSON.stringify(parser.parse_sexp(code)));
