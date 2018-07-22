;; Test bindings
(def #'%deep-equal (node:require "deep-equal"))
(deffexpr %assert (expr) env
  (unless (eval expr env)
    (print "assertion failed")
    (print expr)
    (%%panic "assertion failed")))
(defun #'%expect (expected actual) (%assert (%deep-equal expected actual)))

;;;; Forms
(%assert (%deep-equal 1 (car (cons 1 2))))
(%assert (%deep-equal 2 (cdr (cons 1 2))))

(%assert (%deep-equal 1 (car (list 1 2 3))))
(%assert (%deep-equal (list 2 3) (cdr (list 1 2 3))))

(%assert (%deep-equal 1 (car (list* 1 2 3))))
(%assert (%deep-equal (cons 2 3) (cdr (list* 1 2 3))))

(%assert (symbol? 'foo))
(%assert (symbol? :foo))

;;;; Evaluation
(def e1 (make-environment))
(eval (list #'def (quote x) 1) e1)
(%assert (%deep-equal 1 (eval (quote x) e1)))

(%assert (%deep-equal #void (progn)))
(%assert (%deep-equal 1 (progn 1)))
(%assert (%deep-equal 2 (progn 1 2)))

;;;; Operatives
(def e2 (make-environment))
(def #'fun2 (wrap (vau (p) #ign p)))
(eval (list #'def (quote x) 2) e2)
(eval (list #'def (quote #'fun2) #'fun2) e2)
(%assert (%deep-equal 2 (eval (list #'fun2 (quote x)) e2)))

;;;; Quotation
(%assert (%deep-equal 'foo (quote foo)))
(%assert (%deep-equal '(foo bar) (quote (foo bar))))

;;;; Untyped lambda
(def #'lam1 (lambda () 10 11 12))
(def #'lam2 (lambda ()))
(%assert (%deep-equal 12 (lam1)))
(%assert (%deep-equal #void (lam2)))

(defun lam3 (x)
  1 2 3 x)
(%assert (%deep-equal 4 (lam3 4)))

;;;; APPLY
(%assert (%deep-equal (list 1 2 3)
                      (apply #'list (list 1 2 3))))

;;;; MAP-LIST
(%assert (%deep-equal (list 1 1 1)
                      (map-list (lambda (#ign) 1)
                                (list 1 2 3))))

;;;; Objects
(defgeneric describe-yourself (self))
(defmethod describe-yourself ((the number self)) "a number")
(defmethod describe-yourself ((the boolean self)) "a boolean")
(defmethod describe-yourself ((the symbol self)) "a symbol")
(defmethod describe-yourself ((the object self)) "any other object")
(%assert (%deep-equal "a number" (describe-yourself 33)))
(%assert (%deep-equal "a boolean" (describe-yourself #t)))
(%assert (%deep-equal "a symbol" (describe-yourself 'foo)))
(%assert (%deep-equal "any other object" (describe-yourself (list 1 2))))

;;;; "Keyword arguments"
(defun fun-with-keywords (:x x-param :y y-param)
  (list x-param y-param))

(%assert (%deep-equal (list 2 4)
                      (fun-with-keywords :x 2 :y 4)))

;;;; Basic classes
(defstruct my-class)
(defgeneric my-generic (self))
(defmethod my-generic ((the object self))
  "wow!")
(def obj1 (make-instance 'my-class))
(%assert (%deep-equal "wow!" (my-generic obj1)))
(defmethod my-generic ((the my-class self))
  "wowzers!")
(%assert (%deep-equal "wowzers!" (my-generic obj1)))

;;;; Slots
(defstruct class-with-slots
  x
  y)
(def object-with-slots (make-instance 'class-with-slots :x 2 :y 4))
(%assert (%deep-equal 2 (slot-value object-with-slots 'x)))
(%assert (%deep-equal 4 (slot-value object-with-slots 'y)))
(%assert (slot-bound? object-with-slots 'x))
(%assert (slot-bound? object-with-slots 'y))
(%assert (not (slot-bound? object-with-slots 'z)))
(setf (slot-value object-with-slots 'x) 6)
(setf (slot-value object-with-slots 'y) 8)
(%assert (%deep-equal 6 (slot-value object-with-slots 'x)))
(%assert (%deep-equal 8 (slot-value object-with-slots 'y)))

;;;; SETQ
(let ((x 1))
  (let ((x 3))
    (setq x 2)
    (%assert (%deep-equal 2 x)))
  (%assert (%deep-equal 1 x))
  (let ()
    (setq x 2)
    (%assert (%deep-equal 2 x)))
  (%assert (%deep-equal 2 x)))

(let ((x #void))
  (let ((y #void))
    (let ((z #void))
      (setq (x y . z) (list 1 2 3 4))
      (%expect 1 x)
      (%expect 2 y)
      (%expect '(3 4) z))))

;;;; SETF
(let ((foo 1))
  (defun foo () foo)
  (%assert (%deep-equal (foo) 1))
  (def env (the-environment))
  (js-set #'foo "qua_setter" (lambda (new-val) (setq foo new-val)))
  (setf (foo) 2)
  (%assert (%deep-equal (foo) 2)))

(let ((x 12))
  (%expect 12 x)
  (setf x 14)
  (%expect 14 x)
  (incf x)
  (%expect 15 x)
  (incf x 2)
  (%expect 17 x)
  (decf x)
  (%expect 16 x)
  (decf x 2)
  (%expect 14 x))

;;;; Reference cells
(let ((box (make-box 12)))
  (%expect 12 (box-value box))
  (setf (box-value box) 14)
  (%expect 14 (box-value box))
  (incf (box-value box))
  (%expect 15 (box-value box))
  (incf (box-value box) 2)
  (%expect 17 (box-value box))
  (decf (box-value box))
  (%expect 16 (box-value box))
  (decf (box-value box) 2)
  (%expect 14 (box-value box)))

;;;; Simple control

(%expect 3 (block #ign 1 2 3))
(%expect 2 (block b 1 (return-from b 2) 3))

(%expect #void (cond))
(%expect 1 (cond ((%deep-equal 1 1) 1)))
(%expect #void (cond (#f 1)))
(%expect 2 (cond (#f 1) (#t 2) (#t 3)))

(%expect #t (and))
(%expect #t (and #t))
(%expect #f (and #f))
(%expect #t (and #t #t #t))
(%expect #f (and #t #t #t #f))

(%expect #f (or))
(%expect #t (or #t))
(%expect #f (or #f))
(%expect #f (or #f #f #f))
(%expect #t (or #f #f #f #t))

(%expect #void (case 12))
(%expect 1 (case 1 (1 1) (2 2) (3 3)))
(%expect 3 (case 3 (1 1) (2 2) (3 3)))
(%expect #void (case 4 (1 1) (2 2) (3 3)))

(%expect 1 (call-with-escape (lambda (#ign) 1)))
(%expect 2 (call-with-escape (lambda (escape) 1 (return-from escape 2) 3)))
(%expect #void (call-with-escape (lambda (escape) 1 (return-from escape) 3)))
(%expect #void (block x))
(%expect 1 (block x 1))
(%expect 2 (block x 1 (return-from x 2) 3))
(%expect #void (block x 1 (return-from x) 3))

(%expect 1 (unwind-protect 1))
(%expect 1 (unwind-protect 1 2))
(%expect 1 (unwind-protect 1 2 3))
(let ((box (make-box #f)))
  (%expect 1 (unwind-protect 1 (setf (box-value box) #t)))
  (%expect #t (box-value box)))
(let ((cell #f))
  (block exit
	 (unwind-protect (return-from exit)
	   (setf cell #t))
	 (%expect #t cell)))

(%expect #void (prog1))
(%expect 1 (prog1 1 2 3))
(%expect 2 (prog2 1 2 3))
(%expect #void (prog2 1))

(%expect 12 (flet ((bar () 3)
                   (foo () 4))
		  (* (bar) (foo))))
(%expect 12 (labels ((bar (x) (* x (foo)))
                     (foo () 4))
		    (bar 3)))

;;;; Dynamic variables

(defdynamic *my-dynamic* 1)

(progn
  (%expect 1 (dynamic *my-dynamic*))
  (dynamic-let ((*my-dynamic* 2))
               (%expect 2 (dynamic *my-dynamic*)))
  (%expect 1 (dynamic *my-dynamic*)))

(progn
  (%expect 1 (dynamic *my-dynamic*))
  (block exc
	 (dynamic-let ((*my-dynamic* 2))
                      (%expect 2 (dynamic *my-dynamic*))
                      (return-from exc)))
  (%expect 1 (dynamic *my-dynamic*)))

;;;; JS object
(let ((obj (js-object :message "hello" :sent (not #t))))
  (%assert (%deep-equal "hello" (.message obj)))
  (%assert (%deep-equal #f (.sent obj)))
  (%assert (own-property? obj "message"))
  (%assert (own-property? obj "sent"))
  (%assert (not (own-property? obj "xyz"))))

;;;; JS getter
(%assert (%deep-equal "String" (%%js-get (%%js-get "foo" "constructor") "name")))
(%assert (%deep-equal "String" (.name (.constructor "foo"))))
;; Can access raw Qua slots
(%assert (%deep-equal "foo" (.name 'foo)))
(%assert (%deep-equal "variable" (.ns 'foo)))
(%assert (%deep-equal "function" (.ns '#'foo)))
;; Can set slots
(let ((obj (js-object)))
  (setf (.message obj) "foo")
  (%assert (%deep-equal "foo" (.message obj))))

;;;; JS method invocation
(%assert (%deep-equal "12" (@toString 12)))

;;;; JS arrays
(%expect 2 (js-get (js-array 1 2 3) 1))

;;;; JS binops
(%expect "foobar" (+ "foo" "ba" "r"))
(%expect 1 (+ 1))
(%expect 6 (+ 2 2 2))

(%expect 3 (* 3))
(%expect 24 (* 4 3 2))

(%expect -4 (- 4))
(%expect 4 (- 8 2 2))

(%expect 0.25 (/ 4))
(%expect 1 (/ 12 4 3))

(%assert (< 1 2 3 4 5))
(%assert (not (< 1 2 3 4 5 -1)))
(%assert (> 5 4 3 2 1))
(%assert (not (> 5 4 3 2 1 6)))
(%assert (=== 1 1 1))
(%assert (not (=== 1 1 1 2)))

;;;; Utilities

(%expect 0 (list-length (list)))
(%expect 4 (list-length (list 1 2 3 4)))
(%expect 3 (list-elt (list 1 2 3 4) 2))

(%expect '(#void #void) (filter-list #'void? '(1 #void 2 #void)))
(%expect '(1 2 3 4) (append-lists '(1 2) '(3 4)))

;;;; Subclassing
(%assert (type? (make-instance 'simple-error) 'object))
(%assert (not (type? (make-instance 'object) 'simple-error)))

(%assert (type? 12 'number))
(%assert (type? 12 'object))

(%assert (eq (class-of (class object))
	     (class structure-class)))

;;;; Sequence protocol

(flet ((test-for-each (coll)
		      (let ((sum 0))
			(for-each (lambda (elt) (incf sum elt)) coll)
			(%expect 6 sum))))
      (test-for-each (list 1 2 3))
      (test-for-each (js-array 1 2 3)))

(%expect (list 2 4 6)
         (map (lambda (x) (* x 2)) (list 1 2 3)))
(%expect (js-array 2 4 6)
         (map (lambda (x) (* x 2)) (js-array 1 2 3)))
(%expect ()
         (map (lambda (x) (* x 2)) ()))
(%expect (js-array)
         (map (lambda (x) (* x 2)) (js-array)))

;;;; Metaclasses

;;; Construct metaclass that for every message sent to instances
;;; returns the same string.

(deffexpr defclass (name #ign #ign (:metaclass metaclass-name)) env
  (let* ((class-name (symbol-name name))
	 (class (make-class (find-class metaclass-name) class-name)))
    (eval (list #'def (to-type-sym name) class) env)))

(defstruct my-metaclass)

(defmethod compute-effective-method ((the my-metaclass class)
				     receiver
				     message
				     arguments)
  (lambda (self . #ign)
    "foo!"))

(defclass my-class-with-custom-metaclass ()
  ()
  (:metaclass my-metaclass))

(defgeneric my-custom-generic-1 (self))
(defgeneric my-custom-generic-2 (self))

;; Now any method call to an instance will do the same thing
(let ((obj (make-instance 'my-class-with-custom-metaclass)))
  (%expect "foo!" (my-custom-generic-1 obj))
  (%expect "foo!" (my-custom-generic-2 obj)))

;;;; Conditions

(defstruct condition-not-signaled
  condition-type)

(defun condition-not-signaled (condition-type)
  (make-instance 'condition-not-signaled :condition-type condition-type))

(defun %expect-condition (condition-type #'thunk)
  (block ok
    (handler-bind ((object
		    (lambda (condition)
		      (if (type? condition condition-type)
			  (return-from ok)
			(error (condition-not-signaled condition-type))))))
      (thunk))))

(%expect-condition
 'condition-not-signaled
 (lambda ()
   (%expect-condition
    'simple-error
    (progn))))

(%expect-condition
 'condition-not-signaled
 (lambda ()
   (%expect-condition
    'condition-not-signaled
    (lambda ()
      (%expect-condition
       'simple-error
       (simple-error "bla"))))))

(%expect-condition
 'restart-not-found
 (lambda ()
   (invoke-restart 'foo)))

(%expect-condition
 'restart-not-found
 (lambda ()
   (invoke-restart 12)))

(%expect
 3
 (block ok
	(restart-bind ((foo (lambda (x y)
			      (return-from ok (+ x y)))))
		      (the restart-handler (find-restart 'foo))
		      (the void (find-restart 'bar))
		      (invoke-restart 'foo 1 2))))
(%expect
 127
 (restart-bind ((make-number-cool (lambda (n) (+ n 100))
				  :interactive-function (lambda () (list 27))))
 	       (invoke-restart-interactively 'make-number-cool)))

(%expect
 '()
 (restart-bind ((restart-with-no-interactive-function (lambda args args)))
	       (invoke-restart-interactively 'restart-with-no-interactive-function)))

(%expect
 1000
 (block ok
	(restart-bind ((foo (lambda (x y)
			      (return-from ok (+ x y)))))
		      (restart-bind ((foo (lambda (x y)
					    (return-from ok 1000))))
				    (invoke-restart 'foo 1 2)))))

(%expect
 1000
 (block ok
	(let ((condition (make-instance 'simple-error)))
	  (restart-bind ((foo (lambda (x y)
				(return-from ok (+ x y)))
			      :associated-condition condition))
			(restart-bind ((foo (lambda (x y)
					      (return-from ok 1000))))
				      (let ((restart (find-restart 'foo condition)))
					(invoke-restart restart 1 2)))))))

(%expect
 3
 (block ok
	(let ((condition-1 (make-instance 'simple-error))
	      (condition-2 (make-instance 'simple-error)))
	  (restart-bind ((foo (lambda (x y)
				(return-from ok (+ x y)))
			      :associated-condition condition-1))
			(restart-bind ((foo (lambda (x y)
					      (return-from ok 1000))
					    :associated-condition condition-2))
				      (let ((restart (find-restart 'foo condition-1)))
					(invoke-restart restart 1 2)))))))

(%expect
 1000
 (block ok
	(let ((condition-1 (make-instance 'simple-error))
	      (condition-2 (make-instance 'simple-error)))
	  (restart-bind ((foo (lambda (x y)
				(return-from ok (+ x y)))
			      :associated-condition condition-1))
			(restart-bind ((foo (lambda (x y)
					      (return-from ok 1000))
					    :associated-condition condition-2))
				      (let ((restart (find-restart 'foo condition-2)))
					(invoke-restart restart 1 2)))))))

;;;; Types
(%expect #void (typecase #t))
(%expect 2 (typecase #t (number 1) (boolean 2)))
(%expect 1 (typecase 10 (number 1) (boolean 2)))
(%expect #void (typecase "foo" (number 1) (boolean 2)))

(%expect "default" (typecase 'whatever (#t "default")))
(%expect 1 (typecase 'whatever (symbol 1) (#t "default")))
(%expect "default" (typecase 'whatever (number 1) (#t "default")))

(%expect 4 (the object (+ 2 2)))
(%expect 4 (the number (+ 2 2)))
(%expect-condition 'type-mismatch-error
		   (lambda () (the string 12)))

;;;; Matchers
(let (((the cons x) (cons 1 2)))
  (%expect (cons 1 2) x))

(%expect-condition 'type-mismatch-error
		   (lambda ()
		     (let (((the string x) (cons 1 2))))))

;; Can use with SETQ, including parallely
(let ((x #void) (y #void))
  (setq ((the string x) (the number y))
	(list "foo" 12))
  (%expect "foo" x)
  (%expect 12 y))

(print "OK")
