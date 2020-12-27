import { readFileSync } from 'fs';
import color from 'colorette';
import { connectDb } from '../../persistance';
import { join } from 'path';
import { addCampingsHandler } from '../../../application/camping/command';
import {
  knexCreateCampings,
  knexNextCampingIdentifier,
} from '../../persistance/knex/repository';

async function importCampings(filepath: string): Promise<void> {
  try {
    const file = join(process.env.PWD, filepath);
    console.log('Import campings from', color.magenta(file));

    await connectDb();

    const rawData = JSON.parse(readFileSync(file, 'utf-8'));

    const handler = addCampingsHandler(
      knexCreateCampings,
      knexNextCampingIdentifier
    );
    const addCampingsCommand = [];

    for (const rawCamping of rawData) {
      addCampingsCommand.push({
        name: rawCamping['fields']['nom_commercial'],
        address: rawCamping['fields']['adresse'],
        zipcode: rawCamping['fields']['code_postal'],
        city: rawCamping['fields']['commune'],
        latitude: rawCamping['fields']['geo'][0],
        longitude: rawCamping['fields']['geo'][1],
      });
    }

    await handler(addCampingsCommand);

    console.log(
      color.green(
        `Number of campings imported : ${String(addCampingsCommand.length)}`
      )
    );

    console.log(color.yellow('Done'));

    process.exit(0);
  } catch (error) {
    console.error(color.red(error));

    process.exit(1);
  }
}

export { importCampings };
