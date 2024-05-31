// stream and piping
const fs = require("fs");

const file = fs.createWriteStream("./example.txt");

// Write 'hello, ' and then end with 'world!'.
file.write("hello, ");

setTimeout(() => file.write("hello, "), 1000);

setTimeout(() => file.end("world!"), 1500);
// Writing more now is not allowed
