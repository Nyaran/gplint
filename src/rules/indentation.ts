import _ from 'lodash';
import * as gherkinUtils from './utils/gherkin';
import {GherkinData, RuleSubConfig, RuleError} from '../types';
import {Location, Step, Tag} from '@cucumber/messages';

export const name = 'indentation';
const defaultConfig = {
  'Feature': 0,
  'Background': 0,
  'Rule': 0,
  'Scenario': 0,
  'Step': 2,
  'Examples': 0,
  'example': 2,
  'given': 2,
  'when': 2,
  'then': 2,
  'and': 2,
  'but': 2
};

export const availableConfigs = _.merge({}, defaultConfig, {
  // The values here are unused by the config parsing logic.
  'feature tag': -1,
  'scenario tag': -1,
  'examples tag': -1
});

type Configuration = RuleSubConfig<typeof availableConfigs>;
type ConfigurationKey = keyof Configuration;

function mergeConfiguration(configuration: Configuration): Configuration {
  const mergedConfiguration = _.merge({}, defaultConfig, configuration);
  if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, 'feature tag')) {
    mergedConfiguration['feature tag'] = mergedConfiguration['Feature'];
  }
  if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, 'scenario tag')) {
    mergedConfiguration['scenario tag'] = mergedConfiguration['Scenario'];
  }
  if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, 'examples tag')) {
    mergedConfiguration['examples tag'] = mergedConfiguration['Examples'];
  }
  return mergedConfiguration;
}

export function run({feature}: GherkinData, configuration: Configuration): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];
  const mergedConfiguration = mergeConfiguration(configuration);

  function validate(parsedLocation: Location, type: ConfigurationKey) {
    // location.column is 1 index based so, when we compare with the expected
    // indentation we need to subtract 1
    if (parsedLocation.column - 1 !== mergedConfiguration[type]) {
      errors.push({
        message: 'Wrong indentation for "' + type +
                            '", expected indentation level of ' + mergedConfiguration[type] +
                            ', but got ' + (parsedLocation.column - 1),
        rule   : name,
        line   : parsedLocation.line,
        column : parsedLocation.column,
      });
    }
  }

  function validateStep(step: Step) {
    let stepType = gherkinUtils.getLanguageInsensitiveKeyword(step, feature.language);
    stepType = stepType in configuration ? stepType : 'Step';
    validate(step.location, stepType as ConfigurationKey);
  }

  function validateTags(tags: readonly Tag[], type: ConfigurationKey) {
    _(tags).groupBy('location.line').forEach(tagLocationGroup => {
      const firstTag = _(tagLocationGroup).sortBy('location.column').head();
      validate(firstTag.location, type);
    });
  }

  validate(feature.location, 'Feature');
  validateTags(feature.tags, 'feature tag');

  feature.children.forEach(child => {
    if (child.rule) {
      validate(child.rule.location, 'Rule');
    } else if (child.background) {
      validate(child.background.location, 'Background');
      child.background.steps.forEach(validateStep);
    } else {
      validate(child.scenario.location, 'Scenario');
      validateTags(child.scenario.tags, 'scenario tag');
      child.scenario.steps.forEach(validateStep);

      child.scenario.examples.forEach(example => {
        validate(example.location, 'Examples');
        validateTags(example.tags, 'examples tag');

        if (example.tableHeader) {
          validate(example.tableHeader.location, 'example');
          example.tableBody.forEach(row => {
            validate(row.location, 'example');
          });
        }
      });
    }
  });

  return errors;
}
