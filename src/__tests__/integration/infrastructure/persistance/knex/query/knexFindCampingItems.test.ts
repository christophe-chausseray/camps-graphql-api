import dotenv from 'dotenv';
import { setup, teardown } from './../../../../../helper/testCase';
import { knexFindCampingItems } from './../../../../../../infrastructure/persistance/knex/query';
import { CampingItem } from '../../../../../../domain/camping/model/read';

beforeAll(async () => {
  dotenv.config();
  await setup();
});

afterAll(async () => {
  teardown();
});

test('It can find all the camping items', async () => {
  const expectedCampingItems = getExpectedCampingItems();

  const campingItems = await knexFindCampingItems();

  expect(campingItems).toEqual(expectedCampingItems);
});

function getExpectedCampingItems(): CampingItem[] {
  return [
    {
      id: expect.any(String),
      name: 'CAMPING HUTTOPIA RAMBOUILLET',
      address: "Route du Château d'eau",
      city: 'RAMBOUILLET',
      location: {
        longitude: 48.630059,
        latitude: 1.835694,
      },
    },
    {
      id: expect.any(String),
      name: 'CARAVANING LE VAUVERT',
      address: '26 Route de Vauvert',
      city: 'ORMOY-LA-RIVIÈRE',
      location: {
        longitude: 48.411278,
        latitude: 2.143939,
      },
    },
  ];
}
