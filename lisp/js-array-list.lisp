; LIST backed by a JS-ARRAY.
(defclass (js-array-list :e) ((list :e))
  (js-array))

(defun make-js-array-list (element-type-spec)
  (make-instance (list 'js-array-list element-type-spec) :js-array (js-array)))

(defmethod add ((self (js-array-list :e)) (element :e))
  (@push (slot-value self 'js-array) element))

;; (put-method (find-generic-class 'js-array-list)
;;             'add
;;             (lambda (self element)
;;               (check-type-variable :e element)
;;               (the 'object
;;                    (progn
;;                      (@push (slot-value self 'js-array) element)))))