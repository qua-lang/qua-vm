(defclass (array-list :e) ((list :e))
  (js-array))

(defun make-array-list (type-spec)
  (make-instance (list 'array-list type-spec) :js-array (js-array)))

(defmethod add ((self (js-array-list :e)) (element :e))
  (@push (slot-value self 'js-array) element))
