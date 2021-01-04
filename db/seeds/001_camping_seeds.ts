import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('api.camps_camping').insert([
    {
      id: '4bb3cccd-a767-4e3f-848f-16394bacda77',
      name: 'CAMPING HUTTOPIA RAMBOUILLET',
      description: 'Description camping huttopia',
      image: '/path/to/camping-uttopia.png',
      address: "Route du Château d'eau",
      zipcode: 78120,
      city: 'RAMBOUILLET',
      longitude: 48.630059,
      latitude: 1.835694,
      nb_spots: 20,
      nb_stars: 3,
      phone_number: '168403928',
      email: 'contact@le-camping-huttopia.com',
      website: 'le-camping-huttopia.com',
    },
    {
      id: 'ca683518-1c65-43b7-b544-8fcb5ac973bb',
      name: 'CARAVANING LE VAUVERT',
      description: 'Description camping le vauvert',
      image: '/path/to/camping-le-vauvert.png',
      address: '26 Route de Vauvert',
      zipcode: 91150,
      city: 'ORMOY-LA-RIVIÈRE',
      longitude: 48.411278,
      latitude: 2.143939,
      nb_spots: 100,
      nb_stars: 4,
      phone_number: '130473816',
      email: 'contact@camping-le-vauvert.fr',
      website: 'camping-le-vauvert.fr',
    },
  ]);
}
