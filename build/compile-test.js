var fs = require("fs");
var parser = require("../js/read");
var paths = ["lisp/test.lisp"];
var code = paths.map(file).join("\n");

function file(path) {
    return fs.readFileSync(path, "utf8");
}

console.log(JSON.stringify(parser.parse_sexp(code)));
