(print "Welcome to Qua Generic Lisp! Type ^C to exit.")

(defclass quit (restart) ())

(block quit
  (restart-bind ((quit (lambda #ign
                         (print "Goodbye!")
                         (return-from quit))))
    (let ((env (the-environment)))
      (loop
         (block abort
           (restart-bind ((abort (lambda #ign
                                   (print "Aborting")
                                   (return-from abort))))
             (print
              (in-userspace
               (eval (%%read) env)))))))))

