import * as ruleTestBase from '../rule-test-base';
import * as rule from '../../../src/rules/table-align';
const runTest = ruleTestBase.createRuleTest(rule,
  'Cell with value "<%= cellValue %>" is not aligned');

describe('Table Align Rule', function () {
  it('doesn\'t raise errors when there are no violations', function () {
    return runTest('table-align/aligned.feature', {}, []);
  });

  it('tables without spaces', function () {
    return runTest('table-align/no-spaces.feature', {}, [
      // Background - First row
      {
        messageElements: {cellValue: 'gplint'},
        line: 5,
        column: 6,
      },
      // Background - Second row
      {
        messageElements: {cellValue: 'do magic'},
        line: 6,
        column: 6,
      },
      // Step - First row
      {
        messageElements: {cellValue: 'lorem'},
        line: 10,
        column: 6,
      },
      {
        messageElements: {cellValue: 'ipsum'},
        line: 10,
        column: 12,
      },
      {
        messageElements: {cellValue: 'dolor'},
        line: 10,
        column: 18,
      },
      // Step - Second row
      {
        messageElements: {cellValue: 'foo'},
        line: 11,
        column: 6,
      },
      {
        messageElements: {cellValue: 'bar'},
        line: 11,
        column: 10,
      },
      {
        messageElements: {cellValue: 'foo bar'},
        line: 11,
        column: 14,
      },

      // Example - First row
      {
        messageElements: {cellValue: 'foo'},
        line: 17,
        column: 4,
      },
      {
        messageElements: {cellValue: 'lorem'},
        line: 17,
        column: 8,
      },
      // Example - Second row
      {
        messageElements: {cellValue: 'bar'},
        line: 18,
        column: 4,
      },
      {
        messageElements: {cellValue: ''},
        line: 18,
        column: 8,
      }
    ]);
  });

  it('tables with crazy spacing', function () {
    return runTest('table-align/crazy-spaces.feature', {}, [
      // Background - First row
      {
        messageElements: {cellValue: 'gplint'},
        line: 5,
        column: 7,
      },
      // Background - Second row
      {
        messageElements: {cellValue: 'do magic'},
        line: 6,
        column: 6,
      },
      // Step - First row
      {
        messageElements: {cellValue: 'lorem'},
        line: 10,
        column: 13,
      },
      {
        messageElements: {cellValue: 'ipsum'},
        line: 10,
        column: 26,
      },
      {
        messageElements: {cellValue: 'dolor'},
        line: 10,
        column: 52,
      },
      // Step - Second row
      {
        messageElements: {cellValue: 'foo'},
        line: 11,
        column: 7,
      },
      {
        messageElements: {cellValue: 'bar'},
        line: 11,
        column: 14,
      },
      {
        messageElements: {cellValue: 'foo bar'},
        line: 11,
        column: 24,
      },

      // Example - First row
      {
        messageElements: {cellValue: 'foo'},
        line: 17,
        column: 5,
      },
      {
        messageElements: {cellValue: 'lorem'},
        line: 17,
        column: 13,
      },
      // Example - Second row
      {
        messageElements: {cellValue: 'bar'},
        line: 18,
        column: 8,
      },
      {
        messageElements: {cellValue: ''},
        line: 18,
        column: 87,
      }
    ]);
  });

  it('tables with pipe symbols', function () {
    return runTest('table-align/escape.feature', {}, [
      // 1st cell
      {
        messageElements: {cellValue: '\\|this'},
        line: 6,
        column: 9,
      },
      // 2nd cell
      {
        messageElements: {cellValue: '\\| isn\'t \\|'},
        line: 6,
        column: 18,
      },
      // 3rd cell
      {
        messageElements: {cellValue: 'aligned\\|'},
        line: 6,
        column: 32,
      },
    ]);
  });

  describe('tables without spaces - config', function () {
    it('only steps', function () {
      return runTest('table-align/simple-config.feature', {examples: false}, [
        // Step - First row
        {
          messageElements: {cellValue: 'lorem'},
          line: 5,
          column: 6,
        },
        // Step - Second row
        {
          messageElements: {cellValue: '<loremipsum>'},
          line: 6,
          column: 6,
        },
      ]);
    });
    it('only examples', function () {
      return runTest('table-align/simple-config.feature', {steps: false}, [
        // Example - First row
        {
          messageElements: {cellValue: 'loremipsum'},
          line: 8,
          column: 4,
        },
        // Example - Second row
        {
          messageElements: {cellValue: ''},
          line: 9,
          column: 4,
        },
      ]);
    });
  });
});
