(print "Welcome to Qua Generic Lisp! Enter ^C to exit.")

(let ((env (the-environment)))
  (loop
    (print
     (in-userspace (eval (%%read) env)))))
