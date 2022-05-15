import * as allowAllCase from './allow-all-case';

import * as rule from '../../../src/rules/allow-all-caps';

describe('allow-all-caps', () => {
  allowAllCase.tests({
    rule,
    errorsFile: 'allow-all-case/all-levels-caps.feature',
    noErrorsFile: 'allow-all-case/all-levels-lowercase.feature',
    errorMessageTemplate: '<%= nodeType %> with all caps are not allowed.'
  });
});
