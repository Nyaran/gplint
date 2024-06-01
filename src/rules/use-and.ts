import * as gherkinUtils from './utils/gherkin.js';
import {Background, Scenario, Step} from '@cucumber/messages';
import {GherkinData, RuleError} from '../types.js';
import { featureSpread } from './utils/gherkin.js';

export const name = 'use-and';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];

  featureSpread(feature).children.forEach(child => {
    const node = child.background || child.scenario;
    let previousKeyword = undefined as string;
    if ((node as Background | Scenario).steps) {
      (node as Background | Scenario).steps.forEach(step => {
        const keyword = gherkinUtils.getLanguageInsensitiveKeyword(step, feature.language);

        if (keyword === 'and') {
          return;
        }
        if (keyword === previousKeyword) {
          errors.push(createError(step));
        }

        previousKeyword = keyword;
      });
    }
  });
  return errors;
}

function createError(step: Step) {
  return {
    message: 'Step "' + step.keyword + step.text + '" should use And instead of ' + step.keyword,
    rule   : name,
    line   : step.location.line,
    column : step.location.column,
  };
}
