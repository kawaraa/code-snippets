// A basic implementation of an undirected graph data structure using adjacency lists

class Graph {
  constructor() {
    this.vertices = {};
  }

  // Method to add a vertex to the graph
  addVertex(vertex) {
    if (!this.vertices[vertex]) {
      this.vertices[vertex] = [];
    }
  }

  // Method to add an edge between two vertices
  addEdge(vertex1, vertex2) {
    if (!this.vertices[vertex1] || !this.vertices[vertex2]) {
      throw new Error("Vertices not found in the graph");
    }
    // Undirected graph, so edges are added in both directions
    this.vertices[vertex1].push(vertex2);
    this.vertices[vertex2].push(vertex1);
  }

  // Method to print the graph
  printGraph() {
    for (let vertex in this.vertices) {
      const edges = this.vertices[vertex].join(", ");
      console.log(vertex + " -> " + edges);
    }
  }
}

// Example usage:
const graph = new Graph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");

console.log("Graph:");
graph.printGraph();
