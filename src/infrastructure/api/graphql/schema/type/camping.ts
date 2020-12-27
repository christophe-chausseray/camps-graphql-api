import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import Location from './location';

const Camping = new GraphQLObjectType({
  name: 'Camping',
  description: 'Camping type definition',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    address: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    location: {
      type: new GraphQLNonNull(Location),
    },
  }),
});

export default Camping;
