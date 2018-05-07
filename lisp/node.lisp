;; Node
(def #'node:require #'%%require)

(def node:path (node:require "path"))

(def #'node:dirname (.dirname node:path))

(def #'node:join-paths (.join node:path))

(defun read-file-as-string (path)
  (%%read-file-sync path "utf8"))

(defun read-file (path)
  (list* #'progn (%%parse-bytecode (%%parse-sexp (read-file-as-string path)))))
