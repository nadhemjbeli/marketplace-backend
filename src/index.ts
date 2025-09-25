import express from "express";
import type { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolvers/index.js";
import { createContext } from "./context.js";

const app: Application = express(); // TS now sees it as compatible

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
