;; Node-specific Lisp code

(def #'node:require #'%%require)

;; Standard input stream
(defstruct read-line-input-stream)
(defmethod read-string-from-stream ((stream read-line-input-stream))
  (%%read-line))
(defun %arch-standard-input ()
  (make-instance 'read-line-input-stream))
(defun %arch-standard-output ()
  #void)

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
(def #'load
  (wrap (vau (path . opt-env) denv
          (user-eval (read-file path) (optional opt-env denv)))))

;; Loads all components of a system into the current or specified
;; environment.
(def #'load-system
  (wrap (vau (path . opt-env) denv
          (let* ((env (optional opt-env denv))
                 (#'defsystem
                  (vau (name :depends-on deps :components components) #ign
                    (list-for-each (lambda (dep)
                                     (load-system (node:join-paths (node:dirname path) dep) env))
                                   deps)
                    (list-for-each (lambda (component)
                                     (load (node:join-paths (node:dirname path) component) env))
                                   components))))
            (load path)))))
