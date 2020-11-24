import { dbClient } from './../../dataProvider';
import Knex from 'knex';
import {
  CampingItem,
  createCampingItemFromValues,
} from '../../../../domain/camping/model/read';

async function knexFindCampingItems(): Promise<CampingItem[]> {
  var knex: Knex = dbClient.postgres;
  var campings: CampingItem[] = [];
  var results = await knex('api.camps_camping').select(
    'name',
    'address',
    'city',
    'longitude',
    'latitude'
  );

  for (const row of results) {
    const camping = createCampingItemFromValues(
      row['name'],
      row['address'],
      row['city'],
      row['longitude'],
      row['latitude']
    );

    campings.push(camping);
  }

  return campings;
}

export { knexFindCampingItems };
