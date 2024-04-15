import path from 'path';
import { pathToFileURL, fileURLToPath } from 'node:url';

import {Feature, Pickle} from '@cucumber/messages';
import * as glob from 'glob';
import _ from 'lodash';

import {
  FileData,
  Rule,
  RuleConfig,
  RuleConfigArray,
  RuleError,
  RuleErrorLevel,
  Rules,
  RulesConfig,
  RuleSubConfig,
} from './types.js';

const LEVELS = [
  'off',
  'warn',
  'error',
];

export async function getAllRules(additionalRulesDirs?: string[]): Promise<Rules> {
  if (additionalRulesDirs?.length > 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (process[Symbol.for('ts-node.register.instance')] == null) { // Check if ts-node was registered previously
      await loadRegister();
    }
  }

  const rules = {} as Rules;
  const cwd = path.dirname(fileURLToPath(import.meta.url));
  const rulesDirs = [
    path.join(cwd, 'rules')
  ].concat(additionalRulesDirs || []);

  for (let rulesDir of rulesDirs) {
    rulesDir = path.resolve(rulesDir);
    const rulesWildcard = path.join(rulesDir, '*.?(c|m)@(j|t)s'); // .js, .cjs, .mjs (and TS equivalents)
    for (const file of glob.sync(rulesWildcard, {
      windowsPathsNoEscape: true,
      ignore: '**/*.d.?(c|m)ts'
    })) {
      const rule = await import(pathToFileURL(file).toString());
      rules[rule.name] = rule;
    }
  }
  return rules;
}

export async function getRule(rule: string, additionalRulesDirs?: string[]): Promise<Rule> {
  return (await getAllRules(additionalRulesDirs))[rule];
}

export async function doesRuleExist(rule: string, additionalRulesDirs?: string[]): Promise<boolean> {
  return (await getRule(rule, additionalRulesDirs)) !== undefined;
}

export function getRuleLevel(ruleConfig: RuleConfig, rule: string): number {
  const level = Array.isArray(ruleConfig) ? ruleConfig[0] : ruleConfig;

  if (level === 'on') { // 'on' is deprecated, but still supported for backward compatibility, means error level.
    console.warn('Level "on" is deprecated, please replace it with "error" or "warn" on your .gplintrc file.');
    return 2;
  }

  if (level == null) {
    return 0;
  }

  let levelNum = _.isNumber(level) ? level : _.toNumber(level);

  if (isNaN(levelNum)) {
    levelNum = LEVELS.indexOf(level as string);
  }

  if (levelNum < 0 || levelNum > 2) {
    throw new Error(`Unknown level ${level} for ${rule}.`);
  }

  return levelNum;
}

export async function runAllEnabledRules(feature: Feature, pickles: Pickle[], file: FileData, configuration: RulesConfig, additionalRulesDirs?: string[]): Promise<RuleError[]> {
  let errors = [] as RuleErrorLevel[];
  const rules = await getAllRules(additionalRulesDirs);
  Object.keys(rules).forEach(ruleName => {
    const rule = rules[ruleName];
    const ruleLevel = getRuleLevel(configuration[rule.name], rule.name);

    if (ruleLevel > 0) {
      const ruleConfig = Array.isArray(configuration[rule.name]) ? (configuration[rule.name] as RuleConfigArray)[1] : {} as RuleSubConfig<unknown>;
      const error = rule.run({feature, pickles, file}, ruleConfig) as RuleErrorLevel[];

      if (error?.length > 0) {
        error.forEach(e => (e.level = ruleLevel));
        errors = errors.concat(error);
      }
    }
  });
  return errors;
}

async function loadRegister(): Promise<void> {
  try {
    const {register} = await import('ts-node');
    register({
      compilerOptions: {
        allowJs: true
      }
    });
  } catch (err) { /* empty */ }
}
