import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('api.camps_camping').truncate();

  // Inserts seed entries
  await knex('api.camps_camping').insert([
    {
      name: 'CAMPING HUTTOPIA RAMBOUILLET',
      address: "Route du Château d'eau",
      zipcode: 78120,
      city: 'RAMBOUILLET',
      longitude: 48.630059,
      latitude: 1.835694,
    },
    {
      name: 'CARAVANING LE VAUVERT',
      address: '26 Route de Vauvert',
      zipcode: 91150,
      city: 'ORMOY-LA-RIVIÈRE',
      longitude: 48.411278,
      latitude: 2.143939,
    },
    {
      name: 'CAMPING LES PRÉS DE LA FONTAINE',
      address: '11 CHEMIN DU CAMPING',
      zipcode: 77114,
      city: 'HERMÉ',
      longitude: 48.472784,
      latitude: 3.338549,
    },
    {
      name: 'CAMPING LES ACACIAS',
      address: 'chemin des ponceaux',
      zipcode: 77320,
      city: 'BETON-BAZOCHES',
      longitude: 48.707003,
      latitude: 3.239464,
    },
    {
      name: 'LE CHÊNE GRIS',
      address: '24 Place de la gare de Faremoutiers',
      zipcode: 77515,
      city: 'POMMEUSE',
      longitude: 48.800512,
      latitude: 2.99998,
    },
  ]);
}
