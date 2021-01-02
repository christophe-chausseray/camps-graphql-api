import { CampingIdentifier } from './../../../domain/camping/valueObject';
import { Camping, createCamping } from './../../../domain/camping/model/write';

type AddCampingCommand = {
  name: string;
  description: string | null;
  image: string | null;
  address: string | null;
  zipcode: number | null;
  city: string | null;
  longitude: number;
  latitude: number;
  nb_spots: number | null;
  nb_stars: number | null;
  phone_number: string | null;
  email: string | null;
  website: string | null;
};

const addCampingsHandler = (
  createCampings: (campings: Camping[]) => Promise<void>,
  nextIdentifierCamping: () => CampingIdentifier
) => async (addCampingsCommands: AddCampingCommand[]): Promise<void> => {
  const campings = addCampingsCommands.map((command) => {
    return createCamping({
      id: nextIdentifierCamping().id,
      ...command,
    });
  });

  await createCampings(campings);
};

export { AddCampingCommand, addCampingsHandler };
