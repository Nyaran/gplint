import glob from 'glob';
import path from 'path';

export function getAllRules(additionalRulesDirs) {
  let rules = {};

  const rulesDirs = [
    path.join(__dirname, 'rules')
  ].concat(additionalRulesDirs || []);

  rulesDirs.forEach(rulesDir => {
    rulesDir = path.resolve(rulesDir);
    glob.sync(`${rulesDir}/*.js`).forEach(file => {
      const rule = require(file);
      rules[rule.name] = rule;
    });
  });
  return rules;
}

export function getRule(rule, additionalRulesDirs) {
  return getAllRules(additionalRulesDirs)[rule];
}

export function doesRuleExist(rule, additionalRulesDirs) {
  return getRule(rule, additionalRulesDirs) !== undefined;
}

export function isRuleEnabled(ruleConfig) {
  if (Array.isArray(ruleConfig)) {
    return ruleConfig[0] === 'on';
  }
  return ruleConfig === 'on';
}

export function runAllEnabledRules(feature, pickles, file, configuration, additionalRulesDirs) {
  let errors = [];
  const rules = getAllRules(additionalRulesDirs);
  Object.keys(rules).forEach(ruleName => {
    let rule = rules[ruleName];
    if (isRuleEnabled(configuration[rule.name])) {
      const ruleConfig = Array.isArray(configuration[rule.name]) ? configuration[rule.name][1] : {};
      const error = rule.run({feature, pickles, file}, ruleConfig);
      if (error != null && error.length > 0) {
        errors = errors.concat(error);
      }
    }
  });
  return errors;
}
