import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Camping } from './../type';
import { listCampingHandler } from './../../../../../application/camping/query/listCampingHandler';
import { knexFindCampingItems } from './../../../../persistance/knex/query';
import { CampingItem } from './../../../../../domain/camping/model/read';

const campings = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Camping))),
  resolve: (): Promise<CampingItem[]> =>
    listCampingHandler(knexFindCampingItems),
};

export default campings;
