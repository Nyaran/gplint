import yargs, { Options } from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as commands from './commands/index.js';
import * as options from './options/index.js';

await yargs(hideBin(process.argv))
	.options(options as Record<string, Options>)
	.command(Object.values(commands))
	.usage('gplint [options] <feature-files>')
	.parse();

export * from '../types.js';
