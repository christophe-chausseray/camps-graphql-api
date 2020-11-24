import { createCampingFromValues } from '../../../../../../domain/camping/model/write';

test('It create a camping from values', () => {
  var camping = createCampingFromValues(
    '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    'Camping test',
    '1 rue du bourg',
    78000,
    'Paris',
    48.630059,
    1.835694
  );

  expect(camping).toEqual({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    address: '1 rue du bourg',
    zipcode: 78000,
    city: 'Paris',
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});

test('It can create a camping with address, zipcode, city nullable', () => {
  var camping = createCampingFromValues(
    '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    'Camping test',
    null,
    null,
    null,
    48.630059,
    1.835694
  );

  expect(camping).toEqual({
    id: '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
    name: 'Camping test',
    address: null,
    zipcode: null,
    city: null,
    location: {
      longitude: 48.630059,
      latitude: 1.835694,
    },
  });
});

test('It cannot create a camping with id nullable', () => {
  expect(() => {
    createCampingFromValues(
      null,
      'Camping test',
      '1 rue du bourg',
      78000,
      'Paris',
      48.630059,
      1.835694
    );
  }).toThrow('An id cannot be null when creating a camping');
});

test('It cannot create a camping with name nullable', () => {
  expect(() => {
    createCampingFromValues(
      '2cb626d3-bfb2-4d10-98c5-3b96bd49634c',
      null,
      '1 rue du bourg',
      78000,
      'Paris',
      48.630059,
      1.835694
    );
  }).toThrow('A name cannot be null when creating a camping');
});
