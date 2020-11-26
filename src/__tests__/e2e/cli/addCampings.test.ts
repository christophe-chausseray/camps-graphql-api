import dotenv from 'dotenv';
import { setup, teardown, resetDB, cli } from '../../helper/testCase';

beforeAll(async () => {
  dotenv.config();
  await setup();
});

beforeEach(async () => {
  await resetDB();
});

afterAll(() => {
  teardown();
});

test('It can successfully run the command to import campings', async () => {
  const result = await cli('import:campings datasource/campings_idf.json');

  expect(result.code).toEqual(0);
});
