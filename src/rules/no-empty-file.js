import * as _ from 'lodash';
export const name = 'no-empty-file';

export function run({feature}) {
  let errors = [];
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
