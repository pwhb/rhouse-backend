import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import mongoose from "mongoose";

import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs.js";

const startServer = async () => {
  await mongoose.connect(process.env.DB).then(() => {
    console.log("MongoDB connected.");
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  // Cross-origin
  app.use(cors());

  const port = process.env.PORT;
  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port }, r));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};

startServer();
