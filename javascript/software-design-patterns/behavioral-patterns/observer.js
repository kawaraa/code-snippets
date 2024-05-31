// Observer Pattern: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. This pattern is frequently used in event-driven architectures and user interface frameworks.

// Subject
class Subject {
  constructor() {
    this.observers = [];
  }

  // Add observer to the list
  subscribe(observer) {
    this.observers.push(observer);
  }
  // Remove observer from the list
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  // Notify all observers
  notify() {
    this.observers.forEach((observer) => observer.update());
  }
}

// Observer
class Observer {
  constructor(name) {
    this.name = name;
  }
  // Update method to be implemented by concrete observers
  update() {
    console.log(`${this.name} received notification`);
  }
}

// Concrete Subject
class ConcreteSubject extends Subject {
  constructor() {
    super();
    this.state = null;
  }

  // Setter for the state
  setState(state) {
    this.state = state;
    this.notify(); // Notify observers when state changes
  }
}

// Usage
const subject = new ConcreteSubject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

// Attach observers to the subject
subject.subscribe(observer1);
subject.subscribe(observer2);

// Set state and notify observers
subject.setState(1);
subject.setState(2);

// Detach observer1
subject.unsubscribe(observer1);

// Set state and notify observers again
subject.setState(3);
