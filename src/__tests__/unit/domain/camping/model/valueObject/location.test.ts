import { createLocationFromValues } from './../../../../../.../../../domain/camping/model/valueObject';

test('Create location from values', () => {
  var location = createLocationFromValues(48.630059, 1.835694);

  expect(location).toEqual({ longitude: 48.630059, latitude: 1.835694 });
});
