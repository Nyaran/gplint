import * as gherkinUtils from './utils/gherkin';
import {GherkinData, RuleError} from '../types';
import {Step} from '@cucumber/messages';

export const name = 'keywords-in-logical-order';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];

  feature.children.forEach((child) => {
    const node = child.background || child.scenario;
    const keywordList = ['given', 'when', 'then'];

    let maxKeywordPosition = undefined as number;

    node.steps.forEach((step) => {
      const keyword = gherkinUtils.getLanguageInsensitiveKeyword(
        step,
        feature.language
      );
      const keywordPosition = keywordList.indexOf(keyword);

      if (keywordPosition === -1) {
        //   not found
        return;
      }

      if (keywordPosition < maxKeywordPosition) {
        const maxKeyword = keywordList[maxKeywordPosition];
        // console.log(createError(step, maxKeyword));
        errors.push(createError(step, maxKeyword));
      }

      maxKeywordPosition =
        Math.max(maxKeywordPosition, keywordPosition) || keywordPosition;
    });
  });

  return errors;
}

function createError(step: Step, maxKeyword: string) {
  return {
    message:
      'Step "' +
      step.keyword +
      step.text +
      '" should not appear after step using keyword ' +
      maxKeyword,
    rule: name,
    line: step.location.line,
    column: step.location.column,
  };
}
