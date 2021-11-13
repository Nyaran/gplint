import * as gherkinUtils from './utils/gherkin';

export const name = 'use-and';

export function run({feature}) {
  if (!feature) {
    return [];
  }

  let errors = [];

  feature.children.forEach(child => {
    const node = child.rule || child.background || child.scenario;
    let previousKeyword = undefined;
    if (node.steps) {
      node.steps.forEach(step => {
        const keyword = gherkinUtils.getLanguageInsensitiveKeyword(step, feature.language);

        if (keyword === 'and') {
          return;
        }
        if (keyword === previousKeyword) {
          errors.push(createError(step));
        }

        previousKeyword = keyword;
      });
    }
  });
  return errors;
}

function createError(step) {
  return {
    message: 'Step "' + step.keyword + step.text + '" should use And instead of ' + step.keyword,
    rule   : name,
    line   : step.location.line,
    column : step.location.column,
  };
}
