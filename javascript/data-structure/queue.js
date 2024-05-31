// A basic implementation of a queue data structure

class Queue {
  constructor() {
    this.items = [];
  }

  // Method to add an element to the queue
  enqueue(element) {
    this.items.push(element);
  }

  // Method to remove the front element from the queue and return it
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  // Method to return the front element of the queue without removing it
  front() {
    if (this.isEmpty()) {
      return "No elements in the queue";
    }
    return this.items[0];
  }

  // Method to check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Method to return the size of the queue
  size() {
    return this.items.length;
  }

  // Method to print the elements of the queue
  print() {
    let result = "";
    for (let i = 0; i < this.items.length; i++) {
      result += this.items[i] + " ";
    }
    console.log(result.trim());
  }
}

// Example usage:
const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log("Current queue:");
queue.print(); // Output: 1 2 3

console.log("Front element of the queue:", queue.front()); // Output: 1

console.log("Dequeued element:", queue.dequeue()); // Output: 1

console.log("Queue after dequeue:");
queue.print(); // Output: 2 3
