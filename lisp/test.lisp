;; Test bindings
(def #'%assert #'%%assert)
(def #'%deep-equal #'%%deep-equal)
(defun #'%expect (expected actual) (%assert (%deep-equal expected actual)))

;;;; Forms
(%assert (%deep-equal 1 (car (cons 1 2))))
(%assert (%deep-equal 2 (cdr (cons 1 2))))

(%assert (%deep-equal 1 (car (list 1 2 3))))
(%assert (%deep-equal (list 2 3) (cdr (list 1 2 3))))

(%assert (%deep-equal 1 (car (list* 1 2 3))))
(%assert (%deep-equal (cons 2 3) (cdr (list* 1 2 3))))

(%assert (symbol? 'foo))
(%assert (keyword? :foo))

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
(%assert (%deep-equal 'foo
                            (make-instance 'symbol :name "foo" :ns "v")))
(%assert (%deep-equal :foo
                            (make-instance 'keyword :name "foo")))

(defgeneric describe-yourself (self))
(defmethod describe-yourself ((self js-number)) "a number")
(defmethod describe-yourself ((self boolean)) "a boolean")
(defmethod describe-yourself ((self symbol)) "a symbol")
(defmethod describe-yourself ((self object)) "any other object")
(%assert (%deep-equal "a number" (describe-yourself 33)))
(%assert (%deep-equal "a boolean" (describe-yourself #t)))
(%assert (%deep-equal "a symbol" (describe-yourself 'foo)))
(%assert (%deep-equal "any other object" (describe-yourself :hello)))
(%assert (%deep-equal "any other object" (describe-yourself (list 1 2))))

;;;; "Keyword arguments"
(defun fun-with-keywords (:x x-param :y y-param)
  (list x-param y-param))

(%assert (%deep-equal (list 2 4)
                            (fun-with-keywords :x 2 :y 4)))

;;;; Basic classes
(defclass my-class ())
(defgeneric my-generic (self))
(defmethod my-generic ((self my-class))
  "wow!")
(def obj1 (make-instance 'my-class))

(defclass my-subclass (my-class))
(def obj2 (make-instance 'my-subclass))

(%assert (%deep-equal "wow!" (my-generic obj1)))
(%assert (%deep-equal "wow!" (my-generic obj2)))
(defmethod my-generic ((self my-subclass))
  "wowzers!")
(%assert (%deep-equal "wow!" (my-generic obj1)))
(%assert (%deep-equal "wowzers!" (my-generic obj2)))

;;;; Slots
(defclass class-with-slots ()
  (x :type number
   y :type number))
(def object-with-slots (make-instance 'class-with-slots :x 2 :y 4))
(%assert (%deep-equal 2 (slot-value object-with-slots 'x)))
(%assert (%deep-equal 4 (slot-value object-with-slots 'y)))
(%assert (slot-bound? object-with-slots 'x))
(%assert (slot-bound? object-with-slots 'y))
(%assert (not (slot-bound? object-with-slots 'z)))
(set-slot-value object-with-slots 'x 6)
(set-slot-value object-with-slots 'y 8)
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
(let ((cell (mut 12)))
  (%expect 12 (ref cell))
  (setf (ref cell) 14)
  (%expect 14 (ref cell))
  (incf (ref cell))
  (%expect 15 (ref cell))
  (incf (ref cell) 2)
  (%expect 17 (ref cell))
  (decf (ref cell))
  (%expect 16 (ref cell))
  (decf (ref cell) 2)
  (%expect 14 (ref cell)))

;;;; Simple control

(%expect 2 (%%rescue (lambda (exc) exc)
                        (lambda ()
                          2)))

(%expect 'foo (%%rescue (lambda (exc) exc)
                           (lambda ()
                             (%%raise 'foo))))

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

(%expect 1 (%call-with-escape (lambda (#ign) 1)))
(%expect 2 (%call-with-escape (lambda (escape) 1 (return-from escape 2) 3)))
(%expect #void (%call-with-escape (lambda (escape) 1 (return-from escape) 3)))
(%expect #void (block x))
(%expect 1 (block x 1))
(%expect 2 (block x 1 (return-from x 2) 3))
(%expect #void (block x 1 (return-from x) 3))

(%expect 1 (unwind-protect 1))
(%expect 1 (unwind-protect 1 2))
(%expect 1 (unwind-protect 1 2 3))
(let ((cell (mut #f)))
  (%expect 1 (unwind-protect 1 (setf (ref cell) #t)))
  (%expect #t (ref cell)))
(let ((cell (mut #f)))
  (block exit
    (%%rescue (lambda (exc)
                (%expect "foo" exc)
                (%expect #t (ref cell))
                (return-from exit))
              (lambda ()
                (unwind-protect (%%raise "foo")
                  (setf (ref cell) #t))))
    (%assert #f)))

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

(block exit
  (%expect 1 (dynamic *my-dynamic*))
  (%%rescue (lambda (exc)
              (%expect "foo" exc)
              (%expect 1 (dynamic *my-dynamic*))
              (return-from exit))
            (lambda ()
              (dynamic-let ((*my-dynamic* 2))
                (%expect 2 (dynamic *my-dynamic*))
                (%%raise "foo"))))
  (%assert #f))

;;;; JS object
(let ((obj (js-object :message "hello" :sent (not #t))))
  (%assert (%deep-equal "hello" (.message obj)))
  (%assert (%deep-equal #f (.sent obj))))

;;;; JS getter
(%assert (%deep-equal "String" (%%js-get (%%js-get "foo" "constructor") "name")))
(%assert (%deep-equal "String" (.name (.constructor "foo"))))
; Can access raw Qua slots
(%assert (%deep-equal "foo" (.qs_name 'foo)))
(%assert (%deep-equal "v" (.qs_ns 'foo)))
(%assert (%deep-equal "f" (.qs_ns '#'foo)))
; Can set slots
(let ((obj (create-js-object)))
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

;;;; Conditions

(%expect #void (handler-bind ()))
(%expect #t (handler-bind () 1 2 (= #t #t)))
(%expect 1
            (block b
              (handler-bind ((condition (lambda (c) (return-from b 1))))
                (signal (make-instance 'condition))
                2)))

(%expect 2
            (block b
              (handler-bind ((warning (lambda (c) (return-from b 1)))
                             (serious-condition (lambda (c) (return-from b 2))))
                (signal (make-instance 'error))
                3)))

(%expect #void (signal (make-instance 'condition)))

(%expect "foo"
            (block exit
              (handler-bind ((condition (lambda #ign (invoke-restart (make-instance 'continue)))))
                (restart-bind ((continue (lambda #ign (return-from exit "foo"))))
                  (signal (make-instance 'condition))))))

;;;; Subclassing
(%assert (instance? (make-instance 'serious-condition) 'object))
(%assert (instance? (make-instance 'error) 'serious-condition))
(%assert (instance? (make-instance 'error) 'object))
(%assert (not (instance? (make-instance 'object) 'error)))

(%assert (instance? 12 'js-number))
(%assert (instance? 12 'number))
(%assert (instance? 12 'object))
(%assert (not (instance? 12 'standard-object)))

(%assert (instance? (.qs_direct-superclasses (find-generic-class 'object)) 'js-array))
(%assert (instance? (.qs_slots (find-generic-class 'object)) 'js-object))

;;;; Types
(%expect #void (typecase #t))
(%expect 2 (typecase #t (number 1) (boolean 2)))
(%expect 1 (typecase 10 (number 1) (boolean 2)))
(%expect #void (typecase "foo" (number 1) (boolean 2)))

(%expect "default" (typecase 'whatever (#t "default")))
(%expect 1 (typecase 'whatever (symbol 1) (#t "default")))
(%expect "default" (typecase 'whatever (number 1) (#t "default")))

(%expect (make-instance '%generic-param
                           :in-type (%parse-type-spec 'number)
                           :out-type (%parse-type-spec 'boolean))
            (%parse-generic-param-spec '(:io number boolean)))
(%expect (make-instance '%generic-param
                           :in-type (%parse-type-spec 'number)
                           :out-type %the-top-type)
            (%parse-generic-param-spec '(:in number)))
(%expect (make-instance '%generic-param
                           :in-type %the-bottom-type
                           :out-type (%parse-type-spec 'number))
            (%parse-generic-param-spec '(:out number)))
(%expect (make-instance '%generic-param
                           :in-type (%parse-type-spec 'number)
                           :out-type (%parse-type-spec 'number))
            (%parse-generic-param-spec 'number))
(%expect (make-instance '%generic-param
                           :in-type (%parse-type-spec '(hash-set number))
                           :out-type (%parse-type-spec '(hash-set number)))
            (%parse-generic-param-spec '(hash-set number)))

            
(%expect (make-instance '%type-variable :name "foo")
            (%parse-type-spec :foo))
(%expect (make-instance '%class-type :name "foo" :generic-params '())
            (%parse-type-spec 'foo))
(%expect (make-instance '%class-type :name "foo" :generic-params '())
            (%parse-type-spec '(foo)))
(%expect (make-instance '%class-type
                           :name "hash-set"
                           :generic-params
                           (list 
                            (make-instance '%generic-param
                                           :in-type (%parse-type-spec 'number)
                                           :out-type (%parse-type-spec 'number))))
            (%parse-type-spec '(hash-set number)))
(%expect (make-instance '%class-type
                           :name "hash-set"
                           :generic-params
                           (list 
                            (make-instance '%generic-param
                                           :in-type (%parse-type-spec 'number)
                                           :out-type %the-top-type)))
            (%parse-type-spec '(hash-set (:in number))))

;;;; Generic collections

;(let ((list (make-array-list 'number)))
;  (add list 1)
;  (add list 2))
