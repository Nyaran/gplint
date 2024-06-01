import _ from 'lodash';
import * as gherkinUtils from './utils/gherkin.js';
import {GherkinData, RuleError} from '../types.js';

export const name = 'no-scenario-outlines-without-examples';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];
  feature.children.forEach(child => {
    if (child.scenario) {
      const scenario = child.scenario;
      const nodeType = gherkinUtils.getNodeType(scenario, feature.language);
      if (nodeType === 'Scenario Outline' &&  (!_.find(scenario.examples, 'tableBody')?.tableBody.length)) {
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
