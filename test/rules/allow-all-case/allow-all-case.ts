import * as ruleTestBase from '../rule-test-base';

import * as _commons from './_commons';
import {Rule} from '../../../src/types';

export const tests = ({
  rule,
  errorsFile,
  noErrorsFile,
  errorMessageTemplate
}: { rule: Rule, errorsFile: string, noErrorsFile: string, errorMessageTemplate: string }) => {
  const runTest = ruleTestBase.createRuleTest(rule, errorMessageTemplate);

  describe('global and default', () => {
    it('default config', () => {
      return runTest(errorsFile, {}, _commons.ALL_LEVEL_CAPS_FULL_ERRORS);
    });

    it('Global: true', () => {
      return runTest(errorsFile, {
        Global: true
      }, []);
    });

    it('Global: false', () => {
      return runTest(errorsFile, {
        Global: false
      }, _commons.ALL_LEVEL_CAPS_FULL_ERRORS);
    });

    it('Global: false - no errors', () => {
      return runTest(noErrorsFile, {
        Global: false
      }, []);
    });

    it('Global: false - no errors - empty texts', () => {
      return runTest('allow-all-case/no-text.feature', {
        Global: false
      }, []);
    });
  });

  describe('Nodes', () => {
    it('Description: true', () => {
      return runTest(errorsFile, {
        Global: true,
        Description: false,
      }, _commons.ERRORS.Description);
    });

    it('Feature: true', () => {
      return runTest(errorsFile, {
        Global: true,
        Feature: false,
      }, _commons.ERRORS.Feature);
    });

    it('Rule: true', () => {
      return runTest(errorsFile, {
        Global: true,
        Rule: false,
      }, _commons.ERRORS.Rule);
    });

    it('Background: true', () => {
      return runTest(errorsFile, {
        Global: true,
        Background: false,
      }, _commons.ERRORS.Background);
    });

    it('Scenario: true', () => {
      return runTest(errorsFile, {
        Global: true,
        Scenario: false,
      }, _commons.ERRORS.Scenario);
    });

    it('Step: true', () => {
      return runTest(errorsFile, {
        Global: true,
        Step: false,
      }, _commons.ERRORS.Step);
    });

    it('Example: true', () => {
      return runTest(errorsFile, {
        Global: true,
        Example: false,
      }, _commons.ERRORS.Example);
    });

    it('ExampleHeader: true', () => {
      return runTest(errorsFile, {
        Global: true,
        ExampleHeader: false,
      }, _commons.ERRORS.ExampleHeader);
    });

    it('Description: true', () => {
      return runTest(errorsFile, {
        Global: true,
        ExampleBody: false,
      }, _commons.ERRORS.ExampleBody);
    });
  });
};
