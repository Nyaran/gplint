import {expect} from 'chai';
import * as sinon from 'sinon';

import * as ruleTestBase from '../rule-test-base';
import * as rule from '../../../src/rules/new-line-at-eof';

const runTestRequireNewLine = ruleTestBase.createRuleTest(rule, 'New line at EOF(end of file) is required');
const runTestDisallowNewLine = ruleTestBase.createRuleTest(rule, 'New line at EOF(end of file) is not allowed');

describe('New Line at EOF Rule', function() {
  beforeEach(function() {
    if (this.sinon == null) {
      this.sinon = sinon.createSandbox();
    } else {
      this.sinon.restore();
    }
  });

  describe('configuration', function() {
    beforeEach(function() {
      this.sinon.stub(console, 'error');
      this.sinon.stub(process, 'exit');
    });

    afterEach(function() {
      console.error.restore(); // eslint-disable-line no-console
      process.exit.restore();
    });

    it('raises an error if invalid configuration is used', function() {
      const featureStub = undefined; // not used by the rule
      const fileStub = {name: 'foo.feature', lines: []};
      const invalidConfiguration = ['error', 'k'];

      rule.run({feature: featureStub, file: fileStub}, invalidConfiguration);
      const consoleErrorArgs = console.error.args.map(function (args) { // eslint-disable-line no-console
        return args[0];
      });

      const errorMsg = 'new-line-at-eof requires an extra configuration value.\nAvailable configurations: yes, no\nFor syntax please look at the documentation.';
      expect(consoleErrorArgs[0]).to.include(errorMsg);
      expect(process.exit.args[0][0]).to.equal(1);
    });
  });

  it('doesn\'t raise errors when the rule is configured to "yes" and there is a new line at EOF', function() {
    return runTestRequireNewLine('new-line-at-eof/NewLineAtEOF.feature', 'yes', []);
  });

  it('doesn\'t raise errors when the rule is configured to "no" and there is no new line at EOF', function() {
    return runTestDisallowNewLine('new-line-at-eof/NoNewLineAtEOF.feature', 'no', []);
  });

  it('raises an error when the rule is configured to "yes" and there is no new line at EOF', function() {
    return runTestRequireNewLine('new-line-at-eof/NoNewLineAtEOF.feature', 'yes', [{
      messageElements: {},
      line: 5,
      column: 0
    }]);
  });

  it('doesn\'t raise errors when the rule is configured to "no" and there is a new line at EOF', function() {
    return runTestDisallowNewLine('new-line-at-eof/NewLineAtEOF.feature', 'no', [{
      messageElements: {},
      line: 6,
      column: 0
    }]);
  });
});
