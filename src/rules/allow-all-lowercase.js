import * as allowAllCase from './abstracts/_allow-all-case';

export const name = 'allow-all-lowercase';

export const availableConfigs = allowAllCase.availableConfigs;

export function run(gherkinData, configuration) {
  return allowAllCase.run(
    gherkinData,
    configuration,
    {
      rule: name,
      caseMethod: String.prototype.toLowerCase,
      errorMsg: 'with all lowercase are not allowed',
    }
  );
}
