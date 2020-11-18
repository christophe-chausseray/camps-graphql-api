type LocationType = {
  longitude: number;
  latitude: number;
};

function createFromValues(longitude: number, latitude: number): LocationType {
  return Object.freeze({ longitude, latitude });
}

export default { createFromValues };
export { LocationType };
