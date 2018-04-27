;; The forms in this file get evaluated immediately after VM startup,
;; with only primitive bindings provided by the JS code (%%-prefixed),
;; in order to setup the high-level user language.  The user language
;; combiners should all be defined as type-checked functions and
;; fortified macros -- which we don't have yet.  So we need to define
;; unsafe barebones implementations for some combiners such as LET.
;; These will then later be overridden with the safer user language
;; combiners.

;;;; Import primitive bindings

(%%def #'def #'%%def) ; Bind new or update symbols in current environment.
(def #'car #'%%car) ; Access first element of pair.
(def #'cdr #'%%cdr) ; Access second element of pair.
(def #'cons #'%%cons) ; Construct a new pair.
(def #'eq #'%%eq) ; Compare two values for pointer equality.
(def #'eval #'%%eval) ; Evaluate an expression in an environment.
(def #'%if #'%%if) ; Evaluate either of two expressions depending on a test.
(def #'make-environment #'%%make-environment) ; Create new lexical environment.
(def #'print #'%%print) ; Print line.
(def #'progn #'%%progn) ; Evaluate expressions in order.
(def #'setq #'%%setq) ; Update existing bindings in current or ancestor environment.
(def #'unwrap #'%%unwrap) ; Extract fexpr underlying a function.
(def #'wrap #'%%wrap) ; Construct a function out of a fexpr.
;; Objects:
(def #'concrete-class-of #'%%concrete-class-of)
(def #'ensure-class #'%%ensure-class)
(def #'find-concrete-class #'%%find-concrete-class)
(def #'find-generic-class #'%%find-generic-class)
(def #'find-method #'%%find-method)
(def #'generic-class-of #'%%generic-class-of)
(def #'instance? #'%%instance?)
(def #'put-method #'%%put-method)
(def #'set-slot-value #'%%set-slot-value)
(def #'slot-bound? #'%%slot-bound?)
(def #'slot-value #'%%slot-value)
;; JS:
(def #'js-apply #'%%js-apply)
(def #'js-function #'%%js-function)
(def #'js-get #'%%js-get)
(def #'js-global #'%%js-global)
(def #'js-new #'%%js-new)
(def #'js-set #'%%js-set)
;; Use one % as prefix for stuff that's not expected to be called by
;; the user or that doesn't have a final API yet.
(def #'%to-fun-sym #'%%to-fun-sym) ; Turn any symbol into a function namespaced one.
;; Optimization bindings:
(def #'list* #'%%list*) ; Construct list of arguments, with the final argument as tail.
(def #'list-to-js-array #'%%list-to-array)
(def #'plist-to-js-object #'%%plist-to-js-object)

(def #'= #'eq) ; Use EQ for now as generic equality (since it works for JS values)
(def #'defconstant #'def) ; The only constant is change.

;;;; Basics

(def #'quote (%%vau (op) #ign op)) ; Prevent evaluation of its single operand.
(def #'list (wrap (%%vau args #ign args))) ; Construct list of arguments.
(def #'the-environment (%%vau #ign env env)) ; Return current lexical environment.

;;;; Fexprs

; Construct a fexpr.  Primitive %%VAU has only one body statement, so use PROGN.
(def #'vau
  (%%vau (params env-param . body) env
    (eval (list #'%%vau params env-param 
                (list* #'progn body))
          env)))

; Define a named fexpr in the current environment.
(def #'deffexpr 
  (vau (name params env-param . body) env
    (eval (list #'def (%to-fun-sym name) 
                (list* #'vau params env-param body))
          env)))

;;;; Macros

; Create a macro given an expander fexpr that receives and returns a form.
(def #'make-macro
  (wrap
    (vau (expander) #ign
      (vau form env
        (eval
         (eval (cons expander form) (make-environment))
         env)))))

; Macro-constructing user interface macro for MAKE-MACRO.
(def #'macro
  (make-macro
    (vau (params . body) #ign
      (list #'make-macro (list* #'vau params #ign body)))))

; Define a named macro in the current environment.
(def #'defmacro
  (macro (name params . body)
    (list #'def (%to-fun-sym name) (list* #'macro params body))))

;;;; Functions

; Create a function that doesn't do any type checking.
(defmacro %lambda (params . body)
  (list #'wrap (list* #'vau params #ign body)))

; Define a named function that doesn't do any type checking in the
; current environment.
(defmacro %defun (name params . body)
  (list #'def (%to-fun-sym name) (list* #'%lambda params body)))

; Use the unchecked versions for LAMBDA and DEFUN for now
; which will later use checked versions.
(def #'lambda #'%lambda)
(def #'defun #'%defun)

; Treat the rest arg as an optional value with optional default.
(defun optional (opt-arg . opt-default)
  (%if (nil? opt-arg)
       (%if (nil? opt-default) #void (car opt-default))
       (car opt-arg)))

; Apply a function to a list of arguments.
(defun apply (fun args . opt-env)
  (eval (cons (unwrap fun) args)
        (optional opt-env (make-environment))))

; Similar to an ordinary function call, but can be used to call a
; function from the variable namespace.
(defun funcall (fun . args)
  (apply fun args))

; Don't need FUNCALL as much as in Common Lisp though, since we can
; always bind lexical vars in function namespace:
(defun compose (#'f #'g)
  (lambda (arg) (f (g arg))))

(defun identity (x) x)

;;;; Forms

; Return true if an object is #NIL or #VOID, false otherwise.
(defun nil? (obj) (eq obj #nil))
(defun void? (obj) (eq obj #void))

(def #'caar (compose #'car #'car))
(def #'cadr (compose #'car #'cdr))
(def #'cdar (compose #'cdr #'car))
(def #'cddr (compose #'cdr #'cdr))

(defun symbol? (sym) (%%instance? sym 'symbol))
(defun keyword? (obj) (%%instance? obj 'keyword))
(defun cons? (cons) (%%instance? cons 'cons))

(defun symbol-name (sym) (slot-value sym 'name))

; Produce a new list by applying a function to each element of a list.
(defun map-list (#'fun list)
  (%if (nil? list)
       #nil
       (cons (fun (car list)) (map-list #'fun (cdr list)))))

(def #'for-each #'map-list)

(defun fold-list (#'fun init list)
  (%if (nil? list)
       init
       (fold-list #'fun (fun init (car list)) (cdr list))))

;;;; Lexical variable bindings

; The usual parallel-binding LET with left to right evaluation of
; value expressions.
(defmacro let (bindings . body)
  (list* (list* #'lambda (map-list #'car bindings)
                body)
         (map-list #'cadr bindings)))

; The usual sequential-binding LET* where the value expression of each
; binding has all earlier bindings in scope (if any).
(defmacro let* (bindings . body)
  (%if (nil? bindings)
       (list* #'let () body)
       (list #'let (list (car bindings))
             (list* #'let* (cdr bindings) body))))

; Kernel's recursive parallel-binding LETREC where the value
; expression of each binding has all other bindings in scope.
(defmacro %letrec (bindings . body)
  (list* #'let ()
         (list #'def
               (map-list #'car bindings)
               (list* #'list (map-list #'cadr bindings)))
         body))

;;;; Lexical function bindings

(defun %var-bindingize ((fun-name fun-params . fun-body))
  (list (%to-fun-sym fun-name) (list* #'lambda fun-params fun-body)))

; Common Lisp's parallel binder for functions.
(defmacro flet (fun-bindings . body)
  (list* #'let (map-list #'%var-bindingize fun-bindings) body))

; Common Lisp's (self) recursive binder for functions.
(defmacro labels (fun-bindings . body)
  (list* #'%letrec (map-list #'%var-bindingize fun-bindings) body))

;;;; Logic

(defun not (boolean)
  (%if boolean #f #t))

(deffexpr cond clauses env
  (%if (nil? clauses)
       #void
       (let ((((test . body) . clauses) clauses))
         (%if (eval test env)
              (apply (wrap #'progn) body env)
              (apply (wrap #'cond) clauses env)))))

(deffexpr and ops env
  (cond ((nil? ops)           #t)
        ((nil? (cdr ops))     (eval (car ops) env))
        ((eval (car ops) env) (apply (wrap #'and) (cdr ops) env))
        (#t                   #f)))

(deffexpr or ops env
  (cond ((nil? ops)           #f)
        ((nil? (cdr ops))     (eval (car ops) env))
        ((eval (car ops) env) #t)
        (#t                   (apply (wrap #'or) (cdr ops) env))))

;;;; Generalized reference

(defconstant %setter-prop "qua_setter")

(defun setter (obj)
  (js-get obj %setter-prop))

(js-set #'setter %setter-prop
        (lambda (new-setter getter)
          (js-set getter %setter-prop new-setter)))

(defmacro setf (place new-val)
  (%if (symbol? place)
       (list #'setq place new-val)
       (let* (((getter-form . args) place)
              (getter (%if (symbol? getter-form) (%to-fun-sym getter-form) getter-form)))
         (list* (list #'setter getter) new-val args))))

(defmacro incf (place . opt-increment)
  (let ((increment (optional opt-increment 1)))
    (list #'setf place (list #'+ place increment))))

(defmacro decf (place . opt-decrement)
  (let ((decrement (optional opt-decrement 1)))
    (list #'setf place (list #'- place decrement))))

;;;; Objects and classes

(defun make-instance (class-desig . initargs)
  (%%make-instance class-desig (plist-to-js-object initargs)))

(defun call-method (obj name args)
  (let ((method (find-method obj name)))
    (apply method args)))

(deffexpr defgeneric (name #ign) env
  (eval (list #'def (%to-fun-sym name)
              (lambda args
                (call-method (car args) name args)))
        env))

(deffexpr defmethod (name ((self class-spec) . args) . body) env
  (let ((class (find-generic-class class-spec))
        (fun (eval (list* #'lambda (list* self args) body) env)))
    (put-method class name fun)
    name))

(def #'%parse-type-spec #'identity) ; Overridden later

(deffexpr defclass (class-spec superclass-specs . #ign) #ign
  (ensure-class (%parse-type-spec class-spec)
                (list-to-js-array (map-list #'%parse-type-spec superclass-specs))))

(defgeneric hash-object (self))
(defgeneric compare-object (self))
(defgeneric print-object (self stream))

;;;; Simple control

(defmacro loop body
  (list #'%%loop (list* #'lambda () body)))

(deffexpr while (test . body) env
  (let ((body (list* #'progn body)))
    (block exit
      (loop
        (%if (eval test env)
             (eval body env)
             (return-from exit))))))

; Arc's IF: (if test-1 then-1 ... test-N then-N [else])
(deffexpr if (test then . rest) env
  (%if (eval test env)
       (eval then env)
       (%if (nil? rest)
            #void
            (%if (nil? (cdr rest))
                 (eval (car rest) env)
                 (eval (cons #'if rest) env)))))

(defmacro when (test . body)
  (list #'%if test (list* #'progn body) #void))

(defmacro unless (test . body)
  (list #'%if test #void (list* #'progn body)))

(defun %call-with-escape (#'fun)
  (let* ((tag (list 'tag))
         (escape (lambda opt-val
                   (let ((val (optional opt-val)))
                     (%%raise (list tag val))))))
    (%%rescue (lambda (exc)
                (%if (and (cons? exc) (eq tag (car exc)))
                     (cadr exc)
                     (%%raise exc)))
              (lambda ()
                (fun escape)))))

(defmacro block (name . body)
  (list #'%call-with-escape (list* #'lambda (list name) body)))

(defun return-from (escape . opt-val)
  (apply escape opt-val))

(deffexpr prog1 forms env
  (%if (nil? forms)
       #void
       (let ((result (eval (car forms) env)))
         (eval (list* #'progn (cdr forms)) env)
         result)))

(defmacro prog2 (form . forms)
  (list #'progn form (list* #'prog1 forms)))

(defun unwind-protect* (#'protected-thunk #'cleanup-thunk)
  (prog1 (%%rescue (lambda (exc)
                     (cleanup-thunk)
                     (%%raise exc))
                   #'protected-thunk)
    (cleanup-thunk)))

(defmacro unwind-protect (protected-form . cleanup-forms)
  (list #'unwind-protect*
        (list #'lambda () protected-form)
        (list* #'lambda () cleanup-forms)))

(deffexpr case (expr . clauses) env
  (let ((val (eval expr env)))
    (block match
      (for-each (lambda ((other-val . body))
                  (when (= val (eval other-val env))
                    (return-from match (eval (list* #'progn body) env))))
                clauses)
      #void)))

;;;; Reference cells

(defclass mut (standard-object)
  (val))

(defun mut (val)
  (make-instance 'mut :val val))

(defun ref (mut)
  (slot-value mut 'val))

(setf (setter #'ref) (lambda (new-val mut) (set-slot-value mut 'val new-val)))

;;;; Continuations

(defmacro push-prompt (prompt . body)
  (list #'%%push-prompt prompt (list* #'lambda () body)))

(defmacro take-subcont (prompt name . body)
  (list #'%%take-subcont prompt (list* #'lambda (list name) body)))

(defmacro push-subcont (continuation . body)
  (list #'%%push-subcont continuation (list* #'lambda () body)))

(defmacro push-prompt-subcont (prompt continuation . body)
  (list #'%%push-prompt-subcont prompt continuation (list* #'lambda () body)))

(defconstant the-default-prompt :the-default-prompt)

(defmacro push-default-prompt body
  (list* #'push-prompt the-default-prompt body))

(defmacro take-default-subcont (name . body)
  (list* #'take-subcont the-default-prompt name body))

(defmacro push-default-subcont (continuation . body)
  (list* #'push-prompt-subcont the-default-prompt continuation body))

;;;; Dynamic variables

(defmacro defdynamic (name . opt-val)
  (list #'def name (list #'mut (optional opt-val))))

(def #'dynamic #'ref)

(def #'%dynamic-let-1 #'%%dynamic-let-1)

(deffexpr dynamic-let (bindings . body) env
  (let ((pairs (map-list (lambda ((dynamic-name expr))
                           (cons (eval dynamic-name env) (eval expr env)))
                         bindings)))
    (labels ((process-pairs (pairs)
               (%if (nil? pairs)
                    (eval (list* #'progn body) env)
                    (let* ((((dynamic . value) . rest-pairs) pairs))
                      (%dynamic-let-1 dynamic value
                                      (lambda ()
                                        (process-pairs rest-pairs)))))))
      (process-pairs pairs))))

;;;; JS stuff

; Equal to syntax .prop-name
(defun js-getter (prop-name)
  (let ((getter (lambda (obj)
                  (js-get obj prop-name))))
    (setf (setter getter)
          (lambda (new-val obj)
            (js-set obj prop-name new-val)))
    getter))

; Equal to syntax @fun-name
(defun js-invoker (fun-name)
  (lambda (this . args)
    (let ((fun (js-get this fun-name)))
      (js-apply fun this (list-to-js-array args)))))

; {}
(defun create-js-object opt-proto
  (@create $Object (optional opt-proto #null)))

(defun js-object plist (plist-to-js-object plist))

(defun js-array elements (list-to-js-array elements))

(defmacro js-lambda (lambda-list . body)
  (list #'js-function (list* #'lambda lambda-list body)))

(defun %js-relational-op (name)
  (let ((#'binop (%%js-binop name)))
    (labels ((op (arg1 arg2 . rest)
               (%if (binop arg1 arg2)
                    (%if (nil? rest)
                         #t
                         (apply #'op (list* arg2 rest)))
                    #f)))
      #'op)))

(def #'== (%js-relational-op "=="))
(def #'=== (%js-relational-op "==="))
(def #'< (%js-relational-op "<"))
(def #'> (%js-relational-op ">"))
(def #'<= (%js-relational-op "<="))
(def #'>= (%js-relational-op ">="))

(def #'lt #'<)
(def #'lte #'<=)
(def #'gt #'>)
(def #'gte #'>=)

(defun != args (not (apply == args)))
(defun !== args (not (apply === args)))

(def #'* (let ((#'binop (%%js-binop "*")))
           (lambda args
             (fold-list #'binop 1 args))))

;; Can't simply use 0 as unit or it won't work with strings
(def #'+ (let ((#'binop (%%js-binop "+")))
           (lambda args
             (%if (nil? args)
                  0
                  (fold-list #'binop (car args) (cdr args))))))

(defun %js-negative-op (name unit)
  (let ((#'binop (%%js-binop name)))
    (lambda (arg1 . rest)
      (%if (nil? rest)
           (binop unit arg1)
           (fold-list #'binop arg1 rest)))))

(def #'- (%js-negative-op "-" 0))
(def #'/ (%js-negative-op "/" 1))

;;;; Conditions

(defclass condition (standard-object))
(defclass serious-condition (condition))
(defclass error (serious-condition))
(defclass warning (condition))

(defclass simple-condition (condition)
  (message))
(defclass simple-warning (warning)
  (message))
(defclass simple-error (error)
  (message))

(defclass runtime-error (error))
(defclass control-error (runtime-error))
(defclass restart-control-error (control-error)
  (restart))

(defclass restart (condition)
  (associated-condition))

(defclass abort (restart))
(defclass continue (restart))
(defclass use-value (restart)
  (value))
(defclass store-value (restart)
  (value))

;;; Condition handlers

(defdynamic current-condition-handler-frame)
(defdynamic current-restart-handler-frame)

(defclass handler ()
  (condition-type
   handler-function
   associated-condition))

(defun make-handler (condition-type handler-function . opt-associated-condition)
  (make-instance 'handler
                 :condition-type condition-type
                 :handler-function handler-function
                 :associated-condition (optional opt-associated-condition)))

(defun handle-condition (handler condition)
  (funcall (slot-value handler 'handler-function) condition))

(defclass handler-frame ()
  (handlers
   parent))

(defun make-handler-frame (handlers . opt-parent)
  (make-instance 'handler-frame :handlers handlers :parent (optional opt-parent)))

(defun %make-handler-bind (#'handler-spec-parser handler-frame-dynamic)
  (vau (handler-specs . body) env
    (let* ((handlers (map-list (lambda (spec) (handler-spec-parser spec env)) handler-specs))
           (handler-frame (make-handler-frame handlers (dynamic handler-frame-dynamic))))
      (%dynamic-let-1 handler-frame-dynamic handler-frame
        (lambda () (eval (list* #'progn body) env))))))

;; handler-spec ::= (condition-class-name handler-function-form)
(def #'handler-bind
  (%make-handler-bind
   (lambda ((class-name function-form) env)
     (make-handler class-name (eval function-form env)))
   current-condition-handler-frame))

;; handler-spec ::= (restart-class-name handler-function-form . opt-associated-condition)
(def #'restart-bind
  (%make-handler-bind
   (lambda ((class-name function-form . opt-associated-condition) env)
     (make-handler class-name
                   (eval function-form env)
                   (eval (optional opt-associated-condition) env)))
   current-restart-handler-frame))

;;; Condition signaling
          
(defun signal (condition)
  (signal-condition condition (dynamic current-condition-handler-frame)))

(defun warn (condition)
  (signal condition)
  (print "Warning:" condition))

(defun error (condition)
  (signal condition)
  (invoke-debugger condition))

(defun invoke-restart (restart)
  (signal-condition restart (dynamic current-restart-handler-frame)))

(defun signal-condition (condition dynamic-frame)
  (let ((handler-and-frame (find-applicable-handler condition dynamic-frame)))
    (%if (void? handler-and-frame)
         #void
         (let (((handler frame) handler-and-frame))
           (call-condition-handler condition handler frame)
           ;; signal unhandled: continue search for handlers
           (signal-condition condition (slot-value frame 'parent))))))

(defun find-applicable-handler (condition dynamic-frame)
  (%if (void? dynamic-frame)
       #void
       (block found
         (for-each (lambda (handler)
                     (when (condition-applicable? condition handler)
                       (return-from found (list handler dynamic-frame))))
                   (slot-value dynamic-frame 'handlers))
         (find-applicable-handler condition (slot-value dynamic-frame 'parent)))))

(defgeneric condition-applicable? (condition handler))

(defmethod condition-applicable? ((condition condition) handler)
  (instance? condition (slot-value handler 'condition-type)))

(defun slot-void? (obj slot-name)
  (%if (slot-bound? obj slot-name)
       (void? (slot-value obj slot-name))
       #t))

(defmethod condition-applicable? ((restart restart) handler)
  (and (instance? restart (slot-value handler 'condition-type))
       (or (slot-void? restart 'associated-condition)
           (slot-void? handler 'associated-condition)
           (eq (slot-value restart 'associated-condition)
               (slot-value handler 'associated-condition)))))

(defgeneric call-condition-handler (condition handler handler-frame))

(defmethod call-condition-handler ((condition condition) handler handler-frame)
  ; Condition firewall
  (dynamic-let ((current-condition-handler-frame (slot-value handler-frame 'parent)))
    (handle-condition handler condition)))

(defmethod call-condition-handler ((restart restart) handler handler-frame)
  (handle-condition handler restart))

;;;; Types

(defclass type-error (error) ())

(defconstant %the-top-type
  (make-instance '%class-type :name "top" :generic-params '()))

(defconstant %the-bottom-type
  (make-instance '%class-type :name "bottom" :generic-params '()))

(defun %parse-type-spec (type-spec)
  (if (keyword? type-spec)
      (make-instance '%type-variable
                     :name (symbol-name type-spec))
      (symbol? type-spec)
      (make-instance '%class-type
                     :name (symbol-name type-spec)
                     :generic-params '())
      (cons? type-spec)
      (let (((class-name . generic-param-specs) type-spec))
        (make-instance '%class-type
                       :name (symbol-name class-name)
                       :generic-params (map-list #'%parse-generic-param-spec
                                                 generic-param-specs)))
      (error (make-instance 'simple-error :message "Illegal type-spec"))))
  
(defun %parse-generic-param-spec (gp-spec)
  (if (or (keyword? gp-spec) (symbol? gp-spec))
      (let ((type (%parse-type-spec gp-spec)))
        (make-instance '%generic-param :in-type type :out-type type))
      (cons? gp-spec)
      (let (((op . rest) gp-spec))
        (%if (keyword? op)
             (case (symbol-name op)
               ("io"
                (let* ((in-type (%parse-type-spec (car rest)))
                       (out-type (%parse-type-spec (optional (cdr rest) in-type))))
                  (make-instance '%generic-param :in-type in-type :out-type out-type)))
               ("in"
                (let ((in-type (%parse-type-spec (car rest))))
                  (make-instance '%generic-param :in-type in-type :out-type %the-top-type)))
               ("out"
                (let ((out-type (%parse-type-spec (car rest))))
                  (make-instance '%generic-param :in-type %the-bottom-type :out-type out-type))))
             (let ((type (%parse-type-spec gp-spec)))
               (make-instance '%generic-param :in-type type :out-type type))))
      (error "Illegal generic param spec")))

(defun instance? (obj type-spec)
  (%%instance? obj (%parse-type-spec type-spec)))

(deffexpr typecase (expr . clauses) env
  (let ((val (eval expr env)))
    (block match
      (for-each (lambda ((type-spec . body))
                  (%if (eq type-spec #t)
                       (return-from match (eval (list* #'progn body) env))
                       (when (instance? val type-spec)
                         (return-from match (eval (list* #'progn body) env)))))
                clauses)
      #void)))

;;;; Runtime

(defun invoke-debugger (condition)
  (print "DEBUG")
  (print condition)
  (%%raise (js-new $Error condition)))
