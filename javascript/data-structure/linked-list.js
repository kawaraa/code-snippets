// A simple implementation of a singly linked list:

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Method to add a node to the end of the linked list
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Method to insert a node at a specific position
  insertAt(position, data) {
    const newNode = new Node(data);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let current = this.head;
    let count = 0;
    let previous = null;
    while (count < position && current !== null) {
      previous = current;
      current = current.next;
      count++;
    }
    if (current === null && count < position) {
      throw new Error("Position out of bounds");
    }
    newNode.next = current;
    previous.next = newNode;
  }

  // Method to remove a node at a specific position
  removeAt(position) {
    if (position === 0) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    let count = 0;
    let previous = null;
    while (count < position && current !== null) {
      previous = current;
      current = current.next;
      count++;
    }
    if (current === null && count < position) {
      throw new Error("Position out of bounds");
    }
    previous.next = current.next;
  }

  // Method to print the linked list
  print() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// Example usage:
const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);

console.log("Original linked list:");
linkedList.print(); // Output: 1 2 3 4

linkedList.insertAt(2, 5);
console.log("\nLinked list after insertion:");
linkedList.print(); // Output: 1 2 5 3 4

linkedList.removeAt(1);
console.log("\nLinked list after removal:");
linkedList.print(); // Output: 1 5 3 4
