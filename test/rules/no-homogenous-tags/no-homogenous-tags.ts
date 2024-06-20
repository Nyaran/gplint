import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-homogenous-tags.js';
const runTest = ruleTestBase.createRuleTest(rule,
	'<%= intro %> have the same tag(s), they should be defined on the <%= nodeType %> instead: <%= tags %>');

describe('No Homogenous Tags Rule', function() {
	it('doesn\'t raise errors when there are no violations', function() {
		return runTest('no-homogenous-tags/NoViolations.feature', {}, []);
	});

	it('detects errors for scenarios, and scenario outlines', function() {
		return runTest('no-homogenous-tags/Violations.feature', {}, [
			{
				line: 11,
				column: 3,
				messageElements: {
					intro: 'All Examples of a Scenario Outline',
					tags: '@tagExampleRepeatA',
					nodeType: 'Scenario Outline'
				}
			},
			{
				line: 25,
				column: 3,
				messageElements: {
					intro: 'All Scenarios on this Rule',
					tags: '@tagScenarioRuleRepeatA, @tagScenarioRuleRepeatB',
					nodeType: 'Rule'
				}
			},
			{
				line: 1,
				column: 1,
				messageElements: {
					intro: 'All Scenarios and Rules on this Feature',
					tags: '@tagScenarioRepeatA, @tagScenarioRepeatB',
					nodeType: 'Feature'
				}
			},
		]);
	});
});
