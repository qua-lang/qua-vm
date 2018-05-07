(defclass (js-array-list :e) ((array-list :e))
  (js-array))

(defun make-js-array-list (element-type-spec . elements)
  (let ((list (make-instance (list 'js-array-list element-type-spec)
                             :js-array (js-array))))
    (for-each (lambda (e) (add list e)) elements)
    list))

(defmethod add ((self (js-array-list :e)) (element :e))
  (@push (slot-value self 'js-array) element)
  self)

(defmethod len ((self (js-array-list :e)))
  (.length (slot-value self 'js-array)))

(defmethod elt ((self (js-array-list :e)) (index number))
  (js-get (slot-value self 'js-array) index))

(defmethod start-iteration ((self js-array-list))
  0)

(defmethod end? ((self js-array-list) state)
  (not (< state (len self))))

(defmethod current ((self js-array-list) state)
  (elt self state))

(defmethod advance ((self js-array-list) state)
  (+ state 1))

(defmethod empty-clone ((self js-array-list))
  ; TODO: use proper type
  (make-js-array-list 'object))
