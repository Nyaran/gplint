import * as convert from 'xml-js';
import {ErrorsByFile, RuleErrorLevel} from '../types';

function getMessageLevel(message: RuleErrorLevel): string {
  return message.level === 2 ? 'Error' : 'Warning';
}

export function print(results: ErrorsByFile[]): string {
  const testCases = results.map(result => ({
    _attributes: {
      name: result.filePath
    },
    error: result.errors.map(error => ({
      _attributes: {
        message: error.message,
        type: 'gplint-error'
      },
      _cdata: `${result.filePath}:${error.line}:${error.column} [${getMessageLevel(error)}] (${error.rule}) ${error.message}`
    }))
  }));
  const errorCount = results.map(r => r.errors.length).reduce((a, b) => a + b, 0);
  const testSuiteReport = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'utf-8'
      }
    },
    testsuites: {
      testsuite: {
        _attributes: {
          name: 'gplint',
          time: 0,
          tests: errorCount,
          errors: errorCount,
        },
        testcase: testCases
      }
    }
  };
  return convert.js2xml(testSuiteReport, {compact: true, spaces: 4});
}
