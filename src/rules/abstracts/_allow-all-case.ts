import _ from 'lodash';
import {GherkinData, RuleSubConfig, RuleError} from '../../types.js';
import {
  Background,
  Examples,
  Feature,
  FeatureChild,
  Location,
  Rule as CucumberRule,
  Scenario
} from '@cucumber/messages';

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
  [Levels.Global]: false as boolean,
  [Levels.Description]: undefined as boolean | undefined,
  [Levels.Feature]: undefined as boolean | undefined,
  [Levels.Rule]: undefined as boolean | undefined,
  [Levels.Background]: undefined as boolean | undefined,
  [Levels.Scenario]: undefined as boolean | undefined,
  [Levels.Step]: undefined as boolean | undefined,
  [Levels.Example]: undefined as boolean | undefined,
  [Levels.ExampleHeader]: undefined as boolean | undefined,
  [Levels.ExampleBody]: undefined as boolean | undefined,
};

export function run({feature}: GherkinData, configuration: RuleSubConfig<typeof availableConfigs>, {rule, caseMethod, errorMsg}: {rule: string, caseMethod: () => string, errorMsg: string}): RuleError[] {
  if (!feature) {
    return [];
  }

  const mergedConfig = _.merge({}, availableConfigs, configuration);

  const errors = [] as RuleError[];

  function check(levelName: string, text: string, location: Location) {
    const config = configOrGlobal(mergedConfig[levelName], mergedConfig[Levels.Global]);

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

  function scenarioContainerIter(levelName: string, container: Feature | CucumberRule) {
    check(levelName, container.name, container.location);
    check(Levels.Description, container.description, container.location);

    for (const child of container.children) {
      /* istanbul ignore else */
      if (Object.hasOwn(child, 'rule')) {
        scenarioContainerIter(Levels.Rule, (child as FeatureChild).rule);
      } else if (child.background != null) {
        stepsContainerIter(Levels.Background, child.background);
      } else if (child.scenario != null) {
        stepsContainerIter(Levels.Scenario, child.scenario);

        examplesIter(child.scenario.examples);
      }
    }
  }

  function stepsContainerIter(levelName: string, container: Background | Scenario) {
    check(levelName, container.name, container.location);
    check(Levels.Description, container.description, container.location);

    for (const step of container.steps) {
      check(Levels.Step, step.text, step.location);
    }
  }

  function examplesIter(examples: readonly Examples[]) {
    for (const example of examples) {
      check(Levels.Example, example.name, example.location);
      check(Levels.Description, example.description, example.location);

      example.tableHeader?.cells.forEach(c => {
        check(Levels.ExampleHeader, c.value, c.location);
      });
      example.tableBody.forEach(row => {
        row.cells.forEach(c => {
          check(Levels.ExampleBody, c.value, c.location);
        });
      });
    }
  }

  scenarioContainerIter(Levels.Feature, feature);

  return errors;
}

function configOrGlobal(config: undefined | boolean, globalCfg: boolean) {
  return config == null ? globalCfg : config;
}
