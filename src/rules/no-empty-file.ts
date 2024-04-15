import _ from 'lodash';
import {GherkinData, RuleError} from '../types.js';

export const name = 'no-empty-file';

export function run({feature}: GherkinData): RuleError[] {
  const errors = [] as RuleError[];
  if (_.isEmpty(feature)) {
    errors.push({
      message: 'Empty feature files are disallowed',
      rule   : name,
      line   : 1,
      column: 0
    });
  }
  return errors;
}
