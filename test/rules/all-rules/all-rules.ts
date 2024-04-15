import * as rules from '../../../src/rules.js';
import * as linter from '../../../src/linter.js';
import { RulesConfig} from '../../../src/types.js';

// Test cases for incomplete feature files that have broken over time across multiple rules
describe('Malformed features do not break the linter', async function() {
  function testRule(file: string, rule: string) {
    const configuration = {} as RulesConfig;
    if (rule === 'new-line-at-eof') {
      configuration[rule] = ['error', 'yes'];
    } else if (rule === 'required-tags') {
      configuration[rule] = ['error', {'tags': [] }];
    } else {
      configuration[rule] = 'error';
    }
    return linter.readAndParseFile(`test/rules/all-rules/${file}`)
      .then(({feature, pickles, file}) => {
        return rules.runAllEnabledRules(feature, pickles, file, configuration);
      });
  }

  const allRules = await rules.getAllRules();

  Object.keys(allRules).forEach((rule) => {
    it(`${rule} does not throw exceptions when processing an empty feature`, function() {
      return testRule('EmptyFeature.feature', rule);
    });

    it(`${rule} does not throw exceptions when processing a feature with no children`, function() {
      return testRule('ChildlessFeature.feature', rule);
    });

    it(`${rule} does not throw exceptions when processing a feature with no steps`, function() {
      return testRule('SteplessFeature.feature', rule);
    });

    it(`${rule} does not throw exceptions when processing a scenario outline with an empty examples table`, function() {
      return testRule('EmptyExamples.feature', rule);
    });
  });
});
