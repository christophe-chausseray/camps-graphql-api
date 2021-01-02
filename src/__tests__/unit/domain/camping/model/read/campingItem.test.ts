import { createCampingItem } from './../../../../../../domain/camping/model/read';

test('It create camping item from values', () => {
  const campingItem = createCampingItem(
    'test-id-1',
    'Camping test',
    48.630059,
    1.835694
  );

  expect(campingItem).toEqual({
    id: 'test-id-1',
    name: 'Camping test',
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});

test('It cannot create a camping item with id nullable', () => {
  expect(() => {
    createCampingItem(null, 'Camping test', 48.630059, 1.835694);
  }).toThrow('An id cannot be null when creating a camping item');
});

test('It cannot create a camping item with name nullable', () => {
  expect(() => {
    createCampingItem('test-id-1', null, 48.630059, 1.835694);
  }).toThrow('A name cannot be null when creating a camping item');
});
