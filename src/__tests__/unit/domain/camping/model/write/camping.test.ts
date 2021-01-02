import {
  createCamping,
  normalizeCamping,
} from '../../../../../../domain/camping/model/write';

test('It create a camping from values', () => {
  const camping = createCamping({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    description: 'Lorem ipsum description',
    image: '/path/to/image.png',
    address: '1 rue du bourg',
    zipcode: 78000,
    city: 'Paris',
    nb_spots: 100,
    nb_stars: 3,
    phone_number: '16049382456',
    email: 'test@email.com',
    website: 'www.test.com',
    longitude: 1.835694,
    latitude: 48.630059,
  });

  expect(camping).toEqual({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    description: 'Lorem ipsum description',
    image: '/path/to/image.png',
    address: '1 rue du bourg',
    zipcode: 78000,
    city: 'Paris',
    nb_spots: 100,
    nb_stars: 3,
    phone_number: '16049382456',
    email: 'test@email.com',
    website: 'www.test.com',
    location: {
      longitude: 1.835694,
      latitude: 48.630059,
    },
  });
});

test('It can create a camping with nullable values', () => {
  const camping = createCamping({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    description: null,
    image: null,
    address: null,
    zipcode: null,
    city: null,
    nb_spots: null,
    nb_stars: null,
    phone_number: null,
    email: null,
    website: null,
    longitude: 1.835694,
    latitude: 48.630059,
  });

  expect(camping).toEqual({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    description: null,
    image: null,
    address: null,
    zipcode: null,
    city: null,
    nb_spots: null,
    nb_stars: null,
    phone_number: null,
    email: null,
    website: null,
    location: {
      longitude: 1.835694,
      latitude: 48.630059,
    },
  });
});

test('It cannot create a camping with id nullable', () => {
  expect(() => {
    createCamping({
      id: null,
      name: 'Camping test',
      description: 'Lorem ipsum description',
      image: '/path/to/image.png',
      address: '1 rue du bourg',
      zipcode: 78000,
      city: 'Paris',
      nb_spots: 100,
      nb_stars: 3,
      phone_number: '16049382456',
      email: 'test@email.com',
      website: 'www.test.com',
      longitude: 1.835694,
      latitude: 48.630059,
    });
  }).toThrow('An id cannot be null when creating a camping');
});

test('It cannot create a camping with name nullable', () => {
  expect(() => {
    createCamping({
      id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
      name: null,
      description: 'Lorem ipsum description',
      image: '/path/to/image.png',
      address: '1 rue du bourg',
      zipcode: 78000,
      city: 'Paris',
      nb_spots: 100,
      nb_stars: 3,
      phone_number: '16049382456',
      email: 'test@email.com',
      website: 'www.test.com',
      longitude: 1.835694,
      latitude: 48.630059,
    });
  }).toThrow('A name cannot be null when creating a camping');
});

test('It can normalize a camping', () => {
  const normalizedCamping = normalizeCamping({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    description: 'Lorem ipsum description',
    image: '/path/to/image.png',
    address: '1 rue du bourg',
    zipcode: 78000,
    city: 'Paris',
    nb_spots: 100,
    nb_stars: 3,
    phone_number: '16049382456',
    email: 'test@email.com',
    website: 'www.test.com',
    location: {
      longitude: 1.835694,
      latitude: 48.630059,
    },
  });

  expect(normalizedCamping).toEqual({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    description: 'Lorem ipsum description',
    image: '/path/to/image.png',
    address: '1 rue du bourg',
    zipcode: 78000,
    city: 'Paris',
    nb_spots: 100,
    nb_stars: 3,
    phone_number: '16049382456',
    email: 'test@email.com',
    website: 'www.test.com',
    longitude: 1.835694,
    latitude: 48.630059,
  });
});
