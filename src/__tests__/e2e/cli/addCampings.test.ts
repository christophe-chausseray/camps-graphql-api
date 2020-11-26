import { exec, ExecException } from 'child_process';
import dotenv from 'dotenv';
import { setup, teardown, resetDB } from '../../helper/testCase';

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

function cli(
  cwd: string
): Promise<{
  code: number;
  error: number | ExecException;
  stdout: string;
  stderr: string;
}> {
  return new Promise((resolve) => {
    exec(`camps ${cwd}`, {}, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}
