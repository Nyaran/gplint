import {assert} from 'chai';
import * as _ from 'lodash';
import * as linter from '../../src/linter';

export function createRuleTest(rule, messageTemplate) {
  return function runTest(featureFile, configuration, expected) {
    const expectedErrors = _.map(expected, function(error) {
      return {
        rule: rule.name,
        message: _.template(messageTemplate)(error.messageElements),
        line: error.line,
        column: error.column,
      };
    });
    return linter.readAndParseFile('test/rules/' + featureFile, 'utf8')
      .then(({feature, pickles, file}) => {
        assert.sameDeepMembers(rule.run({feature, pickles, file}, configuration), expectedErrors);
      });
  };
}
