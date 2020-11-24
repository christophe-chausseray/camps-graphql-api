import { createLocationFromValues, Location } from './../valueObject';

type CampingItem = {
  name: string;
  address: string | null;
  city: string | null;
  location: Location;
};

function createCampingItemFromValues(
  name: string,
  address: string | null,
  city: string | null,
  longitude: number,
  latitude: number
): CampingItem {
  if (!name) {
    throw new Error('A name cannot be null when creating a camping item');
  }

  const location: Location = createLocationFromValues(longitude, latitude);

  return Object.freeze({ name, address, city, location });
}

export { CampingItem, createCampingItemFromValues };
