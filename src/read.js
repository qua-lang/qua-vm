/*
  This whole parsing stuff is a mess haphazardly grown over the years,
  and ripe to be replaced with an elaborate platinum mechanism.

  The way it works is that the initial stage of the parser,
  `parse_sexp', turns Lisp syntax S-expression strings into a format
  called bytecode, which is essentially one big honking JSON list
  mirroring the original S-expression.

  The second stage, `parse_bytecode', then turns such a JSON bytecode
  object into forms (i.e. vm.Sym, vm.Cons, vm.Nil, etc) that can
  actually be evaluated by the VM.

  The bytecode format is roughly:

  S-expression                Bytecode
  --------------------------------------------------------------------
  foo                         "foo"
  #t                          true
  (foo 1 (2))                 ["foo", 1, [2]]
  "a string"                  ["qua-string", "a string"]
  #'my-function-symbol        ["qua-function", "my-function-symbol"]
  :the-keyword                ["qua-keyword", "the-keyword"]
  (dotted list . end)         ["dotted", "list", ".", "end"]
  #ign                        "#ign"

  Note that since we use JSON strings for symbols, we have to
  specially encode strings as a list with "qua-string" as first
  element (which is probably a layering violation).  Similar encodings
  are used for function namespaced symbols and keyword symbols.
  
  Some objects like booleans, numbers, null, undefined can appear
  as-is in the bytecode and there are some hacks to support that.
  Further hacks make dotted lists possible, as well as the JS syntax
  .property, @method, and $global.

  A whole bytecode file is a single JSON list, usually a %%PROGN.
*/

var jsparse = require("jsparse");

module.exports = function(vm, init_env) {
    // Bytecode to forms
    vm.parse_bytecode = function(obj) {
        switch(Object.prototype.toString.call(obj)) {
        case "[object String]": 
            switch(obj) {
            case "#ign": return vm.IGN;
            case "#void": return vm.VOID;
            case "#any": return vm.ANY;
            default: return vm.sym(obj);
            }
        case "[object Array]": return vm.parse_bytecode_array(obj);
        default: return obj;
        }
    };
    vm.parse_bytecode_array = function(arr) {
        if ((arr.length == 2) && arr[0] === "qua-string") { return arr[1]; }
        if ((arr.length == 2) && arr[0] === "qua-function") { return vm.fun_sym(arr[1]); }
        if ((arr.length == 2) && arr[0] === "qua-keyword") { return vm.keyword(arr[1]); }
        var i = arr.indexOf(".");
        if (i === -1) {
            return vm.array_to_list(arr.map(vm.parse_bytecode));
        } else {
            var front = arr.slice(0, i);
            return vm.array_to_list(front.map(vm.parse_bytecode),
                                    vm.parse_bytecode(arr[i + 1]));
        }
    };
    // Strings to bytecode to forms
    vm.parse_forms = function (string) {
	return vm.parse_bytecode(parse_sexp(string));
    };
    vm.parse_forms_progn = function (string) {
        return vm.parse_bytecode(parse_sexp_progn(string));
    };
    // This is what we export to userland
    vm.defun(init_env, "%%parse-forms", vm.jswrap(vm.parse_forms));
};

// Need to export these so that the build process can construct
// bootstrap bytecode file.
module.exports.parse_sexp = parse_sexp;
module.exports.parse_sexp_progn = parse_sexp_progn;

function parse_sexp_progn(string) {
    return ["%%progn"].concat(parse_sexp(string));
}

// It begins...
var ps = jsparse.ps;
var choice = jsparse.choice;
var range = jsparse.range;
var action = jsparse.action;
var sequence = jsparse.sequence;
var join = jsparse.join;
var join_action = jsparse.join_action;
var negate = jsparse.negate;
var repeat0 = jsparse.repeat0;
var optional = jsparse.optional;
var repeat1 = jsparse.repeat1;
var wsequence = jsparse.wsequence;
var whitespace = jsparse.whitespace;
var ch = jsparse.ch;
var butnot = jsparse.butnot;

/* S-expr parser */

