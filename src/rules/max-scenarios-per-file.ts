import _ from 'lodash';
import {GherkinData, RuleSubConfig, RuleError} from '../types.js';

export const name = 'max-scenarios-per-file';

export const availableConfigs = {
  'maxScenarios': 10,
  'countOutlineExamples': true
};

export function run({feature}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  if (!feature) {
    return [];
  }
  const errors = [] as RuleError[];
  const mergedConfiguration = _.merge({}, availableConfigs, configuration);
  const maxScenarios = mergedConfiguration.maxScenarios;
  let count = feature.children.length;

  feature.children.forEach(child => {
    if (child.background) {
      count = count - 1;
    } else if (child.scenario.examples.length && mergedConfiguration.countOutlineExamples) {
      count = child.scenario.examples
        .reduce((accumulator, example) => accumulator + example.tableBody.length, count - 1);
    }
  });

  if (count > maxScenarios) {
    errors.push({
      message: `Number of scenarios exceeds maximum: ${count}/${maxScenarios}`,
      rule: name,
      line: 0,
      column: 0
    });
  }

  return errors;
}
