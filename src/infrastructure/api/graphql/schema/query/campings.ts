import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Camping } from './../type';
import { listCampingHandler } from './../../../../../application/camping/query/listCampingHandler';

const campings = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Camping))),
  resolve: listCampingHandler,
};

export default campings;
