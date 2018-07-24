;;;;; QUA

;; The forms in this file get evaluated immediately after VM startup,
;; with only primitive bindings provided by the JS code (%%-prefixed),
;; in order to setup the high-level user language.

;;;; Import primitive bindings

;; Core language:
(%%def #'def #'%%def) ; Bind new or update symbols in current environment.
(def #'car #'%%car) ; Access first element of pair.
(def #'cdr #'%%cdr) ; Access second element of pair.
(def #'cons #'%%cons) ; Construct a new pair.
(def #'defconstant #'def) ; One man's constant ...
(def #'dynamic #'%%dynamic) ; Access the value of a dynamic variable.
(def #'dynamic-bind #'%%dynamic-bind) ; Bind a single dynamic variable.
(def #'eq #'%%eq) ; Compare two values for pointer equality.
(def #'eql #'eq)  ; Value equality for booleans, numbers, strings; pointer else.
(def #'eval #'%%eval) ; Evaluate an expression in an environment.
(def #'if #'%%if) ; Evaluate either of two expressions depending on a test.
(def #'make-dynamic #'%%make-dynamic) ; Create a new dynamic variable.
(def #'make-environment #'%%make-environment) ; Create new lexical environment.
(def #'panic #'%%panic) ; Exit VM unconditionally, w/out running intervening handlers.
(def #'progn #'%%progn) ; Evaluate expressions in order.
(def #'setq #'%%setq) ; Update existing bindings in current or ancestor environment.
(def #'to-fun-sym #'%%to-fun-sym) ; Turn any symbol into a function namespaced one.
(def #'to-type-sym #'%%to-type-sym) ; Turn any symbol into a type namespaced one.
(def #'unwrap #'%%unwrap) ; Extract fexpr underlying a function.
(def #'wrap #'%%wrap) ; Construct a function out of a fexpr.
;; Objects:
(def #'class-of #'%%class-of)
(def #'make-class #'%%make-class)
(def #'send-message #'%%send-message)
;; JS:
(def #'js-apply #'%%js-apply)
(def #'js-function #'%%js-function)
(def #'js-get #'%%js-get)
(def #'js-global #'%%js-global)
(def #'js-new #'%%js-new)
(def #'js-set #'%%js-set)
(def #'own-property? #'%%own-property?)
;; Optimization bindings:
(def #'list* #'%%list*)
(def #'list-to-js-array #'%%list-to-array)
(def #'plist-to-js-object #'%%plist-to-js-object)
(def #'reverse-list #'%%reverse-list)
;; Printing
(def *print-escape* %%*print-escape*)

;;;; Basics

(def #'quote (%%vau (operand) #ign operand)) ; Prevent evaluation of its single operand.
(def #'list (wrap (%%vau arguments #ign arguments))) ; Construct list of arguments.
(def #'the-environment (%%vau #ign environment environment)) ; Return current environment.

;;;; Fexprs

; Construct a fexpr.  Primitive %%VAU has only one body statement, so prognize.
(def #'vau
  (%%vau (params env-param . body) env
    (eval (list #'%%vau params env-param
                (list* #'progn body))
          env)))

; Define a named fexpr in the current environment.
(def #'deffexpr 
  (vau (name params env-param . body) env
    (eval (list #'def (to-fun-sym name) 
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
    (list #'def (to-fun-sym name) (list* #'macro params body))))

;;;; Functions

; Create a function.
(defmacro lambda (params . body)
  (list #'wrap (list* #'vau params #ign body)))

; Define a named function.
(defmacro defun (name params . body)
  (list #'def (to-fun-sym name) (list* #'lambda params body)))

; Create a function that has access to the current lexical environment.
(defmacro lambda/env (params env-param . body)
  (list #'wrap (list* #'vau params env-param body)))

; Define a named function that has access to the current lexical environment.
(defmacro defun/env (name params env-param . body)
  (list #'def (to-fun-sym name) (list* #'lambda/env params env-param body)))

; Treat the rest argument as an optional value with optional default.
(defun optional (opt-arg . opt-default)
  (if (nil? opt-arg)
      (if (nil? opt-default) #void (car opt-default))
      (car opt-arg)))

; Apply a function to a list of arguments.
(defun apply (fun arguments . opt-env)
  (eval (cons (unwrap fun) arguments)
        (optional opt-env (make-environment))))

; Similar to an ordinary function call, but can be used to call a
; function from the variable namespace.
(defun funcall (fun . arguments)
  (apply fun arguments))

; Don't need FUNCALL as much as in Common Lisp though, since we can
; always bind lexical vars in function namespace (plus, if FOO returns
; a function, then we can do ((FOO)) to call it, so using FUNCALL is
; used to enhance readability only).
(defun compose (#'f #'g)
  (lambda (arg) (f (g arg))))

(defun identity (x) x)

;;;; Forms

(defun symbol? (sym) (eq (class-of sym) (class symbol)))
(defun cons? (cons) (eq (class-of cons) (class cons)))
(defun nil? (obj) (eq obj #nil))
(defun void? (obj) (eq obj #void))

(def #'caar (compose #'car #'car))
(def #'cadr (compose #'car #'cdr))
(def #'cdar (compose #'cdr #'car))
(def #'cddr (compose #'cdr #'cdr))

(defmacro function (name) (to-fun-sym name))
(defmacro class (name) (to-type-sym name))

(defun symbol-name (sym) (%%slot-value sym "name"))

; Produce a new list by applying a function to each element of a list.
(defun map-list (#'fun list)
  (if (nil? list)
      #nil
      (cons (fun (car list)) (map-list #'fun (cdr list)))))

(def #'list-for-each #'map-list)

(defun fold-list (#'fun init list)
  (if (nil? list)
      init
      (fold-list #'fun (fun init (car list)) (cdr list))))

;;;; Lexical variable bindings

; The common parallel-binding LET with left to right evaluation of
; value expressions.
(defmacro let (bindings . body)
  (list* (list* #'lambda (map-list #'car bindings)
                body)
         (map-list #'cadr bindings)))

; The common sequential-binding LET* where the value expression of each
; binding has all earlier bindings in scope (if any).
(defmacro let* (bindings . body)
  (if (nil? bindings)
      (list* #'let () body)
      (list #'let (list (car bindings))
            (list* #'let* (cdr bindings) body))))

; Kernel's recursive parallel-binding LETREC where the value
; expression of each binding has all other bindings in scope.
(defmacro letrec (bindings . body)
  (list* #'let ()
         (list #'def
               (map-list #'car bindings)
               (list* #'list (map-list #'cadr bindings)))
         body))

;;;; Lexical function bindings

(defun var-bindingize ((fun-name fun-params . fun-body))
  (list (to-fun-sym fun-name) (list* #'lambda fun-params fun-body)))

; Common Lisp's parallel binder for functions.
(defmacro flet (fun-bindings . body)
  (list* #'let (map-list #'var-bindingize fun-bindings) body))

; Common Lisp's (self) recursive binder for functions.
(defmacro labels (fun-bindings . body)
  (list* #'letrec (map-list #'var-bindingize fun-bindings) body))

;;;; Logic

(defun not (boolean)
  (if boolean #f #t))

(deffexpr cond clauses env
  (if (nil? clauses)
      #void
      (let ((((test . body) . rest-clauses) clauses))
        (if (eval test env)
            (eval (cons #'progn body) env)
            (eval (cons #'cond rest-clauses) env)))))

(deffexpr and ops env
  (cond ((nil? ops)           #t)
        ((nil? (cdr ops))     (eval (car ops) env))
        ((eval (car ops) env) (eval (cons #'and (cdr ops)) env))
        (#t                   #f)))

(deffexpr or ops env
  (cond ((nil? ops)           #f)
        ((nil? (cdr ops))     (eval (car ops) env))
        ((eval (car ops) env) #t)
        (#t                   (eval (cons #'or (cdr ops)) env))))

;;;; Generalized reference

(defconstant +setter-prop+ "qua_setter")

(defun setter (obj)
  (js-get obj +setter-prop+))

(defun defsetf (access-fn update-fn)
  (js-set access-fn +setter-prop+ update-fn))

(defsetf #'setter
  (lambda (new-setter getter)
    (js-set getter +setter-prop+ new-setter)))

(defmacro setf (place new-val)
  (if (symbol? place)
      (list #'setq place new-val)
      (let* (((getter-form . arguments) place)
             (getter (if (symbol? getter-form) (to-fun-sym getter-form) getter-form)))
        (list* (list #'setter getter) new-val arguments))))

(defmacro incf (place . opt-increment)
  (let ((increment (optional opt-increment 1)))
    (list #'setf place (list #'+ place increment))))

(defmacro decf (place . opt-decrement)
  (let ((decrement (optional opt-decrement 1)))
    (list #'setf place (list #'- place decrement))))

;;;; Objects and classes

(defun/env find-class (class-desig) env
  (eval (to-type-sym class-desig) env))

(defun make-instance (class-desig . initargs)
  (%%make-instance (find-class class-desig) (plist-to-js-object initargs)))

(deffexpr defgeneric (name . #ign) env
  (let ((generic (lambda arguments
                   (send-message (car arguments) (symbol-name name) arguments))))
    (eval (list #'def (to-fun-sym name) generic) env)))

(deffexpr defmethod (name ((self class-spec) . arguments) . body) env
  (let ((class (find-class class-spec))
        (method (eval (list* #'lambda (list* self arguments) body) env)))
    (%%put-method class (symbol-name name) method)))

(deffexpr defstruct (name . #ign) env
  (let* ((class-name (symbol-name name))
	 (class (make-class (class structure-class) class-name)))
    (eval (list #'def (to-type-sym name) class) env)))

(defun slot-value (obj name)
  (%%slot-value obj (symbol-name name)))

(defun set-slot-value (obj name value)
  (%%set-slot-value obj (symbol-name name) value))

(defun slot-bound? (obj name)
  (%%slot-bound? obj (symbol-name name)))

(defsetf #'slot-value
  (lambda (new-val obj slot-name)
    (set-slot-value obj slot-name new-val)))

;; sloppy check
(defun slot-void? (obj slot-name)
  (if (slot-bound? obj slot-name)
      (void? (slot-value obj slot-name))
      #t))

(defgeneric compute-method (class receiver message arguments))

;;;; Simple control

(defmacro loop body
  (list #'%%loop (list* #'lambda () body)))

(deffexpr while (test . body) env
  (let ((body (list* #'progn body)))
    (block exit
      (loop
        (if (eval test env)
            (eval body env)
            (return-from exit))))))

(defmacro if (test then else)
  (list #'%%if test then else))

(defmacro when (test . body)
  (list #'if test (list* #'progn body) #void))

(defmacro unless (test . body)
  (list #'if test #void (list* #'progn body)))

(defun call-with-escape (#'fn)
  (labels ((escape opt-val
             (%%raise (make-instance '%%tag :id #'escape :val (optional opt-val)))))
    (%%rescue (lambda (exc)
                (if (and (eq (class-of exc) (class %%tag))
                         (eq (slot-value exc 'id) #'escape))
                    (slot-value exc 'val)
                  (%%raise exc)))
              (lambda ()
                (fn #'escape)))))

(defmacro block (name . body)
  (list #'call-with-escape (list* #'lambda (list name) body)))

(defun return-from (escape . opt-val)
  (apply escape opt-val))

(deffexpr prog1 forms env
  (if (nil? forms)
      #void
      (let ((result (eval (car forms) env)))
        (eval (list* #'progn (cdr forms)) env)
        result)))

(defmacro prog2 (form . forms)
  (list #'progn form (list* #'prog1 forms)))

(defun unwind-protect* (#'protected-thunk #'cleanup-thunk)
  (prog1
      (%%rescue (lambda (exc)
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
      (list-for-each (lambda ((other-val . body))
                       (when (eql val (eval other-val env))
                         (return-from match (eval (list* #'progn body) env))))
                     clauses)
      #void)))

;;;; Reference cells

(defstruct box
  val)

(defun make-box opt-val
  (make-instance 'box :val (optional opt-val)))

(defun box-value (box)
  (slot-value box 'val))

(defsetf #'box-value
  (lambda (new-val box)
    (setf (slot-value box 'val) new-val)))

;;;; Continuations

(defmacro push-prompt (prompt . body)
  (list #'%%push-prompt prompt (list* #'lambda () body)))

(defmacro take-subcont (prompt name . body)
  (list #'%%take-subcont prompt (list* #'lambda (list name) body)))

(defmacro push-subcont (continuation . body)
  (list #'%%push-subcont continuation (list* #'lambda () body)))

(defmacro push-prompt-subcont (prompt continuation . body)
  (list #'%%push-prompt-subcont prompt continuation (list* #'lambda () body)))

(defconstant +default-prompt+ :default-prompt)

(defmacro push-default-prompt body
  (list* #'push-prompt +default-prompt+ body))

(defmacro take-default-subcont (name . body)
  (list* #'take-subcont +default-prompt+ name body))

(defmacro push-default-subcont (continuation . body)
  (list* #'push-prompt-subcont +default-prompt+ continuation body))

;;;; Dynamic variables

(defmacro defdynamic (name . opt-val)
  (list #'def name (list #'make-dynamic (optional opt-val))))

; Parallel dynamic binding: first evaluate all right hand side value
; expressions, then bind all dynamic variables.
(deffexpr dynamic-let (bindings . body) env
  (let ((pairs (map-list (lambda ((dynamic-name expr))
                           (cons (eval dynamic-name env) (eval expr env)))
                         bindings)))
    (labels ((process-pairs (pairs)
               (if (nil? pairs)
                   (eval (list* #'progn body) env)
                   (let* ((((dynamic . value) . rest-pairs) pairs))
                     (dynamic-bind dynamic value
                                   (lambda ()
                                     (process-pairs rest-pairs)))))))
      (process-pairs pairs))))

;;;; JS stuff

; Implementation of .prop-name JS property reference syntax
(defun js-getter (prop-name)
  (flet ((getter (obj) (js-get obj prop-name)))
    (defsetf #'getter
      (lambda (new-val obj)
        (js-set obj prop-name new-val)))
    #'getter))

; Implementation of @method-name JS method call syntax
(defun js-invoker (method-name)
  (lambda (this . arguments)
    (let ((js-fun (js-get this method-name)))
      (js-apply js-fun this (list-to-js-array arguments)))))

(defun js-object plist (plist-to-js-object plist))

(defun js-array elements (list-to-js-array elements))

(defmacro js-lambda (lambda-list . body)
  (list #'js-function (list* #'lambda lambda-list body)))

(defun js-relational-op (name)
  (let ((#'binop (%%js-binop name)))
    (labels ((op (arg1 arg2 . rest)
               (if (binop arg1 arg2)
                   (if (nil? rest)
                       #t
                       (apply #'op (list* arg2 rest)))
                   #f)))
      #'op)))

(def #'== (js-relational-op "=="))
(def #'=== (js-relational-op "==="))
(def #'< (js-relational-op "<"))
(def #'> (js-relational-op ">"))
(def #'<= (js-relational-op "<="))
(def #'>= (js-relational-op ">="))

(def #'lt #'<)
(def #'lte #'<=)
(def #'gt #'>)
(def #'gte #'>=)

(defun != arguments (not (apply #'== arguments)))
(defun !== arguments (not (apply #'=== arguments)))

(def #'* (let ((#'binop (%%js-binop "*")))
           (lambda arguments
             (fold-list #'binop 1 arguments))))

;; Can't simply use 0 as unit or it won't work with strings
(def #'+ (let ((#'binop (%%js-binop "+")))
           (lambda arguments
             (if (nil? arguments)
                 0
                 (fold-list #'binop (car arguments) (cdr arguments))))))

(defun js-negative-op (name unit)
  (let ((#'binop (%%js-binop name)))
    (lambda (arg1 . rest)
      (if (nil? rest)
          (binop unit arg1)
          (fold-list #'binop arg1 rest)))))

(def #'- (js-negative-op "-" 0))
(def #'/ (js-negative-op "/" 1))

;;;; Utilities

(defun list-length (list)
  (if (nil? list)
      0
      (+ 1 (list-length (cdr list)))))

(defun list-elt (list i)
  (if (eql i 0)
      (car list)
      (list-elt (cdr list) (- i 1))))

(defun filter-list (#'pred? list)
  (if (nil? list)
      '()
      (if (pred? (car list))
          (cons (car list) (filter-list #'pred? (cdr list)))
          (filter-list #'pred? (cdr list)))))

(defun append-lists (list-1 list-2)
  (if (nil? list-1)
      list-2
      (cons (car list-1) (append-lists (cdr list-1) list-2))))

;;;; Typechecks

(defgeneric type? (obj type-spec))
(defmethod type? ((obj object) type-spec)
  (default-type? obj type-spec))

(defun default-type? (obj type-spec)
  (let ((c (find-class type-spec)))
    (or (eq c (class object))
	(eq c (class-of obj)))))

(deffexpr typecase (expr . clauses) env
  (let ((val (eval expr env)))
    (block match
      (list-for-each (lambda ((type-spec . body))
                       (if (eq type-spec #t)
                           (return-from match (eval (list* #'progn body) env))
                           (when (type? val type-spec)
                             (return-from match (eval (list* #'progn body) env)))))
                     clauses)
      #void)))

(defstruct type-mismatch-error
  type-spec
  obj)

(deffexpr the (type-spec obj) env
  (let ((evaluated-obj (eval obj env)))
    (if (type? evaluated-obj type-spec)
	evaluated-obj
      (error (make-instance 'type-mismatch-error
                            :type-spec type-spec
			    :obj evaluated-obj)))))

;;;; Conditions

;;; Condition handling and restart handling share some similarities
;;; while also being quite different in other aspects.  The following
;;; tries to share as much code as possible between the two handling
;;; systems, leading to some mildly awkward puns.
;;;
;;; The main similarities between condition and restart handling:
;;;
;;; * Both condition and restart handlers are arranged in
;;;   dynamically-bound handler chains, consisting of individual
;;;   handler frames.  Each frame binds a number of condition and
;;;   restart handlers.  We use two dynamic variables,
;;;   *CONDITION-HANDLER-FRAME* and *RESTART-HANDLER-FRAME*, to point
;;;   at the innermost frame of each chain.
;;;
;;; * Signaling a condition and invoking a restart are very similar
;;;   operations, in that a handler is looked up in the chain, and
;;;   then its handler function is invoked.
;;;
;;; The main differences:
;;;
;;; * Conditions are classes organized in a type hierarchy (e.g. ERROR
;;;   as subtype of SERIOUS-CONDITION), whereas restarts are plain
;;;   names (e.g. USE-VALUE).
;;;
;;; * A condition handler always receives only a single argument, the
;;;   condition, whereas a restart handler receives any number of
;;;   arguments.
;;;
;;; * A restart handler might optionally be associated with a
;;;   particular condition instance, to tell apart the sets of
;;;   restarts belonging to different, concurrently signaled
;;;   conditions.
;;;
;;; * A restart handler might have an interactive function to supply
;;;   arguments if the restart is invoked interactively in the
;;;   debugger (e.g. by prompting the user for the values).
;;;
;;; We follow the Common Lisp condition system very closely (including
;;; details like the condition firewall), except for some details
;;; related to restart invocation, plus a quite arcane difference: We
;;; omit WITH-CONDITION-RESTARTS, which is used to associate a restart
;;; with a particular condition, because it seems like an afterthought
;;; in the CL design, and also probably wouldn't work with fexprs.
;;; Instead we allow an additional keyword, not in CL,
;;; :ASSOCIATED-CONDITION in RESTART-BIND's handler-specs that
;;; establishes the association.  This means that a restart can only
;;; be associated with a single condition, and not, as in Cl, with
;;; multiple conditions.

(defstruct handler-frame
  handlers
  parent)

(defun make-handler-frame (handlers parent)
  (make-instance 'handler-frame :handlers handlers :parent parent))

(defstruct condition-handler
  condition-type
  handler-function)

(defun make-condition-handler (condition-type
			       handler-function)
  (the symbol condition-type)
  (the function handler-function)
  (make-instance 'condition-handler
		 :condition-type condition-type
		 :handler-function handler-function))

(defstruct restart-handler
  restart-name
  handler-function
  associated-condition
  interactive-function)

(defun make-restart-handler (restart-name
			     handler-function
			     interactive-function
			     associated-condition)
  (the symbol restart-name)
  (the function handler-function)
  (the function interactive-function)
  (make-instance 'restart-handler
		 :restart-name restart-name
		 :handler-function handler-function
		 :associated-condition associated-condition
		 :interactive-function interactive-function))

(defdynamic *condition-handler-frame*)
(defdynamic *restart-handler-frame*)

;;; Condition handlers

(defun apply-handler-function (handler arguments)
  (apply (slot-value handler 'handler-function) arguments))

(defun make-handler-bind-operator (#'handler-spec-parser handler-frame-dynamic)
  (vau (handler-specs . body) env
    (let* ((handlers (map-list (lambda (spec) (handler-spec-parser spec env)) handler-specs))
           (handler-frame (make-handler-frame handlers (dynamic handler-frame-dynamic))))
      (dynamic-bind handler-frame-dynamic handler-frame
                    (lambda () (eval (list* #'progn body) env))))))

;; handler-spec ::= (condition-class-name handler-function-form)
(def #'handler-bind
  (make-handler-bind-operator
   (lambda ((class-name function-form) env)
     (make-condition-handler
      class-name
      (eval function-form env)))
   *condition-handler-frame*))

;; handler-spec ::= (restart-name handler-function-form . keywords)
;; keywords::= :interactive-function interactive-function |
;;             :associated-condition associated-condition
(def #'restart-bind
  (make-handler-bind-operator
   (lambda ((restart-name function-form . keywords) env)
     ;; gross
     (let* ((dict (plist-to-js-object keywords))
	    (interactive-function
	     (if (own-property? dict "interactive-function")
		 (eval (.interactive-function dict) env)
	       (lambda () '())))
	    (associated-condition
	     (if (own-property? dict "associated-condition")
		 (eval (.associated-condition dict) env)
	       #void)))
       (make-restart-handler
	restart-name
	(eval function-form env)
	interactive-function
	associated-condition)))
   *restart-handler-frame*))

;;; Condition signaling
          
(defun signal (condition)
  (signal-condition condition (dynamic *condition-handler-frame*) (list condition)))

(defun warn (condition)
  (signal condition)
  (print condition))

;; Additionally to explicit use from Lisp, ERROR gets called by the VM
;; if a JS exception (that's not a block tag for a nonlocal control
;; transfer) occurs during evaluation.  By virtue of calling
;; INVOKE-DEBUGGER, it is guaranteed to never normally return back
;; into JS, only to a formally established restart.
(defun error (condition)
  (signal condition)
  (invoke-debugger condition))

(defstruct restart-not-found
  restart-designator)

(defun restart-not-found (restart-designator)
  (make-instance 'restart-not-found :restart-designator restart-designator))

(defun invoke-restart (restart-designator . arguments)
  (cond ((symbol? restart-designator)
	 (signal-condition restart-designator (dynamic *restart-handler-frame*) arguments))
	((type? restart-designator 'restart-handler)
	 (apply-handler-function restart-designator arguments))
	(#t
	 (error (restart-not-found restart-designator)))))

;; Main signaling entry point, used by both condition and restart
;; signaling.  For condition signaling, the arguments for the handler
;; function are list containing as single element the condition.  In
;; case of restarts, the condition is actually a restart name, and the
;; arguments are the arguments supplied via INVOKE-RESTART.
(defun signal-condition (condition dynamic-frame arguments)
  (let ((handler-and-frame (find-applicable-handler condition dynamic-frame #void)))
    (if (void? handler-and-frame)
        #void
        (let (((handler frame) handler-and-frame))
          (call-condition-handler handler frame arguments)
          ;; signal unhandled: continue search for handlers
          (signal-condition condition (slot-value frame 'parent) arguments)))))

;; Returns a list of the found handler and the frame
;; binding/establishing it.  The frame is needed so that we can access
;; its parent in the implementation of the condition firewall.
(defun find-applicable-handler (condition dynamic-frame payload)
  (if (void? dynamic-frame)
      #void
      (block found
        (list-for-each (lambda (handler)
                         (when (condition-applicable? handler condition payload)
                           (return-from found (list handler dynamic-frame))))
                       (slot-value dynamic-frame 'handlers))
        (find-applicable-handler condition (slot-value dynamic-frame 'parent) payload))))

(defun find-restart (restart-name . opt-condition)
  (the symbol restart-name)
  (let* ((associated-condition (optional opt-condition))
	 (handler-and-frame (find-applicable-handler
			     restart-name
			     (dynamic *restart-handler-frame*)
			     associated-condition)))
    (if (void? handler-and-frame)
	#void
      (let (((handler #ign) handler-and-frame))
	handler))))
    
(defgeneric condition-applicable? (handler condition payload))

(defmethod condition-applicable? ((handler condition-handler) condition #ign)
  (type? condition (slot-value handler 'condition-type)))

(defmethod condition-applicable? ((handler restart-handler)
				  restart-name
				  associated-condition)
  (and (eql (symbol-name restart-name)
	    (symbol-name (slot-value handler 'restart-name)))
       (or (void? associated-condition)
           (slot-void? handler 'associated-condition)
           (eq associated-condition (slot-value handler 'associated-condition)))))

(defgeneric call-condition-handler (handler handler-frame arguments))

(defmethod call-condition-handler ((handler condition-handler) handler-frame arguments)
  ;; Condition firewall
  (dynamic-let ((*condition-handler-frame* (slot-value handler-frame 'parent)))
    (apply-handler-function handler arguments)))

(defmethod call-condition-handler ((handler restart-handler) handler-frame arguments)
  (apply-handler-function handler arguments))

(defun compute-restarts opt-condition
  (reverse-list
   (do-compute-restarts (optional opt-condition)
			'()
			(dynamic *restart-handler-frame*))))

(defun do-compute-restarts (condition restart-list handler-frame)
  (if (void? handler-frame)
      restart-list
    (let ((restarts
           (filter-list
            (lambda (handler)
              (or (void? condition)
		  (slot-void? handler 'associated-condition)
                  (eq (slot-value handler 'associated-condition) condition)))
            (slot-value handler-frame 'handlers))))
      (do-compute-restarts condition
                           (append-lists restarts restart-list)
                           (slot-value handler-frame 'parent)))))

(defun invoke-restart-interactively (restart-designator)
  (let* ((restart (cond ((symbol? restart-designator)
			 (let ((restart (find-restart restart-designator)))
			   (if (void? restart)
			       (error (restart-not-found restart-designator))
			     restart)))
			((type? restart-designator 'restart-handler)
			 restart-designator)
			(#t
			 (error (restart-not-found restart-designator)))))
	 (arguments (funcall (slot-value restart 'interactive-function))))
    (apply #'invoke-restart (list* restart arguments))))

(defstruct simple-error
  message)

(defun simple-error (message)
  (error (make-instance 'simple-error :message message)))

;;;; Sequences and Collections

;; PLOT's sequence iteration protocol (mostly)
(defgeneric start-iteration (sequence))
(defgeneric more? (sequence iteration-state))
(defgeneric current (sequence iteration-state))
(defgeneric advance (sequence iteration-state))
(defgeneric empty-clone (sequence))
(defgeneric add-for-iteration (sequence element))
(defgeneric finish-clone (sequence))

(defun for-each (#'fn seq)
  (let ((state (start-iteration seq)))
    (while (more? seq state)
      (fn (current seq state))
      (setq state (advance seq state)))))

(defun map (#'fn seq)
  (let ((result (empty-clone seq))
        (state (start-iteration seq)))
    (while (more? seq state)
      (setq result (add-for-iteration result (fn (current seq state))))
      (setq state (advance seq state)))
    (finish-clone result)))

;; Implement sequence protocol for lists
(defmethod start-iteration ((self cons))
  self)
(defmethod more? ((self cons) state)
  (cons? state))
(defmethod current ((self cons) state)
  (car state))
(defmethod advance ((self cons) state)
  (cdr state))
(defmethod empty-clone ((self cons))
  #nil)
(defmethod add-for-iteration ((self cons) elt)
  (cons elt self))
(defmethod finish-clone ((self cons))
  (reverse-list self))

(defmethod start-iteration ((self nil))
  #nil)
(defmethod more? ((self nil) state)
  #f)
(defmethod current ((self nil) state)
  (simple-error "At end"))
(defmethod advance ((self nil) state)
  (simple-error "Can't advance past end"))
(defmethod empty-clone ((self nil))
  #nil)
(defmethod add-for-iteration ((self nil) elt)
  (cons elt self))
(defmethod finish-clone ((self nil))
  #nil)

;; Implement sequence protocol for JS arrays
(defmethod start-iteration ((self js-array))
  0)
(defmethod more? ((self js-array) state)
  (lt state (.length self)))
(defmethod current ((self js-array) state)
  (js-get self state))
(defmethod advance ((self js-array) state)
  (+ state 1))
(defmethod empty-clone ((self js-array))
  (js-array))
(defmethod add-for-iteration ((self js-array) elt)
  (@push self elt) self)
(defmethod finish-clone ((self js-array))
  self)

;;;; Streams (very unstable API)

;;; Read as many characters as possible from a character stream.
(defgeneric read-string-from-stream (stream))

;;; Write a string to a character stream.
(defgeneric write-string-to-stream (stream string))

(defdynamic *standard-input*)
(defdynamic *standard-output*)

;; This should really be a generic function to which all classes can
;; add their custom printing methods, but I think Qua is currently too
;; slow to implement the printing inner loop.
(defun print-object (self stream)
  (write-string-to-stream stream (%%object-to-string self)))

;; Unlike CL this returns a list of forms...
(defun read opt-stream
  (let* ((stream (optional opt-stream (dynamic *standard-input*)))
	 (string (read-string-from-stream stream)))
     (%%parse-forms string)))

(defun write (object . opt-stream)
  (let* ((stream (optional opt-stream (dynamic *standard-output*))))
    (if (void? stream)
        (%%print object)
      (print-object object stream))))

(defun print (object . opt-stream)
  (let* ((stream (optional opt-stream (dynamic *standard-output*))))
    (if (void? stream)
        (%%print object)
      (progn
        (dynamic-let ((*print-escape* #f))
          (write object stream)
          (write-string-to-stream stream "\n"))))))

;; Probably wrong name
(defun prin1 (object . opt-stream)
  (let* ((stream (optional opt-stream (dynamic *standard-output*))))
    (if (void? stream)
        (%%print object)
      (progn
        (dynamic-let ((*print-escape* #t))
          (write object stream)
          (write-string-to-stream stream "\n"))))))

;;;; Userspace

;; Delimits all user interactions, so that stack traces can be taken.
(defconstant +user-prompt+ :user-prompt)

;; Wrapped around all user code.  Provides useful handler bindings,
;; prompts, and other dynamic stuff.
(defun push-userspace* (#'user-thunk)
  (push-prompt +user-prompt+
    (dynamic-let ((*standard-input* (%arch-standard-input))
                  (*standard-output* (%arch-standard-output)))
      (user-thunk))))

(defmacro push-userspace body
  (list #'push-userspace* (list* #'lambda () body)))

;;;; Interaction

(defun log args
  (apply @log (list* $console args)))

;;;; Debugger

(defun invoke-debugger (condition)
  (print "")
  (print "Welcome to the debugger!")
  (loop
     (block continue
       (print "Condition: ")
       (print condition)
       (print "Stack: ")
       (print-stacktrace)
       (let ((restarts (compute-restarts condition)))
         (if (> (list-length restarts) 0)
             (progn
               (print "Restarts:")
               (let ((i 0))
                 (list-for-each (lambda (restart)
                                  (print (+ i ": " (symbol-name (slot-value restart 'restart-name))))
                                  (incf i))
                                restarts)
                 (print "Enter a restart number:")
                 (let* ((n (car (read))))
                   (if ($isNaN n)
                       (progn
                         (print "You didn't enter a number. Please try again.")
                         (return-from continue))
                     (invoke-restart-interactively (list-elt restarts n))))))
           (panic condition))))))

(defun print-stacktrace ()
  (labels ((print-frame (k)
       			(when (.dbg_info k)
			  (prin1 (.expr (.dbg_info k))))
			(when (.inner k)
			  (print-frame (.inner k)))))
	  (take-subcont +user-prompt+ k
			(print-frame k)
			(push-prompt +user-prompt+
				     (push-subcont k)))))
