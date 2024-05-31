const express = require("express");
const graphqlHTTP = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express").default;
const fs = require("fs");
const { buildSchema } = require("graphql");

require("dotenv").config();
const typeDefinitions = fs.readFileSync("./src/infrastructure/schema.graphql").toString();
const schema = buildSchema(typeDefinitions);

const task = { task: "Hello World" };

const resolvers = {
  Todo: (_, args) => task,
  Todos: (_, args) => {},
  CreateTodo: (_, args) => {},
  UpdateTodo: (_, args) => {},
  DeleteTodo: (_, args) => {}
};

const server = express();
// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

server.use("/api", graphqlHTTP({ schema, rootValue: resolvers }));
server.get("/", expressPlayground({ endpoint: "/api" }));

server.get("/", (req, res, next) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);

console.log(`Running on http://localhost:${PORT}`);
