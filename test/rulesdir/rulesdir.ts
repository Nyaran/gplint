import * as path from 'path';
import {expect} from 'chai';
import * as linter from '../../src/linter';
import * as configParser from '../../src/config-parser';

describe('rulesdir CLI option', function() {
  it('loads additional rules from specified directories', function() {
    const additionalRulesDirs = [
      path.join(__dirname, 'rules'), // absolute path
      path.join('test', 'rulesdir', 'other_rules') // relative path from root
    ];
    const config = configParser.getConfiguration(path.join(__dirname, '.gplintrc'), additionalRulesDirs);
    const featureFile = path.join(__dirname, 'simple.feature');
    return linter.lint([ featureFile ], config, additionalRulesDirs)
      .then((results) => {
        expect(results).to.deep.equal([
          {
            errors: [
              { // This one is to make sure we don't accidentally regress and always load the default rules
                line: 1,
                column: 5,
                level: 2,
                message: 'Wrong indentation for "Feature", expected indentation level of 0, but got 4',
                rule: 'indentation'
              },
              {
                line: 109,
                column: 27,
                level: 2,
                message: 'Another custom-list error',
                rule: 'another-custom-list'
              },
              {
                line: 123,
                column: 21,
                level: 2,
                message: 'Custom error',
                rule: 'custom'
              },
              {
                line: 456,
                column: 23,
                level: 2,
                message: 'Another custom error',
                rule: 'another-custom'
              }
            ],
            filePath: featureFile
          }
        ]);
      });
  });
});
