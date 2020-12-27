import { createLocationFromValues, Location } from '../../valueObject';

type CampingItem = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  location: Location;
};

function createCampingItemFromValues(
  id: string,
  name: string,
  address: string | null,
  city: string | null,
  longitude: number,
  latitude: number
): CampingItem {
  if (!id) {
    throw new Error('An id cannot be null when creating a camping item');
  }

  if (!name) {
    throw new Error('A name cannot be null when creating a camping item');
  }

  const location: Location = createLocationFromValues(longitude, latitude);

  return Object.freeze({ id, name, address, city, location });
}

export { CampingItem, createCampingItemFromValues };
