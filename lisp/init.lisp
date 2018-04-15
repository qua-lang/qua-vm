;; The forms in this file get evaluated immediately after VM startup,
;; with only primitive bindings provided by the JS code (%%-prefixed),
;; in order to setup the high-level user language.  The user language
;; combiners should all be defined as type-checked functions and
;; fortified macros -- which we don't have yet.  So we need to define
;; unsafe barebones implementations for some combiners such as LET.
;; These will then later be overridden with the safer user language
;; combiners.

;;;; Import primitive bindings

(%%def #'def #'%%def) ; Bind new symbols in the current environment.
(def #'car #'%%car) ; Access first element of pair.
(def #'cdr #'%%cdr) ; Access second element of pair.
(def #'cons #'%%cons) ; Construct a new pair.
(def #'eq #'%%eq) ; Compare two values for pointer equality.
(def #'eval #'%%eval) ; Evaluate an expression in an environment.
(def #'if #'%%if) ; Evaluate either of two branches depending on a test.
(def #'make-environment #'%%make-environment) ; Create new lexical environment.
(def #'print #'%%print) ; Print line.
(def #'progn #'%%progn) ; Evaluate expressions in order.
(def #'unwrap #'%%unwrap) ; Extract fexpr underlying a function.
(def #'wrap #'%%wrap) ; Construct a function out of a fexpr.
;; Objects:
(def #'concrete-class-of #'%%concrete-class-of)
(def #'ensure-class #'%%ensure-class)
(def #'find-concrete-class #'%%find-concrete-class)
(def #'find-generic-class #'%%find-generic-class)
(def #'find-method #'%%find-method)
(def #'generic-class-of #'%%generic-class-of)
(def #'put-method #'%%put-method)
(def #'set-slot-value #'%%set-slot-value)
(def #'slot-bound-p #'%%slot-bound-p)
(def #'slot-value #'%%slot-value)
(def #'subclassp #'%%subclassp)
;; JS:
(def #'js:apply #'%%js:apply)
(def #'js:get #'%%js:get)
(def #'js:global #'%%js:global)
(def #'js:list-to-array #'%%list-to-array)
(def #'js:set #'%%js:set)
;; Use the QUA package for stuff that's not expected to be called by
;; the user or that doesn't have a final API yet.
(def #'qua:to-fun-sym #'%%to-fun-sym) ; Turn any symbol into a function namespaced one.
;; Optimization bindings:
(def #'list* #'%%list*) ; Construct list of arguments, with the final argument as tail.

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
    (eval (list #'def (qua:to-fun-sym name) 
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
    (list #'def (qua:to-fun-sym name) (list* #'macro params body))))

;;;; Functions

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

; Apply a function to a list of arguments.
(defun apply (fun args . opt-env)
  (eval (cons (unwrap fun) args)
        (optional opt-env (make-environment))))

; Similar to an ordinary function call, but can be used to call a
; function from the variable namespace.
(defun funcall (fun . args)
  (apply fun args))

(defun compose (f g)
  (lambda (arg) (funcall f (funcall g arg))))

;;;; Forms

; Return true if an object is #NIL or #VOID, false otherwise.
(defun nilp (obj) (eq obj #nil))
(defun voidp (obj) (eq obj #void))

(def #'caar (compose #'car #'car))
(def #'cadr (compose #'car #'cdr))
(def #'cdar (compose #'cdr #'car))
(def #'cddr (compose #'cdr #'cdr))

(defun symbol-name (sym) (slot-value sym 'name))

; Produce a new list by applying a function to each element of a list.
(defun map-list (#'fun list)
  (if (nilp list)
      #nil
    (cons (fun (car list)) (map-list #'fun (cdr list)))))

(def #'for-each #'map-list)

;;;; Lexical bindings

; The usual parallel-binding LET with left to right evaluation of
; value expressions.
(defmacro let (bindings . body)
  (list* (list* #'lambda (map-list #'car bindings)
                body)
         (map-list #'cadr bindings)))

; The usual sequential-binding LET* where the value expression of each
; binding has all earlier bindings in scope (if any).
(defmacro let* (bindings . body)
  (if (nilp bindings)
      (list* #'let () body)
      (list #'let (list (car bindings))
            (list* #'let* (cdr bindings) body))))

; Kernel's LETREC where the value expression of each binding has all
; other bindings in scope.
(defmacro letrec (bindings . body)
  (list* #'let ()
         (list #'def
               (map-list #'car bindings)
               (list* #'list (map-list #'cadr bindings)))
         body))

;;;; Logic

(defun not (boolean)
  (if boolean #f #t))

(deffexpr cond clauses env
  (if (nilp clauses)
      #void
      (let ((((test . body) . clauses) clauses))
        (if (eval test env)
            (apply (wrap #'progn) body env)
            (apply (wrap #'cond) clauses env)))))

(deffexpr and ops env
  (cond ((nilp ops)           #t)
        ((nilp (cdr ops))     (eval (car ops) env))
        ((eval (car ops) env) (apply (wrap #'and) (cdr ops) env))
        (#t                   #f)))

(deffexpr or ops env
  (cond ((nilp ops)           #f)
        ((nilp (cdr ops))     (eval (car ops) env))
        ((eval (car ops) env) #t)
        (#t                   (apply (wrap #'or) (cdr ops) env))))

;;;; Misc. language

(defun optional (opt-arg . opt-default)
  (if (nilp opt-arg)
      (if (nilp opt-default) #void (car opt-default))
    (car opt-arg)))

(def #'defconstant #'def)

;;;; Environment mutation

(deffexpr setq (env lhs rhs) denv
  (eval (list #'def lhs 
              (list (unwrap #'eval) rhs denv))
        (eval env denv)))

;;;; Generalized reference

(defconstant qua:setter-prop "qua_setter")

(defun setter (obj)
  (js:get obj qua:setter-prop))

(js:set #'setter qua:setter-prop
        (lambda (new-setter getter)
          (js:set getter qua:setter-prop new-setter)))

(defmacro setf ((getter-form . args) new-val)
  (let ((getter (if (symbolp getter-form)
                    (qua:to-fun-sym getter-form)
                  getter-form)))
    (list* (list #'setter getter) new-val args)))

;;;; Objects and classes

(defun make (class-desig . initargs)
  (%%make-instance class-desig (js:plist-to-object initargs)))

(defun call-method (obj name args)
  (let ((method (find-method obj name)))
    (apply method args)))

(deffexpr defgeneric (name #ign) env
  (eval (list #'def (qua:to-fun-sym name)
              (lambda args
                (call-method (car args) name args)))
        env))

(deffexpr defmethod (name ((self class-desig) . args) . body) env
  (let ((class (find-generic-class class-desig))
        (fun (eval (list* #'lambda (list* self args) body) env)))
    (put-method class name fun)
    name))

(deffexpr defclass (name superclasses . #ign) #ign
  (let ((string-list (map-list (lambda (superclass)
                                     (slot-value superclass 'name))
                                   superclasses)))
    (ensure-class (slot-value name 'name) (js:list-to-array string-list))))

(defgeneric hash-object (self))
(defgeneric compare-object (self))
(defgeneric print-object (self stream))

(defun typep (obj class-spec)
  (subclassp (generic-class-of obj) (find-generic-class class-spec)))

(defun symbolp (sym) (typep sym 'symbol))
(defun consp (cons) (typep cons 'cons))

;;;; Simple control

(defmacro loop body
  (list #'%%loop (list* #'lambda () body)))

(defmacro when (test . body)
  (list #'if test (list #'progn body) #void))

(defmacro unless (test . body)
  (list #'if test #void (list #'progn body)))

(defun call-with-escape (#'fun)
  (let* ((tag (list 'tag))
         (escape (lambda opt-val
                   (let ((val (optional opt-val)))
                     (%%raise (list tag val))))))
    (%%rescue (lambda (exc)
                (if (and (consp exc) (eq tag (car exc)))
                    (cadr exc)
                  (%%raise exc)))
              (lambda ()
                (fun escape)))))

(defmacro block (name . body)
  (list #'call-with-escape (list* #'lambda (list name) body)))

(defun return-from (escape . opt-val)
  (apply escape opt-val))

(deffexpr prog1 forms env
  (if (nilp forms)
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

;;;; Reference cells

(defclass mut (standard-object)
  (val))

(defun mut (val)
  (make 'mut :val val))

(defun ref (mut)
  (slot-value mut 'val))

(setf (setter #'ref) (lambda (new-val mut) (set-slot-value mut 'val new-val)))

;;;; Coroutines

(defclass coro:yield-rec (standard-object)
  (val
   cont))

(defun coro:make-yield-rec (val cont)
  (make 'coro:yield-rec :val val :cont cont))

(defun coro:value (yield-rec)
  (slot-value yield-rec 'val))

(defun coro:continuation (yield-rec)
  (slot-value yield-rec 'cont))

(defconstant coro:the-prompt 'coro:prompt)

(defun coro:run (thunk)
  (%%push-prompt coro:the-prompt thunk))

(defun coro:yield opt-val
  (let ((val (optional opt-val)))
    (%%take-subcont coro:the-prompt
                    (lambda (cont) (coro:make-yield-rec val cont)))))

(defun coro:resume (yield-rec . opt-val)
  (let ((val (optional opt-val)))
    (%%push-prompt-subcont coro:the-prompt
                           (coro:continuation yield-rec)
                           (lambda () val))))

;; Should use TYPEP
(defun coro:yield-rec-p (yield-rec)
  (and (slot-bound-p yield-rec 'cont)
       (slot-bound-p yield-rec 'val)))

(defun dynamic-wind (#'pre #'body #'post)
  (block exit
    (let ((thunk (mut (lambda () (coro:run #'body)))))
      (loop
        (pre)
        (let ((res (unwind-protect
                       (funcall (ref thunk))
                     (post))))
          (if (coro:yield-rec-p res)
              (let ((reenter (coro:yield (coro:value res))))
                (setf (ref thunk) (lambda () (coro:resume res reenter))))
            (return-from exit res)))))))

;;;; Dynamic variables

(defmacro defdynamic (name . opt-val)
  (list #'def name (list #'mut (optional opt-val))))

(def #'dynamic #'ref)

(defun dynamic-let* (var val #'body-thunk)
  (let ((old-val (dynamic var)))
    (dynamic-wind
     (lambda () (setf (dynamic var) val))
     #'body-thunk
     (lambda () (setf (dynamic var) old-val)))))

;;;; JS stuff

; Equal to syntax .prop-name
(defun js:getter (prop-name)
  (let ((getter (lambda (obj)
                  (js:get obj prop-name))))
    (setf (setter getter)
          (lambda (new-val obj)
            (js:set obj prop-name new-val)))
    getter))

; Equal to syntax @fun-name
(defun js:invoker (fun-name)
  (lambda (this . args)
    (let ((fun (js:get this fun-name)))
      (js:apply fun this (js:list-to-array args)))))

; {}
(defun js:create-object (proto)
  (@create $Object proto))

(defun js:plist-to-object (plist)
  (letrec ((obj (js:create-object #null))
           (#'add-to-dict
            (lambda (plist)
              (if (nilp plist)
                  obj
                (progn 
                  (js:set obj (symbol-name (car plist)) (cadr plist))
                  (add-to-dict (cddr plist)))))))
          (add-to-dict plist)))

(defun js:object plist (js:plist-to-object plist))

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

;;; Handler frames

(defdynamic current-condition-handler-frame)
(defdynamic current-restart-handler-frame)

(defclass handler ()
  (condition-type
   handler-function
   associated-condition))

(defun make-handler (condition-type handler-function . opt-associated-condition)
  (make 'handler
        :condition-type condition-type
        :handler-function handler-function
        :associated-condition (optional opt-associated-condition)))

(defun handle-condition (handler condition)
  (funcall (slot-value handler 'handler-function) condition))

(defclass handler-frame ()
  (handlers
   parent))

(defun make-handler-frame (handlers . opt-parent)
  (make 'handler-frame :handlers handlers :parent (optional opt-parent)))

;; handler-spec ::= (condition-class-name handler-function-form)
(deffexpr handler-bind (handler-specs . body) env
  (let* ((handlers
          (map-list (lambda ((class-name function-form))
                      (make-handler class-name (eval function-form env)))
                    handler-specs))
         (handler-frame
          (make-handler-frame handlers
                              (dynamic current-condition-handler-frame))))
    (dynamic-let* current-condition-handler-frame handler-frame
                  (lambda ()
                    (eval (list* #'progn body) env)))))

;; handler-spec ::= (restart-class-name handler-function-form . opt-associated-condition)
(deffexpr restart-bind (handler-specs . body) env
  (let* ((handlers
          (map-list (lambda ((class-name function-form . opt-associated-condition))
                      (make-handler class-name
                                    (eval function-form env)
                                    (eval (optional opt-associated-condition) env)))
                    handler-specs))
         (handler-frame
          (make-handler-frame handlers
                              (dynamic current-restart-handler-frame))))
    (dynamic-let* current-restart-handler-frame handler-frame
                  (lambda ()
                    (eval (list* #'progn body) env)))))

;;; Signaling
          
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
    (if (voidp handler-and-frame)
        #void
      (let (((handler frame) handler-and-frame))
        (call-condition-handler condition handler frame)
        ;; signal unhandled: continue search for handlers
        (signal-condition condition (slot-value frame 'parent))))))

(defun find-applicable-handler (condition dynamic-frame)
  (if (voidp dynamic-frame)
      #void
    (block found
           (for-each (lambda (handler)
                       (when (condition-applicable? condition handler)
                         (return-from found (list handler dynamic-frame))))
                     (slot-value dynamic-frame 'handlers))
           (find-applicable-handler condition (slot-value dynamic-frame 'parent)))))

(defgeneric condition-applicable? (condition handler))

(defmethod condition-applicable? ((condition condition) handler)
  (typep condition (slot-value handler 'condition-type)))

(defun slot-void-p (obj slot-name)
  (if (slot-bound-p obj slot-name)
      (voidp (slot-value obj slot-name))
    #t))

(defmethod condition-applicable? ((restart restart) handler)
  (and (typep restart (slot-value handler 'condition-type))
       (or (slot-void-p restart 'associated-condition)
           (slot-void-p handler 'associated-condition)
           (eq (slot-value restart 'associated-condition)
               (slot-value handler 'associated-condition)))))

(defgeneric call-condition-handler (condition handler handler-frame))

(defmethod call-condition-handler ((condition condition) handler handler-frame)
  ;; Condition firewall
  (dynamic-let* current-condition-handler-frame (slot-value handler-frame 'parent)
    (handle-condition handler condition)))

(defmethod call-condition-handler ((restart restart) handler handler-frame)
  (handle-condition handler restart))
