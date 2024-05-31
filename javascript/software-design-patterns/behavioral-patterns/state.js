// The State Pattern is a behavioral design pattern that allows an object to alter its behavior when its internal state changes. The pattern encapsulates state-specific behavior into separate classes and allows the object to delegate state-specific behavior to its current state object.

class Human {
  constructor() {
    this.state = new Normal();
  }
  think() {
    this.state.think();
  }
  changeState(state) {
    this.state = state;
  }
}

class Normal {
  think() {
    console.log("I'm happy 🙂");
  }
}
class Happy {
  think() {
    console.log("I'm happy 😀");
  }
}
class Sad {
  think() {
    console.log("I'm happy 😔");
  }
}

const human = new Human();
human.think();
human.changeState(new Sad());
human.think();
human.changeState(new Happy());
human.think();
human.changeState(new Normal());
human.think();
