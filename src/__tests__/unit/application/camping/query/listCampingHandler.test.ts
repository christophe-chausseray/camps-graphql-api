import { inMemoryFindCampingItems } from '../../../../../infrastructure/persistance/inMemory/query';
import { createInMemoryCampings } from '../../../../../infrastructure/persistance/inMemory/repository';
import { listCampingHandler } from '../../../../../application/camping/query/listCampingHandler';
import { Camping } from './../../../../../domain/camping/model/write';

var fakeCampings: Camping[] = [
  {
    id: 'a6ba975f-388f-41be-9f55-48126f49f7a9',
    name: 'CAMPING HUTTOPIA RAMBOUILLET',
    address: "Route du Château d'eau",
    zipcode: 78120,
    city: 'RAMBOUILLET',
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  },
  {
    id: '954f18cf-7759-42e2-b5e7-1c7dfded61ba',
    name: 'CARAVANING LE VAUVERT',
    address: '26 Route de Vauvert',
    city: 'ORMOY-LA-RIVIÈRE',
    zipcode: 91150,
    location: {
      longitude: 48.411278,
      latitude: 2.143939,
    },
  },
];
test('It can handle the query to get the list of campings', async () => {
  createInMemoryCampings(fakeCampings);
  const campingItems = await listCampingHandler(inMemoryFindCampingItems);

  expect(campingItems).toEqual([
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
  ]);
});
