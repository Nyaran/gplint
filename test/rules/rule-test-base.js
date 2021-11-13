import {assert} from 'chai';
import _ from 'lodash';
import * as linter from '../../src/linter';
import 'mocha-sinon';

function createRuleTest(rule, messageTemplate) {
  return function runTest(featureFile, configuration, expected) {
    var expectedErrors = _.map(expected, function(error) {
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

module.exports = {
  createRuleTest: createRuleTest
};
