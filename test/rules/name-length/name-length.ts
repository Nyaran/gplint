import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/name-length.js';
const runTest = ruleTestBase.createRuleTest(rule,
	'<%= element %> name is too long. Length of <%= length %> is longer than the maximum allowed: 70');

describe('Name length rule', function() {
	it('doesn\'t raise errors when the default configuration is used and there are no length violations', function() {
		return runTest('name-length/CorrectLength.feature', {}, []);
	});

	it('detects errors for features, scenarios, scenario outlines and steps', function() {
		return runTest('name-length/WrongLength.feature', {}, [{
			messageElements: {element: 'Feature', length: 89},
			line: 1,
			column: 1,
		}, {
			messageElements: {element: 'Step', length: 94},
			line: 4,
			column: 3,
		}, {
			messageElements: {element: 'Scenario', length: 90},
			line: 6,
			column: 1,
		}, {
			messageElements: {element: 'Step', length: 101},
			line: 7,
			column: 3,
		}, {
			messageElements: {element: 'Rule', length: 86},
			line: 9,
			column: 1,
		}, {
			messageElements: {element: 'Scenario', length: 98},
			line: 10,
			column: 1,
		}, {
			messageElements: {element: 'Step', length: 108},
			line: 11,
			column: 3,
		}]);
	});
});
