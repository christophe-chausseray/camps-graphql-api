import { LocationType } from './../valueObject/location';

type CampingItemType = {
  name: string;
  address: string | null;
  city: string | null;
  location: LocationType;
};

function createFromValues(
  name: string,
  address: string | null,
  city: string | null,
  location: LocationType
): CampingItemType {
  return Object.freeze({ name, address, city, location });
}

export default { createFromValues };
export { CampingItemType };
