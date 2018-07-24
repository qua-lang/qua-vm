;;;; Main

(push-userspace
  (print "Welcome to Qua!")
  (let ((env (the-environment)))
    (block quit
      (restart-bind ((quit (lambda ()
                             (print "Goodbye!")
                             (return-from quit))))
        (loop
          (block abort
            (restart-bind ((abort (lambda ()
                                    (print "Aborting")
                                    (return-from abort))))
                          (let ((forms (read)))
                            (print forms)
                            (prin1 (eval (list* #'progn forms) env))))))))))
