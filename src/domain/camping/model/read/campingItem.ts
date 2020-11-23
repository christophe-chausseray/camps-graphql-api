import { createLocationFromValues, Location } from './../valueObject';

type CampingItem = {
  name: string;
  address: string | null;
  city: string | null;
  location: Location;
};

function createCampingFromValues(
  name: string,
  address: string | null,
  city: string | null,
  longitude: number,
  latitude: number
): CampingItem {
  const location: Location = createLocationFromValues(longitude, latitude);

  return Object.freeze({ name, address, city, location });
}

export { CampingItem, createCampingFromValues };
