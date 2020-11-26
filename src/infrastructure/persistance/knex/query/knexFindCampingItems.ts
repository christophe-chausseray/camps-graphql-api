import { dbClient } from './../../dataProvider';
import Knex from 'knex';
import {
  CampingItem,
  createCampingItemFromValues,
} from '../../../../domain/camping/model/read';

async function knexFindCampingItems(): Promise<CampingItem[]> {
  const campingItems: CampingItem[] = [];
  const knex: Knex = dbClient.postgres;
  const results = await knex('api.camps_camping').select(
    'name',
    'address',
    'city',
    'longitude',
    'latitude'
  );

  for (const row of results) {
    const campingItem = createCampingItemFromValues(
      row['name'],
      row['address'],
      row['city'],
      row['longitude'],
      row['latitude']
    );

    campingItems.push(campingItem);
  }

  return campingItems;
}

export { knexFindCampingItems };
