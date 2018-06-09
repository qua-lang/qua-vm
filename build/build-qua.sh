node build/compile-init.js > build/out/init.json
node build/compile-init-browser.js > build/out/init-browser.json
node build/compile-test.js > build/out/test.json
browserify js/main.js --standalone qua > build/out/qua.js
