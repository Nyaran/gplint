import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-restricted-tags.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Forbidden tag <%= tag %> on <%= nodeType %>');

describe('No Restricted Tags Rule', function() {
	it('doesn\'t raise errors when there are no violations', function() {
		return runTest('no-restricted-tags/NoViolations.feature', {
			'tags': ['@badTag'],
			'patterns': ['^@anotherBadTag$']
		}, []);
	});

	it('detects errors for features, scenarios, and scenario outlines', function() {
		return runTest('no-restricted-tags/Violations.feature', {
			'tags': ['@badTag'],
			'patterns': ['^@anotherBadTag$']
		}, [{
			messageElements: {tag: '@badTag', nodeType:'Feature'},
			line: 1,
			column: 13,
		},
		{
			messageElements: {tag: '@anotherBadTag', nodeType:'Feature'},
			line: 1,
			column: 21,
		},
		{
			messageElements: {tag: '@badTag', nodeType:'Scenario'},
			line: 7,
			column: 14,
		},
		{
			messageElements: {tag: '@anotherBadTag', nodeType:'Scenario'},
			line: 7,
			column: 22,
		},
		{
			messageElements: {tag: '@badTag', nodeType:'Rule'},
			line: 11,
			column: 10,
		},
		{
			messageElements: {tag: '@anotherBadTag', nodeType:'Rule'},
			line: 11,
			column: 18,
		},
		{
			messageElements: {tag: '@badTag', nodeType:'Scenario Outline'},
			line: 13,
			column: 14,
		},
		{
			messageElements: {tag: '@anotherBadTag', nodeType:'Scenario Outline'},
			line: 13,
			column: 22,
		},
		{
			messageElements: {tag: '@badTag', nodeType:'Examples'},
			line: 16,
			column: 14,
		},
		{
			messageElements: {tag: '@anotherBadTag', nodeType:'Examples'},
			line: 16,
			column: 22,
		},
		{
			messageElements: {tag: '@badTag', nodeType:'Examples'},
			line: 21,
			column: 14,
		},
		{
			messageElements: {tag: '@anotherBadTag', nodeType:'Examples'},
			line: 21,
			column: 22,
		}]);
	});
});
