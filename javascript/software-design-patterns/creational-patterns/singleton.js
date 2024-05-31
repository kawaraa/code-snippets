// Singleton Pattern Ensures that a class has only one instance and provides a global point of access to it. This pattern is often used for managing global state or resources that need to be shared across the application.

// ======= example 1 - First way =======
class Singleton {
  constructor(name) {
    // Check if an instance already exists
    if (Singleton.instance) return Singleton.instance;
    // else create a new instance
    Singleton.instance = this;

    // assign the args to the class property
    this.name = name;
  }

  // Example method
  someMethod() {
    console.log("Some method of the Singleton class");
  }
}

// Usage
const singletonInstance1 = new Singleton("Mr Tester");
const singletonInstance2 = new Singleton("Mr Ahmad");
console.log(singletonInstance1 === singletonInstance2); // => true

// ======= example 2 - Second way =======
const FunSingleton = (function () {
  let instance;

  function Singleton(name) {
    if (instance) return instance;
    instance = this;

    // Your constructor logic goes here
    this.name = name;
    const someMethod = () => {
      console.log("Some method of the Singleton class");
    };
  }

  return Singleton;
})();

// Usage
const funSingletonInstance1 = new FunSingleton("Mr Tester");
const funSingletonInstance2 = new FunSingleton("Mr Ahmad");
console.log(funSingletonInstance1 === funSingletonInstance2); // => true
