(defconstant +book-type+ "Book")
(defconstant +chapter-type+ "Chapter")
(defconstant +section-type+ "Section")
(defconstant +special-type+ "Special")

(defclass doc-node ()
  ((name :type symbol)
   (children :type (js-array-list doc-node))))

(defun make-doc-node (name attrs env)
  (prog1 (def node (make-instance 'doc-node
                                  :name name
                                  :children (make-js-array-list 'doc-node)))
    (list-for-each (lambda ((attr-name . values))
                     (when (= (symbol-name attr-name) "parent")
                       (let ((parent (eval (car values) env)))
                         (add (slot-value parent 'children) node)))
                     (setf (slot-value node attr-name) values))
                   attrs)))

(deffexpr defdoc (name . attrs) env
  (eval (list #'def name (make-doc-node name attrs env)) env))

(defun render-doc-node-attr (node attr-name tag)
  (let ((result ""))
    (when (slot-bound? node attr-name)
      (incf result (+ "<" tag ">"))
      (list-for-each (lambda (attr-value)
                       (incf result attr-value))
                     (slot-value node attr-name))
      (incf result (+ "</" tag ">\n")))
    result))

(defdynamic *doc-node-nesting-depth* 1)

(defun render-doc-node (node)
  (let ((result ""))
    (incf result (render-doc-node-attr node 'title (+ "h" (dynamic *doc-node-nesting-depth*))))
    (incf result (render-doc-node-attr node 'syntax "pre"))
    (incf result (render-doc-node-attr node 'description "div"))
    (incf result (render-doc-node-attr node 'content "div"))
    (dynamic-let ((*doc-node-nesting-depth*
                   (+ 1 (dynamic *doc-node-nesting-depth*))))
      (for-each (lambda (child)
                  (incf result (render-doc-node child)))
                (slot-value node 'children)))
    result))
