import Location from './../../../../../../domain/camping/model/valueObject/location';
import Camping from './../../../../../../domain/camping/model/read/campingItem';

test('Create camping item from values', () => {
  var location = Location.createFromValues(48.630059, 1.835694);
  var camping = Camping.createFromValues(
    'Camping test',
    '1 rue du bourg',
    'Paris',
    location
  );

  expect(camping).toEqual({
    name: 'Camping test',
    address: '1 rue du bourg',
    city: 'Paris',
    location,
  });
});
