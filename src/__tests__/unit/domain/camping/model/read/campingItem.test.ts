import { createCampingItemFromValues } from './../../../../../../domain/camping/model/read';

test('Create camping item from values', () => {
  var campingItem = createCampingItemFromValues(
    'Camping test',
    '1 rue du bourg',
    'Paris',
    48.630059,
    1.835694
  );

  expect(campingItem).toEqual({
    name: 'Camping test',
    address: '1 rue du bourg',
    city: 'Paris',
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});
