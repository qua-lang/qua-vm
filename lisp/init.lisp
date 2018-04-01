;;;; The middlebrow layer

;; This layer gets called immediately after VM startup, with only
;; lowlevel bindings provided by the JS code (%%), in order to setup
;; the highlevel user language.  The user language combiners should
;; all be defined as type-checked functions and fortified macros --
;; which we don't have yet.  So we need to define unsafe barebones
;; implementations for some combiners such as LET and MAP-LIST.  These
;; will then later be overridden with the safer user language
;; combiners.

;; Rebind symbols to final names already, where it makes some sense.
;; Use the QUA package for stuff that's not expected to be called by
;; the user or that doesn't have a final API yet.
(%%def #'def #'%%def)
(def #'car #'%%car)
(def #'cdr #'%%cdr)
(def #'cons #'%%cons)
(def #'eval #'%%eval)
(def #'eq #'%%eq)
(def #'if #'%%if)
(def #'make-environment #'%%make-environment)
(def #'progn #'%%progn)
(def #'unwrap #'%%unwrap)
(def #'wrap #'%%wrap)

(def #'qua:to-fsym #'%%to-fsym)

;; Optim bindings
(def #'list* #'%%list*)

;; Test bindings
(def #'qua:assert #'%%assert)
(def #'qua:deep-equal #'%%deep-equal)

(def #'quote (%%vau (operand) #ign operand))
(def #'list (wrap (%%vau operands #ign operands)))

(def #'qua:make-macro-expander
  (wrap
    (%%vau (expander-operative) #ign
      (%%vau operands env
        (eval 
         (eval (cons expander-operative operands) (make-environment))
         env)))))

;; Prognize vau
(def #'vau
  (qua:make-macro-expander
    (%%vau (params env-param . body) #ign
      (list #'%%vau params env-param
            (list* #'progn body)))))

(def #'macro
  (qua:make-macro-expander
    (vau (params . body) #ign
      (list #'qua:make-macro-expander
            (list* #'vau params #ign body)))))

(def #'defmacro
  (macro (name params . body)
    (list #'def (qua:to-fsym name)
          (list* #'macro params body))))

(defmacro qua:lambda/unchecked (params . body)
  (list #'wrap (list* #'vau params #ign body)))

(defmacro qua:defun/unchecked (name params . body)
  (list #'def (qua:to-fsym name)
        (list* #'qua:lambda/unchecked params body)))

(def #'lambda #'qua:lambda/unchecked)
(def #'defun #'qua:defun/unchecked)

(defun apply (fun args)
  (eval (cons (unwrap fun) args)
        (make-environment)))

(defun nilp (obj) (eq obj ()))

(defun map-list (#'fun list)
  (if (nilp list)
      ()
    (cons (fun (car list)) (map-list #'fun (cdr list)))))

(defmacro let (bindings . body)
  (list* (list* #'lambda (map-list #'car bindings)
                body)
         (map-list #'cadr bindings)))
