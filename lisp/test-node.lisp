;; Node-specific tests

(let ()
  (load-system "lisp/test-sample.system.lisp")
  (%expect 77 (test:sample-fn)))
