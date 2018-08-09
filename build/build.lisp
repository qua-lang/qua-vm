;;;;; Main Qua build script, Lisp part

;;;; Build browser bytecode files

;; FIXME: why does this need ".."?
(def bytefile (node:require-vm-relative "../build/bytefile"))
(def #'write-bytecode-file (.write_bytecode_file bytefile))

;;;; Build browser Browserify bundles

(def #'browserify (node:require-vm-relative "browserify"))
(defun build-browser-image (template bytefile outfile test?)
  (let ((b (browserify template)))
    (@require b bytefile (js-object :expose "qua-user-bytecode"))
    (when test?
      (@require b "deep-equal"))
    (@pipe (@bundle b) (node:create-write-stream outfile))))

(defun build ()
  ;; This is the main bootstrap bytecode for the browser, analogous
  ;; to the Node bootstrap bytecode created in `build.js'.
  (write-bytecode-file (js-array "lisp/bootstrap.lisp" "lisp/arch-browser.lisp")
		       "build/out/bootstrap-browser.json")

  ;; This is the main user bytecode for the browser, which is simply empty.
  (write-bytecode-file (js-array)
		       "build/out/prod-browser.json")

  ;; This is the REPL user bytecode for the browser.
  (write-bytecode-file (js-array "lisp/repl.lisp")
		       "build/out/repl-browser.json")

  ;; This is the test user bytecode for the browser.
  (write-bytecode-file (js-array "test/lisp/test.lisp" "test/lisp/test-browser.lisp")
		       "build/out/test-browser.json")

  ;; The main bundle has no user bytecode.
  (build-browser-image "./build/browser-template.js"
                       "./build/out/prod-browser.json"
		       "build/out/qua.js"
		       #f)

  ;; The REPL bundle has the REPL bytecode.
  (build-browser-image "./build/browser-template.js"
                       "./build/out/repl-browser.json"
		       "build/out/qua-repl.js"
		       #f)

  ;; The test bundle has the test bytecode.
  (build-browser-image "./build/browser-template.js"
                       "./build/out/test-browser.json"
		       "build/out/qua-test.js"
		       #t))
