import * as gherkinUtils from './utils/gherkin';
import _ from 'lodash';
import { GherkinData, RuleSubConfig, RuleError } from '../types';
import { Step } from '@cucumber/messages';

export const name = 'no-structure-correct';
export const availableConfigs = {
  'detectMissingKeywords': false
};
const keywordList = ['given', 'when', 'then'];

export function run({ feature }: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  if (!feature) {
    return [];
  }
  const mergedConfiguration = _.merge({}, availableConfigs, configuration);
  const detectMissingKeywords = mergedConfiguration.detectMissingKeywords;
  const errors = [] as RuleError[];
  feature.children.forEach((child) => {
    const node = child.background || child.scenario;
    let lastStep;
    let maxKeywordPosition = 0, counter = 0;
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
      if (keyword !== keywordList[counter] && maxKeywordPosition < keywordList.length) {
        const maxKeyword = keywordList[maxKeywordPosition];
        errors.push(createError(step, maxKeyword));
      }
      counter++;
      lastStep = step;
      maxKeywordPosition =
        Math.max(maxKeywordPosition, keywordPosition) || keywordPosition;
    });
    if (maxKeywordPosition < keywordList.length - 1 && detectMissingKeywords) {
      errors.push(createError(lastStep, keywordList[maxKeywordPosition], true));
    }
  });

  return errors;
}

function createError(step: Step, maxKeyword: string, detectMissingKeywords = false) {
  let message;
  if (detectMissingKeywords) {
    message = 'After step "' +
      step.keyword +
      step.text + '" that has the keyword "' +
      step.keyword + '" you must continue some step with the keyword "' +
      keywordList[keywordList.indexOf(maxKeyword) + 1] + '", the expected order is Given, When, Then.';
  } else {
    message = 'Step "' +
      step.keyword +
      step.text +
      '" does not meet the expected keyword order, the expected order is Given, When, Then.';
  }
  return {
    message,
    rule: name,
    line: step.location.line,
    column: step.location.column,
  };
}