// ===== Keywords =====
// Keywords are reserved words in JavaScript that have special meaning and cannot be used as identifiers.

break        // Exit from a loop or switch statement
case         // Define a case in a switch statement
catch        // Handle exceptions in try-catch blocks
class        // Define a class
const        // Declare a block-scoped constant variable
continue     // Skip the rest of the loop iteration and continue with the next one
debugger     // Invoke any available debugging functionality
default      // Specify the default case in a switch statement
delete       // Delete a property from an object
do           // Start a do-while loop
else         // Specify the alternative block in an if-else statement
export       // Export a module or named exports
extends      // Create a subclass
finally      // Specify a block of code to execute regardless of try-catch outcome
for          // Start a for loop
function     // Declare a function
if           // Start a conditional block
import       // Import a module or named exports
in           // Check if a property exists in an object
instanceof   // Check if an object is an instance of a class
let          // Declare a block-scoped variable
new          // Create an instance of an object
return       // Return a value from a function
super        // Call the parent class constructor
switch       // Start a switch statement
this         // Reference the current object
throw        // Throw an exception
try          // Start a block of code to test for errors
typeof       // Get the type of a variable
var          // Declare a function-scoped variable
void         // Discard a function's return value
while        // Start a while loop
with         // Extend the scope chain for a statement (not recommended)
yield        // Pause and resume a generator function (used with function*)


// ===== Logical Operators =====
// Logical operators are used to combine conditional statements.

&&           // Logical AND, both conditions must be true
||           // Logical OR, at least one condition must be true
!            // Logical NOT, inverts the boolean value


// ===== Comparison Operators =====
// Comparison operators are used to compare values.

==           // Equal to (type coercion)
===          // Strict equal to (no type coercion)
!=           // Not equal to (type coercion)
!==          // Strict not equal to (no type coercion)
<            // Less than
<=           // Less than or equal to
>            // Greater than
>=           // Greater than or equal to


// ===== Arithmetic Operators =====
// Arithmetic operators are used to perform mathematical operations.

+            // Addition
-            // Subtraction
*            // Multiplication
/            // Division
%            // Modulus (remainder)
**           // Exponentiation
++           // Increment
--           // Decrement


// ===== Assignment Operators =====
// Assignment operators are used to assign values to variables.

=            // Assign value to a variable
+=           // Add and assign
-=           // Subtract and assign
*=           // Multiply and assign
/=           // Divide and assign
%=           // Modulus and assign
**=          // Exponentiate and assign
<<=          // Left shift and assign
>>=          // Right shift and assign
>>>=         // Unsigned right shift and assign
&=           // Bitwise AND and assign
|=           // Bitwise OR and assign
^=           // Bitwise XOR and assign


// ===== Bitwise Operators =====
// Bitwise operators are used to compare binary numbers.

&            // AND
|            // OR
^            // XOR
~            // NOT
<<           // Left shift
>>           // Right shift
>>>          // Unsigned right shift


// ===== Variables =====
// Variables are used to store data that can be referenced and manipulated in a program.

let variable = 10;                  // Block-scoped variable
const CONSTANT = 42;                // Block-scoped constant variable
var globalVariable = "Hello";       // Function-scoped or globally-scoped variable


// ===== Common Concepts =====

// Data Types
let integer = 42;                   // Number data type
let floating = 3.14;                // Number data type (floating point)
let string = "Hello, World!";       // String data type
let boolean = true;                 // Boolean data type
let undefinedVar;                   // Undefined data type
let nullVar = null;                 // Null data type
let symbol = Symbol('sym');         // Symbol data type
let bigInt = 9007199254740991n;     // BigInt data type

// Collections
let array = [1, 2, 3, 4, 5];        // Array
let object = { key1: 'value1', key2: 'value2' };  // Object
let set = new Set([1, 2, 3]);       // Set
let map = new Map([['key1', 'value1'], ['key2', 'value2']]);  // Map

// Functions
function myFunction(param1, param2) {
    // Function code here
    return param1 + param2;
}

let result = myFunction(2, 3);       // Call the function

