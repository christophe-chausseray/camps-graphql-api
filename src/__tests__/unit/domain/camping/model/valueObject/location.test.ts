import Location from './../../../../../.../../../domain/camping/model/valueObject/location';

test('Create location from values', () => {
  var location = Location.createFromValues(48.630059, 1.835694);

  expect(location).toEqual({ longitude: 48.630059, latitude: 1.835694 });
});
