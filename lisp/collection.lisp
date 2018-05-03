(defclass (collection :e) (standard-object) ())
(defgeneric add (collection element))
(defgeneric len (collection))
(defgeneric iterator (collection))

(defclass (list :e) ((collection :e)) ())
(defgeneric elt (collection index))

(defclass (iterator :e) () ())
(defgeneric next? (iterator))
(defgeneric next (iterator))
