import * as featureFinder from '../../feature-finder.js';

export const ignore = {
  alias: 'i',
  description: `Comma seperated list of files/glob patterns that the linter should ignore, overrides ${featureFinder.defaultIgnoreFileName} file`,
  required: false,
  type: 'string',
  coerce: (args: string) => args.split(','),
};
