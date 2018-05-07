var fs = require("fs");
var parser = require("../js/read");
var paths = ["lisp/bootstrap.lisp", "lisp/sequence.lisp", "lisp/collection.lisp", "lisp/js-array-list.lisp", "lisp/node.lisp", "lisp/system.lisp"];
var code = paths.map(file).join("\n");

function file(path) {
    return fs.readFileSync(path, "utf8")
}

console.log("module.exports.main = " + JSON.stringify(parser.parse_sexp(code)));
