import * as rules from './rules';

export function verifyConfigurationFile(config, additionalRulesDirs) {
  let errors = [];
  for (let rule in config) {
    if (!rules.doesRuleExist(rule, additionalRulesDirs)) {
      errors.push(`Rule "${rule}" does not exist`);
    } else {
      verifyRuleConfiguration(rule, config[rule], additionalRulesDirs, errors);
    }
  }
  return errors;
}

function verifyRuleConfiguration(rule, ruleConfig, additionalRulesDirs, errors) {
  const enablingSettings = ['off', '0', 'warn', '1', 'error', 'on', '2'];
  const genericErrorMsg = `Invalid rule configuration for "${rule}" -`;

  if (Array.isArray(ruleConfig)) {
    if (!enablingSettings.includes(ruleConfig[0])) {
      errors.push(`${genericErrorMsg} The first part of the config should be ${enablingSettings.join('/')}.`);
    }

    if (ruleConfig.length !== 2 ) {
      errors.push(`${genericErrorMsg} The config should only have 2 parts.`);
    }

    const ruleObj = rules.getRule(rule, additionalRulesDirs);
    let isValidSubConfig;

    if (typeof(ruleConfig[1]) === 'string') {
      isValidSubConfig = (availableConfigs, subConfig) => ruleObj.availableConfigs.includes(subConfig);
      testSubconfig(genericErrorMsg, rule, ruleConfig[1], isValidSubConfig, additionalRulesDirs, errors);
    } else {
      isValidSubConfig = (availableConfigs, subConfig) => Object.prototype.hasOwnProperty.call(ruleObj.availableConfigs, subConfig);
      for (let subConfig in ruleConfig[1]) {
        testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, additionalRulesDirs, errors);
      }
    }
  } else {
    if (!enablingSettings.includes(ruleConfig.toString())) {
      errors.push(`${genericErrorMsg} The config should be ${enablingSettings.join('/')}.`);
    }
  }
}

function testSubconfig(genericErrorMsg, rule, subConfig, isValidSubConfig, additionalRulesDirs, errors) {
  const ruleObj = rules.getRule(rule, additionalRulesDirs);
  if (!isValidSubConfig(ruleObj.availableConfigs, subConfig)) {
    errors.push(`${genericErrorMsg} The rule does not have the specified configuration option "${subConfig}"`);
  }
}
