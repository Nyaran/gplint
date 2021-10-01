const path = require('path');
const _ = require('lodash');

const rule = 'file-name';
const availableConfigs = {
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
};

function run({file}, configuration) {
  if (!file) {
    return [];
  }
  const {style, allowAcronyms} = _.merge(availableConfigs, configuration);
  const filename = path.basename(file.relativePath, '.feature');
  if (!checkers[style]) {
    throw new Error('style "' + style + '" not supported for file-name rule');
  }
  const expected = checkers[style](filename, allowAcronyms);
  if (filename === expected) {
    return [];
  }
  return [{
    message: `File names should be written in ${style} e.g. "${expected}.feature"`,
    rule: rule,
    line: 0,
    column: 0
  }];
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};
