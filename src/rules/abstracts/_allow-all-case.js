import _ from 'lodash';

const Levels = {
  Global: 'Global',
  Description: 'Description',
  Feature: 'Feature',
  Rule: 'Rule',
  Background: 'Background',
  Scenario: 'Scenario',
  Step: 'Step',
  Example: 'Example',
  ExampleHeader: 'ExampleHeader',
  ExampleBody: 'ExampleBody',
};

export const availableConfigs = {
  [Levels.Global]: false,
  [Levels.Description]: undefined,
  [Levels.Feature]: undefined,
  [Levels.Rule]: undefined,
  [Levels.Background]: undefined,
  [Levels.Scenario]: undefined,
  [Levels.Step]: undefined,
  [Levels.Example]: undefined,
  [Levels.ExampleHeader]: undefined,
  [Levels.ExampleBody]: undefined,
};

export function run({feature}, configuration, {rule, caseMethod, errorMsg}) {
  if (!feature) {
    return [];
  }

  const mergedConfig = _.merge({}, availableConfigs, configuration);

  let errors = [];

  function check(levelName, text, location) {
    const config = configOrGlobal(mergedConfig[levelName], mergedConfig.Global);

    const isValid = config || text === '' || caseMethod.call(text) !== text;

    if (!isValid) {
      errors.push({
        message: `${levelName} ${errorMsg}.`,
        rule,
        line: location.line,
        column: location.column
      });
    }
  }

  function scenarioContainerIter(levelName, container) {
    check(levelName, container.name, container.location);
    check(Levels.Description, container.description, container.location);

    for (const child of container.children) {
      /* istanbul ignore else */
      if (child.rule != null) {
        scenarioContainerIter(Levels.Rule, child.rule);
      } else if (child.background != null) {
        stepsContainerIter(Levels.Background, child.background);
      } else if (child.scenario != null) {
        stepsContainerIter(Levels.Scenario, child.scenario);

        examplesIter(child.scenario.examples);
      }
    }
  }

  function stepsContainerIter(levelName, container) {
    check(levelName, container.name, container.location);
    check(Levels.Description, container.description, container.location);

    for (const step of container.steps) {
      check(Levels.Step, step.text, step.location);
    }
  }

  function examplesIter(examples) {
    for (const example of examples) {
      check(Levels.Example, example.name, example.location);
      check(Levels.Description, example.description, example.location);

      example.tableHeader?.cells.forEach(c => check(Levels.ExampleHeader, c.value, c.location));
      example.tableBody.forEach(row => row.cells.forEach(c => check(Levels.ExampleBody, c.value, c.location)));
    }
  }

  scenarioContainerIter(Levels.Feature, feature);

  return errors;
}

function configOrGlobal(config, globalCfg) {
  return config == null ? globalCfg : config;
}
