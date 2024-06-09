import fs from 'fs';
import stripJsonComments from 'strip-json-comments';
import * as verifyConfig from './config-verifier.js';
import * as logger from './logger.js';
import {RulesConfig} from './types.js';
export const defaultConfigFileName = '.gplintrc';

export async function getConfiguration(configPath: string = defaultConfigFileName, additionalRulesDirs?: string[]): Promise<RulesConfig> {
  try {
    const config = JSON.parse(stripJsonComments(await fs.promises.readFile(configPath, {encoding: 'utf8'}))) as RulesConfig;
    const errors = await verifyConfig.verifyConfigurationFile(config, additionalRulesDirs);

    if (errors.length > 0) {
      logger.boldError('Error(s) in configuration file:');
      errors.forEach(error => {
        logger.error(`- ${error}`);
      });
      process.exit(1);
    }

    return config;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      logger.boldError(`Could not find config file "${configPath}" in the working directory.
To use a custom name/path provide the config file using the "-c" arg.`);
    } else {
      logger.boldError(`Unable to parse file, be sure its in JSON format. ${(e as Error).message}`);
    }
    return process.exit(1);
  }
}
