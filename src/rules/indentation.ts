import _ from 'lodash';
import * as gherkinUtils from './utils/gherkin.js';
import { GherkinData, RuleSubConfig, RuleError } from '../types.js';
import { FeatureChild, Location, RuleChild, Step, Tag } from '@cucumber/messages';
import { getLineContent, modifyLine } from './utils/line.js';

export const name = 'indentation';
const defaultConfig = {
	'Feature': 0,
	'Background': 2,
	'Rule': 2,
	'Scenario': 2,
	'Step': 4,
	'Examples': 4,
	'example': 6,
	'given': 4,
	'when': 4,
	'then': 4,
	'and': 4,
	'but': 4,
	'RuleFallback': true, // If `true`, the indentation for nodes inside Rule is the sum of "Rule" and the node itself, else it uses the node directly
};

export const availableConfigs = _.merge({}, defaultConfig, {
	// The values here are unused by the config parsing logic.
	'feature tag': -1,
	'rule tag': -1,
	'scenario tag': -1,
	'examples tag': -1
});

type Configuration = RuleSubConfig<typeof availableConfigs>;
type ConfigurationKey = keyof Configuration;

function mergeConfiguration(configuration: Configuration): Configuration {
	const mergedConfiguration = _.merge({}, defaultConfig, configuration);

	Object.entries({
		'feature tag': mergedConfiguration.Feature,
		'rule tag': mergedConfiguration.Rule,
		'scenario tag': mergedConfiguration.Scenario,
		'examples tag': mergedConfiguration.Examples,
	}).forEach(([key, value]: [keyof typeof defaultConfig, number]) => {
		if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, key)) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			mergedConfiguration[key] = value;
		}
	});

	return mergedConfiguration;
}

export function fixLine(existingLine: string, expectedIndentation: number): string {
	const newIndentation = ' '.repeat(expectedIndentation);

	return `${newIndentation}${existingLine.replaceAll(/^\s+/g, '')}`;
}

export function run({feature, file}: GherkinData, configuration: Configuration, autoFix: boolean): RuleError[] {
	if (!feature) {
		return [];
	}

	const errors = [] as RuleError[];
	const mergedConfiguration = mergeConfiguration(configuration);

	function validate(parsedLocation: Location, type: ConfigurationKey, modifier = 0) {
		// location.column is 1 index based so, when we compare with the expected
		// indentation we need to subtract 1
		const parsedLocColumn = parsedLocation.column ?? 0;
		const expectedIndentation = mergedConfiguration[type] as number + modifier;
		if (parsedLocColumn - 1 !== expectedIndentation) {
			if (autoFix) {
				const newLine = fixLine(getLineContent(file, parsedLocation.line), expectedIndentation);
				modifyLine(file, parsedLocation.line, newLine);
			} else {
				errors.push({
					message: `Wrong indentation for "${type}", expected indentation level of ${expectedIndentation}, but got ${parsedLocColumn - 1}`,
					rule   : name,
					line   : parsedLocation.line,
					column : parsedLocation.column,
				});
			}
		}
	}

	function validateStep(step: Step, modifier = 0) {
		let stepType = gherkinUtils.getLanguageInsensitiveKeyword(step, feature?.language);
		stepType = stepType != null && stepType in configuration ? stepType : 'Step';
		validate(step.location, stepType as ConfigurationKey, modifier);
	}

	function validateTags(tags: readonly Tag[], type: ConfigurationKey, modifier = 0) {
		_(tags).groupBy('location.line').forEach(tagLocationGroup => {
			const firstTag = _(tagLocationGroup).sortBy('location.column').head();
			if (firstTag) {
				validate(firstTag.location, type, modifier);
			}
		});
	}

	function validateChildren(child: FeatureChild | RuleChild, modifier = 0) {
		if (child.background) {
			validate(child.background.location, 'Background', modifier);
			child.background.steps.forEach(step => {
				validateStep(step, modifier);
			});
		} else if (child.scenario) {
			validate(child.scenario.location, 'Scenario', modifier);
			validateTags(child.scenario.tags, 'scenario tag', modifier);
			child.scenario.steps.forEach(step => {
				validateStep(step, modifier);
			});

			child.scenario.examples.forEach(example => {
				validate(example.location, 'Examples', modifier);
				validateTags(example.tags, 'examples tag', modifier);

				if (example.tableHeader) {
					validate(example.tableHeader.location, 'example', modifier);
					example.tableBody.forEach(row => {
						validate(row.location, 'example', modifier);
					});
				}
			});
		}
	}

	validate(feature.location, 'Feature');
	validateTags(feature.tags, 'feature tag');

	feature.children.forEach(child => {
		if (child.rule) {
			validate(child.rule.location, 'Rule');
			validateTags(child.rule.tags, 'rule tag');

			child.rule.children.forEach(ruleChild => {
				validateChildren(ruleChild, mergedConfiguration.RuleFallback ? mergedConfiguration.Rule : 0);
			});
		} else {
			validateChildren(child);
		}
	});

	return errors;
}

export const documentation = {
	description: 'TODO',
	fixable: false,
	configurable: true,
	examples: [{
		title: 'Example',
		description: 'TODO',
		config: {
			'': 'error',
		}
	}],
};
