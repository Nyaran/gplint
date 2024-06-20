import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/max-tags-lines.js';
const runTest = ruleTestBase.createRuleTest(rule,
	'Number of line tags for "<%= keyword %>" exceeds the maximum: <%= tagsLinesCount %>/<%= maxLines %>');

describe('Max Tag Lines Rule', function () {
	it('doesn\'t raise errors when there are no violations - tagged', function () {
		return runTest('max-tags-lines/tagged.feature', {
			feature: 2,
			rule: 2,
			scenario: 5,
			example: 5,
		}, []);
	});

	it('doesn\'t raise errors when there are no violations - untagged', function () {
		return runTest('max-tags-lines/untagged.feature', {}, []);
	});

	it('raise errors when tags are exceeded', function () {
		return runTest('max-tags-lines/tagged.feature', {
			feature: 1,
			rule: 1,
			scenario: 3,
			example: 2,
		}, [
			{
				messageElements: {keyword: 'Feature', tagsLinesCount: 2, maxLines: 1},
				line: 3,
				column: 1,
			},
			{
				messageElements: {keyword: 'Scenario Outline', tagsLinesCount: 5, maxLines: 3},
				line: 17,
				column: 3,
			},
			{
				messageElements: {keyword: 'Examples', tagsLinesCount: 3, maxLines: 2},
				line: 30,
				column: 5,
			},
			{
				messageElements: {keyword: 'Rule', tagsLinesCount: 2, maxLines: 1},
				line: 37,
				column: 3,
			},
		]);
	});

	it('raise errors when tags are exceeded - 0 lines allowed - except features', function () {
		return runTest('max-tags-lines/tagged.feature', {
			feature: -1,
			rule: 0,
			scenario: 0,
			example: 0,
		}, [
			{
				messageElements: {keyword: 'Scenario', tagsLinesCount: 1, maxLines: 0},
				line: 9,
				column: 3,
			},
			{
				messageElements: {keyword: 'Scenario Outline', tagsLinesCount: 5, maxLines: 0},
				line: 17,
				column: 3,
			},
			{
				messageElements: {keyword: 'Examples', tagsLinesCount: 2, maxLines: 0},
				line: 22,
				column: 5,
			},
			{
				messageElements: {keyword: 'Examples', tagsLinesCount: 3, maxLines: 0},
				line: 30,
				column: 5,
			},
			{
				messageElements: {keyword: 'Rule', tagsLinesCount: 2, maxLines: 0},
				line: 37,
				column: 3,
			},
			{
				messageElements: {keyword: 'Scenario', tagsLinesCount: 1, maxLines: 0},
				line: 40,
				column: 5,
			},
		]);
	});

	it('raise errors when tags are exceeded - 0 lines allowed - except rules', function () {
		return runTest('max-tags-lines/tagged.feature', {
			feature: 0,
			rule: -1,
			scenario: 0,
			example: 0,
		}, [
			{
				messageElements: {keyword: 'Feature', tagsLinesCount: 2, maxLines: 0},
				line: 3,
				column: 1,
			},
			{
				messageElements: {keyword: 'Scenario', tagsLinesCount: 1, maxLines: 0},
				line: 9,
				column: 3,
			},
			{
				messageElements: {keyword: 'Scenario Outline', tagsLinesCount: 5, maxLines: 0},
				line: 17,
				column: 3,
			},
			{
				messageElements: {keyword: 'Examples', tagsLinesCount: 2, maxLines: 0},
				line: 22,
				column: 5,
			},
			{
				messageElements: {keyword: 'Examples', tagsLinesCount: 3, maxLines: 0},
				line: 30,
				column: 5,
			},
			{
				messageElements: {keyword: 'Scenario', tagsLinesCount: 1, maxLines: 0},
				line: 40,
				column: 5,
			},
		]);
	});

	it('raise errors when tags are exceeded - 0 lines allowed - except scenarios', function () {
		return runTest('max-tags-lines/tagged.feature', {
			feature: 0,
			rule: 0,
			scenario: -1,
			example: 0,
		}, [
			{
				messageElements: {keyword: 'Feature', tagsLinesCount: 2, maxLines: 0},
				line: 3,
				column: 1,
			},
			{
				messageElements: {keyword: 'Examples', tagsLinesCount: 2, maxLines: 0},
				line: 22,
				column: 5,
			},
			{
				messageElements: {keyword: 'Examples', tagsLinesCount: 3, maxLines: 0},
				line: 30,
				column: 5,
			},
			{
				messageElements: {keyword: 'Rule', tagsLinesCount: 2, maxLines: 0},
				line: 37,
				column: 3,
			},
		]);
	});

	it('raise errors when tags are exceeded - 0 lines allowed - except examples', function () {
		return runTest('max-tags-lines/tagged.feature', {
			feature: 0,
			rule: 0,
			scenario: 0,
			example: -1,
		}, [
			{
				messageElements: {keyword: 'Feature', tagsLinesCount: 2, maxLines: 0},
				line: 3,
				column: 1,
			},
			{
				messageElements: {keyword: 'Scenario', tagsLinesCount: 1, maxLines: 0},
				line: 9,
				column: 3,
			},
			{
				messageElements: {keyword: 'Scenario Outline', tagsLinesCount: 5, maxLines: 0},
				line: 17,
				column: 3,
			},
			{
				messageElements: {keyword: 'Rule', tagsLinesCount: 2, maxLines: 0},
				line: 37,
				column: 3,
			},
			{
				messageElements: {keyword: 'Scenario', tagsLinesCount: 1, maxLines: 0},
				line: 40,
				column: 5,
			},
		]);
	});
});
