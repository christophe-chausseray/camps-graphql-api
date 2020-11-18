import { LocationType } from './../valueObject/location';

type CampingItemType = {
  name: string;
  address: string;
  city: string;
  location: LocationType;
};

function createFromValues(
  name: string,
  address: string,
  city: string,
  location: LocationType
): CampingItemType {
  return Object.freeze({ name, address, city, location });
}

export default { createFromValues };
