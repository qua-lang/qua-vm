;; The forms in this file get evaluated immediately after VM startup,
;; with only primitive bindings provided by the JS code (%%-prefixed),
;; in order to setup the high-level user language.  The user language
;; combiners should all be defined as type-checked functions and
;; fortified macros -- which we don't have yet.  So we need to define
;; unsafe barebones implementations for some combiners such as LET.
;; These will then later be overridden with the safer user language
;; combiners.

;; Rebind symbols to final names already, where it makes some sense:
(%%def #'def #'%%def) ; Bind new symbols in the current environment.
(def #'car #'%%car) ; Access first element of pair.
(def #'cdr #'%%cdr) ; Access second element of pair.
(def #'cons #'%%cons) ; Construct a new pair.
(def #'eval #'%%eval) ; Evaluate an expression in an environment.
(def #'eq #'%%eq) ; Compare two values for pointer equality.
(def #'if #'%%if) ; Evaluate either of two branches depending on a test.
(def #'make-environment #'%%make-environment) ; Create new lexical environment.
(def #'print #'%%print) ; Print line.
(def #'progn #'%%progn) ; Evaluate expressions in order.
(def #'unwrap #'%%unwrap) ; Extract fexpr underlying a function.
(def #'wrap #'%%wrap) ; Construct a function out of a fexpr.

(def #'class-of #'%%class-of)
(def #'find-class #'%%find-generic-class)
(def #'put-method #'%%put-method)
(def #'find-method #'%%find-method)
(def #'slot-value #'%%slot-value)
(def #'set-slot-value #'%%set-slot-value)
(def #'slot-bound-p #'%%slot-bound-p)

;; Use the QUA package for stuff that's not expected to be called by
;; the user or that doesn't have a final API yet.
(def #'qua:to-fun-sym #'%%to-fun-sym) ; Turn any symbol into a function namespaced one.

;; Optimization bindings:
(def #'list* #'%%list*) ; Construct list of arguments, with the final argument as tail.

(def #'quote (%%vau (op) #ign op)) ; Prevent evaluation of its operand.
(def #'list (wrap (%%vau args #ign args))) ; Construct list of arguments.

; Construct a fexpr.  Primitive %%VAU has only one body statement, so use PROGN.
(def #'vau
  (%%vau (params env-param . body) env
    (eval (list #'%%vau params env-param 
                (list* #'progn body))
          env)))

; Define a named fexpr in the current environment.
(def #'deffexpr 
  (vau (name params env-param . body) env
    (eval (list #'def (qua:to-fun-sym name) 
                (list* #'vau params env-param body))
          env)))

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
    (list #'def (qua:to-fun-sym name) (list* #'macro params body))))

; Create a function that doesn't do any type checking.
(defmacro ur-lambda (params . body)
  (list #'wrap (list* #'vau params #ign body)))

; Define a named function that doesn't do any type checking in the
; current environment.
(defmacro ur-defun (name params . body)
  (list #'def (qua:to-fun-sym name) (list* #'ur-lambda params body)))

; Use the unchecked versions for LAMBDA and DEFUN for now
; which will later use checked versions.
(def #'lambda #'ur-lambda)
(def #'defun #'ur-defun)

(defun not (boolean)
  (if boolean #f #t))

; Apply a function to a list of arguments.
(defun apply (fun args)
  (eval (cons (unwrap fun) args)
        (make-environment)))

; Similar to an ordinary function call, but can be used to call a
; function from the variable namespace.
(defun funcall (fun . args)
  (apply fun args))

; Return true if an object is #NIL, false otherwise.
(defun nilp (obj) (eq obj #nil))

; Produce a new list by applying a function to each element of a list.
(defun qua:map-list (#'fun list)
  (if (nilp list)
      #nil
    (cons (fun (car list)) (qua:map-list #'fun (cdr list)))))

(defun qua:compose (f g)
  (lambda (arg) (funcall f (funcall g arg))))

(def #'caar (qua:compose #'car #'car))
(def #'cadr (qua:compose #'car #'cdr))
(def #'cdar (qua:compose #'cdr #'car))
(def #'cddr (qua:compose #'cdr #'cdr))

; The usual parallel-binding LET with left to right evaluation of
; value expressions.
(defmacro let (bindings . body)
  (list* (list* #'lambda (qua:map-list #'car bindings)
                body)
         (qua:map-list #'cadr bindings)))

; The usual sequential-binding LET* where the right hand side of each
; binding has all earlier bindings in scope (if any).
(defmacro let* (bindings . body)
  (if (nilp bindings)
      (list* #'let () body)
      (list #'let (list (car bindings))
            (list* #'let* (cdr bindings) body))))

;;;; JS stuff
(defun js:create-object ()
  (@create $Object))
(defun %%js:getter (prop-name)
  (lambda (obj)
    (%%js:get obj prop-name)))
(defun %%js:invoker (fun-name)
  (lambda (this . args)
    (let ((fun (%%js:get this fun-name)))
      (@apply this fun (%%list-to-array args)))))

;;;; Objects
(defun make (class-desig . initargs)
  (%%make-instance class-desig initargs))

(deffexpr the-environment () env env)

(deffexpr setq (lhs rhs env) denv
  (eval (list #'def lhs 
              (list (unwrap #'eval) rhs denv))
        (eval env denv)))

(defun call-method (obj name args)
  (let ((method (find-method obj name)))
    (apply method args)))

(deffexpr defgeneric (name #ign) env
  (eval (list #'def (qua:to-fun-sym name)
              (lambda args
                (call-method (car args) name args)))
        env))

(deffexpr defmethod (name ((self class-desig) . args) . body) env
  (let ((class (find-class class-desig))
        (fun (eval (list* #'lambda (list* self args) body) env)))
    (put-method class name fun)
    name))

(deffexpr defclass (name superclasses . #ign) #ign
  (let ((string-list (qua:map-list (lambda (superclass)
                                     (slot-value superclass 'name))
                                   superclasses)))
    (%%ensure-class (slot-value name 'name) (%%list-to-array string-list))))

(defgeneric hash-object (self))
(defgeneric compare-object (self))
(defgeneric print-object (self stream))

