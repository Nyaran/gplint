import _ from 'lodash';
import * as Gherkin from '@cucumber/gherkin';
import {Feature, Pickle, Scenario} from '@cucumber/messages';
import {GherkinKeyworded, GherkinNode, GherkinTaggable} from '../../types.js';

// We use the node's keyword to determine the node's type
// because it's the only way to distinguish a scenario with a scenario outline
export function getNodeType(node: GherkinNode, language: string): string {
  const key = getLanguageInsensitiveKeyword(node as GherkinTaggable, language).toLowerCase();
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

export function getLanguageInsensitiveKeyword(node: GherkinKeyworded, language: string): string {
  const languageMapping = Gherkin.dialects[language];

  return _.findKey(languageMapping, values => values instanceof Array && values.includes(node.keyword));
}

export function getNodeForPickle(feature: Feature, pickle: Pickle, forceExamplesLevel = false): GherkinNode {
  let node: GherkinNode = feature;

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
        ? (node as unknown as Scenario).examples.find(e => e.tableBody.find(t => t.id === astNodeId))
        : (node as unknown as Scenario).examples.flatMap(e => e.tableBody).find(t => t.id === astNodeId);
    }
  }

  return node;
}
