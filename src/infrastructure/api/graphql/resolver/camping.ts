/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  listCampingItemsHandler,
  detailCampingItemHandler,
} from './../../../../application/camping/query';
import { knexFindCampingItems } from './../../../persistance/knex/query';
import { knexGetCampingById } from './../../../persistance/knex/repository';
import { CampingItem } from './../../../../domain/camping/model/read';

export default {
  Query: {
    campings: (): Promise<CampingItem[]> =>
      listCampingItemsHandler(knexFindCampingItems),
    camping: (obj: any, args: any): Promise<CampingItem> => {
      const detailCampingItemQuery = { campingItemId: args.id };

      return detailCampingItemHandler(knexGetCampingById)(
        detailCampingItemQuery
      );
    },
  },
};