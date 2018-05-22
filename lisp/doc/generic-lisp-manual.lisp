(defdoc index (:title "Generic Lisp Manual"))

(defdoc lexical-bindings (:title "Lexical Bindings")
  (:parent index))

(defdoc op-let (:title "LET")
  (:parent lexical-bindings)
  (:type +operator-type+)
  (:syntax "let ((lhs rhs)*) form* => result")
  (:description "Evaluates the right-hand sides from left to right,
  saving the results.  Then all left-hand sides are bound to the
  corresponding results in parallel."))

(defdoc op-let* (:title "LET*")
  (:parent lexical-bindings)
  (:type +operator-type+)
  (:syntax "let* ((lhs rhs)*) form* => result")
  (:description "Evaluates the bindings sequentially from left to
  right, so that the right-hand side of each binding has all earlier
  bindings in scope."))

(defdoc control-flow (:title "Control Flow")
  (:parent index))

(defdoc op-progn (:title "PROGN")
  (:parent control-flow)
  (:type +operator-type+)
  (:syntax "progn form* => result")
  (:description "Evaluates the forms from left to right, returning the
  value of the last.  If there are no forms, returns void."))

(defdoc op-prog1 (:title "PROG1")
  (:parent control-flow)
  (:type +operator-type+)
  (:syntax "prog1 first-form form* => result")
  (:description "Evaluates the forms from left to right, returning the
  value of the first.  If there are no forms, returns void."))

(print "<head>")
(print "<meta name='generator' value='Qua'>")
(print "<style type='text/css'>")
(print "html { font-size: 16px; }")
(print "h1,h2,h3,h4,h5,h6,h7 { }")
(print "div, p { text-indent: 1em; }")
(print ".logo { background-color: yellow; margin: 0; padding: 0.125em 0.33em; font-family: monospace; font-style: italic; }")
(print "</style>")
(print "</head>")
(print "<body>")
(print (render-doc-node index))
(print "</body>")
