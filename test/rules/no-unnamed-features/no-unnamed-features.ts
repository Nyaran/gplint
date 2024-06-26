import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-unnamed-features.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Missing Feature name');

describe('No Unnamed Features Rule', function() {
	it('doesn\'t raise errors when there are no violations', function() {
		return runTest('no-unnamed-features/NoViolations.feature', {}, []);
	});

	it('raises an error when parsing an empty feature', function() {
		return runTest('no-unnamed-features/EmptyFeature.feature', {}, [
			{
				messageElements: {},
				line: 0,
				column: 0,
			}
		]);
	});

	it('raises an error when a feature doesn\'t have a name', function() {
		return runTest('no-unnamed-features/UnnamedFeature.feature', {}, [
			{
				messageElements: {},
				line: 3,
				column: 1,
			}
		]);
	});
});
