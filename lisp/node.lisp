;; Node
(def #'node:require #'%%require)

(defconstant node:path (node:require "path"))
(def #'node:dirname (.dirname node:path))
(def #'node:join-paths (.join node:path))

(defconstant node:fs (node:require "fs"))
(def #'node:read-file-sync (.readFileSync node:fs))

(defun read-file-as-string (path)
  (node:read-file-sync path "utf8"))

(defun read-file (path)
  (list* #'progn (%%parse-bytecode (%%parse-sexp (read-file-as-string path)))))
