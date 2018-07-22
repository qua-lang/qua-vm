(print "Welcome to Qua! Type ^C to exit.")

;;;; Main

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
            (push-userspace
              (prin1 (eval (list* #'progn (read)) env)))))))))
