import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import database from './database';

const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            }
        }
    })
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: 'production' !== process.env.NODE_ENV
    })
);

async function start(): Promise<void> {
    try {
        //check database connection
        await database.raw('SELECT 1 + 1 as result');

        app.listen('3000', () => {
            console.log('Server started at http://localhost:3000');
        });
    } catch(error) {
        if ('production' !== process.env.NODE_ENV) {
            console.log(error);
        }

        process.exit(1);
    }
}

start();
