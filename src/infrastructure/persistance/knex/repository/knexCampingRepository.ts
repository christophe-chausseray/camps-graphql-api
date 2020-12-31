import Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { dbClient } from './../../dataProvider';
import {
  Camping,
  normalizeCamping,
  NormalizedCamping,
} from './../../../../domain/camping/model/write';
import {
  CampingIdentifier,
  createCampingIdentifierFromString,
} from './../../../../domain/camping/valueObject';
import {
  CampingItem,
  createDetailedCampingItem,
} from '../../../../domain/camping/model/read';

async function knexCreateCampings(campings: Camping[]): Promise<void> {
  const knex: Knex = dbClient.postgres;
  const normalizedCampings = campings.map(
    (camping: Camping): NormalizedCamping => normalizeCamping(camping)
  );

  await knex.batchInsert('api.camps_camping', normalizedCampings);
}

async function knexGetCampingById(id: string): Promise<CampingItem> {
  const knex: Knex = dbClient.postgres;
  const result = await knex('api.camps_camping')
    .select(
      'id',
      'name',
      'description',
      'image',
      'address',
      'zipcode',
      'city',
      'nb_spots',
      'nb_stars',
      'phone_number',
      'email',
      'website',
      'longitude',
      'latitude'
    )
    .where('id', '=', id)
    .first();

  const campingItem = createDetailedCampingItem(
    result['id'],
    result['name'],
    result['description'],
    result['image'],
    result['address'],
    result['zipcode'],
    result['city'],
    result['nb_spots'],
    result['nb_stars'],
    result['phone_number'],
    result['email'],
    result['website'],
    result['longitude'],
    result['latitude']
  );

  console.log(id);
  return campingItem;
}

function knexNextCampingIdentifier(): CampingIdentifier {
  const campingIdentifier = createCampingIdentifierFromString(uuidv4());

  return campingIdentifier;
}

export { knexCreateCampings, knexGetCampingById, knexNextCampingIdentifier };
