import _ from 'lodash';
import {Examples, Feature, Scenario, Tag} from '@cucumber/messages';
import {GherkinData, RuleError, RuleSubConfig} from '../types';

export const name = 'allowed-tags';

export const availableConfigs = {
  tags: [] as string[],
  patterns: [] as string[],
};

export function run({feature}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];
  const allowedTags = configuration.tags;
  const allowedPatterns = getAllowedPatterns(configuration);

  checkTags(feature, allowedTags, allowedPatterns, errors);

  feature.children.forEach(child => {
    if (child.scenario) {
      checkTags(child.scenario, allowedTags, allowedPatterns, errors);

      if (child.scenario.examples) {
        child.scenario.examples.forEach(example => {
          checkTags(example, allowedTags, allowedPatterns, errors);
        });
      }
    }
  });

  return errors;
}

function getAllowedPatterns(configuration: RuleSubConfig<typeof availableConfigs>): RegExp[] {
  return (configuration.patterns || []).map((pattern) => new RegExp(pattern));
}

function checkTags(node: Feature | Scenario | Examples, allowedTags: string[], allowedPatterns: RegExp[], errors: RuleError[]) {
  return (node.tags || [])
    .filter(tag => !isAllowed(tag, allowedTags, allowedPatterns))
    .forEach(tag => {
      errors.push(createError(node, tag));
    });
}

function isAllowed(tag: Tag, allowedTags: string[], allowedPatterns:RegExp[]) {
  return _.includes(allowedTags, tag.name)
    || allowedPatterns.some((pattern) => pattern.test(tag.name));
}

function createError(node: Feature | Scenario | Examples, tag: Tag): RuleError {
  return {
    message: 'Not allowed tag ' + tag.name + ' on ' + node.keyword,
    rule   : name,
    line   : tag.location.line,
    column : tag.location.column,
  };
}
