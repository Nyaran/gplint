import _ from 'lodash';
import {GherkinData,  RuleError} from '../types';
import {Examples, Feature, Scenario} from '@cucumber/messages';

export const name = 'no-homogenous-tags';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }
  const errors = [] as RuleError[];

  // Tags that exist in every scenario and scenario outline
  // should be applied on a feature level
  const childrenTags = [] as string[][];

  feature.children.forEach(child => {
    if (child.scenario) {
      const scenario = child.scenario;

      childrenTags.push(getTagNames(scenario));

      const exampleTags = [] as string[][];
      scenario.examples.forEach(example => {
        exampleTags.push(getTagNames(example));
      });

      const homogenousExampleTags = _.intersection(...exampleTags);
      if (homogenousExampleTags.length) {
        errors.push({
          message: 'All Examples of a Scenario Outline have the same tag(s), ' +
            'they should be defined on the Scenario Outline instead: ' +
            homogenousExampleTags.join(', '),
          rule: name,
          line: scenario.location.line,
          column: scenario.location.column,
        });
      }
    }
  });

  const homogenousTags = _.intersection(...childrenTags);
  if (homogenousTags.length) {
    errors.push({
      message: 'All Scenarios on this Feature have the same tag(s), ' +
        'they should be defined on the Feature instead: ' +
        homogenousTags.join(', '),
      rule   : name,
      line   : feature.location.line,
      column : feature.location.column,
    });
  }

  return errors;
}

function getTagNames(node: Feature | Scenario | Examples): string[] {
  return _.map(node.tags, tag => tag.name);
}
