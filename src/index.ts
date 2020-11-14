import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

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

app.listen('3000', () => {
    console.log('Server started at http://localhost:3000');
})
