(defdoc index (:title "Generic Lisp the Language")
  (:type +book-type+)
  (:content "Manuel Simoni"))

(defdoc control-flow (:title "Introduction")
  (:type +chapter-type+)
  (:parent index)
  (:content
   "Generic Lisp is a new dialect of Lisp, influenced by Common Lisp,
  Kernel, and Scheme.  Notable features of Generic Lisp are
  lexically-scoped fexprs for metaprogramming, delimited continuations
  for control abstraction, and reified generics for type safety."))

(defdoc control-flow (:title "Data and Control Flow")
  (:type +chapter-type+)
  (:parent index))

(defdoc progn (:title "PROGN")
  (:type +special-type+)
  (:parent control-flow)
  (:syntax "progn forms* => result")
  (:description "Evaluates each of its operands from left to right and
    returns the value of the last.  If there are no operands, returns
    void."))

(print (render-doc-node index))
