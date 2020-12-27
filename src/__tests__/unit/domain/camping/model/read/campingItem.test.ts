import { createCampingItemFromValues } from './../../../../../../domain/camping/model/read';

test('It create camping item from values', () => {
  const campingItem = createCampingItemFromValues(
    'test-id-1',
    'Camping test',
    '1 rue du bourg',
    'Paris',
    48.630059,
    1.835694
  );

  expect(campingItem).toEqual({
    id: 'test-id-1',
    name: 'Camping test',
    address: '1 rue du bourg',
    city: 'Paris',
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});

test('It create camping item with address and city nullable', () => {
  const campingItem = createCampingItemFromValues(
    'test-id-1',
    'Camping test',
    null,
    null,
    48.630059,
    1.835694
  );

  expect(campingItem).toEqual({
    id: 'test-id-1',
    name: 'Camping test',
    address: null,
    city: null,
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});

test('It cannot create a camping item with id nullable', () => {
  expect(() => {
    createCampingItemFromValues(
      null,
      'Camping test',
      '1 rue du bourg',
      'Paris',
      48.630059,
      1.835694
    );
  }).toThrow('An id cannot be null when creating a camping item');
});

test('It cannot create a camping item with name nullable', () => {
  expect(() => {
    createCampingItemFromValues(
      'test-id-1',
      null,
      '1 rue du bourg',
      'Paris',
      48.630059,
      1.835694
    );
  }).toThrow('A name cannot be null when creating a camping item');
});
