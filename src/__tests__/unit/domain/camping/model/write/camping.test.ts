import { createCampingFromValues } from '../../../../../../domain/camping/model/write';

test('It create camping from values', () => {
  var camping = createCampingFromValues(
    '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    'Camping test',
    '1 rue du bourg',
    78000,
    'Paris',
    48.630059,
    1.835694
  );

  expect(camping).toEqual({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    address: '1 rue du bourg',
    zipcode: 78000,
    city: 'Paris',
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});
