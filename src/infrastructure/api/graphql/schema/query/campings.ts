import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Camping } from './../type';
import { listCampingsHandler } from '../../../../../application/camping/query';
import { knexFindCampingItems } from './../../../../persistance/knex/query';
import { CampingItem } from './../../../../../domain/camping/model/read';

const campings = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Camping))),
  resolve: (): Promise<CampingItem[]> =>
    listCampingsHandler(knexFindCampingItems),
};

export default campings;
