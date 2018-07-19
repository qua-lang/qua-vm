(def #'read #'%%read)

(print "Welcome to Qua! Type ^C to exit.")

(defclass quit (restart) ())

;;;; Main

(let ((env (the-environment)))
  (block quit
    (restart-bind ((quit (lambda #ign
                           (print "Goodbye!")
                           (return-from quit))))
      (loop
        (block abort
          (restart-bind ((abort (lambda #ign
                                  (print "Aborting")
                                  (return-from abort))))
            (push-userspace
              (print (eval (read) env)))))))))

