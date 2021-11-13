import * as ruleTestBase from '../../rule-test-base';
import * as rule from '../../../../src/rules/required-tags';
const runTest = ruleTestBase.createRuleTest(rule, 'The tag(s) [<%= tags %>] should be present for <%= nodeType %>.');

describe('Required Tags Rule - Deprecated', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('required-tags/deprecated/NoViolations.feature', {
      'tags': ['@requiredscenariotag', '@required-scenario-tag', '@required-scenario-tag-\\d+']
    }, []);
  });
  it('detects errors for scenarios and scenario outlines', () => {
    return runTest('required-tags/deprecated/Violations.feature', {
      'tags': ['@requiredscenariotag', '@requiredScenarioTag', '@required-scenario-tag-\\d+']
    }, [{
      messageElements: {tags: '@requiredScenarioTag', nodeType: 'Scenario'},
      line: 8,
      column: 1,
    }, {
      messageElements: {tags: '@required-scenario-tag-\\d+', nodeType: 'Scenario'},
      line: 8,
      column: 1,
    }, {
      messageElements: {tags: '@requiredScenarioTag', nodeType: 'Scenario Outline'},
      line: 13,
      column: 1,
    }, {
      messageElements: {tags: '@required-scenario-tag-\\d+', nodeType: 'Scenario Outline'},
      line: 13,
      column: 1,
    }]);
  });
  it('detects errors for scenarios and scenario outlines that have no tag', () => {
    return runTest('required-tags/deprecated/Violations.feature', {
      'tags': ['@requiredscenariotag'],
      'ignoreUntagged': false
    }, [{
      messageElements: {tags: '@requiredscenariotag', nodeType: 'Scenario'},
      line: 20,
      column: 1,
    }, {
      messageElements: {tags: '@requiredscenariotag', nodeType: 'Scenario Outline'},
      line: 23,
      column: 1,
    }]);
  });
});
