import _ from 'lodash';
import {Feature, Pickle, Rule as CucumberRule} from '@cucumber/messages';
import * as gherkinUtils from './utils/gherkin.js';
import { GherkinData, GherkinKeyworded, GherkinNode, GherkinTaggable, RuleError, RuleSubConfig } from '../types.js';

export const name = 'required-tags';
export const availableConfigs = {
  ignoreUntagged: true,
  tags: [] as string[], // Deprecated
  global: [] as string[],
  feature: [] as string[],
  rule: [] as string[],
  scenario: [] as string[],
  example: [] as string[],
  extendRule: false,
  extendExample: false,
};

function checkTagNotPresent(requiredTag: string | string[], {tags}: GherkinTaggable | Pickle, useLegacyCheck = false) {
  return _.castArray(requiredTag).every(rt =>
    !tags.some(tag => {
      const regexpMatch = rt.match(/^@?\/(?<exp>.*)\/$/);
      if (useLegacyCheck) {
        return RegExp(rt).test(tag.name);
      } else {
        return regexpMatch ? RegExp(regexpMatch.groups.exp).test(tag.name) : rt === tag.name;
      }
    }));
}

export function run({feature, pickles}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>): RuleError[] {
  if (!feature) {
    return [];
  }

  const mergedConfig = _.merge({}, availableConfigs, configuration);

  const errors = [] as RuleError[];
  const legacyTagsCheck = mergedConfig.tags.length > 0 && mergedConfig.scenario.length === 0;
  if (legacyTagsCheck) {
    mergedConfig.scenario = mergedConfig.tags;
  }

  if (mergedConfig.global.length > 0) {
    pickles
      .filter(pickle => !(mergedConfig.ignoreUntagged && pickle.tags.length === 0))
      .forEach(pickle => {
        mergedConfig.global
          .filter(requiredTag => checkTagNotPresent(requiredTag, pickle))
          .forEach(missTag => errors.push(createError(gherkinUtils.getNodeForPickle(feature, pickle, true), missTag, pickle.language)));
      });
  }

  function checkRequiredTags(item: GherkinTaggable, requiredTags: string[], extraRequiredTags: string[] = [], useLegacyCheck = false) {
    if (mergedConfig.ignoreUntagged && item.tags.length === 0) {
      return;
    }

    const allRequiredTags = requiredTags.concat(extraRequiredTags);

    allRequiredTags
      .filter(requiredTag => checkTagNotPresent(requiredTag, item, useLegacyCheck))
      .forEach(missTag => errors.push(createError(item, missTag, feature.language)));
  }

  checkRequiredTags(feature, mergedConfig.feature);

  function iterScenarioContainer(item: Feature | CucumberRule, insideRule = false) {
    for (const {rule, scenario} of (item as Feature).children) {
      if (!insideRule && rule != null) {
        checkRequiredTags(rule, mergedConfig.rule);

        iterScenarioContainer(rule, true);
      } else if (scenario != null) {
        const scenarioExtendedTags = [];

        if (mergedConfig.extendRule && !insideRule) {
          scenarioExtendedTags.push(...mergedConfig.rule);
        }

        if (mergedConfig.extendExample && scenario.examples.length === 0) {
          scenarioExtendedTags.push(...mergedConfig.example);
        }

        checkRequiredTags(scenario, mergedConfig.scenario, scenarioExtendedTags, legacyTagsCheck);

        if (scenario.examples.length !== 0) {
          for (const example of scenario.examples) {
            checkRequiredTags(example, mergedConfig.example);
          }
        }
      }
    }
  }

  iterScenarioContainer(feature);

  return errors;
}

function createError(item: GherkinNode, requiredTags: string | string[], lang: string) {
  const type = gherkinUtils.getNodeType(item as GherkinKeyworded, lang);

  return {
    message: `The tag(s) [${requiredTags}] should be present for ${type}.`,
    rule: name,
    line: item.location.line,
    column: item.location.column,
  };
}
