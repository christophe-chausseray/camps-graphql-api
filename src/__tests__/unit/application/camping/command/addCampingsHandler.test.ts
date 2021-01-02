import casual from 'casual';
import { NormalizedCamping } from './../../../../../domain/camping/model/write';
import {
  dataCampings,
  inMemoryCreateCampings,
  inMemoryNextCampingIdentifier,
} from './../../../../../infrastructure/persistance/inMemory/repository';
import {
  AddCampingCommand,
  addCampingsHandler,
} from './../../../../../application/camping/command';

test('It can handle the command to add campings', async () => {
  const handler = addCampingsHandler(
    inMemoryCreateCampings,
    inMemoryNextCampingIdentifier
  );
  const fakeAddCampingsCommand = createFakeAddCampingsCommand();

  await handler(fakeAddCampingsCommand);

  assertNormalizedCamping(dataCampings[0], fakeAddCampingsCommand[0]);
  assertNormalizedCamping(dataCampings[1], fakeAddCampingsCommand[1]);
});

function createFakeAddCampingsCommand() {
  const addCampingsCommand = [];

  for (let index = 0; index < 2; index++) {
    addCampingsCommand.push({
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
      longitude: Number(casual.longitude),
      latitude: Number(casual.latitude),
    });
  }

  return addCampingsCommand;
}

function assertNormalizedCamping(
  normalizedCamping: NormalizedCamping,
  addCampingCommand: AddCampingCommand
) {
  expect(normalizedCamping.name).toEqual(addCampingCommand.name);
  expect(normalizedCamping.description).toEqual(addCampingCommand.description);
  expect(normalizedCamping.image).toEqual(addCampingCommand.image);
  expect(normalizedCamping.address).toEqual(addCampingCommand.address);
  expect(normalizedCamping.zipcode).toEqual(addCampingCommand.zipcode);
  expect(normalizedCamping.city).toEqual(addCampingCommand.city);
  expect(normalizedCamping.nb_spots).toEqual(addCampingCommand.nb_spots);
  expect(normalizedCamping.nb_stars).toEqual(addCampingCommand.nb_stars);
  expect(normalizedCamping.phone_number).toEqual(
    addCampingCommand.phone_number
  );
  expect(normalizedCamping.email).toEqual(addCampingCommand.email);
  expect(normalizedCamping.website).toEqual(addCampingCommand.website);
  expect(normalizedCamping.longitude).toEqual(addCampingCommand.longitude);
  expect(normalizedCamping.latitude).toEqual(addCampingCommand.latitude);
}
