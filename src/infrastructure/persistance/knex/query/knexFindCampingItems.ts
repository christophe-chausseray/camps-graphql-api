import { dbClient } from './../../dataProvider';
import Knex from 'knex';
import {
  CampingItem,
  createCampingItem,
} from '../../../../domain/camping/model/read';

async function knexFindCampingItems(): Promise<CampingItem[]> {
  const campingItems: CampingItem[] = [];
  const knex: Knex = dbClient.postgres;
  const results = await knex('api.camps_camping').select(
    'id',
    'name',
    'longitude',
    'latitude'
  );

  for (const row of results) {
    const campingItem = createCampingItem(
      row['id'],
      row['name'],
      row['longitude'],
      row['latitude']
    );

    campingItems.push(campingItem);
  }

  return campingItems;
}

export { knexFindCampingItems };
