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
    campings: async (): Promise<CampingItem[]> =>
      await listCampingItemsHandler(knexFindCampingItems),
    camping: async (obj: any, args: any): Promise<CampingItem> => {
      const detailCampingItemQuery = { campingId: args.id };

      return await detailCampingItemHandler(knexGetCampingById)(
        detailCampingItemQuery
      );
    },
  },
};
