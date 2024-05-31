// Prototype Pattern: Creates new objects by copying an existing object, known as the prototype.

// ======= example 1 - First way using class =======
class Animal {
  constructor(type, sound) {
    this.type = type;
    this.sound = sound;
  }

  makeSound() {
    console.log(this.sound);
  }
}
const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");
dog.makeSound(); // => Woof
cat.makeSound(); // => Meow

// ======= example 2 - Second way using constructor function =======
// Define a constructor function
function Animal2(type, sound) {
  this.type = type;
  this.sound = sound;
}
// Add a method to the constructor's prototype
Animal2.prototype.makeSound = function () {
  console.log(this.sound);
};
const dog1 = new Animal2("Dog", "Woof");
const cat1 = new Animal2("Cat", "Meow");
dog1.makeSound(); // Output: Woof
cat1.makeSound(); // Output: Meow

// ======= example 3 - Third way prototype object =======
const animalPrototype = {
  makeSound() {
    console.log(this.sound);
  },
};
const dog2 = Object.create(animalPrototype, { type: { value: "Dog" }, sound: { value: "Woof" } });
const cat2 = Object.create(animalPrototype, { type: { value: "Cat" }, sound: { value: "Meow" } });
dog2.makeSound(); // Output: Woof
cat2.makeSound(); // Output: Meow

console.log(Object.getPrototypeOf(dog));