function strip_comments(ast) {
    var res = [];
    ast.forEach(function(sub_ast) { if (!(sub_ast instanceof Comment)) res.push(sub_ast); });
    return res;
}

function parse_sexp(s) {
    s = s.trim();
    var res = program_stx(ps(s));
    if (res.remaining.index === s.length) return strip_comments(res.ast);
    else throw("parse error at " + res.remaining.index + " in " + s); }
var x_stx = function(input) { return x_stx(input); }; // forward decl.
var id_special_char =
    choice(":", ",", "-", "&", "!", "=", ">", "<", "%", "+", "?", "/", "*", "$", "_", "#", ".", "@", "|", "~", "^", "'");
var id_char = choice(range("a", "z"), range("A", "Z"), range("0", "9"), id_special_char);
// Kludge: don't allow single dot as id, so as not to conflict with dotted pair stx.
var id_stx = action(join_action(butnot(repeat1(id_char), "."), ""), handle_identifier);
var keyword_stx = action(sequence(":", id_stx), function(ast) {
        return ["qua-keyword", ast[1]];
    });
function handle_identifier(str) {
    if ((str[0] === ".") && (str.length > 1)) { return ["js-getter", ["qua-string", str.substring(1)]]; }
    else if (str[0] === "@") { return ["js-invoker", ["qua-string", str.substring(1)]]; }
    else if (str[0] === "$") { return ["js-global", ["qua-string", str.substring(1)]]; }
    else if (str.startsWith("#'")) { return ["qua-function", str.substring(2)]; }
    else return str; }
var escape_char = choice("\"", "\\", "n", "r", "t", "0");
var escape_sequence = action(sequence("\\", escape_char), function (ast) {
    switch(ast[1]) {
    case "n": return "\n";
    case "r": return "\r";
    case "t": return "\t";
    case "0": return "\0";
    default: return ast[1]; }});
var line_terminator = choice(ch("\r"), ch("\n"));
var string_char = choice(escape_sequence, line_terminator, negate("\""));
var string_stx = action(sequence("\"", join_action(repeat0(string_char), ""), "\""),
                        function (ast) { return ["qua-string", ast[1]]; });
var digits = join_action(repeat1(range("0", "9")), "");
var number_stx =
    action(sequence(optional(choice("+", "-")), digits, optional(join_action(sequence(".", digits), ""))),
           function (ast) {
               var sign = ast[0] ? ast[0] : "";
               var integral_digits = ast[1]; 
               var fractional_digits = ast[2] || "";
               return Number(sign + integral_digits + fractional_digits); });
function make_constant_stx(string, constant) { return action(string, function(ast) { return constant; }); }
var nil_stx = make_constant_stx("#nil", []);
var ign_stx = make_constant_stx("#ign", "#ign");
var void_stx = make_constant_stx("#void", "#void");
var any_stx = make_constant_stx("#any", "#any");
var t_stx = make_constant_stx("#t", true);
var f_stx = make_constant_stx("#f", false);
var null_stx = make_constant_stx("#null", null);
var undef_stx = make_constant_stx("#undefined", undefined);
var dot_stx = action(wsequence(".", x_stx), function (ast) { return ast[1]; });
var compound_stx = action(wsequence("(", repeat0(x_stx), optional(dot_stx), ")"),
                          function(ast) {
                              var exprs = strip_comments(ast[1]);
                              var end = ast[2] ? [".", ast[2]] : [];
                              return exprs.concat(end); });
var quote_stx = action(sequence("'", x_stx), function(ast) { return ["quote", ast[1]]; });
function Comment(text) { this.text = text; };
var comment_stx = action(sequence(";", repeat0(negate(line_terminator)), optional(line_terminator)),
                         function(ignored) { return new Comment(ignored); });
var x_stx = whitespace(choice(ign_stx, void_stx, any_stx, nil_stx, t_stx, f_stx, null_stx, undef_stx, number_stx,
                              quote_stx, compound_stx, keyword_stx, id_stx, string_stx, comment_stx));
var program_stx = repeat0(x_stx);
