import * as fs from 'fs';
import stripJsonComments from 'strip-json-comments';
import * as verifyConfig from './config-verifier';
import * as logger from './logger';
import {RulesConfig} from './types';
export const defaultConfigFileName = '.gplintrc';

export function getConfiguration(configPath: string, additionalRulesDirs: string[]): RulesConfig {
  if (configPath) {
    if (!fs.existsSync(configPath)) {
      logger.boldError('Could not find specified config file "' + configPath + '"');
      return process.exit(1);
    }
  } else {
    if (!fs.existsSync(defaultConfigFileName)) {
      logger.boldError('Could not find default config file "' + defaultConfigFileName +'" in the working ' +
                      'directory.\nTo use a custom name/path provide the config file using the "-c" arg.');
      return process.exit(1);
    }
    configPath = defaultConfigFileName;
  }
  const config = JSON.parse(stripJsonComments(fs.readFileSync(configPath, {encoding: 'utf8'}))) as RulesConfig;
  const errors = verifyConfig.verifyConfigurationFile(config, additionalRulesDirs);

  if (errors.length > 0) {
    logger.boldError('Error(s) in configuration file:');
    errors.forEach(error => {
      logger.error(`- ${error}`);
    });
    process.exit(1);
  }

  return config;
}
