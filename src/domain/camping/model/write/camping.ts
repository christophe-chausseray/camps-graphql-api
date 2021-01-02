import { createLocationFromValues, Location } from '../../valueObject';

type Camping = CampingWithoutLocation & {
  location: Location;
};

type NormalizedCamping = CampingWithoutLocation & Location;

type CampingWithoutLocation = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  address: string | null;
  zipcode: number | null;
  city: string | null;
  nb_spots: number | null;
  nb_stars: number | null;
  phone_number: string | null;
  email: string | null;
  website: string | null;
};

function createCampingFromValues({
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
  longitude,
  latitude,
}: NormalizedCamping): Camping {
  if (!id) {
    throw new Error('An id cannot be null when creating a camping');
  }

  if (!name) {
    throw new Error('A name cannot be null when creating a camping');
  }

  const location = createLocationFromValues(longitude, latitude);

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

function normalizeCamping(camping: Camping): NormalizedCamping {
  return {
    id: camping.id,
    name: camping.name,
    description: camping.description,
    image: camping.image,
    address: camping.address,
    zipcode: camping.zipcode,
    city: camping.city,
    longitude: camping.location.longitude,
    latitude: camping.location.latitude,
    nb_spots: camping.nb_spots,
    nb_stars: camping.nb_stars,
    phone_number: camping.phone_number,
    email: camping.email,
    website: camping.website,
  };
}

export {
  Camping,
  NormalizedCamping,
  createCampingFromValues,
  normalizeCamping,
};
