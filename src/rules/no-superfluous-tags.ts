import _ from 'lodash';
import { Feature, Rule } from '@cucumber/messages';
import * as gherkinUtils from './utils/gherkin.js';
import {GherkinData, GherkinTaggable, RuleError} from '../types.js';

export const name = 'no-superfluous-tags';

export function run({feature}: GherkinData): RuleError[] {
	if (!feature) {
		return [];
	}

	const errors = [] as RuleError[];

	checkSuperfluousContainer(feature, feature.language, errors);

	return errors;
}

function checkSuperfluousContainer(container: Feature | Rule, lang: string, errors: RuleError[], parentContainer?: Feature) {
	const containers = parentContainer ? [container, parentContainer] : [container];

	container.children.forEach(child => {
		if (child.scenario) {
			checkTags(child.scenario, containers, lang, errors);

			if (child.scenario.keyword === 'Scenario Outline') {
				child.scenario.examples.forEach(example => {
					checkTags(example, [...containers, child.scenario], lang, errors);
				});
			}
		} else if (child.rule) {
			checkTags(child.rule, containers, lang, errors);
			checkSuperfluousContainer(child.rule, lang, errors, container as Feature);
		}
	});
}

function checkTags(child: GherkinTaggable, parents: GherkinTaggable[], language: string, errors: RuleError[]) {
	for (const parent of parents) {
		const superfluousTags = _.intersectionBy(child.tags, parent.tags, 'name');
		const childType = gherkinUtils.getNodeType(child, language);
		const parentType = gherkinUtils.getNodeType(parent, language);

		superfluousTags.forEach(tag => {
			errors.push({
				message: `Tag duplication between ${childType} and its corresponding ${parentType}: ${tag.name}`,
				rule: name,
				line: tag.location.line,
				column: tag.location.column,
			});
		});
	}
}
