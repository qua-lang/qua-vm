;; Test bindings
(def #'qua:assert #'%%assert)
(def #'qua:deep-equal #'%%deep-equal)

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

;;;; Quotation
(qua:assert (qua:deep-equal 'foo (quote foo)))
(qua:assert (qua:deep-equal '(foo bar) (quote (foo bar))))

;;;; Untyped lambda
(def #'lam1 (lambda () 10 11 12))
(def #'lam2 (lambda ()))
(qua:assert (qua:deep-equal 12 (lam1)))
(qua:assert (qua:deep-equal #void (lam2)))

(defun lam3 (x)
  1 2 3 x)
(qua:assert (qua:deep-equal 4 (lam3 4)))

;;;; APPLY
(qua:assert (qua:deep-equal (list 1 2 3)
                            (apply #'list (list 1 2 3))))

;;;; MAP-LIST
(qua:assert (qua:deep-equal (list 1 1 1)
                            (qua:map-list (lambda (#ign) 1)
                                          (list 1 2 3))))

;;;; Objects
(qua:assert (qua:deep-equal 'foo
                            (make 'symbol :name "foo" :ns "v")))
(qua:assert (qua:deep-equal :foo
                            (make 'keyword :name "foo")))

(defgeneric describe-yourself (self))
(defmethod describe-yourself ((self js:number)) "a number")
(defmethod describe-yourself ((self boolean)) "a boolean")
(defmethod describe-yourself ((self symbol)) "a symbol")
(defmethod describe-yourself ((self object)) "any other object")
(qua:assert (qua:deep-equal "a number" (describe-yourself 33)))
(qua:assert (qua:deep-equal "a boolean" (describe-yourself #t)))
(qua:assert (qua:deep-equal "a symbol" (describe-yourself 'foo)))
(qua:assert (qua:deep-equal "any other object" (describe-yourself :hello)))
(qua:assert (qua:deep-equal "any other object" (describe-yourself (list 1 2))))

;;;; "Keyword arguments"
(defun fun-with-keywords (:x x-param :y y-param)
  (list x-param y-param))

(qua:assert (qua:deep-equal (list 2 4)
                            (fun-with-keywords :x 2 :y 4)))

;;;; Basic classes
(defclass my-class ())
(defgeneric my-generic (self))
(defmethod my-generic ((self my-class))
  "wow!")
(def obj1 (make 'my-class))

(defclass my-subclass (my-class))
(def obj2 (make 'my-subclass))

(qua:assert (qua:deep-equal "wow!" (my-generic obj1)))
(qua:assert (qua:deep-equal "wow!" (my-generic obj2)))
(defmethod my-generic ((self my-subclass))
  "wowzers!")
(qua:assert (qua:deep-equal "wow!" (my-generic obj1)))
(qua:assert (qua:deep-equal "wowzers!" (my-generic obj2)))

;;;; SETQ
(let ()
  (def x 1)
  (def env (the-environment))
  (setq x 2 env)
  (qua:assert (qua:deep-equal 2 x)))
