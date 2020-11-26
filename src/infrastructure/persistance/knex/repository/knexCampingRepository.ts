import Knex from 'knex';
import { v4 as uuidv4 } from 'uuid';
import { dbClient } from './../../dataProvider';
import {
  Camping,
  createCampingFromValues,
  normalizeCamping,
  NormalizedCamping,
} from './../../../../domain/camping/model/write';
import {
  CampingIdentifier,
  createCampingIdentifierFromString,
} from './../../../../domain/camping/valueObject';

async function knexCreateCampings(campings: Camping[]): Promise<void> {
  const knex: Knex = dbClient.postgres;
  const normalizedCampings = campings.map(
    (camping: Camping): NormalizedCamping => normalizeCamping(camping)
  );

  await knex.batchInsert('api.camps_camping', normalizedCampings);
}

async function knexGetCampingById(id: string): Promise<Camping> {
  const knex: Knex = dbClient.postgres;
  const result = await knex('api.camps_camping').where('id', '=', id).first();

  const camping = createCampingFromValues(
    result['id'],
    result['name'],
    result['address'],
    result['zipcode'],
    result['city'],
    result['longitude'],
    result['latitude']
  );

  return camping;
}

function knexNextCampingIdentifier(): CampingIdentifier {
  const campingIdentifier = createCampingIdentifierFromString(uuidv4());

  return campingIdentifier;
}

export { knexCreateCampings, knexGetCampingById, knexNextCampingIdentifier };
