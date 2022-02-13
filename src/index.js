import {program} from 'commander';

import * as linter from './linter';
import * as featureFinder from './feature-finder';
import * as configParser from './config-parser';
import * as logger from './logger';

function list(val) {
  return val.split(',');
}

function collect(val, memo) {
  memo.push(val);
  return memo;
}

program
  .usage('[options] <feature-files>')
  .option('-f, --format [format]', 'output format. Possible values: json, stylish, xunit. Defaults to stylish')
  .option('-i, --ignore <...>', `comma seperated list of files/glob patterns that the linter should ignore, overrides ${featureFinder.defaultIgnoreFileName} file`, list)
  .option('-c, --config [config]', `configuration file, defaults to ${configParser.defaultConfigFileName}`)
  .option('-r, --rulesdir <...>', 'additional rule directories', collect, [])
  .option('--max-warnings <...>', 'additional rule directories', -1)
  .parse(process.argv);

const options = program.opts();
const additionalRulesDirs = options.rulesdir;
const files = featureFinder.getFeatureFiles(program.args, options.ignore);
const config = configParser.getConfiguration(options.config, additionalRulesDirs);
linter.lint(files, config, additionalRulesDirs)
  .then((results) => {
    printResults(results, options.format);
    process.exit(getExitCode(results, options));
  });

function getExitCode(results, {maxWarnings}) {
  let exitCode = 0;

  const {warnCount, errorCount} = countErrors(results);

  if (errorCount > 0) {
    exitCode = 1;
  } else if (maxWarnings > -1 && warnCount > maxWarnings) {
    exitCode = 1;
    console.log(`gplint found too many warnings (maximum: ${maxWarnings}).`);
  }

  return exitCode;
}

function countErrors(results) {
  let warnCount = 0,
    errorCount = 0;

  results.flatMap(result => result.errors).forEach(e => {
    if (e.level === 1) {
      warnCount++;
    } else if (e.level === 2) {
      errorCount++;
    }
  });

  return {warnCount, errorCount};
}

function printResults(results, format) {
  let formatter;
  if (format === 'json') {
    formatter = require('./formatters/json').default;
  } else if (format === 'xunit') {
    formatter = require('./formatters/xunit').default;
  } else if (!format || format === 'stylish') {
    formatter = require('./formatters/stylish').default;
  } else {
    logger.boldError('Unsupported format. The supported formats are json, xunit and stylish.');
    process.exit(1);
  }
  console.log(formatter(results));
}
