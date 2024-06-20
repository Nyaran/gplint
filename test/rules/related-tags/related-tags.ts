import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/related-tags.js';

const runTest = ruleTestBase.createRuleTest(rule, 'Missing related tag. <%= mainTag %> requires <%= relatedTags %>');

describe('Rule: related-tags', function() {
	describe('no violations', () => {
		it('single tag', function() {
			return runTest('related-tags/NoViolations.feature', {
				tags: {
					'@featureTag': ['@relatedTagFeature'],
					'@ruletag': ['@relatedTagRule'],
					'@scenarioTag': ['@relatedTagScenario'],
					'@examplesTag': ['@relatedTagExample'],
				}
			}, []);
		});

		it('multiple tags', function() {
			return runTest('related-tags/NoViolations.feature', {
				tags: {
					'@featureTag': ['@relatedTagFeature', '@extraRelatedTag'],
					'@ruleTag': ['@relatedTagRule', '@extraRelatedTag'],
					'@scenarioTag': ['@relatedTagScenario', '@extraRelatedTag'],
					'@examplesTag': ['@relatedTagExample', '@extraRelatedTag'],
				}
			}, []);
		});

		it('with regex', function() {
			return runTest('related-tags/NoViolations.feature', {
				tags: {
					'@featureTag': ['/^@relatedTag.+$/'],
					'@ruleTag': ['/^@relatedTag.+$/'],
					'@scenarioTag': ['/^@relatedTag.+$/'],
					'@examplesTag': ['/^@relatedTag.+$/'],
				}
			}, []);
		});
	});

	describe('throw errors', () => {
		it('single tag', function() {
			return runTest('related-tags/Violations.feature', {
				tags: {
					'@featureTag': ['@relatedTagFeature'],
					'@ruleTag': ['@relatedTagRule'],
					'@scenarioTag': ['@relatedTagScenario'],
					'@examplesTag': ['@relatedTagExample'],
				}
			}, [
				{
					line: 1,
					column: 1,
					messageElements: {mainTag: '@featureTag', relatedTags: ['@relatedTagFeature']}
				},
				{
					line: 7,
					column: 3,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['@relatedTagScenario']}
				},
				{
					line: 15,
					column: 3,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['@relatedTagScenario']}
				},
				{
					line: 18,
					column: 5,
					messageElements: {mainTag: '@examplesTag', relatedTags: ['@relatedTagExample']}
				},
				{
					line: 26,
					column: 3,
					messageElements: {mainTag: '@ruleTag', relatedTags: ['@relatedTagRule']}
				},
				{
					line: 28,
					column: 5,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['@relatedTagScenario']}
				},
			]);
		});

		it('multiple tags', function() {
			return runTest('related-tags/Violations.feature', {
				tags: {
					'@featureTag': ['@relatedTagFeature', '@extraRelatedTag'],
					'@ruleTag': ['@relatedTagRule', '@extraRelatedTag'],
					'@scenarioTag': ['@relatedTagScenario', '@extraRelatedTag'],
					'@examplesTag': ['@relatedTagExample', '@extraRelatedTag'],
				}
			}, [
				{
					line: 1,
					column: 1,
					messageElements: {mainTag: '@featureTag', relatedTags: ['@relatedTagFeature', '@extraRelatedTag']}
				},
				{
					line: 7,
					column: 3,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['@relatedTagScenario', '@extraRelatedTag']}
				},
				{
					line: 15,
					column: 3,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['@relatedTagScenario', '@extraRelatedTag']}
				},
				{
					line: 18,
					column: 5,
					messageElements: {mainTag: '@examplesTag', relatedTags: ['@relatedTagExample', '@extraRelatedTag']}
				},
				{
					line: 26,
					column: 3,
					messageElements: {mainTag: '@ruleTag', relatedTags: ['@relatedTagRule', '@extraRelatedTag']}
				},
				{
					line: 28,
					column: 5,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['@relatedTagScenario', '@extraRelatedTag']}
				},
			]);
		});

		it('with regex', function() {
			return runTest('related-tags/Violations.feature', {
				tags: {
					'@featureTag': ['/^@relatedTag.+$/'],
					'@ruleTag': ['/^@relatedTag.+$/'],
					'@scenarioTag': ['/^@relatedTag.+$/'],
					'@examplesTag': ['/^@relatedTag.+$/'],
				}
			}, [
				{
					line: 1,
					column: 1,
					messageElements: {mainTag: '@featureTag', relatedTags: ['/^@relatedTag.+$/']}
				},
				{
					line: 7,
					column: 3,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['/^@relatedTag.+$/']}
				},
				{
					line: 15,
					column: 3,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['/^@relatedTag.+$/']}
				},
				{
					line: 18,
					column: 5,
					messageElements: {mainTag: '@examplesTag', relatedTags: ['/^@relatedTag.+$/']}
				},
				{
					line: 26,
					column: 3,
					messageElements: {mainTag: '@ruleTag', relatedTags: ['/^@relatedTag.+$/']}
				},
				{
					line: 28,
					column: 5,
					messageElements: {mainTag: '@scenarioTag', relatedTags: ['/^@relatedTag.+$/']}
				},
			]);
		});
	});
});
