import _ from 'lodash';
import {Tag} from '@cucumber/messages';
import * as gherkinUtils from './utils/gherkin.js';
import {GherkinData, RuleSubConfig, RuleError, GherkinTaggable} from '../types.js';
import { featureSpread } from './utils/gherkin.js';

export const name = 'no-restricted-tags';
export const availableConfigs = {
	tags: [] as string[],
	patterns: [] as string[],
};

export function run({feature}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
	if (!feature) {
		return [];
	}

	const forbiddenTags = configuration.tags;
	const mergedConfiguration = _.merge(availableConfigs, configuration);
	const forbiddenPatterns = getForbiddenPatterns(mergedConfiguration);
	const language = feature.language;
	const errors = [] as RuleError[];

	checkTags(feature, language, forbiddenTags, forbiddenPatterns, errors);

	const {children, rules} = featureSpread(feature);

	rules.forEach(rule => {
		checkTags(rule, language, forbiddenTags, forbiddenPatterns, errors);
	});

	children.forEach(child => {
		// backgrounds don't have tags
		if (child.scenario) {
			checkTags(child.scenario, language, forbiddenTags, forbiddenPatterns, errors);

			child.scenario.examples.forEach(example => {
				checkTags(example, language, forbiddenTags, forbiddenPatterns, errors);
			});
		}
	});

	return errors;
}

function getForbiddenPatterns(configuration: RuleSubConfig<typeof availableConfigs>) {
	return configuration.patterns.map((pattern) => new RegExp(pattern));
}

function checkTags(node: GherkinTaggable, language: string, forbiddenTags: string[], forbiddenPatterns: RegExp[], errors: RuleError[]) {
	const nodeType = gherkinUtils.getNodeType(node, language);
	node.tags.forEach(tag => {
		if (isForbidden(tag, forbiddenTags, forbiddenPatterns)) {
			errors.push({
				message: `Forbidden tag ${tag.name} on ${nodeType}`,
				rule   : name,
				line   : tag.location.line,
				column : tag.location.column,
			});
		}
	});
}

function isForbidden(tag: Tag, forbiddenTags: string[], forbiddenPatterns: RegExp[]) {
	return _.includes(forbiddenTags, tag.name)
		|| forbiddenPatterns.some((pattern) => pattern.test(tag.name));
}
