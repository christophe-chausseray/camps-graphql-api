import { createCampingIdentifierFromString } from '../../../../../domain/camping/valueObject';

test('It creates a CampingIdentifier from string', () => {
  const campingIdentifier = createCampingIdentifierFromString(
    'a6ba975f-388f-41be-9f55-48126f49f7a9'
  );

  expect(campingIdentifier).toEqual({
    id: 'a6ba975f-388f-41be-9f55-48126f49f7a9',
  });
});

test('It cannot creates a CampingIdentifier with an identifier nullable', () => {
  expect(() => {
    createCampingIdentifierFromString(null);
  }).toThrow('An identifier cannot be null when creating a CampingIdentifier');
});
