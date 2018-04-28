(let ((env (the-environment)))
  (loop
    (print (eval (%%read) env))))
