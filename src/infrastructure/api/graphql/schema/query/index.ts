import { GraphQLObjectType } from 'graphql';
import campings from './campings';

const query = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    campings,
  }),
});

export default query;
