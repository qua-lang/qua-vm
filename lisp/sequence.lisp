(defclass (sequence :e) (standard-object) ())

;; PLOT's sequence iteration protocol
(defgeneric start-iteration (sequence) => iteration-state)
(defgeneric end? (sequence iteration-state) => boolean)
(defgeneric current (sequence iteration-state) => element)
(defgeneric advance (sequence iteration-state) => iteration-state)

(defgeneric empty-clone (sequence))
(defgeneric finish-clone (sequence))
(defmethod finish-clone ((obj object)) obj)

(defun for-each (#'fn seq)
  (let ((state (start-iteration seq)))
    (while (not (end? seq state))
      (fn (current seq state))
      (setq state (advance seq state)))))

(defun map (#'fn seq)
  (let ((result (empty-clone seq))
        (state (start-iteration seq)))
    (while (not (end? seq state))
      (setq result (add result (fn (current seq state))))
      (setq state (advance seq state)))
    (finish-clone result)))

(defmethod start-iteration ((self cons)) self)
(defmethod end? ((self cons) state) (nil? state))
(defmethod current ((self cons) state) (car state))
(defmethod advance ((self cons) state) (cdr state))
(defmethod start-iteration ((self nil)) #nil)
(defmethod end? ((self nil) state) #t)
(defmethod current ((self nil) state) (simple-error "At end"))
(defmethod advance ((self nil) state) (simple-error "Can't advance past end"))

(defmethod empty-clone ((self list)) #nil)
(defmethod finish-clone ((self cons)) (reverse-list self))
(defmethod add ((self list) elt) (cons elt self))
