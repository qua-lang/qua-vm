;; Test bindings
(def #'qua:assert #'%%assert)
(def #'qua:deep-equal #'%%deep-equal)
(defun #'qua:expect (expected actual) (qua:assert (qua:deep-equal expected actual)))

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
                            (make-instance 'symbol :name "foo" :ns "v")))
(qua:assert (qua:deep-equal :foo
                            (make-instance 'keyword :name "foo")))

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
(def obj1 (make-instance 'my-class))

(defclass my-subclass (my-class))
(def obj2 (make-instance 'my-subclass))

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
(def object-with-slots (make-instance 'class-with-slots :x 2 :y 4))
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

;;;; Reference cells
(let ((cell (mut 12)))
  (qua:expect 12 (ref cell))
  (setf (ref cell) 14)
  (qua:expect 14 (ref cell)))

;;;; Simple control

(qua:expect 2 (%%rescue (lambda (exc) exc)
                        (lambda ()
                          2)))

(qua:expect 'foo (%%rescue (lambda (exc) exc)
                           (lambda ()
                             (%%raise 'foo))))

(qua:expect #void (cond))
(qua:expect 1 (cond ((qua:deep-equal 1 1) 1)))
(qua:expect #void (cond (#f 1)))
(qua:expect 2 (cond (#f 1) (#t 2) (#t 3)))

(qua:expect #t (and))
(qua:expect #t (and #t))
(qua:expect #f (and #f))
(qua:expect #t (and #t #t #t))
(qua:expect #f (and #t #t #t #f))

(qua:expect #f (or))
(qua:expect #t (or #t))
(qua:expect #f (or #f))
(qua:expect #f (or #f #f #f))
(qua:expect #t (or #f #f #f #t))

(qua:expect #void (case 12))
(qua:expect 1 (case 1 (1 1) (2 2) (3 3)))
(qua:expect 3 (case 3 (1 1) (2 2) (3 3)))
(qua:expect #void (case 4 (1 1) (2 2) (3 3)))

(qua:expect 1 (call-with-escape (lambda (#ign) 1)))
(qua:expect 2 (call-with-escape (lambda (escape) 1 (return-from escape 2) 3)))
(qua:expect #void (call-with-escape (lambda (escape) 1 (return-from escape) 3)))
(qua:expect #void (block x))
(qua:expect 1 (block x 1))
(qua:expect 2 (block x 1 (return-from x 2) 3))
(qua:expect #void (block x 1 (return-from x) 3))

(qua:expect 1 (unwind-protect 1))
(qua:expect 1 (unwind-protect 1 2))
(qua:expect 1 (unwind-protect 1 2 3))
(let ((cell (mut #f)))
  (qua:expect 1 (unwind-protect 1 (setf (ref cell) #t)))
  (qua:expect #t (ref cell)))
(let ((cell (mut #f)))
  (block exit
    (%%rescue (lambda (exc)
                (qua:expect "foo" exc)
                (qua:expect #t (ref cell))
                (return-from exit))
              (lambda ()
                (unwind-protect (%%raise "foo")
                  (setf (ref cell) #t))))
    (qua:assert #f)))

(qua:expect #void (prog1))
(qua:expect 1 (prog1 1 2 3))
(qua:expect 2 (prog2 1 2 3))
(qua:expect #void (prog2 1))

;;;; DYNAMIC-WIND
(qua:expect 1 (dynamic-wind (lambda ()) (lambda () 1) (lambda ())))

(let ((cell (mut 0)))
  (qua:expect 2 (dynamic-wind
                 (lambda () (setf (ref cell) 1))
                 (lambda () (qua:expect 1 (ref cell)) 2)
                 (lambda () (setf (ref cell) 3))))
  (qua:expect 3 (ref cell)))

(let* ((cell (mut 0))
       (coro (coro:run (lambda ()
                         (dynamic-wind
                          (lambda () (setf (ref cell) 1))
                          (lambda ()
                            (qua:expect 1 (ref cell))
                            (coro:yield)
                            (qua:expect 1 (ref cell)))
                          (lambda ()
                            (setf (ref cell) 2)))))))
  (qua:expect 2 (ref cell))
  (def coro (coro:resume coro))
  (qua:expect 2 (ref cell)))

;;;; Dynamic variables

(defdynamic *my-dynamic* 1)

(progn
  (qua:expect 1 (dynamic *my-dynamic*))
  (dynamic-let-1 *my-dynamic* 2
                 (lambda ()
                   (qua:expect 2 (dynamic *my-dynamic*))))
  (qua:expect 1 (dynamic *my-dynamic*)))

(block exit
  (qua:expect 1 (dynamic *my-dynamic*))
  (%%rescue (lambda (exc)
              (qua:expect "foo" exc)
              (qua:expect 1 (dynamic *my-dynamic*))
              (return-from exit))
            (lambda ()
              (dynamic-let-1 *my-dynamic* 2
                             (lambda ()
                               (qua:expect 2 (dynamic *my-dynamic*))
                               (%%raise "foo")))))
  (qua:assert #f))

;;;; Coroutines

(let ((coro (coro:run (lambda ()
                        1))))
  (qua:assert (qua:deep-equal 1 coro)))

(let ((coro (coro:run (lambda ()
                        (qua:assert (qua:deep-equal 2 (coro:yield 1)))
                        (qua:assert (qua:deep-equal #void (coro:yield)))
                        3))))
  (qua:assert (qua:deep-equal 1 (coro:value coro)))
  (def coro (coro:resume coro 2))
  (qua:assert (qua:deep-equal #void (coro:value coro)))
  (def coro (coro:resume coro))
  (qua:assert (qua:deep-equal coro 3)))

;;;; JS object
(let ((obj (js:object :message "hello" :sent (not #t))))
  (qua:assert (qua:deep-equal "hello" (.message obj)))
  (qua:assert (qua:deep-equal #f (.sent obj))))

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

;;;; JS arrays
(qua:expect 2 (js:get (js:array 1 2 3) 1))

;;;; JS binops
(qua:expect "foobar" (+ "foo" "ba" "r"))
(qua:expect 6 (+ 2 2 2))

(qua:expect 3 (* 3))
(qua:expect 24 (* 4 3 2))

(qua:expect -4 (- 4))
(qua:expect 4 (- 8 2 2))

(qua:expect 1 (/ 12 4 3))

;;;; Conditions

(qua:expect #void (handler-bind ()))
(qua:expect #t (handler-bind () 1 2 (eq #t #t)))
(qua:expect 1
            (block b
              (handler-bind ((condition (lambda (c) (return-from b 1))))
                (signal (make-instance 'condition))
                2)))

(qua:expect 2
            (block b
              (handler-bind ((warning (lambda (c) (return-from b 1)))
                             (serious-condition (lambda (c) (return-from b 2))))
                (signal (make-instance 'error))
                3)))

(qua:expect #void (signal (make-instance 'condition)))

(qua:expect "foo"
            (block exit
              (handler-bind ((condition (lambda #ign (invoke-restart (make-instance 'continue)))))
                (restart-bind ((continue (lambda #ign (return-from exit "foo"))))
                  (signal (make-instance 'condition))))))

;;;; Subclassing
(qua:assert (typep (make-instance 'serious-condition) 'object))
(qua:assert (typep (make-instance 'error) 'serious-condition))
(qua:assert (typep (make-instance 'error) 'object))
(qua:assert (not (typep (make-instance 'object) 'error)))

(qua:assert (typep 12 'js:number))
(qua:assert (typep 12 'number))
(qua:assert (typep 12 'object))
(qua:assert (not (typep 12 'standard-object)))

(qua:assert (typep (.qs_direct-superclasses (find-generic-class 'object)) 'js:array))
(qua:assert (typep (.qs_slots (find-generic-class 'object)) 'js:object))

;;;; Types
(qua:expect #void (typecase #t))
(qua:expect 2 (typecase #t (number 1) (boolean 2)))
(qua:expect 1 (typecase 10 (number 1) (boolean 2)))
(qua:expect #void (typecase "foo" (number 1) (boolean 2)))

(qua:expect "default" (typecase 'whatever (#t "default")))
(qua:expect 1 (typecase 'whatever (symbol 1) (#t "default")))
(qua:expect "default" (typecase 'whatever (number 1) (#t "default")))

(qua:assert (qua:type-variable-p '?t))
(qua:assert (not (qua:type-variable-p 't)))

(qua:expect (make-instance 'qua:generic-param
                           :in-type (qua:parse-type-spec 'number)
                           :out-type (qua:parse-type-spec 'boolean))
            (qua:parse-generic-param-spec '(:io number boolean)))
(qua:expect (make-instance 'qua:generic-param
                           :in-type (qua:parse-type-spec 'number)
                           :out-type qua:the-top-type)
            (qua:parse-generic-param-spec '(:in number)))
(qua:expect (make-instance 'qua:generic-param
                           :in-type qua:the-bottom-type
                           :out-type (qua:parse-type-spec 'number))
            (qua:parse-generic-param-spec '(:out number)))
(qua:expect (make-instance 'qua:generic-param
                           :in-type (qua:parse-type-spec 'number)
                           :out-type (qua:parse-type-spec 'number))
            (qua:parse-generic-param-spec 'number))
(qua:expect (make-instance 'qua:generic-param
                           :in-type (qua:parse-type-spec '(hash-set number))
                           :out-type (qua:parse-type-spec '(hash-set number)))
            (qua:parse-generic-param-spec '(hash-set number)))

            
(qua:expect (make-instance 'qua:type-variable :name "?foo")
            (qua:parse-type-spec '?foo))
(qua:expect (make-instance 'qua:class-type :name "foo" :generic-params '())
            (qua:parse-type-spec 'foo))
(qua:expect (make-instance 'qua:class-type :name "foo" :generic-params '())
            (qua:parse-type-spec '(foo)))
(qua:expect (make-instance 'qua:class-type
                           :name "hash-set"
                           :generic-params
                           (list 
                            (make-instance 'qua:generic-param
                                           :in-type (qua:parse-type-spec 'number)
                                           :out-type (qua:parse-type-spec 'number))))
            (qua:parse-type-spec '(hash-set number)))
(qua:expect (make-instance 'qua:class-type
                           :name "hash-set"
                           :generic-params
                           (list 
                            (make-instance 'qua:generic-param
                                           :in-type (qua:parse-type-spec 'number)
                                           :out-type qua:the-top-type)))
            (qua:parse-type-spec '(hash-set (:in number))))

