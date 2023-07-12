import * as ruleTestBase from '../rule-test-base';
import * as rule from '../../../src/rules/no-structure-correct';

const runTestWithoutDetectMissingKeywords = ruleTestBase.createRuleTest(rule, 'Step "<%= keyword %> <%= text %>" does not meet the expected keyword order, the expected order is Given, When, Then.');
const runTestWithDetectMissingKeywords = ruleTestBase.createRuleTest(rule, 'After step "<%= keyword %> <%= text %>" that has the keyword "<%= keyword %> " you must continue some step with the keyword "<%= nextKeyword %>", the expected order is Given, When, Then.');

describe('No Structure Correct', function () {
  it('doesn\'t raise errors when there are no violations without detecting a missing keyword', function () {
    return runTestWithoutDetectMissingKeywords('no-structure-correct/NoViolationsWithoutDetectMissingKeywords.feature', {}, []);
  });
  it('doesn\'t raise errors when there are no violations with detecting a missing keyword', function () {
    return runTestWithDetectMissingKeywords('no-structure-correct/NoViolationsWithDetectMissingKeywords.feature', { detectMissingKeywords: true }, []);
  });
  it('detects errors for scenarios, and outline scenarios without detecting a missing keyword', function () {
    return runTestWithoutDetectMissingKeywords('no-structure-correct/ViolationsWithoutDetectMissingKeywords.feature',{}, [
      {
        line: 5,
        column: 9,
        messageElements: { keyword: 'Then', text: 'step then' }
      },
      {
        line: 8,
        column: 9,
        messageElements: { keyword: 'When', text: 'step when' }
      },
      {
        line: 9,
        column: 9,
        messageElements: { keyword: 'Then', text: 'step then' }
      },
      {
        line: 13,
        column: 9,
        messageElements: { keyword: 'Then', text: 'step then of Scenario "<value>"' }
      }
    ]);
  });
  it('detects errors for scenarios, and outline scenarios with detecting a missing keyword', function () {
    return runTestWithDetectMissingKeywords('no-structure-correct/ViolationsWithDetectMissingKeywords.feature', { detectMissingKeywords: true }, [
      {
        line: 5,
        column: 9,
        messageElements: { keyword: 'When', text: 'the step when', nextKeyword: 'then' }
      }
    ]);
  });
});