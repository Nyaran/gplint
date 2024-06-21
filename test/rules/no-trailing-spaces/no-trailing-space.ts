import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-trailing-spaces.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Trailing spaces are not allowed');

describe('No Trailing Spaces Rule', function() {
	it('doesn\'t raise errors when there are no violations', function() {
		return runTest('no-trailing-spaces/NoViolations.feature', {}, []);
	});

	it('raises an error for trailing spaces', function() {
		return runTest('no-trailing-spaces/TrailingSpaces.feature', {}, [
			{
				messageElements: {},
				line: 1,
				column: 0
			},
			{
				messageElements: {},
				line: 3,
				column: 0
			},
			{
				messageElements: {},
				line: 4,
				column: 0
			}
		]);
	});

	it('raises an error for trailing tabs', function() {
		return runTest('no-trailing-spaces/TrailingTabs.feature', {}, [
			{
				messageElements: {},
				line: 4,
				column: 0
			}
		]);
	});
});
