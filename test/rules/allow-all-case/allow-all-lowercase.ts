import * as allowAllCase from './allow-all-case';

import * as rule from '../../../src/rules/allow-all-lowercase';

describe('allow-all-lowercase', () => {
  allowAllCase.tests({
    rule,
    errorsFile: 'allow-all-case/all-levels-lowercase.feature',
    noErrorsFile: 'allow-all-case/all-levels-caps.feature',
    errorMessageTemplate: '<%= nodeType %> with all lowercase are not allowed.'
  });
});
