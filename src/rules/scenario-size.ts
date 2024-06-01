import _ from 'lodash';
import * as gherkinUtils from './utils/gherkin.js';

import {GherkinData, RuleError, RuleSubConfig} from '../types.js';
import { Background, Scenario } from '@cucumber/messages';
import { featureSpread } from './utils/gherkin.js';

export const name = 'scenario-size';
export const availableConfigs = {
  'steps-length': {
    'Background': 15,
    'Scenario': 15
  }
};

export function run({feature}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  if (!feature) {
    return [];
  }

  if (_.isEmpty(configuration)) {
    configuration = availableConfigs;
  }

  const errors = [] as RuleError[];

  featureSpread(feature).children.forEach((child) => {
    const node = child.background || child.scenario;
    const nodeType = gherkinUtils.getNodeType(node, feature.language);
    const configKey = child.background ? 'Background' : 'Scenario';
    const maxSize = configuration['steps-length'][configKey];
    const steps = (node as Background | Scenario).steps;

    if (maxSize && steps.length > maxSize) {
      errors.push({
        message: `Element ${nodeType} too long: actual ${steps.length}, expected ${maxSize}`,
        rule   : 'scenario-size',
        line   : node.location.line,
        column   : node.location.column,
      });
    }
  });

  return errors;
}
