import { NormalizedCamping } from './../../../../../domain/camping/model/write';
import {
  dataCampings,
  inMemoryCreateCampings,
  inMemoryNextCampingIdentifier,
} from './../../../../../infrastructure/persistance/inMemory/repository';
import {
  AddCampingCommand,
  addCampingsHandler,
} from './../../../../../application/camping/command';

var fakeCampings: AddCampingCommand[] = [
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
];

test('It can handle the command to add campings', async () => {
  const handler = addCampingsHandler(
    inMemoryCreateCampings,
    inMemoryNextCampingIdentifier
  );

  await handler(fakeCampings);

  assertCamping(dataCampings[0], fakeCampings[0]);
  assertCamping(dataCampings[1], fakeCampings[1]);
});

function assertCamping(actual: NormalizedCamping, expected: AddCampingCommand) {
  expect(actual['name']).toEqual(expected['name']);
  expect(actual['address']).toEqual(expected['address']);
  expect(actual['zipcode']).toEqual(expected['zipcode']);
  expect(actual['city']).toEqual(expected['city']);
  expect(actual['longitude']).toEqual(expected['longitude']);
  expect(actual['latitude']).toEqual(expected['latitude']);
}
