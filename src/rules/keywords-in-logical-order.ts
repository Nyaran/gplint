import * as gherkinUtils from './utils/gherkin';
import _ from 'lodash';
import { GherkinData, RuleSubConfig, RuleError } from '../types';
import { Step, Scenario } from '@cucumber/messages';
export const name = 'keywords-in-logical-order';
export const availableConfigs = {
  'detectMissingKeywords': false
};

export function run({ feature }: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  if (!feature) {
    return [];
  }
  const mergedConfiguration = _.merge({}, availableConfigs, configuration);
  const detectMissingKeywords = mergedConfiguration.detectMissingKeywords;
  const errors = [] as RuleError[];
  feature.children.forEach((child) => {
    const node = child.background || child.scenario;
    const keywordList = ['given', 'when', 'then'];

    let maxKeywordPosition = undefined as number;
    const existsKeyword: { [key: string]: boolean } = {
      given: false,
      when: false,
      then: false
    };
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
        errors.push(createError(step, maxKeyword, null));
      }
      existsKeyword[keywordList[keywordPosition]] = true;
      maxKeywordPosition =
        Math.max(maxKeywordPosition, keywordPosition) || keywordPosition;
    });
    if (detectMissingKeywords && child.scenario && !Object.values(existsKeyword).every((value) => value === true)) {
      const keys: string[] = [];
      Object.entries(existsKeyword).forEach(([key, value]) => {
        if (!value) {
          keys.push(key);
        }
      });
      errors.push(createError(null, keys.join(', '), child.scenario));
    }
  });

  return errors;
}

function createError(step: Step, keyword: string, scenario: Scenario) {
  let message, node;
  if (scenario) {
    message = 'The scenario "' + scenario.name + '" does not have the following keywords: ' + keyword;
    node=scenario;
  } else if (step) {
    message = 'Step "' +
      step.keyword +
      step.text +
      '" should not appear after step using keyword ' +
      keyword;
    node = step;
  }

  return {
    message,
    rule: name,
    line: node.location.line,
    column: node.location.column,
  };
}
