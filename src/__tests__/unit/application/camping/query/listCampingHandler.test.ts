import casual from 'casual';
import { inMemoryFindCampingItems } from '../../../../../infrastructure/persistance/inMemory/query';
import { inMemoryCreateCampings } from '../../../../../infrastructure/persistance/inMemory/repository';
import { listCampingsHandler } from '../../../../../application/camping/query';
import { Camping } from './../../../../../domain/camping/model/write';
import { inMemoryNextCampingIdentifier } from '../../../../../infrastructure/persistance/inMemory/repository';
import { CampingItem } from '../../../../../domain/camping/model/read';

test('It can handle the query to get the list of campings', async () => {
  const fakeCampings = createFakeCampings();

  await inMemoryCreateCampings(fakeCampings);
  const campingItems = await listCampingsHandler(inMemoryFindCampingItems);

  assertCampingItem(campingItems[0], fakeCampings[0]);
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

function assertCampingItem(campingItem: CampingItem, camping: Camping) {
  expect(campingItem.id).toEqual(camping.id);
  expect(campingItem.name).toEqual(camping.name);
  expect(campingItem.address).toEqual(camping.address);
  expect(campingItem.city).toEqual(camping.city);
  expect(campingItem.location).toEqual(camping.location);
}
