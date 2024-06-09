import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-duplicate-tags.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Duplicate tags are not allowed: <%= tags %>');

describe('No Duplicate Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-duplicate-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('no-duplicate-tags/Violations.feature', {}, [
      {
        messageElements: { tags: '@featuretag' },
        line: 1,
        column: 13,
      },
      {
        messageElements: { tags: '@scenariotag' },
        line: 7,
        column: 16,
      },
      {
        messageElements: { tags: '@scenariooutlinetag' },
        line: 11,
        column: 23,
      },
      {
        messageElements: { tags: '@examplestag' },
        line: 15,
        column: 18,
      },
      {
        messageElements: { tags: '@ruletag' },
        line: 20,
        column: 12,
      },
      {
        messageElements: { tags: '@scenariotag' },
        line: 23,
        column: 16,
      },
    ]);
  });
});
