;;;; Forms
(qua:assert (qua:deep-equal 1 (car (cons 1 2))))
(qua:assert (qua:deep-equal 2 (cdr (cons 1 2))))

(qua:assert (qua:deep-equal 1 (car (list 1 2 3))))
(qua:assert (qua:deep-equal (list 2 3) (cdr (list 1 2 3))))

(qua:assert (qua:deep-equal 1 (car (list* 1 2 3))))
(qua:assert (qua:deep-equal (cons 2 3) (cdr (list* 1 2 3))))
;;;; Evaluation
(def e1 (make-environment))
(eval (list #'def (quote x) 1) e1)
(qua:assert (qua:deep-equal 1 (eval (quote x) e1)))

(qua:assert (qua:deep-equal #void (progn)))
(qua:assert (qua:deep-equal 1 (progn 1)))
(qua:assert (qua:deep-equal 2 (progn 1 2)))
;;;; Operatives
(def e2 (make-environment))
(def #'fun2 (wrap (vau (p) #ign p)))
(eval (list #'def (quote x) 2) e2)
(eval (list #'def (quote #'fun2) #'fun2) e2)
(qua:assert (qua:deep-equal 2 (eval (list #'fun2 (quote x)) e2)))
