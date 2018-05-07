(defclass (collection :e) ((sequence :e)) ())
(defgeneric add (collection element))
(defgeneric len (collection))

(defclass (indexed-collection :e) ((collection :e)) ())
(defgeneric elt (collection index))

(defclass (array-list :e) ((indexed-collection :e)) ())
