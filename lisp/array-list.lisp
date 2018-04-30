(defclass (array-list :e) ((list :e))
  (js-array))

(defun make-array-list (element-type-spec)
  (make-instance (list 'array-list element-type-spec) :js-array (js-array)))

(defmethod add ((self (js-array-list :e)) (element :e))
  (@push (slot-value self 'js-array) element))

(defclass (array-list-iterator :e) ((iterator :e))
  (js-array-list
   i))

(defmethod iterator ((self (js-array-list :e)) => (iterator :e))
  (make-instance (list 'array-list-iterator (type-parameter self :e))))
