import 'core-js/stable/string';
import * as os from 'os';
import * as chalk from 'chalk';
import * as stripAnsi from 'strip-ansi';
import * as table from 'text-table';

const LEVELS_CONFIG = [
  undefined,
  {name: 'warning', color: chalk.yellow},
  {name: 'error', color: chalk.red},
];

function stylizeError(error, maxLineLength) {
  const errorLocation = getLocationString(error);
  const errorLocationPadded = errorLocation.padEnd(maxLineLength);
  const errorLocationStylized = chalk.gray(errorLocationPadded);
  const level = LEVELS_CONFIG[error.level];

  const errorRuleStylized = chalk.gray(error.rule);

  return ['', errorLocationStylized, level.color(level.name), error.message, errorRuleStylized];
}

function getLocationString(loc) {
  return `${loc.line}:${loc.column ? loc.column : '0'}`;
}

function getMaxLocationLength(result) {
  let length = 0;
  result.errors.forEach(error => {
    const errorStr = getLocationString(error);
    if (errorStr.length > length) {
      length = errorStr.length;
    }
  });
  return length;
}

/**
 * Given a word and a count, append an s if count is not one.
 * (Based on eslint version)
 * @param {string} word A word in its singular form.
 * @param {int} count A number controlling whether word should be pluralized.
 * @returns {string} The original word with an s on the end if count is not one.
 */
function pluralize(word, count) {
  return (count === 1 ? word : `${word}s`);
}

export default function (results) {
  let output = '\n',
    warnCount = 0,
    errorCount = 0;

  results.forEach(result => {
    result.errors.forEach(e => {
      if (e.level === 1) {
        warnCount++;
      } else if (e.level === 2) {
        errorCount++;
      }
    });
    if (result.errors.length > 0) {
      const maxLineLength = getMaxLocationLength(result);
      output += chalk.underline(result.filePath);
      output += os.EOL;

      output += table(
        result.errors.map(error => stylizeError(error, maxLineLength)),
        {
          align: ['', 'r', 'l'],
          stringLength: (str) => stripAnsi(str).length,
        }
      );
      output += os.EOL + os.EOL;
    }
  });

  const problemsCount = warnCount + errorCount;

  if (problemsCount > 0) {
    const color = errorCount > 0 ? chalk.red : chalk.yellow;

    output += color.bold([
      '\u2716 ',
      problemsCount, pluralize(' problem', problemsCount),
      ' (',
      errorCount, pluralize(' error', errorCount),
      ', ',
      warnCount, pluralize(' warning', warnCount),
      ')',
      '\n'
    ].join(''));
  }

  return problemsCount > 0 ? output : '';
}
