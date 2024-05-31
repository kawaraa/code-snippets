// The Iterator pattern that provides a way to sequentially access the elements of an aggregate object (such as an array or collection) without exposing its underlying representation.

// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP, etc.)
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
console.log(range(0, 4, 1)); // [0, 1, 2, 3, 4] - Generate numbers range 0..4
console.log(range(4, 10, 2)); // [ 4, 6, 8, 10 ]

// Generate the alphabet using Array.from making use of it being ordered as a sequence
range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) => String.fromCharCode(x));
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
