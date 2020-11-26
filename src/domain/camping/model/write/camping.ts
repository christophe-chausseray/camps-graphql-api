import { createLocationFromValues, Location } from '../../valueObject';

type Camping = {
  id: string;
  name: string;
  address: string | null;
  zipcode: number | null;
  city: string | null;
  location: Location;
};

type NormalizedCamping = {
  id: string;
  name: string;
  address: string | null;
  zipcode: number | null;
  city: string | null;
  longitude: number;
  latitude: number;
};

function createCampingFromValues(
  id: string,
  name: string,
  address: string | null,
  zipcode: number | null,
  city: string | null,
  longitude: number,
  latitude: number
): Camping {
  if (!id) {
    throw new Error('An id cannot be null when creating a camping');
  }

  if (!name) {
    throw new Error('A name cannot be null when creating a camping');
  }

  const location = createLocationFromValues(longitude, latitude);

  return Object.freeze({ id, name, address, zipcode, city, location });
}

function normalizeCamping(camping: Camping): NormalizedCamping {
  return {
    id: camping.id,
    name: camping.name,
    address: camping.address,
    zipcode: camping.zipcode,
    city: camping.city,
    longitude: camping.location.longitude,
    latitude: camping.location.latitude,
  };
}

export {
  Camping,
  NormalizedCamping,
  createCampingFromValues,
  normalizeCamping,
};
