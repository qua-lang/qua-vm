;; Main Qua build script, Lisp part

;; FIXME: why does this need ..?
(def bytefile (node:require "../build/bytefile"))
(def #'write-bytefile (.write_bytecode_file bytefile))

;; Build browser bytecode files

(write-bytefile (js-array "lisp/bootstrap.lisp" "lisp/arch-browser.lisp")
		"build/out/boot-browser.json")

(write-bytefile (js-array "lisp/bootstrap.lisp" "lisp/arch-browser.lisp"
			  "lisp/test.lisp" "lisp/test-browser.lisp")
		"build/out/test-browser.json")
