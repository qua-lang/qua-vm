;;;; Main

(push-userspace
  (print "Welcome to Qua!")
  (print "Press ENTER to evaluate the current line in Qua.")
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
                            (prin1 (eval (list* #'progn forms) env))))))))))
