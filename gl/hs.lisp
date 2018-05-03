(defdoc index)

(defdoc qua-overview (:title "Overview for PLT wonks")
  (:parent index)
  (:content "Qua is a Lisp I am developing with the purpose of
   addressing what I see as some of the most critical shortcomings of
   JavaScript."))

(defdoc async-problem
  (:parent qua-overview)
  (:content "The main problem with JavaScript environments is
   asynchronous IO which prevents the use of the control stack in any
   interesting fashion and makes writing anything but the most trivial
   algorithms a nightmare.  Qua squarely addresses this problem with
   delimited continuations, essentially Lua-style coroutines with a
   more interesting API.  Qua programs can sleep, loop, throw
   exceptions normally, and do all the things that programs should be
   able to do.  Qua implements Oleg's multi-prompt delimcc API,
   including delimited dynamic binding for per-continuation dynamic
   variables."))

(defdoc type-problem
  (:parent qua-overview)
  (:content "Another problem plaguing JavaScript apps is lack of
  object structure and function argument types enforcement.  Qua is
  dynamically typechecked like most Lisps, but it does have a novel
  runtime type system with reified generics, e.g. a (LIST NUMBER)
  knows at runtime that it is a list containing numbers, and will
  reject attempts to add other types of elements.  This prevents large
  swathes of runtime errors.  The system is inspired by an idea by
  Cardelli presented in Stephen Dolan's dissertation about algebraic
  subtyping.  Essentially, every type parameter of a generic type
  consists of a pair of an input type and an output type.  This leads
  to a very simple and usable definition of variance."))

(defdoc meta-problem
  (:parent qua-overview)
  (:content "Last but not least, Qua addresses the lack of
  JavaScript's metaprogramming facilities by adopting fexprs and
  first-class lexical environments from John Shutt's Kernel language.
  This brings hygienic metaprogramming on par with or surpassing
  advanced Scheme macro systems to the language, and also a deep sense
  of elegance, regularity, and fun."))

(defdoc performance-goals
  (:parent qua-overview)
  (:content "Qua is designed to be ultra-lightweight and integrate
  tightly into JavaScript applications.  The goal is to fit Qua in
  under 2000 lines of tractable code, under 100KB of final JavaScript
  output, and under 100ms of startup time.  Applications are expected
  to be written in a mix of JavaScript and Qua, with JavaScript used
  for inner loops and data processing and Qua used for high-level
  control and chaining together of components."))

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
(print "<h1><span class='logo'>(qua)</span> Ultralight Lisp for the Web</h1>")
(print (render-doc-node index))
(print "</body>")
