;; Rename symbols to final names already, where possible
(%%def #'def #'%%def)
(def #'car #'%%car)
(def #'cdr #'%%cdr)
(def #'cons #'%%cons)
(def #'eval #'%%eval)
(def #'make-environment #'%%make-environment)
(def #'progn #'%%progn)
(def #'qua:to-fsym #'%%to-fsym)
(def #'unwrap #'%%unwrap)
(def #'wrap #'%%wrap)

; Optim
(def #'list* #'%%list*)

; Test
(def #'qua:assert #'%%assert)
(def #'qua:deep-equal #'%%deep-equal)

(def #'quote (%%vau (x) #ign x))
(def #'list (wrap (%%vau o #ign o)))

(def #'qua:make-macro-expander
  (wrap
    (%%vau (expander-function) #ign
      (%%vau operands env
        (eval 
         (eval (cons expander-function operands) (make-environment))
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

(defmacro qua:lambda (params . body)
  (list #'wrap (list* #'vau params #ign body)))
