// A "bytecode file" is a JSON file containing is a JSON file
// effectively containing the parse results of an S-expression.
var fs = require("fs");
var parser = require("../src/read");
module.exports.write_bytecode_file = function(in_lisp_paths, out_json_path) {
    function file(path) { return fs.readFileSync(path, "utf8") }
    var code = in_lisp_paths.map(file).join("\n");
    fs.writeFileSync(out_json_path, JSON.stringify(parser.parse_sexp(code)), "utf8");
};
