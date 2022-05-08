import * as _ from 'lodash';
export const name = 'max-scenarios-per-file';

export const availableConfigs = {
  'maxScenarios': 10,
  'countOutlineExamples': true
};

export function run({feature}, config) {
  if (!feature) {
    return [];
  }
  let errors = [];
  const mergedConfiguration = _.merge({}, availableConfigs, config);
  const maxScenarios = mergedConfiguration.maxScenarios;
  let count = feature.children.length;

  feature.children.forEach(child => {
    if (child.background) {
      count = count - 1;
    } else if (child.scenario.examples.length  && mergedConfiguration.countOutlineExamples) {
      count = count - 1;
      child.scenario.examples.forEach(example => {
        if (example.tableBody) {
          count = count + example.tableBody.length;
        }
      });
    }
  });

  if (count > maxScenarios) {
    errors.push({
      message: 'Number of scenarios exceeds maximum: ' + count + '/' + maxScenarios,
      rule: name,
      line: 0,
      column: 0
    });
  }

  return errors;
}
