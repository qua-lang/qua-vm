;;;;; Browser-specific Lisp code

(def #'node:require $require)

;;;; DOM

(defun get-element-by-id (id)
  (the string id)
  (@getElementById $document id))

(defun create-element (tag)
  (the string tag)
  (@createElement $document tag))

(defun create-text-node (text)
  (the string text)
  (@createTextNode $document text))

;;;; Browser streams

(defstruct browser-stream
  id)
 
(def -browser-stream-counter- -1)
 
(defun make-browser-stream ()
  (make-instance 'browser-stream :id (incf -browser-stream-counter-)))

(defmethod read-string-from-stream ((stream browser-stream))
  (take-subcont +user-prompt+ k))
(defmethod write-string-to-stream ((stream browser-stream) string))

;;;; Ymacs mode

(when $Ymacs
  ($DEFINE_SINGLETON "Qua_Keymap_REPL" $Ymacs_Keymap
                     (js-lambda (#ign D P . #ign)
                                (setf (.KEYS D)
                                      (js-object
                                       :ENTER "qua_repl_enter"))))
  
  (@newMode $Ymacs_Buffer "qua_repl_mode"
            (js-lambda (this . #ign)
                       (let ((keymap ($Qua_Keymap_REPL)))
                         (@pushKeymap this keymap)
                         (js-lambda (this . #ign)
                                    (@popKeymap this keymap)))))

  (def repl-buffer (js-new $Ymacs_Buffer (js-object :name "Qua REPL")))
  (def ymacs (js-new $Ymacs (js-object :buffers (js-array repl-buffer))))
  (def dialog (js-new $DlDialog (js-object :title "Qua REPL" :resizable #t)))
  (def layout (js-new $DlLayout (js-object :parent dialog)))
  (@packWidget layout ymacs (js-object :pos "bottom" :fill "*"))
  (setf (._focusedWidget dialog) ymacs)
  (@setSize dialog (js-object :x 1024 :y 768))
  (@show dialog #t)
  (@maximize dialog #t))

;;;; stdin/stdout

(defconstant +default-browser-stream+ (make-browser-stream))
  
(defun %arch-standard-input () +default-browser-stream+)
(defun %arch-standard-output () +default-browser-stream+)
