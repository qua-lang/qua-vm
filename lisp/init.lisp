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
(def #'progn #'%%progn) ; Evaluate expressions in order.
(def #'unwrap #'%%unwrap) ; Extract fexpr underlying a function.
(def #'wrap #'%%wrap) ; Construct a function out of a fexpr.

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
(defmacro qua:lambda/unchecked (params . body)
  (list #'wrap (list* #'vau params #ign body)))

; Define a named function that doesn't do any type checking in the
; current environment.
(defmacro qua:defun/unchecked (name params . body)
  (list #'def (qua:to-fun-sym name) (list* #'qua:lambda/unchecked params body)))

; Use the unchecked versions for LAMBDA and DEFUN for now
; which will later use checked versions.
(def #'lambda #'qua:lambda/unchecked)
(def #'defun #'qua:defun/unchecked)

; Apply a function to a list of arguments.
(defun apply (fun args)
  (eval (cons (unwrap fun) args)
        (make-environment)))

; Return true if an object is #NIL, false otherwise.
(defun nilp (obj) (eq obj #nil))

; Produce a new list by applying a function to each element of a list.
(defun qua:map-list (#'fun list)
  (if (nilp list)
      #nil
    (cons (fun (car list)) (qua:map-list #'fun (cdr list)))))

; The usual parallel-binding LET with left to right evaluation of
; value expressions.
(defmacro let (bindings . body)
  (list* (list* #'lambda (qua:map-list #'car bindings)
                body)
         (qua:map-list #'cadr bindings)))
