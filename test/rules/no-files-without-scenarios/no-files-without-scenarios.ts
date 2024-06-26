import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-files-without-scenarios.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Feature file does not have any Scenarios');

describe('No Files Without Scenarios Rule', function() {
	it('doesn\'t raise errors when there is a scenario in a file', function() {
		return runTest('no-files-without-scenarios/FeatureWithScenario.feature', {}, []);
	});

	it('doesn\'t raise errors when there is a scenario outline in a file', function() {
		return runTest('no-files-without-scenarios/FeatureWithScenarioOutline.feature', {}, []);
	});

	it('raises an error an error for features without scenarios and scenario outlines', function() {
		return runTest('no-files-without-scenarios/Violations.feature', {}, [
			{ messageElements: {}, line: 1, column: 0 }
		]);
	});
});
