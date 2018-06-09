var fs = require("fs");
var parser = require("../js/read");
var paths = ["lisp/bootstrap.lisp", "lisp/sequence.lisp", "lisp/collection.lisp", "lisp/js-array-list.lisp"];
var code = paths.map(file).join("\n");

function file(path) {
    return fs.readFileSync(path, "utf8")
}

console.log(JSON.stringify(parser.parse_sexp(code)));
