;;;;; Main Qua build script, Lisp part

;;;; Build browser bytecode files

;; FIXME: why does this need ..?
(def bytefile (node:require "../build/bytefile"))
(def #'write-bytefile (.write_bytecode_file bytefile))

(write-bytefile (js-array "lisp/bootstrap.lisp" "lisp/arch-browser.lisp")
		"build/out/bootstrap-browser.json")

(write-bytefile (js-array "lisp/test.lisp" "lisp/test-browser.lisp")
		"build/out/test-browser.json")

;;;; Build browser Browserify "images"

(def #'browserify (node:require "browserify"))

(defun build-browser-image (bytefile outfile)
  (let ((b (browserify "./build/browser-template")))
    (@require b bytefile (js-object :expose "qua-user-bytecode"))
    (@pipe (@bundle b) (node:create-write-stream outfile))))

(build-browser-image "./build/out/test-browser.json" "build/out/qua.js")
