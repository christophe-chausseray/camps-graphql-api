import { CampingIdentifier } from './../../../domain/camping/valueObject';
import {
  Camping,
  createCampingFromValues,
} from './../../../domain/camping/model/write';

type AddCampingCommand = {
  name: string;
  address: string;
  zipcode: number;
  city: string;
  longitude: number;
  latitude: number;
};

const addCampingsHandler = (
  createCampings: (campings: Camping[]) => Promise<void>,
  nextIdentifierCamping: () => CampingIdentifier
) => async (addCampingsCommands: AddCampingCommand[]): Promise<void> => {
  const campings = addCampingsCommands.map((command) => {
    return createCampingFromValues(
      nextIdentifierCamping().id,
      command.name,
      command.address,
      command.zipcode,
      command.city,
      command.longitude,
      command.latitude
    );
  });

  await createCampings(campings);
};

export { AddCampingCommand, addCampingsHandler };
