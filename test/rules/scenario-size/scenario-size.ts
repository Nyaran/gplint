import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/scenario-size.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Element <%= type %> too long: actual <%= actual %>, expected <%= expected %>');

describe('Scenario size Rule', function() {
	it('No violations for scenario-size', function() {
		return runTest('scenario-size/ExampleFeature.feature', undefined, []);
	});
	it('Violations for scenario-size', function() {
		return runTest('scenario-size/ExampleFeature.feature', {'steps-length': {
			'Background': 2,
			'Scenario': 3,
		}}, [{
			line: 3,
			column: 1,
			messageElements: {
				type: 'Background',
				actual: 5,
				expected: 2
			}
		},
		{
			line: 10,
			column: 1,
			messageElements: {
				type: 'Scenario',
				actual: 5,
				expected: 3
			}
		},
		{
			line: 17,
			column: 1,
			messageElements: {
				type: 'Scenario Outline',
				actual: 5,
				expected: 3
			}
		},
		{
			line: 28,
			column: 1,
			messageElements: {
				type: 'Scenario',
				actual: 5,
				expected: 3
			}
		}]);
	});
});
