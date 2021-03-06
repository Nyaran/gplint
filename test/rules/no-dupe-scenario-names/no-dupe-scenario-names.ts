import * as ruleTestBase from '../rule-test-base';
import * as rule from '../../../src/rules/no-dupe-scenario-names';
const runTest = ruleTestBase.createRuleTest(rule,
  'Scenario name is already used in: <%= location %>');

describe('No Duplicate Scenario Names Rule', function() {
  it('doesn\'t raise errors when there are no duplicate scenario names in a single file', function() {
    return runTest('no-dupe-scenario-names/UniqueScenarioNames.feature', {}, []);
  });

  it('doesn\'t raise errors when there are no duplicate scenario names multiple files', function() {
    return runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles1.feature', {}, [])
      .then(() => {
        return runTest('no-dupe-scenario-names/UniqueScenarioNamesAcrossFiles2.feature', {}, []);
      });
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in a single file', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNames.feature', {}, [{
      line: 9,
      column: 1,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNames.feature:6'}
    }]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in multiple files', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature', {}, [])
      .then(() => {
        return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles2.feature', {}, [
          {
            line: 6,
            column: 1,
            messageElements: {
              location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature:6'
            }
          },
          {
            line: 9,
            column: 1,
            messageElements: {
              location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature:9'
            }
          }
        ]);
      });
  });

  it('doesn\'t raise errors when there are duplicate scenario names in different files', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles1.feature', 'in-feature', [])
      .then(() => {
        return runTest('no-dupe-scenario-names/DuplicateScenarioNamesAcrossFiles2.feature', 'in-feature', []);
      });
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in pickles in a single file', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature', 'in-feature-compile', [{
      column: 3,
      line: 14,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:6'}
    },{
      column: 3,
      line: 21,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:20'}
    },{
      column: 3,
      line: 32,
      messageElements: {location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:28'}
    },{
      column: 3,
      line: 35,
      messageElements: {
        location: [
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:28',
          'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiled.feature:32'
        ].join(', ')
      }
    }]);
  });

  it('raises errors when there duplicate Scenario and Scenario Outline names in pickles in multiple files', function() {
    return runTest('no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature', 'anywhere-compile', [])
      .then(() => {
        return runTest('no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles2.feature', 'anywhere-compile', [
          {
            column: 3,
            line: 11,
            messageElements: {
              location: 'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:10'
            }
          },
          {
            column: 3,
            line: 14,
            messageElements: {
              location: [
                'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles1.feature:10',
                'test/rules/no-dupe-scenario-names/DuplicateScenarioNamesCompiledAcrossFiles2.feature:11'
              ].join(', ')
            }
          }
        ]);
      });
  });
});
