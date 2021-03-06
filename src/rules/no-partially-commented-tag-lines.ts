import {GherkinData, GherkinTaggable, RuleError} from '../types';

export const name = 'no-partially-commented-tag-lines';

export function run({feature}: GherkinData): RuleError[] {
  if (!feature) {
    return [];
  }

  const errors = [] as RuleError[];

  checkTags(feature, errors);
  feature.children.forEach(child => {
    if (child.scenario) {
      checkTags(child.scenario, errors);

      child.scenario.examples.forEach(example => {
        checkTags(example, errors);
      });
    }
  });

  return errors;
}

function checkTags(node: GherkinTaggable, errors: RuleError[]) {
  node.tags.forEach(tag => {
    if (tag.name.indexOf('#') > 0) {
      errors.push({
        message: 'Partially commented tag lines not allowed',
        rule   : name,
        line   : tag.location.line,
        column : tag.location.column,
      });
    }
  });
}
