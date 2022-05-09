import {GherkinData, RuleError} from '../types';

export const name = 'no-trailing-spaces';

export function run({file}: GherkinData): RuleError[] {
  const errors = [] as RuleError[];
  let lineNo = 1;
  file.lines.forEach(line => {
    if (/[\t ]+$/.test(line)) {
      errors.push({message: 'Trailing spaces are not allowed',
        rule   : name,
        line   : lineNo,
        column : 0,
      });
    }

    lineNo++;
  });

  return errors;
}
