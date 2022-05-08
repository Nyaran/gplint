import * as _ from 'lodash';
import * as gherkinUtils from './utils/gherkin';

export const name = 'no-restricted-tags';
export const availableConfigs = {
  'tags': [],
  'patterns': []
};


export function run({feature}, configuration) {
  if (!feature) {
    return [];
  }

  const forbiddenTags = configuration.tags;
  const forbiddenPatterns = getForbiddenPatterns(configuration);
  const language = feature.language;
  let errors = [];

  checkTags(feature, language, forbiddenTags, forbiddenPatterns, errors);

  feature.children.forEach(child => {
    // backgrounds don't have tags
    if (child.scenario) {
      checkTags(child.scenario, language, forbiddenTags, forbiddenPatterns, errors);

      child.scenario.examples.forEach(example => {
        checkTags(example, language, forbiddenTags, forbiddenPatterns, errors);
      });
    }
  });

  return errors;
}


function getForbiddenPatterns(configuration) {
  return (configuration.patterns || []).map((pattern) => new RegExp(pattern));
}


function checkTags(node, language, forbiddenTags, forbiddenPatterns, errors) {
  const nodeType = gherkinUtils.getNodeType(node, language);
  node.tags.forEach(tag => {
    if (isForbidden(tag, forbiddenTags, forbiddenPatterns)) {
      errors.push({
        message: `Forbidden tag ${tag.name} on ${nodeType}`,
        rule   : name,
        line   : tag.location.line,
        column : tag.location.column,
      });
    }
  });
}


function isForbidden(tag, forbiddenTags, forbiddenPatterns) {
  return _.includes(forbiddenTags, tag.name)
    || forbiddenPatterns.some((pattern) => pattern.test(tag.name));
}

