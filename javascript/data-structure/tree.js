// A basic implementation of a binary tree data structure

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Method to insert a new node into the binary tree
  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Method to perform an in-order traversal of the binary tree
  inOrderTraversal(node) {
    if (node !== null) {
      this.inOrderTraversal(node.left);
      console.log(node.data);
      this.inOrderTraversal(node.right);
    }
  }

  // Method to perform a pre-order traversal of the binary tree
  preOrderTraversal(node) {
    if (node !== null) {
      console.log(node.data);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  // Method to perform a post-order traversal of the binary tree
  postOrderTraversal(node) {
    if (node !== null) {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.data);
    }
  }
}

// Example usage:
const binaryTree = new BinaryTree();

binaryTree.insert(8);
binaryTree.insert(3);
binaryTree.insert(10);
binaryTree.insert(1);
binaryTree.insert(6);
binaryTree.insert(14);
binaryTree.insert(4);
binaryTree.insert(7);
binaryTree.insert(13);

console.log("In-order traversal:");
binaryTree.inOrderTraversal(binaryTree.root); // Output: 1 3 4 6 7 8 10 13 14

console.log("\nPre-order traversal:");
binaryTree.preOrderTraversal(binaryTree.root); // Output: 8 3 1 6 4 7 10 14 13

console.log("\nPost-order traversal:");
binaryTree.postOrderTraversal(binaryTree.root); // Output: 1 4 7 6 3 13 14 10 8
