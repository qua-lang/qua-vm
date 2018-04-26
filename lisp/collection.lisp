(defclass (collection :e) (standard-object) ())

(defgeneric add (collection element))

(defclass (list :e) ((collection :e)) ())
