;; Node-specific tests

(let ()
  (load-system "test/lisp/test-sample.system.lisp")
  (%expect 77 (test:sample-fn)))
