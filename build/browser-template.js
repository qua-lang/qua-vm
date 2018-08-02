// This small file becomes the main file of a browser bundle: it
// requires the VM, and sets the qua global variable, so that it can
// be accessed from JS (without burdening users to understand/use
// Browserify's require()).
global.qua = require("../src/main.js");
