;; Browser-specific Lisp code

(def #'node:require $require)

(defstruct browser-stream
  id)
 
(def -browser-stream-counter- 0)
 
(defun make-browser-stream ()
  (make-instance 'browser-stream :id (incf -browser-stream-counter-)))

(defmethod read-string-from-stream ((stream browser-stream))
  ($prompt (.id stream )))
(defmethod write-string-to-stream ((stream browser-stream) string)
  (log (%%object-to-string string)))

(defconstant +default-browser-stream+ (make-browser-stream))
  
(defun %arch-standard-input () +default-browser-stream+)
(defun %arch-standard-output () +default-browser-stream+)
