import * as _ from 'lodash';
import * as gherkinUtils from './utils/gherkin';
export const name = 'no-scenario-outlines-without-examples';

export function run({feature}) {
  if (!feature) {
    return [];
  }

  let errors = [];
  feature.children.forEach(child => {
    if (child.scenario) {
      const scenario = child.scenario;
      const nodeType = gherkinUtils.getNodeType(scenario, feature.language);
      if (nodeType === 'Scenario Outline' &&  (!_.find(scenario.examples, 'tableBody') || !_.find(scenario.examples, 'tableBody')['tableBody'].length)) {
        errors.push({
          message: 'Scenario Outline does not have any Examples',
          rule   : name,
          line   : scenario.location.line,
          column : scenario.location.column,
        });
      }
    }
  });
  return errors;
}
