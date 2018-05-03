(defclass (js-array-list :e) ((list :e))
  (js-array))

(defun make-js-array-list (element-type-spec)
  (make-instance (list 'js-array-list element-type-spec)
                 :js-array (js-array)))

(defmethod add ((self (js-array-list :e)) (element :e))
  (@push (slot-value self 'js-array) element))

(defmethod len ((self (js-array-list :e)))
  (.length (slot-value self 'js-array)))

(defmethod elt ((self (js-array-list :e)) (index number))
  (js-get (slot-value self 'js-array) index))

(defclass (js-array-list-iterator :e) ((iterator :e))
  (js-array-list
   current-index))

(defmethod iterator ((self (js-array-list :e)))
  ; TODO: use type parameter :E from list
  (make-instance 'js-array-list-iterator
                 :js-array-list self
                 :current-index 0))

(defmethod next? ((self (js-array-list-iterator :e)))
  (< (slot-value self 'current-index)
     (len (slot-value self 'js-array-list))))

(defmethod next ((self (js-array-list-iterator :e)))
  (if (next? self)
      (prog1 (elt (slot-value self 'js-array-list)
                  (slot-value self 'current-index))
        (incf (slot-value self 'current-index)))))
