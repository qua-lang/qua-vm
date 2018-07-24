;;;;; Browser-specific Lisp code

(def #'node:require $require)

;;;; Browser streams

(defstruct browser-stream
  id)
 
(def -browser-stream-counter- -1)
 
(defun make-browser-stream ()
  (make-instance 'browser-stream :id (incf -browser-stream-counter-)))

(defmethod read-string-from-stream ((stream browser-stream))
  (repl-read-string (.id stream)))
(defmethod write-string-to-stream ((stream browser-stream) string)
  (log string))

;;;; stdin/stdout

(defconstant +default-browser-stream+ (make-browser-stream))
  
(defun %arch-standard-input () +default-browser-stream+)
(defun %arch-standard-output () +default-browser-stream+)

;;;; REPLs

(defun repl-read-string (repl-id)
  (ensure-repl repl-id)
  (take-subcont +user-prompt+ k
    (def elem (get-element-by-id (repl-element-id repl-id)))
    (setf (.qua-continuation elem) k)))

(defun ensure-repl (repl-id)
  (def elem (get-element-by-id (repl-element-id repl-id)))
  (when (eql 0 (.length (.children elem)))
    (def printout (create-element "div"))
    (def input (create-element "input"))
    (@appendChild elem input)
    (def button (create-element "button"))
    (@addEventListener button "click"
                       (js-lambda #ign
                         (push-prompt-subcont +user-prompt+ (.qua-continuation elem)
                           (prog1 (.value input)
                             (setf (.value input) "")
                             (@focus input)))))
    (@appendChild button (create-text-node "eval"))
    (@appendChild elem button)))

(defun get-element-by-id (id)
  (the string id)
  (@getElementById $document id))

(defun create-element (tag)
  (the string tag)
  (@createElement $document tag))

(defun create-text-node (text)
  (the string text)
  (@createTextNode $document text))

(defun repl-element-id (repl-id)
  (+ "qua-repl-" repl-id))

(defun repl-write-string (repl-id string)
  (log string))

