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
      address: casual.address,
      zipcode: Number(casual.zip(5)),
      city: casual.city,
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
  expect(normalizedCamping.address).toEqual(addCampingCommand.address);
  expect(normalizedCamping.zipcode).toEqual(addCampingCommand.zipcode);
  expect(normalizedCamping.city).toEqual(addCampingCommand.city);
  expect(normalizedCamping.longitude).toEqual(addCampingCommand.longitude);
  expect(normalizedCamping.latitude).toEqual(addCampingCommand.latitude);
}
