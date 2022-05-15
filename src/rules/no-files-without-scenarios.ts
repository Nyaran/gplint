import {GherkinData, RuleError} from '../types';

export const name = 'no-files-without-scenarios';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }
  const errors = [] as RuleError[];
  if (!feature.children.some(child => child.scenario != null)) {
    errors.push({
      message: 'Feature file does not have any Scenarios',
      rule   : name,
      line   : 1,
      column: 0
    });
  }
  return errors;
}
