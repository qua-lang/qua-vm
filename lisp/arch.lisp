;; Node-specific Lisp code

(def #'node:require #'%%require)

(defstruct node-input-stream)
(defstruct node-output-stream)

(defconstant +node-stdout+ (.stdout $process))

(defmethod read-string-from-stream ((stream node-input-stream))
  (%%read-line))
(defmethod write-string-to-stream ((stream node-output-stream) string)
  (@write +node-stdout+ string))

(defun %arch-standard-input ()
  (make-instance 'node-input-stream))
(defun %arch-standard-output ()
  (make-instance 'node-output-stream))

(defconstant node:path (node:require "path"))
(def #'node:dirname (.dirname node:path))
(def #'node:join-paths (.join node:path))

(defconstant node:fs (node:require "fs"))
(def #'node:read-file-sync (.readFileSync node:fs))
(def #'node:create-write-stream (.createWriteStream node:fs))

(defun read-file-as-string (path) (node:read-file-sync path "utf8"))

(defun read-file (path)
  (list* #'progn (%%parse-bytecode (%%parse-sexp (read-file-as-string path)))))

;; Loads a file into the current or specified environment.
(defun/env load (path . opt-env) denv
  (eval (read-file path) (optional opt-env denv)))

;; Loads all components of a system into the current or specified
;; environment.
(defun/env load-system (path . opt-env) denv
  (let* ((env (optional opt-env denv))
         (#'defsystem
           (vau (name :depends-on deps :components components) #ign
                (list-for-each (lambda (dep)
                                 (load-system (node:join-paths (node:dirname path) dep) env))
                               deps)
                (list-for-each (lambda (component)
                                 (load (node:join-paths (node:dirname path) component) env))
                               components))))
    (load path)))
