import * as allowAllCase from './abstracts/_allow-all-case.js';
import {GherkinData, RuleSubConfig, RuleError} from '../types.js';

export const name = 'allow-all-lowercase';

export const {availableConfigs} = allowAllCase;

export function run(gherkinData: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
	return allowAllCase.run(
		gherkinData,
		configuration,
		{
			rule: name,
			caseMethod: String.prototype.toLowerCase, // eslint-disable-line @typescript-eslint/unbound-method
			errorMsg: 'with all lowercase are not allowed',
		}
	);
}
