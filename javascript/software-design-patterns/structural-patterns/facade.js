// Facade Pattern: Provides a unified interface to a set of interfaces in a subsystem. It simplifies a complex system by providing a higher-level interface.

// ===== Example 1 - First way =====

// Complex subsystems
class CPU {
  freeze() {
    console.log("CPU freeze");
  }
  jump(position) {
    console.log("CPU jump to " + position);
  }
  execute() {
    console.log("CPU execute");
  }
}

class Memory {
  load(position, data) {
    console.log("Memory load data " + data + " at position " + position);
  }
  empty() {
    console.log("Memory is empty.");
  }
}

class HardDrive {
  read(position, size) {
    console.log("Hard Drive read data of size " + size + " from position " + position);
  }
  eject() {
    console.log("Hard Drive is ejected.");
  }
}

// Facade
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    this.cpu.freeze();
    this.memory.load(0, "BIOS");
    this.cpu.jump(0);
    this.cpu.execute();
    this.hardDrive.read(0, 100);
  }

  shutdown() {
    this.cpu.freeze();
    this.memory.empty();
    this.hardDrive.eject();
  }
}

// Client code
const computer = new ComputerFacade();
computer.start();
computer.shutdown();
