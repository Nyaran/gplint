import * as rules from './rules';
import {RuleConfig, RuleConfigArray, RulesConfig, RuleSubConfig} from './types';

export function verifyConfigurationFile(config: RulesConfig, additionalRulesDirs?: string[]): string[] {
  const errors = [];
  for (const rule in config) {
    if (!rules.doesRuleExist(rule, additionalRulesDirs)) {
      errors.push(`Rule "${rule}" does not exist`);
    } else {
      verifyRuleConfiguration(rule, config[rule], additionalRulesDirs, errors);
    }
  }
  return errors;
}

function verifyRuleConfiguration(rule: string, ruleConfig: RuleConfig, additionalRulesDirs: string[], errors: string[]): void {
  const enablingSettings = ['off', '0', 'warn', '1', 'error', 'on', '2'];
  const genericErrorMsg = `Invalid rule configuration for "${rule}" -`;

  if (Array.isArray(ruleConfig)) {
    if (!enablingSettings.includes((ruleConfig as RuleConfigArray)[0] as string)) {
      errors.push(`${genericErrorMsg} The first part of the config should be ${enablingSettings.join('/')}.`);
    }

    if (ruleConfig.length !== 2 ) {
      errors.push(`${genericErrorMsg} The config should only have 2 parts.`);
    }

    const ruleObj = rules.getRule(rule, additionalRulesDirs);
    let isValidSubConfig;

    if (typeof(ruleConfig[1]) === 'string') {
      isValidSubConfig = (availableConfigs: unknown, subConfig: string): boolean => (ruleObj.availableConfigs as string[]).includes(subConfig);
      testSubconfig(genericErrorMsg, rule, ruleConfig[1], isValidSubConfig, additionalRulesDirs, errors);
    } else {
      isValidSubConfig = (availableConfigs: unknown, subConfig: RuleSubConfig<unknown>): boolean => Object.prototype.hasOwnProperty.call(ruleObj.availableConfigs, subConfig);
      for (const subConfig in ruleConfig[1]) {
        testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, additionalRulesDirs, errors);
      }
    }
  } else {
    if (!enablingSettings.includes(ruleConfig.toString())) {
      errors.push(`${genericErrorMsg} The config should be ${enablingSettings.join('/')}.`);
    }
  }
}

function testSubconfig(genericErrorMsg: string, rule: string, subConfig: RuleSubConfig<unknown>, isValidSubConfig: (availableConfigs: unknown, subConfig: RuleSubConfig<unknown> | string) => boolean, additionalRulesDirs: string[], errors: string[]): void {
  const ruleObj = rules.getRule(rule, additionalRulesDirs);
  if (!isValidSubConfig(ruleObj.availableConfigs, subConfig)) {
    errors.push(`${genericErrorMsg} The rule does not have the specified configuration option "${subConfig}"`);
  }
}
