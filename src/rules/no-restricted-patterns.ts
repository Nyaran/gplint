import * as gherkinUtils from './utils/gherkin';
import { GherkinData, RuleSubConfig, RuleError, GherkinNode } from '../types';
import { Background, Scenario, Step } from '@cucumber/messages';

type IConfiguration<T> = {
  Global: T[]
  Scenario: T[]
  ScenarioOutline: T[]
  Background: T[]
  Feature: T[]
  Given: T[]
  When: T[]
  Then: T[]
};

const Keywords = ['Given', 'When', 'Then'];
let previosKeyword: string;
type Configuration = RuleSubConfig<IConfiguration<string>>;
type ConfigurationPatterns = RuleSubConfig<IConfiguration<RegExp>>;

export const name = 'no-restricted-patterns';
export const availableConfigs = {
  'Global': [] as string[],
  'Scenario': [] as string[],
  'ScenarioOutline': [] as string[],
  'Background': [] as string[],
  'Feature': [] as string[],
  'Given': [] as string[],
  'When': [] as string[],
  'Then': [] as string[]
} as Configuration;

export function run({ feature }: GherkinData, configuration: Configuration): RuleError[] {
  previousKeyword = '';
  if (!feature) {
    return [];
  }
  const errors = [] as RuleError[];
  const restrictedPatterns = getRestrictedPatterns(configuration);
  const language = feature.language;
  // Check the feature itself
  checkNameAndDescription(feature, restrictedPatterns, language, errors);

  // Check the feature children
  feature.children.forEach(child => {
    const node = child.background || child.scenario;
    checkNameAndDescription(node, restrictedPatterns, language, errors);

    // And all the steps of each child
    node.steps.forEach((step, index) => {
      checkStepNode(step, node.steps[index], restrictedPatterns, language, errors);
      checkStepNode(step, node, restrictedPatterns, language, errors);

    });
  });
  const filterErrors = errors.filter((obj, index, self) =>
    index === self.findIndex((el) => el.message === obj.message)
  );
  return filterErrors;
}

function getRestrictedPatterns(configuration: Configuration): ConfigurationPatterns {
  // Patterns applied to everything; feature, scenarios, etc.
  const globalPatterns = (configuration.Global || []).map(pattern => new RegExp(pattern, 'i'));

  const restrictedPatterns = {} as ConfigurationPatterns;
  Object.keys(availableConfigs).forEach((key: keyof Configuration) => {
    const resolvedKey = key.toLowerCase().replace(/ /g, '') as keyof Configuration;
    const resolvedConfig = (configuration[key] || []);

    restrictedPatterns[resolvedKey] = resolvedConfig.map(pattern => new RegExp(pattern, 'i'));
    restrictedPatterns[resolvedKey] = restrictedPatterns[resolvedKey].concat(globalPatterns);

  });
  return restrictedPatterns;
}

function getRestrictedPatternsForNode(node: GherkinNode, restrictedPatterns: ConfigurationPatterns, language: string): RegExp[] {
  const key = gherkinUtils.getLanguageInsensitiveKeyword(node, language).toLowerCase() as keyof ConfigurationPatterns;
  if (Keywords.map(item => item.toLowerCase()).includes(key.toLowerCase())) {
    previosKeyword = key;
  }
  if (key.toLowerCase() === 'and' && Keywords.map(item => item.toLowerCase()).includes(previosKeyword.toLowerCase())) {
    return restrictedPatterns[previosKeyword as keyof ConfigurationPatterns];
  }
  return restrictedPatterns[key];
}

function checkNameAndDescription(node: GherkinNode, restrictedPatterns: ConfigurationPatterns, language: string, errors: RuleError[]) {
  getRestrictedPatternsForNode(node, restrictedPatterns, language)
    .forEach(pattern => {
      check(node, 'name', pattern, language, errors);
      check(node, 'description', pattern, language, errors);
    });
}

function checkStepNode(node: Step, parentNode: Background | Scenario | Step, restrictedPatterns: ConfigurationPatterns, language: string, errors: RuleError[]) {
  // Use the node keyword of the parent to determine which rule configuration to use
  getRestrictedPatternsForNode(parentNode, restrictedPatterns, language)
    .forEach(pattern => {
      check(node, 'text', pattern, language, errors);
    });
}

function check(node: GherkinNode, property: string, pattern: RegExp, language: string, errors: RuleError[]) {
  if (!node[property]) {
    return;
  }

  let strings = [node[property as keyof GherkinData]];
  const type = gherkinUtils.getNodeType(node, language);

  if (property === 'description') {
    // Descriptions can be multiline, in which case the description will contain escaped
    // newline characters "\n". If a multiline description matches one of the restricted patterns
    // when the error message gets printed in the console, it will break the message into multiple lines.
    // So let's split the description on newline chars and test each line separately.

    // To make sure we don't accidentally pick up a doubly escaped new line "\\n" which would appear
    // if a user wrote the string "\n" in a description, let's replace all escaped new lines
    // with a sentinel, split lines and then restore the doubly escaped new line
    const escapedNewLineSentinel = '<!gplint new line sentinel!>';
    const escapedNewLine = '\\n';
    strings = node[property]
      .replace(escapedNewLine, escapedNewLineSentinel)
      .split('\n')
      .map((str: string) => str.replace(escapedNewLineSentinel, escapedNewLine));
  }
  for (const element of strings) {
    // We use trim() on the examined string because names and descriptions can contain
    // white space before and after, unlike steps
    if (element.trim().match(pattern)) {
      errors.push({
        message: `${type} ${property}: "${element.trim()}" matches restricted pattern "${pattern}"`,
        rule: name,
        line: node.location.line,
        column: node.location.column,
      });
    }
  }
}