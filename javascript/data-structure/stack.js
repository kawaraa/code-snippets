// An simple implementation of a stack data structure:

class Stack {
  constructor() {
    this.items = [];
  }

  // Method to add an element to the stack
  push(element) {
    this.items.push(element);
  }

  // Method to remove the top element from the stack and return it
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.pop();
  }

  // Method to return the top element of the stack without removing it
  peek() {
    if (this.isEmpty()) {
      return "No elements in the stack";
    }
    return this.items[this.items.length - 1];
  }

  // Method to check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Method to return the size of the stack
  size() {
    return this.items.length;
  }

  // Method to print the elements of the stack
  print() {
    let result = "";
    for (let i = this.items.length - 1; i >= 0; i--) {
      result += this.items[i] + " ";
    }
    console.log(result.trim());
  }
}

// Example usage:
const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log("Current stack:");
stack.print(); // Output: 3 2 1

console.log("Top element of the stack:", stack.peek()); // Output: 3

console.log("Popped element:", stack.pop()); // Output: 3

console.log("Stack after popping:");
stack.print(); // Output: 2 1
