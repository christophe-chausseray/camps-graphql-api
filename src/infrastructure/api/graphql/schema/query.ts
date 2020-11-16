import { GraphQLObjectType } from 'graphql';
import hello from './queries/hello';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello,
  },
});

export default query;
