import {GherkinData, RuleError} from '../types';
import {Background} from '@cucumber/messages';

export const name = 'no-empty-background';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];

  feature.children.forEach(child => {
    if (child.background) {
      if (child.background.steps.length === 0) {
        errors.push(createError(child.background));
      }
    }
  });
  return errors;
}

function createError(background: Background) {
  return {
    message: 'Empty backgrounds are not allowed.',
    rule   : name,
    line   : background.location.line,
    column : background.location.column,

  };
}
