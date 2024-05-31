import { GraphQLServer } from "graphql-yoga";
import * as fs from "fs";
import resolvers from "./infrastructure/resolver/all_resolvers";
require("dotenv").config();

const typeDefs = fs
  .readFileSync("./src/infrastructure/schema.graphql")
  .toString();

const task = { task: "Hello World" };

const resolvers = {
  Todo: (_, args) => task,
  Todos: (_, args) => {},
  CreateTodo: (_, args) => {},
  UpdateTodo: (_, args) => {},
  DeleteTodo: (_, args) => {}
};

const server = new GraphQLServer({ typeDefs, resolvers });

const port = process.env.PORT || 3000;

server.start({ port, endpoint: "/service_graphql" }, ({ port }) => {
  console.log(`Running on http://localhost:${port}`);
});
