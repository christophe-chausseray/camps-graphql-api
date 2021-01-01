import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDb } from './../../persistance';
import typeDefs from './../../api/graphql/type';
import resolvers from './../../api/graphql/resolver';

var app: Express;

async function initApplication(): Promise<Express> {
  // create and set up the apollo server and express application
  app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });

  // Create the client connection to the DB
  await connectDb();

  return app;
}

export { app, initApplication };
