import path from 'path';
import _ from 'lodash';

import {GherkinData, RuleSubConfig, RuleError} from '../types.js';

export const name = 'file-name';
export const availableConfigs = {
  'style': 'PascalCase',
  'allowAcronyms': false
};

const checkers = {
  'PascalCase': filename => _.startCase(filename).replace(/ /g, ''),
  'Title Case': filename => _.startCase(filename),
  'camelCase': (filename, allowAcronyms) => {
    if (allowAcronyms) {
      const words = _.words(filename);
      const firstWord = words.shift();
      return (/^[A-Z]+$/.test(firstWord) ? firstWord : _.lowerFirst(firstWord))
        + words.map(word => _.upperFirst(word)).join('');
    } else {
      return _.camelCase(filename);
    }
  },
  'kebab-case': filename => _.kebabCase(filename),
  'snake_case': filename => _.snakeCase(filename)
} as Record<string, (filename: string, allowAcronyms?: boolean) => string>;

export function run({file}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  const {style, allowAcronyms} = _.merge(availableConfigs, configuration);
  const filename = path.basename(file.relativePath, '.feature');
  if (!Object.hasOwn(checkers, style)) {
    throw new Error(`Style "${style}" not supported for file-name rule`);
  }
  const expected = checkers[style](filename, allowAcronyms);
  if (filename === expected) {
    return [];
  }
  return [{
    message: `File names should be written in ${style} e.g. "${expected}.feature"`,
    rule: name,
    line: 0,
    column: 0
  }];
}
