(print "Welcome to Qua Generic Lisp! Type ^C to exit.")

(let ((env (the-environment)))
  (loop
     (block abort
       (restart-bind ((abort (lambda #ign
                               (print "Aborting")
                               (return-from abort))))
         (print
          (in-userspace
            (eval (%%read) env)))))))
