const _ = require('lodash');

const name = 'table-align';
const availableConfigs = {
  feature: 1,
  rule: 2,
  scenario: 5,
  example: 5,
};

function run({feature}, config) {
  function checkTagsLines({keyword, tags, location}, maxLines) {
    const tagsLines = tags.map(t => t.location.line);

    const tagsLinesCount = tagsLines.length > 0 ? Math.max(...tagsLines) - Math.min(...tagsLines) + 1 : 0;

    if (tagsLinesCount > maxLines) {
      errors.push({
        message: `Number of tags for "${keyword}" exceeds the maximum: ${tagsLinesCount}/${maxLines}`,
        rule: name,
        line: location.line,
        column: location.column,
      });
    }
  }

  const mergedConfig = _.merge({}, availableConfigs, config);

  let errors = [];

  function iterScenarioContainer(container, containerMaxLines) {
    if (containerMaxLines > -1) {
      checkTagsLines(container, containerMaxLines);
    }

    for (const {rule, scenario} of container.children) {
      if (scenario != null) {
        if (mergedConfig.scenario > -1) {
          checkTagsLines(scenario, mergedConfig.scenario);
        }

        if (mergedConfig.example > -1 && scenario.examples != null) {
          for (const example of scenario.examples) {
            checkTagsLines(example, mergedConfig.example);
          }
        }
      } else if (rule != null) {
        iterScenarioContainer(rule, mergedConfig.rule);
      }
    }
  }

  iterScenarioContainer(feature, mergedConfig.feature);

  return errors;
}

module.exports = {
  name,
  run,
  availableConfigs,
};
