(defconstant +book-type+ "Book")
(defconstant +chapter-type+ "Chapter")
(defconstant +section-type+ "Section")
(defconstant +operator-type+ "Operator")

(defclass doc-node ()
  ((name :type symbol)
   (children :type (js-array-list doc-node))))

(defun make-doc-node (name attrs env)
  (prog1 (def node (make-instance 'doc-node
                                  :name name
                                  :children (js-array-list 'doc-node)))
    (for-each (lambda ((attr-name . values))
                (when (= (symbol-name attr-name) "parent")
                  (let ((parent (eval (car values) env)))
                    (add (slot-value parent 'children) node)))
                (setf (slot-value node attr-name) values))
              attrs)))

(deffexpr defdoc (name . attrs) env
  (eval (list #'def name (make-doc-node name attrs env)) env))

(defun capitalize (string)
  (+ (@toUpperCase (@charAt string 0)) (@slice string 1)))

(defun render-doc-node-attr (node attr-name tag)
  (def result "")
  (when (slot-bound? node attr-name)
    (unless (= "title" (symbol-name attr-name))
      (incf result (+ "<h5>" (capitalize (symbol-name attr-name)) "</h5>")))
    (incf result (+ "<" tag ">"))
    (for-each (lambda (attr-value)
                (incf result attr-value))
              (slot-value node attr-name))
    (incf result (+ "</" tag ">\n")))
  result)

(defdynamic *doc-node-nesting-depth* 1)

(defun render-doc-node (node)
  (def result "")
  (incf result (render-doc-node-attr node 'title (+ "h" (dynamic *doc-node-nesting-depth*))))
  (when (= 1 (dynamic *doc-node-nesting-depth*))
    (incf result (render-toc node)))
  (incf result (render-doc-node-attr node 'syntax "pre"))
  (incf result (render-doc-node-attr node 'description "div"))
  (incf result (render-doc-node-attr node 'content "div"))
  (dynamic-let ((*doc-node-nesting-depth*
                 (+ 1 (dynamic *doc-node-nesting-depth*))))
    (for-each (lambda (child)
                (incf result (render-doc-node child)))
              (slot-value node 'children)))
  result)

(defun render-toc (node)
  (def result "")
  (incf result "<ul>")
  (for-each (lambda (child)
              (incf result (render-toc-entry child)))
            (slot-value node 'children))
  (incf result "</ul>")
  result)

(defun doc-node-attr (node name)
  (car (slot-value node name)))

(defun render-toc-entry (node)
  (def result "")
  (incf result (+ "<li>" (doc-node-attr node 'title) "</li>"))
  result)

