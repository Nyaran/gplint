import * as glob from 'glob';
import * as path from 'path';
import * as _ from 'lodash';
import {register} from 'ts-node';

import {
  FileData,
  Rule,
  RuleConfigNumber,
  RuleError,
  RuleErrorLevel,
  Rules,
  RulesConfig,
  RuleSubConfig
} from './types';
import {Feature, Pickle} from '@cucumber/messages';

const LEVELS = [
  'off',
  'warn',
  'error',
];

export function getAllRules(additionalRulesDirs?: string[]): Rules {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (process[Symbol.for('ts-node.register.instance')] == null) { // Check if ts-node was registered previously
    register({
      compilerOptions: {
        allowJs: true
      }
    });
  }
  const rules = {} as Rules;

  const rulesDirs = [
    path.join(__dirname, 'rules')
  ].concat(additionalRulesDirs || []);

  rulesDirs.forEach(rulesDir => {
    rulesDir = path.resolve(rulesDir);
    const rulesWildcard = path.join(rulesDir, '*.[jt]s');
    glob.sync(rulesWildcard, {windowsPathsNoEscape: true, ignore: '**/*.d.ts'}).forEach(file => {
      const rule = require(file);
      rules[rule.name] = rule;
    });
  });
  return rules;
}

export function getRule(rule: string, additionalRulesDirs?: string[]): Rule {
  return getAllRules(additionalRulesDirs)[rule];
}

export function doesRuleExist(rule: string, additionalRulesDirs?: string[]): boolean {
  return getRule(rule, additionalRulesDirs) !== undefined;
}

export function getRuleLevel(ruleConfig: RuleConfigNumber, rule: string): number {
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

export function runAllEnabledRules(feature: Feature, pickles: Pickle[], file: FileData, configuration: RulesConfig, additionalRulesDirs?: string[]): RuleError[] {
  let errors = [] as RuleErrorLevel[];
  const rules = getAllRules(additionalRulesDirs);
  Object.keys(rules).forEach(ruleName => {
    const rule = rules[ruleName];
    const ruleLevel = getRuleLevel(configuration[rule.name], rule.name);

    if (ruleLevel > 0) {
      const ruleConfig = Array.isArray(configuration[rule.name]) ? (configuration[rule.name])[1] : {} as RuleSubConfig<unknown>;
      const error = rule.run({feature, pickles, file}, ruleConfig) as RuleErrorLevel[];

      if (error?.length > 0) {
        error.forEach(e => e.level = ruleLevel);
        errors = errors.concat(error);
      }
    }
  });
  return errors;
}
