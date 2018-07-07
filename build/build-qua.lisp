;;;;; Main Qua build script, Lisp part

;;;; Build browser bytecode files

;; FIXME: why does this need ".."?
(def bytefile (node:require "../build/bytefile"))
(def #'write-bytecode-file (.write_bytecode_file bytefile))

(write-bytecode-file (js-array "lisp/bootstrap.lisp" "lisp/arch-browser.lisp")
		     "build/out/bootstrap-browser.json")

(write-bytecode-file (js-array)
		     "build/out/prod-browser.json")

(write-bytecode-file (js-array "test/lisp/test.lisp" "test/lisp/test-browser.lisp")
		     "build/out/test-browser.json")

;;;; Build browser Browserify "images"

(def #'browserify (node:require "browserify"))

(defun build-browser-image (bytefile outfile test?)
  (let ((b (browserify "./build/browser-template")))
    (@require b bytefile (js-object :expose "qua-user-bytecode"))
    (when test?
      (@require b "deep-equal"))
    (@pipe (@bundle b) (node:create-write-stream outfile))))

(build-browser-image "./build/out/prod-browser.json"
		     "build/out/qua.js"
		     #f)

(build-browser-image "./build/out/test-browser.json"
		     "build/out/qua-test.js"
		     #t)
