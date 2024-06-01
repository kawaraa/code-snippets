// Hotel Construction

// There are a certain number of cities in a country, some of which are connected with bidirectional roads. The number of roads is one less the number of cities, and it is possible to travel between any pair of cities using the roads. The distance between cities is the minimum number of roads one has to cross when traveling between them. How many ways are there to build exactly 3 hotels, each in a different city, such that the distance between every pair of hotels is equal?
// For example, there are n = 5 cities, and roads = [[1, 2], [1, 3], [1, 4], [1, 5]]. This means that city 1 is connected with roads to all other cities.

// There are 4 ways to build exactly 3 hotels, each in a different city, so that the distance between every pair of hotels is equal:
// 1. Build hotels in cities 2, 3, and 4.
// 2. Build hotels in cities 2, 3, and 5.
// 3. Build hotels in cities 2, 4, and 5.
// 4. Build hotels in cities 3, 4, and 5.
// In all these cases, the distance between every pair of hotels is 2. Because there are 4 ways to accomplish this, the answer is 4.
// Function Description
// Complete the function numberOfWays in the editor below. The function must return an integer denoting the number of ways to build 3 hotels in such a way that the distance between every pair of hotels is equal.
// numberOfWays has the following parameter: int roads[n - 1][2]: roads[i][0] and roads[i][1]
// denote cities that are connected by the i th road
// Returns:
// int: the number of ways to build 3 hotels in such a way that the distance between every pair of hotels is equal

// Constraints
// • 4 ≤ n ≤ 50
// • 1 ≤ roads[i][0] ≤ n
// • 1 ≤ roads[i][i] ≤ n
// • roads[i][0] = roads[i][1]

// function numberOfWays(roads) {
//   const n = roads.length + 1; // Number of cities
//   const adjacencyList = Array.from({ length: n }, () => []);

//   // Constructing the adjacency list from the roads
//   for (const [city1, city2] of roads) {
//     if (!adjacencyList[city1]) adjacencyList[city1] = [];
//     if (!adjacencyList[city2]) adjacencyList[city2] = [];
//     adjacencyList[city1].push(city2);
//     adjacencyList[city2].push(city1);
//   }

//   let count = 0;

//   // Iterate over all possible combinations of three cities
//   for (let city1 = 1; city1 <= n; city1++) {
//     for (let city2 = city1 + 1; city2 <= n; city2++) {
//       for (let city3 = city2 + 1; city3 <= n; city3++) {
//         // Check if the distance between every pair of cities is equal
//         const distances = new Set();
//         distances.add(distance(city1, city2, adjacencyList));
//         distances.add(distance(city1, city3, adjacencyList));
//         distances.add(distance(city2, city3, adjacencyList));

//         // If all distances are the same and each distance occurs exactly three times
//         if (distances.size === 1 && distances.has(2)) {
//           count++;
//         }
//       }
//     }
//   }

//   return count;
// }

// // Helper function to calculate the distance between two cities
// function distance(city1, city2, adjacencyList) {
//   const visited = new Set();
//   let queue = [city1];
//   let level = 0;

//   while (queue.length) {
//     const size = queue.length;
//     for (let i = 0; i < size; i++) {
//       const currentCity = queue.shift();
//       if (currentCity === city2) {
//         return level;
//       }
//       visited.add(currentCity);
//       for (const neighbor of adjacencyList[currentCity]) {
//         if (!visited.has(neighbor)) {
//           queue.push(neighbor);
//         }
//       }
//     }
//     level++;
//   }

//   return -1; // Cities are not connected
// }

// // Example usage
// const roads = [
//   [1, 2],
//   [1, 3],
//   [1, 4],
//   [1, 5],
// ];
// console.log(numberOfWays(roads)); // Output: 4

function numberOfWays(roads) {
  const n = roads.length + 1; // Number of cities
  const adjList = new Array(n).fill(null).map(() => []); // Adjacency list

  // Create adjacency list
  for (const [city1, city2] of roads) {
    if (!adjList[city1]) adjList[city1] = [];
    if (!adjList[city2]) adjList[city2] = [];
    adjList[city1].push(city2);
    adjList[city2].push(city1);
  }

  // Function to calculate the shortest distance between two cities using BFS
  function shortestDistance(city1, city2) {
    const visited = new Array(n).fill(false);
    const distance = new Array(n).fill(0);
    const queue = [city1];
    visited[city1] = true;

    while (queue.length > 0) {
      const currentCity = queue.shift();

      for (const neighbor of adjList[currentCity]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          distance[neighbor] = distance[currentCity] + 1;
          queue.push(neighbor);
        }
      }
    }

    return distance[city2];
  }

  // Count the number of ways to build 3 hotels with equal distance
  let ways = 0;
  for (let city1 = 1; city1 <= n; city1++) {
    for (let city2 = city1 + 1; city2 <= n; city2++) {
      const dist12 = shortestDistance(city1, city2);

      for (let city3 = city2 + 1; city3 <= n; city3++) {
        const dist13 = shortestDistance(city1, city3);
        const dist23 = shortestDistance(city2, city3);

        // If all distances are equal, increment ways
        if (dist12 === dist13 && dist12 === dist23) {
          ways++;
        }
      }
    }
  }

  return ways;
}

// Example usage
const roads = [
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
];
console.log(numberOfWays(roads)); // Output: 4
