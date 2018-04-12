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
                            (map-list (lambda (#ign) 1)
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

;;;; Slots
(defclass class-with-slots ()
  (x :type number
   y :type number))
(def object-with-slots (make 'class-with-slots :x 2 :y 4))
(qua:assert (qua:deep-equal 2 (slot-value object-with-slots 'x)))
(qua:assert (qua:deep-equal 4 (slot-value object-with-slots 'y)))
(qua:assert (slot-bound-p object-with-slots 'x))
(qua:assert (slot-bound-p object-with-slots 'y))
(qua:assert (not (slot-bound-p object-with-slots 'z)))
(set-slot-value object-with-slots 'x 6)
(set-slot-value object-with-slots 'y 8)
(qua:assert (qua:deep-equal 6 (slot-value object-with-slots 'x)))
(qua:assert (qua:deep-equal 8 (slot-value object-with-slots 'y)))

;;;; SETQ
(let ((x 1))
  (setq (the-environment) x 2)
  (qua:assert (qua:deep-equal 2 x)))

;;;; SETF
(let ((foo 1))
  (defun foo () foo)
  (qua:assert (qua:deep-equal (foo) 1))
  (def env (the-environment))
  (js:set #'foo "qua_setter" (lambda (new-val) (setq env foo new-val)))
  (setf (foo) 2)
  (qua:assert (qua:deep-equal (foo) 2)))

;;;; Dictionaries

(let ((dict (make-dict)))
  (dict-put dict "foo" 12)
  (dict-put dict "bar" 14)
  (qua:assert (qua:deep-equal 12 (dict-get dict "foo")))
  (qua:assert (qua:deep-equal 14 (dict-get dict "bar"))))

;;;; JS getter
(qua:assert (qua:deep-equal "String" (%%js:get (%%js:get "foo" "constructor") "name")))
(qua:assert (qua:deep-equal "String" (.name (.constructor "foo"))))
; Can access raw Qua slots
(qua:assert (qua:deep-equal "foo" (.qs_name 'foo)))
(qua:assert (qua:deep-equal "v" (.qs_ns 'foo)))
(qua:assert (qua:deep-equal "f" (.qs_ns '#'foo)))
; Can set slots
(let ((obj (js:create-object #null)))
  (setf (.message obj) "foo")
  (qua:assert (qua:deep-equal "foo" (.message obj))))

;;;; JS method invocation
(qua:assert (qua:deep-equal "12" (@toString 12)))

;;;; JS object
(let ((obj (js:object :message "hello" :sent (not #t))))
  (qua:assert (qua:deep-equal "hello" (.message obj)))
  (qua:assert (qua:deep-equal #f (.sent obj))))
