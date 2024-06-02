import * as configParser from '../../config-parser.js';

export const config = {
  alias: 'c',
  description: 'Configuration file',
  required: false,
  default: configParser.defaultConfigFileName,
  type: 'string'
};
