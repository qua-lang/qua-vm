;; Browser-specific Lisp code

(def #'node:require $require)

(defstruct browser-input-stream)
(defstruct browser-output-stream)

(defmethod read-string-from-stream ((stream browser-input-stream))
  ($prompt "LISP input:" ))
(defmethod write-string-to-stream ((stream browser-output-stream) string)
  (log string))

(defun %arch-standard-input ()
  (make-instance 'browser-input-stream))
(defun %arch-standard-output ()
  (make-instance 'browser-output-stream))
