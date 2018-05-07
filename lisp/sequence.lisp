(defclass (sequence :e) (standard-object) ())

(defgeneric start-iteration (sequence) => iteration-state)
(defgeneric end? (sequence iteration-state) => boolean)
(defgeneric current (sequence iteration-state) => element)
(defgeneric advance (sequence iteration-state) => iteration-state)

(defun for-each (#'fn seq)
  (let ((state (start-iteration seq)))
    (while (not (end? seq state))
      (fn (current seq state))
      (setq state (advance seq state)))))

(defmethod start-iteration ((c cons)) c)
(defmethod end? ((c cons) state) (nil? state))
(defmethod current ((c cons) state) (car state))
(defmethod advance ((c cons) state) (cdr state))
(defmethod start-iteration ((nil nil)) #nil)
(defmethod end? ((nil nil) state) #t)
(defmethod current ((nil nil) state) (simple-error "At end"))
(defmethod advance ((nil nil) state) (simple-error "Can't advance past end"))
