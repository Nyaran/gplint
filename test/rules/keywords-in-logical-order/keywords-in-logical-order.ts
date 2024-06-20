import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/keywords-in-logical-order.js';
const runTest = ruleTestBase.createRuleTest(rule,
	'Step "<%= keyword %> <%= text %>" should not appear after step using keyword <%= priorKeyword %>');
const runTestDetectMissingKeyword = ruleTestBase.createRuleTest(rule, 'The scenario "<%= scenario %>" does not have the following keywords: <%= missingKeywords %>');

describe('Keywords in logical order', function () {
	it('doesn\'t raise errors when there are no violations', function () {
		return runTest('keywords-in-logical-order/NoViolations.feature', {}, []);
	});
	it('doesn\'t raise errors when there are no violations with detect missing keywords', function () {
		return runTest('keywords-in-logical-order/NoViolations.feature', { detectMissingKeywords: true }, []);
	});
	it('raises errors when there are violations', function () {
		return runTest('keywords-in-logical-order/Violations.feature', {}, [
			{
				messageElements: { keyword: 'When', text: 'step2', priorKeyword: 'then' },
				line: 5,
				column: 3,
			},
			{
				messageElements: { keyword: 'Given', text: 'step3', priorKeyword: 'then' },
				line: 6,
				column: 3,
			},
			{
				messageElements: { keyword: 'Given', text: 'step12', priorKeyword: 'when' },
				line: 10,
				column: 3,
			},
			{
				messageElements: { keyword: 'Given', text: 'step22', priorKeyword: 'then' },
				line: 14,
				column: 3,
			},
			{
				messageElements: { keyword: 'When', text: 'step32', priorKeyword: 'then' },
				line: 18,
				column: 3,
			},
			{
				messageElements: { keyword: 'When', text: 'step54', priorKeyword: 'then' },
				line: 24,
				column: 3,
			},
			{
				messageElements: { keyword: 'When', text: 'step42', priorKeyword: 'then' },
				line: 28,
				column: 3,
			},
			{
				messageElements: { keyword: 'Given', text: 'step43', priorKeyword: 'then' },
				line: 29,
				column: 3,
			},
		]);
	});
	it('raises errors when there are violations with detect missing keyword', function () {
		return runTestDetectMissingKeyword('keywords-in-logical-order/ViolationsDetectMissingKeyword.feature', { detectMissingKeywords: true }, [
			{
				messageElements: { scenario: 'Scenario without given', missingKeywords: 'given' },
				line: 3,
				column: 5,
			},
			{
				messageElements: { scenario: 'Scenario outline without When', missingKeywords: 'when' },
				line: 7,
				column: 5,
			}
		]);
	});
});
