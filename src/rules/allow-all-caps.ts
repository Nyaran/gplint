import * as allowAllCase from './abstracts/_allow-all-case';
import {GherkinData, RuleSubConfig, RuleError} from '../types';

export const name = 'allow-all-caps';

export const availableConfigs = allowAllCase.availableConfigs;

export function run(gherkinData: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  return allowAllCase.run(
    gherkinData,
    configuration,
    {
      rule: name,
      caseMethod: String.prototype.toUpperCase,
      errorMsg: 'with all caps are not allowed',
    }
  );
}
