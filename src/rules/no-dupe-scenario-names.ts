import _ from 'lodash';
import {Pickle, Scenario} from '@cucumber/messages';
import * as gherkinUtils from './utils/gherkin.js';
import {GherkinData, RuleError, RuleSubConfig} from '../types.js';
import { featureSpread, getPicklesForNode } from './utils/gherkin.js';

export const name = 'no-dupe-scenario-names';
export const availableConfigs = [
	'anywhere',
	'in-feature',
	'in-rule',
	'anywhere-compile',
	'in-feature-compile',
	'in-rule-compile',
];

type Locations = [
	{
		file: string
		line: number
		column: number
	}
];

let scenariosStore = {} as Record<string, {
	locations: Locations
}>;

export function run({feature, pickles, file}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
	if (!feature) {
		return [];
	}

	const errors = [] as RuleError[];

	const scope = configuration && _.isString(configuration) ? configuration : 'anywhere';
	const compile = scope.endsWith('-compile');

	function loopScenarios(scenarios: (Scenario | Pickle)[]) {
		scenarios.forEach(scenario => {
			const scenarioName = scenario.name;
			const scenarioLocation = (compile ? gherkinUtils.getNodeForPickle(feature, scenario as Pickle) : scenario as Scenario).location;
			if (Object.prototype.hasOwnProperty.call(scenariosStore, scenarioName)) {
				const dupes = getFileLinePairsAsStr(scenariosStore[scenarioName].locations);

				scenariosStore[scenarioName].locations.push({
					file: file.relativePath,
					line: scenarioLocation.line,
					column: scenarioLocation.column,
				});

				errors.push({
					message: `Scenario name is already used in: ${dupes}`,
					rule: name,
					line: scenarioLocation.line,
					column: scenarioLocation.column,
				});
			} else {
				scenariosStore[scenarioName] = {
					locations: [
						{
							file: file.relativePath,
							line: scenarioLocation.line,
							column: scenarioLocation.column,
						}
					]
				};
			}
		});
	}

	if (scope.startsWith('in-rule')) {
		const {rules} = featureSpread(feature);

		for (const node of [feature, ...rules]) { // Append feature level to rules array, to check un-ruled scenarios
			scenariosStore = {};

			const scenarios = compile ?
				getPicklesForNode(node, pickles) :
				node.children.filter(child => child.scenario).map(child => child.scenario);
			loopScenarios(scenarios);
		}
	} else {
		if (scope.startsWith('in-feature')) {
			scenariosStore = {};
		}
		const {children} = featureSpread(feature);

		const scenarios = compile ? pickles : children.filter(child => child.scenario).map(child => child.scenario);
		loopScenarios(scenarios);
	}

	return errors;
}

function getFileLinePairsAsStr(objects: Locations) {
	const strings = [] as string[];
	objects.forEach(object => {
		strings.push(`${object.file}:${object.line}`);
	});
	return strings.join(', ');
}
