import { initContainer } from '../../../../../infrastructure/server/express/dependencyInjection';
import { InMemoryFindCampingItems } from '../../../../../infrastructure/persistance/inMemory/query';
import { listCampingHandler } from '../../../../../application/camping/query/listCampingHandler';
import { Container } from 'inversify';

var container: Container;

beforeAll(() => {
  container = initContainer();
});

test('It can handle the query to get the list of campings', async () => {
  container.unbind('FindCampingItems');
  container.bind('FindCampingItems').toConstantValue(InMemoryFindCampingItems);

  const campingItems = await listCampingHandler();

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
