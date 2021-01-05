import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('api.camps_comment').insert([
    {
      id: '55a903fd-bf0b-499b-9199-f7d8215e6d48',
      title: 'An awesome camping',
      description: 'The camping is awesome',
      author: 'joe',
      campingId: '4bb3cccd-a767-4e3f-848f-16394bacda77',
    },
    {
      id: 'c5ece729-1fa7-4dfc-a54e-d200259dea36',
      title: 'A terrible camping',
      description: 'The camping is terrible',
      author: 'jack',
      campingId: '4bb3cccd-a767-4e3f-848f-16394bacda77',
    },
  ]);
}
