import {
  createCampingItem,
  createDetailedCampingItem,
} from './../../../../../../domain/camping/model/read';

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

test('it can create a detailed camping item', () => {
  const campingItem = createDetailedCampingItem(
    'test-id-1',
    'Camping test',
    'Camping test description',
    '/path/to/camping.jpg',
    '10 rue du test',
    75000,
    'Paris',
    20,
    3,
    '135465748',
    'contact@camping-test.com',
    'http://www.camping-test.com',
    48.630059,
    1.835694
  );

  expect(campingItem).toEqual({
    id: 'test-id-1',
    name: 'Camping test',
    description: 'Camping test description',
    image: '/path/to/camping.jpg',
    address: '10 rue du test',
    zipcode: 75000,
    city: 'Paris',
    nb_spots: 20,
    nb_stars: 3,
    phone_number: '135465748',
    email: 'contact@camping-test.com',
    website: 'http://www.camping-test.com',
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});

test('It cannot create a detailed camping item with id nullable', () => {
  expect(() => {
    createDetailedCampingItem(
      null,
      'Camping test',
      'Camping test description',
      '/path/to/camping.jpg',
      '10 rue du test',
      75000,
      'Paris',
      20,
      3,
      '135465748',
      'contact@camping-test.com',
      'http://www.camping-test.com',
      48.630059,
      1.835694
    );
  }).toThrow('An id cannot be null when creating a camping item');
});

test('It cannot create a camping item with name nullable', () => {
  expect(() => {
    createDetailedCampingItem(
      'test-id-1',
      null,
      'Camping test description',
      '/path/to/camping.jpg',
      '10 rue du test',
      75000,
      'Paris',
      20,
      3,
      '135465748',
      'contact@camping-test.com',
      'http://www.camping-test.com',
      48.630059,
      1.835694
    );
  }).toThrow('A name cannot be null when creating a camping item');
});
