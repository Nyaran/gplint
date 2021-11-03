const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');

const name = 'required-tags';
const availableConfigs = {
  ignoreUntagged: true,
  tags: [], // Deprecated
  global: [],
  feature: [],
  rule: [],
  scenario: [],
  example: [],
  extendRule: false,
  extendExample: false,
};

function checkTagNotPresent(requiredTag, {tags}, useLegacyCheck = false) {
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

function run({feature, pickles}, config) {
  if (!feature) {
    return [];
  }

  const mergedConfig = _.merge({}, availableConfigs, config);

  let errors = [];
  const legacyTagsCheck = mergedConfig.tags.length > 0 && mergedConfig.scenario.length === 0;
  if (legacyTagsCheck) {
    mergedConfig.scenario = mergedConfig.tags;
  }

  if (mergedConfig.global.length > 0) {
    pickles
      .filter(pickle => !(mergedConfig.ignoreUntagged && pickle.tags.length === 0))
      .forEach(pickle => mergedConfig.global
        .filter(requiredTag => checkTagNotPresent(requiredTag, pickle))
        .forEach(missTag => errors.push(createError(gherkinUtils.getNodeForPickleScenario(feature, pickle, true), missTag, pickle.language))));
  }

  function checkRequiredTags(item, requiredTags, extraRequiredTags = [], useLegacyCheck = false) {
    if (mergedConfig.ignoreUntagged && item.tags.length === 0) {
      return;
    }

    const allRequiredTags = requiredTags.concat(extraRequiredTags);

    allRequiredTags
      .filter(requiredTag => checkTagNotPresent(requiredTag, item, useLegacyCheck))
      .forEach(missTag => errors.push(createError(item, missTag, feature.language)));
  }

  checkRequiredTags(feature, mergedConfig.feature);

  function iterScenarioContainer(item, insideRule = false) {
    for (const {rule, scenario} of item.children) {
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

function createError(item, requiredTags, lang) {
  const type = gherkinUtils.getNodeType(item, lang);

  return {
    message: `The tag(s) [${requiredTags}] should be present for ${type}.`,
    rule: name,
    line: item.location.line,
    column: item.location.column,
  };
}

module.exports = {
  name,
  run: run,
  availableConfigs: availableConfigs
};
