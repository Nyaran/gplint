import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-dupe-feature-names.js';
const runTest = ruleTestBase.createRuleTest(rule,
	'Feature name is already used in: <%= location %>');

describe('No Duplicate Feature Names Rule', function() {
	it('doesn\'t raise errors when there are no duplicate feature names', function() {
		return runTest('no-dupe-feature-names/NoViolations.feature', {}, []);
	});

	it('raises errors for every duplicate feature name', async function() {
		await runTest('no-dupe-feature-names/DuplicateNameFeature1.feature', {}, []);
		await runTest('no-dupe-feature-names/DuplicateNameFeature2.feature', {}, [
			{
				line: 3,
				column: 1,
				messageElements: {
					location: 'test/rules/no-dupe-feature-names/DuplicateNameFeature1.feature',
				},
			},
		]);
		await runTest('no-dupe-feature-names/DuplicateNameFeature3.feature', {}, [
			{
				line: 1,
				column: 1,
				messageElements: {
					location: 'test/rules/no-dupe-feature-names/DuplicateNameFeature1.feature, test/rules/no-dupe-feature-names/DuplicateNameFeature2.feature',
				},
			},
		]);
	});
});
