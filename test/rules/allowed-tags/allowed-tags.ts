import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/allowed-tags.js';

const runTest = ruleTestBase.createRuleTest(rule, 'Not allowed tag <%= tags %> on <%= nodeType %>');

describe('Allowed Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('allowed-tags/NoViolations.feature', {
      'tags': ['@featuretag', '@scenariotag', '@ruletag'],
      'patterns': ['^@examplestag$']
    }, []);
  });

  it('detects errors for features, scenarios, and scenario outlines', function() {
    return runTest('allowed-tags/Violations.feature', {
      'tags': ['@featuretag', '@scenariotag', '@ruletag'],
      'patterns': ['^@examplestag$']
    }, [{
      messageElements: {tags: '@featuretag1', nodeType:'Feature'},
      line: 1,
      column: 13
    },
    {
      messageElements: {tags: '@anothertag', nodeType:'Feature'},
      line: 1,
      column: 26
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType:'Scenario'},
      line: 7,
      column: 14
    },
    {
      messageElements: {tags: '@scenariotag2', nodeType:'Scenario'},
      line: 7,
      column: 28
    },
    {
      messageElements: {tags: '@anothertag', nodeType:'Scenario'},
      line: 7,
      column: 42
    },
    {
      messageElements: {tags: '@ruletag1', nodeType:'Rule'},
      line: 11,
      column: 10
    },
    {
      messageElements: {tags: '@scenariotag1', nodeType:'Scenario Outline'},
      line: 13,
      column: 14
    },
    {
      messageElements: {tags: '@examplestag1', nodeType:'Examples'},
      line: 16,
      column: 14
    }]);
  });
});
