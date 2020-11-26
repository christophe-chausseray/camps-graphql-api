#!/usr/bin/env node

import program from 'commander';
import { importCampings } from './importCampings';

async function main() {
  program
    .command('import:campings <filepath>')
    .description('Create a command to import datasource file')
    .action(importCampings);
  await program.parseAsync(process.argv);
}

main();
