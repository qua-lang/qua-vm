;;;;; Node-specific Lisp code

;;; The quality of this code is a bit of a joke at the moment and
;;; needs serious reconsideration and/or reorganization.

;;; Require module relative to user code / current project.
(defun node:require (module)
  (%%require (@resolve #'%%require module (js-object :paths (js-array ".")))))

;;; Require module relative to VM code.  Code that is called from user
;;; commands (e.g. qua-bundle) must use this to access VM-local files
;;; and modules.
;;; TODO: remove hair
(defun node:require-vm-relative (module)
  (%%require module))

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
(def #'node:write-file-sync (.writeFileSync node:fs))
(def #'node:create-write-stream (.createWriteStream node:fs))

(defun read-file-as-string (path) (node:read-file-sync path "utf8"))

(defun read-file (path)
  (list* #'progn (%%parse-forms (read-file-as-string path))))

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
