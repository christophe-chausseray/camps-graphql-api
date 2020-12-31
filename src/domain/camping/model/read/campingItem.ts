import { createLocationFromValues, Location } from '../../valueObject';

type CampingItem = {
  id: string;
  name: string;
  location: Location;
  description?: string;
  image?: string;
  address?: string;
  zipcode?: number;
  city?: string;
  nb_spots?: number;
  nb_stars?: number;
  phone_number?: string;
  email?: string;
  website?: string;
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

function createDetailedCampingItem(
  id: string,
  name: string,
  description: string | null,
  image: string | null,
  address: string | null,
  zipcode: number | null,
  city: string | null,
  nb_spots: number | null,
  nb_stars: number | null,
  phone_number: string | null,
  email: string | null,
  website: string | null,
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

  return Object.freeze({
    id,
    name,
    description,
    image,
    address,
    zipcode,
    city,
    nb_spots,
    nb_stars,
    phone_number,
    email,
    website,
    location,
  });
}

export { CampingItem, createCampingItemFromValues, createDetailedCampingItem };
