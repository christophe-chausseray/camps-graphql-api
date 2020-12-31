import casual from 'casual';
import { detailCampingItemHandler } from '../../../../../application/camping/query/detailCampingItemHandler';
import { CampingItem } from '../../../../../domain/camping/model/read';
import { Camping } from '../../../../../domain/camping/model/write';
import {
  inMemoryNextCampingIdentifier,
  inMemoryCreateCampings,
  inMemoryGetCampingById,
} from '../../../../../infrastructure/persistance/inMemory/repository';

test('It can handle the query to get the detailed camping item', async () => {
  const fakeCampings = createFakeCampings();
  const detailCampingItemQuery = {
    campingItemId: fakeCampings[0]['id'],
  };

  await inMemoryCreateCampings(fakeCampings);

  const detailedCampingItem = await detailCampingItemHandler(
    inMemoryGetCampingById
  )(detailCampingItemQuery);

  assertDetailedCampingItem(detailedCampingItem, fakeCampings[0]);
});

function createFakeCampings(): Camping[] {
  const campings = [];

  for (let index = 0; index < 2; index++) {
    campings.push({
      id: inMemoryNextCampingIdentifier().id,
      name: casual.name,
      description: casual.description,
      image: casual.url,
      address: casual.address,
      zipcode: Number(casual.zip(5)),
      city: casual.city,
      nb_spots: casual.integer(0, 100),
      nb_stars: casual.integer(1, 5),
      phone_number: casual.phone,
      email: casual.email,
      website: casual.url,
      location: {
        longitude: Number(casual.longitude),
        latitude: Number(casual.latitude),
      },
    });
  }

  return campings;
}

function assertDetailedCampingItem(campingItem: CampingItem, camping: Camping) {
  expect(campingItem.id).toEqual(camping.id);
  expect(campingItem.name).toEqual(camping.name);
  expect(campingItem.description).toEqual(camping.description);
  expect(campingItem.image).toEqual(camping.image);
  expect(campingItem.address).toEqual(camping.address);
  expect(campingItem.zipcode).toEqual(camping.zipcode);
  expect(campingItem.city).toEqual(camping.city);
  expect(campingItem.nb_spots).toEqual(camping.nb_spots);
  expect(campingItem.nb_stars).toEqual(camping.nb_stars);
  expect(campingItem.phone_number).toEqual(camping.phone_number);
  expect(campingItem.email).toEqual(camping.email);
  expect(campingItem.website).toEqual(camping.website);
}
