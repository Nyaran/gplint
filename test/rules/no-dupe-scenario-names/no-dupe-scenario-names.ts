import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-dupe-scenario-names.js';
const runTest = ruleTestBase.createRuleTest(rule,
  'Scenario name is already used in: <%= location %>');

describe('No Duplicate Scenario Names Rule', function() {
  it('doesn\'t raise errors when there are no duplicate scenario names in a single file', async function() {
    await runTest('no-dupe-scenario-names/UniqueScenarioNames.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no duplicate scenario names multiple files', async function () {
    await runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles1.feature', {}, []);
    await runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles2.feature', {}, []);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in a single file', async function() {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNames.feature', {}, [
      {
        line: 9,
        column: 3,
        messageElements: { location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:6' },
      }, {
        line: 16,
        column: 5,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:6',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:9',
          ].join(', '),
        },
      }, {
        line: 20,
        column: 5,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:6',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:9',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:16',
          ].join(', '),
        },
      },
    ]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in a single file with rules', async function() {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature', {}, [
      {
        line: 9,
        column: 3,
        messageElements: { location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:6' },
      }, {
        line: 19,
        column: 5,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:6',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:9',
          ].join(', '),
        },
      }, {
        line: 22,
        column: 5,
        messageElements: { location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:12' },
      }, {
        line: 29,
        column: 5,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:6',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:9',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:19',
          ].join(', '),
        },
      }, {
        line: 32,
        column: 5,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:6',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:9',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:19',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:29',
          ].join(', '),
        },
      }, {
        line: 35,
        column: 5,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:12',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:22',
          ].join(', '),
        },
      },
    ]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in multiple files', async function () {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature', {}, []);
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles2.feature', {}, [
      {
        line: 6,
        column: 3,
        messageElements: {
          location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature:6',
        },
      },
      {
        line: 9,
        column: 3,
        messageElements: {
          location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature:9',
        },
      },
      {
        line: 16,
        column: 5,
        messageElements: {
          location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature:16',
        },
      },
    ]);
  });

  it('doesn\'t raise errors when there are duplicate scenario names in different files', async function () {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature', 'in-feature', []);
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles2.feature', 'in-feature', []);
  });

  it('doesn\'t raise errors when there are duplicate scenario names in different rules, throw in same rule', async function () {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature', 'in-rule', [
      {
        column: 3,
        line: 9,
        messageElements: { location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:6' },
      }, {
        column: 5,
        line: 32,
        messageElements: { location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRule.feature:29' },
      },
    ]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in pickles in a single file', async function() {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature', 'in-feature-compile', [{
      column: 7,
      line: 14,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:6'}
    },{
      column: 7,
      line: 21,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:20'}
    },{
      column: 7,
      line: 32,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:28'}
    },{
      column: 7,
      line: 35,
      messageElements: {
        location: [
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:28',
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:32'
        ].join(', ')
      }
    },{
      column: 9,
      line: 42,
      messageElements: {
        location: [
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:20',
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:21',
        ].join(', ')
      }
    },{
      column: 9,
      line: 43,
      messageElements: {
        location: [
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:20',
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:21',
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:42',
        ].join(', ')
      }
    }]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in pickles in Rules', async function() {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesInRuleCompiled.feature', 'in-rule-compile', [
      {
        column: 7,
        line: 20,
        messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRuleCompiled.feature:13'}
      }, {
        column: 9,
        line: 35,
        messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesInRuleCompiled.feature:29'}
      }
    ]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in pickles in multiple files', async function () {
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature', 'anywhere-compile', [
      {
        column: 11,
        line: 17,
        messageElements: {
          location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:10',
        },
      },
    ]);
    await runTest('no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles2.feature', 'anywhere-compile', [
      {
        column: 7,
        line: 11,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:10',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:17',
          ].join(', '),
        },
      },
      {
        column: 7,
        line: 14,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:10',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:17',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles2.feature:11',
          ].join(', '),
        },
      },{
        column: 9,
        line: 27,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:10',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:17',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles2.feature:11',
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles2.feature:14',
          ].join(', '),
        },
      },{
        column: 9,
        line: 30,
        messageElements: {
          location: [
            'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles2.feature:17',
          ].join(', '),
        },
      },
    ]);
  });
});
