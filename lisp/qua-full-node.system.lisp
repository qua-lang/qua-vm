(defsystem qua-full-node
  :depends-on ("collections.system.lisp" "tests.system.lisp")
  :components ("test-node.lisp"))