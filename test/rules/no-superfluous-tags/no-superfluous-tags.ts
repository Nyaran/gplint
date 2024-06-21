import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-superfluous-tags.js';
const runTest = ruleTestBase.createRuleTest(rule,
	'Tag duplication between <%= childType %> and its corresponding <%=parentType %>: <%= tags %>');

describe('No Superfluous Tags Rule', function() {
	it('doesn\'t raise errors when there are no violations', function() {
		return runTest('no-superfluous-tags/NoViolations.feature', {}, []);
	});

	it('detects errors for scenarios, and scenario outlines', function() {
		return runTest('no-superfluous-tags/Violations.feature', {}, [
			{
				line: 7,
				column: 3,
				messageElements: {
					childType: 'Scenario',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag1'
				}
			},
			{
				line: 11,
				column: 3,
				messageElements: {
					childType: 'Scenario Outline',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag1'
				}
			},
			{
				line: 11,
				column: 27,
				messageElements: {
					childType: 'Scenario Outline',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag2'
				}
			},
			{
				line: 15,
				column: 5,
				messageElements: {
					childType: 'Examples',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag2'
				}
			},
			{
				line: 15,
				column: 5,
				messageElements: {
					childType: 'Examples',
					parentType: 'Scenario Outline',
					tags: '@superfluousFeatureTag2'
				}
			},
			{
				line: 15,
				column: 43,
				messageElements: {
					childType: 'Examples',
					parentType: 'Scenario Outline',
					tags: '@superfluousScenarioTag1'
				}
			},

			// In rule
			{
				line: 20,
				column: 3,
				messageElements: {
					childType: 'Rule',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag3'
				}
			},
			{
				line: 26,
				column: 5,
				messageElements: {
					childType: 'Scenario',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag1'
				}
			},
			{
				line: 26,
				column: 57,
				messageElements: {
					childType: 'Scenario',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag3'
				}
			},
			{
				line: 26,
				column: 57,
				messageElements: {
					childType: 'Scenario',
					parentType: 'Rule',
					tags: '@superfluousFeatureTag3'
				}
			},
			{
				line: 26,
				column: 81,
				messageElements: {
					childType: 'Scenario',
					parentType: 'Rule',
					tags: '@superfluousRuleTag1'
				}
			},
			{
				line: 30,
				column: 5,
				messageElements: {
					childType: 'Scenario Outline',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag1'
				}
			},
			{
				line: 30,
				column: 29,
				messageElements: {
					childType: 'Scenario Outline',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag2'
				}
			},
			{
				line: 30,
				column: 92,
				messageElements: {
					childType: 'Scenario Outline',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag3'
				}
			},
			{
				line: 30,
				column: 92,
				messageElements: {
					childType: 'Scenario Outline',
					parentType: 'Rule',
					tags: '@superfluousFeatureTag3'
				}
			},
			{
				line: 30,
				column: 116,
				messageElements: {
					childType: 'Scenario Outline',
					parentType: 'Rule',
					tags: '@superfluousRuleTag1'
				}
			},
			{
				line: 34,
				column: 7,
				messageElements: {
					childType: 'Examples',
					parentType: 'Feature',
					tags: '@superfluousFeatureTag2'
				}
			},
			{
				line: 34,
				column: 7,
				messageElements: {
					childType: 'Examples',
					parentType: 'Scenario Outline',
					tags: '@superfluousFeatureTag2'
				}
			},
			{
				line: 34,
				column: 45,
				messageElements: {
					childType: 'Examples',
					parentType: 'Scenario Outline',
					tags: '@superfluousScenarioTag1'
				}
			},
			{
				line: 34,
				column: 83,
				messageElements: {
					childType: 'Examples',
					parentType: 'Rule',
					tags: '@superfluousRuleTag2'
				}
			},
		]);
	});
});
