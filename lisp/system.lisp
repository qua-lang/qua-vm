(def #'load
  (wrap (vau (path . opt-env) env
          (eval (read-file path) (optional opt-env env)))))

(def #'load-system
  (wrap (vau (path . opt-env) denv
          (let* ((env (optional opt-env denv))
                 (#'defsystem
                  (vau (name :components components) #ign
                    (for-each (lambda (component)
                                (load (node:join-paths (node:dirname path) component) env))
                              components))))
            (load path)))))
