import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-empty-file.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Empty feature files are disallowed');

describe('No Empty Files Rule', function() {
  it('doesn\'t raise errors when a feature file isn\'t empty', function() {
    return runTest('no-empty-file/NoViolations.feature', {}, []);
  });

  it('raises an error an error for feature files that are empty', function() {
    return runTest('no-empty-file/EmptyFeature.feature', {}, [
      { messageElements: {}, line: 1, column: 0 }
    ]);
  });

  it('raises an error an error for feature files that only contain whitespace', function() {
    return runTest('no-empty-file/OnlyWhitespace.feature', {}, [
      { messageElements: {}, line: 1, column: 0 }
    ]);
  });
});
