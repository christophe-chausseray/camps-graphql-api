import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDb } from './../../persistance';
import schema from './../../api/graphql/schema';

var app: Express;

async function initApplication(): Promise<Express> {
  // create and set up the apollo server and express application
  app = express();
  const server = new ApolloServer({
    schema,
  });
  server.applyMiddleware({ app });

  // Create the client connection to the DB
  await connectDb();

  return app;
}

export { app, initApplication };
