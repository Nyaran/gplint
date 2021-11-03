const _ = require('lodash');
const Gherkin = require('@cucumber/gherkin');

// We use the node's keyword to determine the node's type
// because it's the only way to distinguish a scenario with a scenario outline
function getNodeType(node, language) {
  const key = getLanguageInsitiveKeyword(node, language).toLowerCase();
  const stepKeys = [
    'given',
    'when',
    'then',
    'and',
    'but',
  ];

  if (key === 'feature') {
    return 'Feature';
  } else if (key === 'rule') {
    return 'Rule';
  } else if (key === 'background') {
    return 'Background';
  } else if (key === 'scenario') {
    return 'Scenario';
  } else if (key === 'scenariooutline') {
    return 'Scenario Outline';
  } else if (key === 'examples') {
    return 'Examples';
  } else if (stepKeys.includes(key)) {
    return 'Step';
  }
  return '';
}

function getLanguageInsitiveKeyword(node, language) {
  const languageMapping = Gherkin.dialects[language];

  return _.findKey(languageMapping, values => values instanceof Array && values.includes(node.keyword));
}

function getNodeForPickle(feature, pickle, forceExamplesLevel = false) {
  let node = feature;

  for (const astNodeId of pickle.astNodeIds) {
    if (Object.prototype.hasOwnProperty.call(node, 'children')) {
      const scenarios = feature.children
        .filter(child => child.rule)
        .flatMap(child => child.rule.children)
        .filter(child => child.scenario)
        .concat(feature.children
          .filter(child => child.scenario))
        .map(child => child.scenario);
      node = scenarios.find(t => t.id === astNodeId);
    } else if (Object.prototype.hasOwnProperty.call(node, 'examples')) {
      node = forceExamplesLevel
        ? node.examples.find(e => e.tableBody.find(t => t.id === astNodeId))
        : node.examples.flatMap(e => e.tableBody).find(t => t.id === astNodeId);
    }
  }

  return node;
}

module.exports = {
  getNodeForPickleScenario: getNodeForPickle,
  getNodeType,
  getLanguageInsitiveKeyword,
};
