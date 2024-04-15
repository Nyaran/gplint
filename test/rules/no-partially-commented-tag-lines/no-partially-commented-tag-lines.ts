import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-partially-commented-tag-lines.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Partially commented tag lines not allowed');

describe('No Partially Commented Tag Lines Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-partially-commented-tag-lines/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('no-partially-commented-tag-lines/Violations.feature', {}, [
      // Currently Gherkin parser is unable to detect comments on tag line: https://github.com/cucumber/common/issues/1505
      //{ messageElements: {}, line: 1, column: 1 },
      //{ messageElements: {}, line: 7, column: 1 },
      //{ messageElements: {}, line: 12, column: 1 },
      { messageElements: {}, line: 15, column: 3 },
    ]);
  });
});
