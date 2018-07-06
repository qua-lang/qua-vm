// This script serves as the basis for bundling together a Qua VM and
// a bytecode file by means of Browserify into a single JS file.
var vm = require("../src/main").vm();
var user_bytecode = require("qua-user-bytecode");
vm.eval(user_bytecode);
