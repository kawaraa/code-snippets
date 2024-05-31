// A basic implementation of a hash table data structure using separate chaining for collision resolution:

class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => []);
  }

  // Hash function to determine index in the buckets array
  hash(key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % this.size;
  }

  // Method to insert a key-value pair into the hash table
  insert(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update value if key already exists
        return;
      }
    }
    bucket.push([key, value]); // Add new key-value pair to the bucket
  }

  // Method to retrieve the value associated with a given key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1]; // Return value if key is found
      }
    }
    return null; // Return null if key is not found
  }

  // Method to remove a key-value pair from the hash table
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket.splice(i, 1); // Remove key-value pair if key is found
      }
    }
  }

  // Method to print the hash table
  print() {
    for (let i = 0; i < this.size; i++) {
      console.log(i, ": ", this.buckets[i]);
    }
  }
}

// Example usage:
const ht = new HashTable();

ht.insert("apple", 10);
ht.insert("orange", 20);
ht.insert("banana", 30);

console.log("Hash table after insertions:");
ht.print();

console.log("\nValue for 'apple':", ht.get("apple")); // Output: 10
console.log("Value for 'orange':", ht.get("orange")); // Output: 20
console.log("Value for 'banana':", ht.get("banana")); // Output: 30

ht.remove("orange");
console.log("\nHash table after removing 'orange':");
ht.print();
