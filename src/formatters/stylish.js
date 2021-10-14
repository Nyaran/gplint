/*eslint no-console: "off"*/
require('core-js/stable/string');
const chalk = require('chalk');
const os = require('os');

function stylizeError(error, maxLineLength, maxMessageLength, addColors) {
  const indent = '  '; // indent 2 spaces so it looks pretty
  const padding = '    '; //padding of 4 spaces, will be used between line numbers, error msgs and rule names, for readability
  const errorLocation = getLocationString(error);
  const errorLocationPadded = errorLocation.padEnd(maxLineLength);
  const errorLocationStylized = addColors ? chalk.gray(errorLocationPadded) : errorLocationPadded;
  const level = 'error'; // forced as levels are not implemented.

  const errorRuleStylized = addColors ? chalk.gray(error.rule) : error.rule;
  return indent + errorLocationStylized + padding + level + padding + error.message.padEnd(maxMessageLength) + padding + errorRuleStylized;
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

function getMaxMessageLength(result, maxLineLength, consoleWidth) {
  let length = 0;
  result.errors.forEach(error => {
    const errorStr = error.message.toString();

    // Get the length of the formatted error message when no extra padding is applied
    // If the formatted message is longer than the console width, we will ignore its length
    const expandedErrorStrLength = stylizeError(error, maxLineLength, 0, false).length;

    if (errorStr.length > length && expandedErrorStrLength < consoleWidth) {
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

module.exports = function (results) {
  // If the console is tty, get its width and use it to ensure we don't try to write messages longer
  // than the console width when possible
  let consoleWidth = Infinity;
  if (process.stdout.isTTY) {
    consoleWidth = process.stdout.columns;
  }

  let output = '\n',
    errorCount = 0;

  results.forEach(result => {
    errorCount += result.errors.length;
    if (result.errors.length > 0) {
      const maxLineLength = getMaxLocationLength(result);
      const maxMessageLength = getMaxMessageLength(result, maxLineLength, consoleWidth);
      output += chalk.underline(result.filePath);
      output += os.EOL;

      result.errors.forEach(error => {
        output += stylizeError(error, maxLineLength, maxMessageLength, true);
        output += os.EOL;
      });
      output += '\n';
    }
  });

  if (errorCount > 0) {
    output += chalk.red.bold([
      '\u2716 ', errorCount, pluralize(' problem', errorCount),
      '\n'
    ].join(''));
  }

  return errorCount > 0 ? output : '';
};
