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

function reduceGlobals(globalTags, {tags}) {
  return globalTags.filter(t => !tags.map(ft => ft.name).includes(t));
}

function run({feature}, config) {
  if (!feature) {
    return [];
  }

  const mergedConfig = _.merge({}, availableConfigs, config);

  let errors = [];
  const legacyTagsCheck = mergedConfig.tags.length > 0 && mergedConfig.scenario.length === 0;
  if (legacyTagsCheck) {
    mergedConfig.scenario = mergedConfig.tags;
  }

  function checkRequiredTags(item, requiredTags, extraRequiredTags = [], useLegacyCheck = false) {
    if (mergedConfig.ignoreUntagged && item.tags.length === 0) {
      return;
    }

    const allRequiredTags = requiredTags.concat(extraRequiredTags);

    const missTags = allRequiredTags.filter(requiredTag => !item.tags.some(tag => {
      const regexpMatch = requiredTag.match(/^@?\/(?<exp>.*)\/$/);
      if (useLegacyCheck) {
        return RegExp(requiredTag).test(tag.name);
      } else {
        return regexpMatch ? RegExp(regexpMatch.groups.exp).test(tag.name) : requiredTag === tag.name;
      }
    }));
    if (missTags.length > 0) {
      errors.push(createError(item, missTags, feature.language));
    }
  }

  checkRequiredTags(feature, mergedConfig.feature);
  function iterScenarioContainer(item, globalTags, insideRule = false) {
    const globalContainerTags = reduceGlobals(globalTags, item);

    for (const {rule, scenario} of item.children) {
      if (!insideRule && rule != null) {
        checkRequiredTags(rule, mergedConfig.rule);

        iterScenarioContainer(rule, globalContainerTags, true);
      } else if (scenario != null) {
        let globalScenarioTags = reduceGlobals(globalContainerTags, scenario);
        const globalScenarioTagsAux = globalScenarioTags;
        const scenarioExtendedTags = [];

        if (mergedConfig.extendRule && !insideRule) {
          scenarioExtendedTags.push(...mergedConfig.rule);
        }

        if (mergedConfig.extendExample && scenario.examples.length === 0) {
          scenarioExtendedTags.push(...mergedConfig.example);
        }

        if (scenario.examples.length !== 0) {
          for (const example of scenario.examples) {
            globalScenarioTags = reduceGlobals(globalScenarioTagsAux, example);
            checkRequiredTags(example, mergedConfig.example);
          }
        }

        scenarioExtendedTags.push(...globalScenarioTags);

        checkRequiredTags(scenario, mergedConfig.scenario, scenarioExtendedTags, legacyTagsCheck);
      }
    }
  }

  iterScenarioContainer(feature, mergedConfig.global);

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