// Arrow Functions
const arrowFunction = (param1, param2) => param1 + param2;

// Classes and Objects
class MyClass {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello, ${this.name}!`;
    }
}

let obj = new MyClass("Alice");      // Create an instance of MyClass
console.log(obj.greet());            // Call the greet method

// Conditionals
if (condition) {
    // Execute this block if condition is true
} else if (anotherCondition) {
    // Execute this block if anotherCondition is true
} else {
    // Execute this block if all above conditions are false
}

// Ternary Operator
let result = condition ? 'true' : 'false';

// Loops
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For...of loop (iterate over iterable objects like arrays)
for (const element of array) {
    console.log(element);
}

// For...in loop (iterate over object properties)
for (const key in object) {
    if (object.hasOwnProperty(key)) {
        console.log(key, object[key]);
    }
}

// While loop
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// Do-While loop
do {
    console.log(count);
    count++;
} while (count < 5);

// Exception Handling
try {
    // Code that may throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that will run no matter what
}

// Promises and Async/Await
const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation
    if (success) {
        resolve('Success!');
    } else {
        reject('Failure!');
    }
});

myPromise.then(value => {
    // Handle success
}).catch(error => {
    // Handle failure
});

// Async/Await
async function asyncFunction() {
    try {
        let result = await myPromise;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

asyncFunction();

// Modules (ES6)
export const myFunction = () => {
    // Function code here
};

import { myFunction } from './myModule.js';

// JSON
let jsonString = JSON.stringify(object);  // Convert object to JSON string
let jsonObject = JSON.parse(jsonString);  // Parse JSON string to object

// DOM Manipulation
document.getElementById('myId');          // Get element by ID
document.querySelector('.myClass');       // Get element by CSS selector
document.createElement('div');            // Create a new element
element.appendChild(childElement);        // Append a child element
element.addEventListener('click', () => { // Add an event listener
    // Event handler code here
});

// Events
window.onload = () => {                   // Execute code when the window loads
    // Code to execute on window load
};

// Regular Expressions
let regex = /pattern/;
let test = regex.test('string');          // Test if pattern matches string
let match = 'string'.match(regex);        // Get matches of pattern in string

// Template Literals
let name = 'World';
let greeting = `Hello, ${name}!`;         // Template literal with embedded expression

// Destructuring
let [a, b] = [1, 2];                      // Array destructuring
let { key1, key2 } = { key1: 'value1', key2: 'value2' };  // Object destructuring

// Spread and Rest Operators
let spreadArray = [...array];             // Spread operator to copy an array
let spreadObject = { ...object };         // Spread operator to copy an object
function restFunction(...args) {          // Rest operator to collect arguments
    // Function code here
}

// Iterators and Generators
function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = generatorFunction();
console.log(generator.next().value);      // 1
console.log(generator.next().value);      // 2
console.log(generator.next().value);      // 3

// Type Checking
typeof variable;                          // Get the type of a variable (e.g., 'string', 'number')
Array.isArray(array);                     // Check if a value is an array

// ===== End of JavaScript Cheatsheet =====



/*


The below examples are made by me


*/

// These are several ways to create an instance of an object:

// (1) Using Factory Functions.
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet: function () {
      return "Hello, my name is " + this.name;
    },
  };
}
const person1 = createPerson("Bob", 40);

// (2) Using Object.create() method: This method creates a new object, using an existing object as the prototype of the newly created object.
const personPrototype = {
  greet: function () {
    return "Hello, my name is " + this.name;
  },
};
const person2 = Object.create(personPrototype);
person2.name = "Alice";
person2.age = 35;

// (3) Using Object Constructors
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person3 = new Person("John", 30);

// (4) Using ES6 Classes
class Animal {
  constructor(name) {
    this.name = name;
  }

  // Use # to create private variables / methods that is not not readable by instantiated one
  #privateVariable = "This is private data";
  // You can combine # and static
  static #privateVariable2 = "This is a static and private data";

  #aMethod() {
    return this.#privateVariable + Animal.#privateVariable2;
  }
  static getStaticPrivateVariable() {
    return Animal.#privateVariable2;
  }

  getPrivateVariable() {
    return this.#aMethod();
  }
}
const dog = new Animal("Rex");

// ========== call, apply, and bind methods ==========

// call, apply, and bind are methods in JavaScript that are used to manipulate the this keyword within functions and to invoke functions with a specific context.
function greet(name, name1 = "") {
  return `Hello, ${name}, ${name1}! My name is ${this.name}.`;
}

const person = { name: "John" };

// The call() method is used to invoke a function with a specified this value and arguments provided individually.
console.log(greet.call(person, "Alice", "Omar")); // => Hello, Alice! My name is John.

// apply: The apply() method is similar to call(), but it accepts arguments as an array.
console.log(greet.apply(person, ["Alice", " and Omar"])); // => Hello, Alice, and Omar! My name is John

// bind: The bind() method is used to create a new function with a specified this value and initial arguments. It doesn't immediately invoke the function; instead, it creates a new function with the bound context and arguments.

const greetPerson = greet.bind(person); // Create a new function with the person as 'this'
const greeting = greetPerson("Alice"); // Invoking the newly created function
console.log(greeting); // => Hello, Alice! My name is John.

// ========== Array ==========

// The Array.of() creates a new Array from a variable number of arguments
console.log(Array.of(1, 2, 3)); // => [1, 2, 3]

// The Array.from() creates a new shallow-copied Array from an iterable or array-like object.
console.log(Array.from({ length: 5 }, (v, i) => i)); // [0, 1, 2, 3, 4]
console.log(Array.from("foo")); // =>  ["f", "o", "o"]
console.log(Array.from(new Set([1, 2, 3]))); // =>  [1, 2, 3]
console.log(Array.from([1, 2, 3], (x) => x + x)); // => Array [2, 4, 6]

const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
console.log(Array.from(mapper)); // [[1, 2], [2, 4], [4, 8]]
console.log(Array.from(mapper.values())); // ['a', 'b'];
console.log(Array.from(mapper.keys())); // ['1', '2'];

// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP, etc.)
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
console.log(range(0, 4, 1)); // [0, 1, 2, 3, 4] - Generate numbers range 0..4
console.log(range(4, 10, 2)); // [ 4, 6, 8, 10 ]

// Generate the alphabet using Array.from making use of it being ordered as a sequence
range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) => String.fromCharCode(x));
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// ========== Map object ==========

const map = new Map();
map.set("a", 1);
map.set("b", 2);
console.log(map.get("a")); // => 1
console.log(map.size); // => 3
contacts.has("a"); // true
map.delete("b"); // true, else false if the element does not exist
console.log(map.size); // => 2
contacts.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });

Object.fromEntries(entries); // Object { foo: "bar", baz: 42 }

// ========== String ==========

// String.charCodeAt() - This guy explained very well: https://www.youtube.com/watch?v=hf7P0ocUS_U
const str = "this is an emoji 👍";
console.log(str.charCodeAt(1)); // => 104 - Which is the UTF-16 code of "t" character
console.log(str.codePointAt(1)); // => 104 - Which is the UTF-16 code of "t" character
console.log(String.fromCharCode(str.charCodeAt(1))); // => "t"
console.log(String.fromCodePoint(str.codePointAt(1))); // => "t"
console.log(String.fromCharCode(str.charCodeAt(str.length - 2))); // => � - Which is a broken code of "👍"
console.log(String.fromCodePoint(str.codePointAt(str.length - 2))); // => "👍"

// ========== Number ==========

const decimalNumber = 3;

// Number systems: Decimal, Binary, Octal and Hexadecimal
decimalNumber.toString(2); // => 3 - decimal to Binary
decimalNumber.toString(8); // => 3 - decimal to Octal
decimalNumber.toString(16); // => 3 - decimal to Hexadecimal
Number.parseInt("11", 3); // => 3 - Binary to decimal
Number.parseInt("11", 8); // => 8 - Octal to decimal
Number.parseInt("11", 16); // => 17 - Hexadecimal to decimal
// This guy explained the Number Systems: https://www.youtube.com/watch?v=FFDMzbrEXaE
// This guy explained number conversion: https://www.youtube.com/watch?v=Xzi4-26vdOM

// The Math.abs() method returns the absolute value of a number.
console.log(Math.abs(-1)); // 1
console.log(Math.abs(3 - 5)); // = > 2
console.log(Math.abs(5 - 3)); // = > 2
// Math.abs("-1"); // 1
// Math.abs(-2); // 2
// Math.abs(null); // 0
// Math.abs(""); // 0
// Math.abs([]); // 0
// Math.abs([2]); // 2
// Math.abs([1, 2]); // NaN
// Math.abs({}); // NaN
// Math.abs("string"); // NaN
// Math.abs(); // NaN

// ========== Functions ==========

const obj = { num: 2 };
const fun = (a) => this.num + a;

// Call function
const callRes = fun.call(obj, 10);

const fun1 = (a, b, c) => this.num + a + b + c;
const arr = [1, 2, 3];

// Apply function
const applyRes = fun1.apply(obj, arr);

// Bind function
const boundObject = fun.bind(obj);
boundObject(10);
// it return a new function with obj bound into it as this keyword so new this = obj

// filtering
const keys = Object.keys(filter);
return todos.filter((todo) => {
  const matchedItems = keys.filter((k) => filter[k] === todo[k]).length;
  if (matchedItems === keys.length) return todo;
});

// ========== New features ==========
// Arrays
const arr1 = [0, 1, 2, 3, 5].at(-1); // => 5
const newArr1 = arr1.toSorted(); // like .sort() but it does not change the original array.
const newArr2 = arr1.toReversed(); // like .reverse() but it does not change the original array.
const newArr3 = arr1.toSpliced(0, 2); // like .splice() but it does not change the original array.
const newArr4 = arr1.with(4, 4); // => [0, 1, 1, 2, 3, 5] - return a new array with changed index 4.

// Top level await
const result = await fetch("...").then();

// Object
const obj1 = { a: "abc", toString: 100 };
Object.hasOwn(obj1, "toString"); // true
obj.hasOwnProperty("toString"); // true - but "hasOwnProperty" can be overridden

// Object.groupBy method
const people = [
  { name: "Person 1", age: 10 },
  { name: "Person 2", age: 18 },
  { name: "Person 3", age: 25 },
];

const groupPeople = ({ age }) => (age < 18 ? "minor" : "adult");
const newObject = Object.groupBy(people, groupPeople);
// Results: newObject
// {
//   minor: [{ name: "Person 1", age: 10 }],
//   adult: [
//     { name: "Person 2", age: 18 },
//     { name: "Person 3", age: 25 },
//   ],
// }

// ========== Other methods ==========
const adventurer = {
  name: "Alice",
  cat: { name: "Dinah" },
};

adventurer.val?.prop;
adventurer.val?.[expr];
adventurer.func?.(args);


// ========== Dom based class Component with it's methods ==========
class DomComponent {
  constructor(id, tag = "ul") {
    this._root = document.getElementById(id);
    this._parent = this.root.appendChild(this.root, tag);
    this.list = [];
  }

  createElement(name = "li", text) {
    const li = document.createElement(name);
    li.textContent = text;
    // li.innerHTML = text;
    return li;
  }
  add(text) {
    this.list.push(text);
    this.update();
  }
  delete(textToBeDeleted) {
    this.list = this.list.filter(text => text !== textToBeDeleted);
    this.update();
  }

  update() {
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.firstChild);
    }
    for (const text of this.list) {
      this.parent.appendChild(this.createElement(text));
    }
  }
}

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.score = 0;
  }

  login() {
    console.log(this.name, "Just logged in");
    return this;
  }
  logout() {
    console.log(this.name, "Just logged out");
    return this;
  }
  updateScore() {
    this.score++;
    console.log(this.name, "score is now", this.score);
    return this;
  }
}

const userOne = new User("Ahmad", "amd@mail.com");
userOne
  .login()
  .updateScore()
  .logout();

// Adding a new method to a class
User.prototype.delete = () => {};
