type Location = {
  longitude: number;
  latitude: number;
};

function createLocationFromValues(
  longitude: number,
  latitude: number
): Location {
  return Object.freeze({ longitude, latitude });
}

export { Location, createLocationFromValues };
