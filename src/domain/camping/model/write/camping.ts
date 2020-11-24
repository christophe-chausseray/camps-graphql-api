import { createLocationFromValues, Location } from './../valueObject';

type Camping = {
  id: string;
  name: string;
  address: string | null;
  zipcode: number | null;
  city: string | null;
  location: Location;
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
  const location = createLocationFromValues(longitude, latitude);

  return Object.freeze({ id, name, address, zipcode, city, location });
}

export { Camping, createCampingFromValues };
