(defclass (collection :e) (standard-object) ())
(defgeneric add (collection element))
(defgeneric len (collection))

(defclass (list :e) ((collection :e)) ())
(defgeneric elt (collection index))
