(def #'read #'%%read)

(print "Welcome to Qua! Type ^C to exit.")

(defclass quit (restart) ())

;;;; Debugger

(defun invoke-debugger (condition)
  (print "")
  (print "Welcome to the debugger!")
  (loop
     (block continue
       (print "Condition: ")
       (print condition)
       (let ((restarts (compute-restarts condition)))
         (if (> (list-length restarts) 0)
             (progn
               (print "Restarts:")
               (let ((i 1))
                 (list-for-each (lambda (restart)
                                  (print (+ i ": " (symbol-name (slot-value restart 'restart-name))))
                                  (incf i))
                                restarts)
                 (print "Enter a restart number:")
                 (let* ((s (%%read-line))
                        (n ($Number s)))
                   (if ($isNaN n)
                       (progn
                         (print "You didn't enter a number. Please try again.")
                         (return-from continue))
                     (invoke-restart-interactively (list-elt restarts n))))))
           (%%panic condition))))))

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

