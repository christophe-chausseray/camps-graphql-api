type Location = {
  longitude: number;
  latitude: number;
};

function createLocationFromValues(
  longitude: number,
  latitude: number
): Location {
  if (!longitude) {
    throw new Error('A longitude cannot be null when creating a location');
  }

  if (!latitude) {
    throw new Error('A latitude cannot be null when creating a location');
  }

  return Object.freeze({ longitude, latitude });
}

export { Location, createLocationFromValues };
