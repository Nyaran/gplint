import _ from 'lodash';
import {Scenario} from '@cucumber/messages';
import * as gherkinUtils from './utils/gherkin';
import {GherkinData, GherkinNode, GherkinTaggable, RuleError} from '../types';

export const name = 'no-superfluous-tags';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];

  feature.children.forEach(child => {
    const node = child.rule || child.background || child.scenario;
    if (child.background == null) {
      checkTags(node as GherkinTaggable, feature, feature.language, errors);
    }

    if ((node as Scenario).examples) {
      (node as Scenario).examples.forEach(example => {
        checkTags(example, feature, feature.language, errors);
        checkTags(example, node, feature.language, errors);
      });
    }
  });
  return errors;
}

function checkTags(child: GherkinTaggable, parent: GherkinNode, language: string, errors: RuleError[]) {
  const superfluousTags = _.intersectionBy(child.tags, parent.tags, 'name');
  const childType = gherkinUtils.getNodeType(child, language);
  const parentType = gherkinUtils.getNodeType(parent, language);

  superfluousTags.forEach(tag => {
    errors.push({
      message: `Tag duplication between ${childType} and its corresponding ${parentType}: ${tag.name}`,
      rule: name,
      line: tag.location.line,
      column: tag.location.column,
    });
  });
}
