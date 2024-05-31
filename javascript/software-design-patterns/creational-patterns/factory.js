// Factory Method Pattern: Defines an interface for creating objects that creates objects without specifying the exact class of object that will be created. It provides a method for creating objects.
// This pattern is commonly used for encapsulating object creation logic

// ======= example 1 - First way =======
// Define a Button class
class IOSButton {}
class AndroidButton {}
// Define a factory method for creating different types of Button
const buttonsFactory = (device) => (device == "IOS" ? new IOSButton() : new AndroidButton());

// Usage
console.log(buttonsFactory("ios"));
console.log(buttonsFactory("android"));

// ======= example 2 - Second way =======
// Define a Car constructor function
function Car() {}
function Bike() {}
// Define a factory method for creating different types of vehicles
function vehicleFactory(type) {
  if (type === "car") return new Car();
  else if (type === "bike") return new Bike();
  else throw new Error("Invalid vehicle type.");
}

// Usage
console.log(buttonsFactory("car")); // Car { type: 'car' }
console.log(buttonsFactory("bike")); //  Bike { type: 'bike' }
