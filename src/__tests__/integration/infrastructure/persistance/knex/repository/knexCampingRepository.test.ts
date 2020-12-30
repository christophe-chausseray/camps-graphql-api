import dotenv from 'dotenv';
import casual from 'casual';
import { setup, teardown, resetDB } from './../../../../../helper/testCase';
import {
  knexNextCampingIdentifier,
  knexCreateCampings,
  knexGetCampingById,
} from './../../../../../../infrastructure/persistance/knex/repository';
import { Camping } from '../../../../../../domain/camping/model/write';

beforeAll(async () => {
  dotenv.config();
  await setup();
});

beforeEach(async () => {
  await resetDB();
});

afterAll(() => {
  teardown();
});

test('It can create campings in the db and retrieve it', async () => {
  const campings = createFakeCampings();
  await knexCreateCampings(campings);

  const firstCamping = await knexGetCampingById(campings[0].id);

  assertCamping(firstCamping, campings[0]);

  const secondCamping = await knexGetCampingById(campings[1].id);

  assertCamping(secondCamping, campings[1]);
});

test('It can get the next identifier', () => {
  const campingIdentifier = knexNextCampingIdentifier();

  expect(campingIdentifier).toEqual({ id: expect.any(String) });
});

function createFakeCampings(): Camping[] {
  const campings = [];

  for (let index = 0; index < 2; index++) {
    campings.push({
      id: knexNextCampingIdentifier().id,
      name: casual.name,
      description: casual.description,
      image: casual.url,
      address: casual.address,
      zipcode: Number(casual.zip(5)),
      city: casual.city,
      nb_spots: casual.integer(0, 100),
      nb_stars: casual.integer(1, 5),
      phone_number: casual.phone,
      email: casual.email,
      website: casual.url,
      location: {
        longitude: Number(casual.longitude),
        latitude: Number(casual.latitude),
      },
    });
  }

  return campings;
}

function assertCamping(actualCamping: Camping, expectedCamping: Camping) {
  expect(actualCamping.name).toEqual(expectedCamping.name);
  expect(actualCamping.address).toEqual(expectedCamping.address);
  expect(actualCamping.city).toEqual(expectedCamping.city);
  expect(actualCamping.zipcode).toEqual(expectedCamping.zipcode);
  expect(actualCamping.location).toEqual(expectedCamping.location);
}
