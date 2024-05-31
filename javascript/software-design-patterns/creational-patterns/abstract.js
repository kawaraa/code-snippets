// Abstract Factory Pattern: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

// Abstract Product: Car
class Car {
  drive() {}
}
// Concrete Product: European Car
class EuropeanCar extends Car {
  drive() {
    console.log("Driving a European car");
  }
}
// Concrete Product: American Car
class AmericanCar extends Car {
  drive() {
    console.log("Driving an American car");
  }
}

// Abstract Product: Bike
class Bike {
  ride() {}
}
// Concrete Product: European Bike
class EuropeanBike extends Bike {
  ride() {
    console.log("Riding a European bike");
  }
}
// Concrete Product: American Bike
class AmericanBike extends Bike {
  ride() {
    console.log("Riding an American bike");
  }
}

// Abstract Factory interface
class VehicleFactory {
  createCar() {}
  createBike() {}
}

// Concrete factory for creating European vehicles
class EuropeanVehicleFactory extends VehicleFactory {
  createCar() {
    return new EuropeanCar();
  }
  createBike() {
    return new EuropeanBike();
  }
}

// Concrete factory for creating American vehicles
class AmericanVehicleFactory extends VehicleFactory {
  createCar() {
    return new AmericanCar();
  }
  createBike() {
    return new AmericanBike();
  }
}

// Example usage of the Abstract Factory pattern
function clientCode(factory) {
  const car = factory.createCar();
  const bike = factory.createBike();

  car.drive();
  bike.ride();
}

// Create a European vehicle factory
const europeanFactory = new EuropeanVehicleFactory();
clientCode(europeanFactory);

// Create an American vehicle factory
const americanFactory = new AmericanVehicleFactory();
clientCode(americanFactory);
