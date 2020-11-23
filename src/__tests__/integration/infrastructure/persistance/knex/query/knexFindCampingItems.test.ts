import dotenv from 'dotenv';
import { setup, teardown, resetDB } from './../../../../../helper/server';
import { knexFindCampingItems } from './../../../../../../infrastructure/persistance/knex/query';

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

test('It can find all the camping items', async () => {
  var campings = await knexFindCampingItems();

  expect(campings).toEqual([
    {
      name: 'CAMPING HUTTOPIA RAMBOUILLET',
      address: "Route du Château d'eau",
      city: 'RAMBOUILLET',
      location: {
        longitude: 48.630059,
        latitude: 1.835694,
      },
    },
    {
      name: 'CARAVANING LE VAUVERT',
      address: '26 Route de Vauvert',
      city: 'ORMOY-LA-RIVIÈRE',
      location: {
        longitude: 48.411278,
        latitude: 2.143939,
      },
    },
    {
      name: 'CAMPING LES PRÉS DE LA FONTAINE',
      address: '11 CHEMIN DU CAMPING',
      city: 'HERMÉ',
      location: {
        longitude: 48.472784,
        latitude: 3.338549,
      },
    },
    {
      name: 'CAMPING LES ACACIAS',
      address: 'chemin des ponceaux',
      city: 'BETON-BAZOCHES',
      location: {
        longitude: 48.707003,
        latitude: 3.239464,
      },
    },
    {
      name: 'LE CHÊNE GRIS',
      address: '24 Place de la gare de Faremoutiers',
      city: 'POMMEUSE',
      location: {
        longitude: 48.800512,
        latitude: 2.99998,
      },
    },
  ]);
});
