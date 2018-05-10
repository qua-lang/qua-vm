;; Loads a file into the current or specified environment.
(def #'load
  (wrap (vau (path . opt-env) env
          (eval (read-file path) (optional opt-env env)))))

;; Loads all components of a system into the current or specified
;; environment.
(def #'load-system
  (wrap (vau (path . opt-env) denv
          (let* ((env (optional opt-env denv))
                 (#'defsystem
                  (vau (name :depends-on deps :components components) #ign
                    (list-for-each (lambda (dep)
                                     (load-system (node:join-paths (node:dirname path) dep) env))
                                   deps)
                    (list-for-each (lambda (component)
                                     (load (node:join-paths (node:dirname path) component) env))
                                   components))))
            (load path)))))

(load-system "lisp/qua-node-repl.system.lisp")
;(load-system "lisp/qua-full-node.system.lisp")
;(load-system "lisp/doc/doc.system.lisp")
