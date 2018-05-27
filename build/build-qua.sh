node build/compile-init.js > build/out/init.js
node build/compile-init-browser.js > build/out/init-browser.js
node build/compile-test.js > build/out/test.js
browserify js/main.js --standalone qua > build/out/qua.js
