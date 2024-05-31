// The Mediator Pattern that promotes loose coupling between objects by encapsulating how these objects interact. Instead of objects interacting with each other directly, they communicate through a mediator object. This can help to reduce dependencies between components and make the system easier to maintain and extend.

// Mediator
class AirportMediator {
  // #events = ["ready_for_takeoff", "ready_for_landing", "runway_clear"];
  constructor() {
    this.runways = new Set([]);
  }

  attach(runway) {
    this.runways.add(runway);
  }
  detach(runway) {
    this.runways.delete(runway);
  }
  dispatch(airplane, message) {
    if (message == "READY_FOR_LANDING") {
      for (const runway of [...this.runways]) {
        if (runway.clear) {
          airplane.receiveRunway(runway);
          runway.receiveAirplane(airplane);
          return;
        }
      }
    }
  }
}

// Runway
class Runway {
  // #statuses = ["clear"];
  constructor(name, mediator) {
    this.name = name;
    this.clear = true;
    this.mediator = mediator;
    this.markClear();
  }
  markClear() {
    this.clear = true;
    this.mediator.attach(this);
    console.log(`${this.name} Runway is clear`);
  }
  receiveAirplane(airplane) {
    this.clear = false;
    console.log(`${this.name} Runway receive an airplane.`);
  }
}

class Airplane {
  // #statuses = ["ready_for_takeoff", "ready_for_landing"];
  constructor(name, mediator) {
    this.name = name;
    // this.needRunway = true;
    this.mediator = mediator;
    // this.mediator.attach(this);
    this.requestRunway();
  }
  requestRunway() {
    this.mediator.dispatch(this, "READY_FOR_LANDING");
    console.log(`${this.name} Airplane requested a runway.`);
  }
  receiveRunway(runway) {
    console.log(`${this.name} Airplane need a runway.`);
  }
  markFlying() {
    // this.needRunway = false;
    console.log(`${this.name} Airplane is flying.`);
  }
  markInMaintenance() {
    // this.needRunway = false;
    // this.mediator.detach(this);
    console.log(`${this.name} Runway is not clear`);
  }
}

// Usage
const mediator = new AirportMediator();
const runway = new Runway("Runway 1", mediator);
const airplane = new Airplane("Airplane 2", mediator);
