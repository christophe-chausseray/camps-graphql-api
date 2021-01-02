import { createLocation } from '../../../../../domain/camping/valueObject';

test('It creates Location from values', () => {
  const location = createLocation(48.630059, 1.835694);

  expect(location).toEqual({ longitude: 48.630059, latitude: 1.835694 });
});

test('It cannot create a Location with longitude nullable', () => {
  expect(() => {
    createLocation(null, 1.835694);
  }).toThrow('A longitude cannot be null when creating a location');
});

test('It cannot create a Location with latitude nullable', () => {
  expect(() => {
    createLocation(48.630059, null);
  }).toThrow('A latitude cannot be null when creating a location');
});
