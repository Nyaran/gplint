import * as fs from 'fs';
import * as _ from 'lodash';
import {Feature, ParseError, Pickle} from '@cucumber/messages';
import {GherkinStreams} from '@cucumber/gherkin-streams';

import * as logger from './logger';
import * as rules from './rules';
import {Errors, ErrorsByFile, GherkinData, GherkinError, RuleError, RulesConfig} from './types';

export function readAndParseFile(filePath: string): Promise<GherkinData> {
  let feature: Feature;
  const pickles = [] as Pickle[];
  const parsingErrors = [] as ParseError[];
  let fileContent = [] as string[];

  return new Promise((resolve, reject) => {
    const options = {
      includeGherkinDocument: true,
      includePickles: true,
      includeSource: true,
    };

    const stream = GherkinStreams.fromPaths([filePath], options);

    stream.on('data', envelope => {
      if (envelope.parseError) {
        parsingErrors.push(envelope.parseError);
      } else {
        if (envelope.gherkinDocument) {
          feature = envelope.gherkinDocument.feature;
        }
        if (envelope.pickle) {
          pickles.push(envelope.pickle);
        }
        if (envelope.source) {
          fileContent = envelope.source.data.split(/\r\n|\r|\n/);
        }
      }
    });

    stream.on('error', data => {
      logger.error(`Gherkin emitted an error while parsing ${filePath}: ${data}`);
      reject(processFatalErrors([{message: data.message}]));
    });

    stream.on('end', () => {
      if (parsingErrors.length) {
        // Process all errors/attachments at once, because a tag on a background will
        // generate multiple error events, and it would be confusing to print a message for each
        // one of them, when they are all caused by a single cause
        reject(processFatalErrors(parsingErrors));
      } else {
        const file = {
          relativePath: filePath,
          lines: fileContent,
        };
        resolve({feature, pickles, file});
      }
    });
  });
}

export function lint(files: string[], configuration: RulesConfig, additionalRulesDirs: string[]): Promise<ErrorsByFile[]> {
  const results = [] as ErrorsByFile[];

  return Promise.all(files.map((f) => {
    let perFileErrors = [] as RuleError[];

    return readAndParseFile(f)
      .then(
        // Handle Promise.resolve
        ({feature, pickles, file}) => {
          perFileErrors = rules.runAllEnabledRules(feature, pickles, file, configuration, additionalRulesDirs);
        },
        // Handle Promise.reject
        (parsingErrors) => {
          perFileErrors = parsingErrors;
        })
      .finally(() => {
        const fileBlob = {
          filePath: fs.realpathSync(f),
          errors: _.sortBy(perFileErrors, 'line')
        };

        results.push(fileBlob);
      });
  })).then(() => results);
}

function processFatalErrors(errors: GherkinError[]): RuleError[] {
  let errorMsgs = [] as RuleError[];
  if (errors.length > 1) {
    const result = getFormattedTaggedBackgroundError(errors);
    errors = result.errors;
    errorMsgs = result.errorMsgs;
  }
  errors.forEach((error: ParseError) => {
    errorMsgs.push(getFormattedFatalError(error));
  });
  return errorMsgs;
}

function getFormattedTaggedBackgroundError(errors: GherkinError[]): Errors {
  const errorMsgs = [] as RuleError[];
  let index = 0;
  if (errors[0].message.includes('got \'Background') &&
    errors[1].message.includes('expected: #TagLine, #RuleLine, #Comment, #Empty')) {

    errorMsgs.push({
      message: 'Tags on Backgrounds are disallowed',
      rule: 'no-tags-on-backgrounds',
      line: parseInt(errors[0].message.match(/\((\d+):.*/)[1]),
      column: 0,
      level: 2, // Force error
    });

    index = 2;
    for (let i = 2; i < errors.length; i++) {
      if (errors[i].message.includes('expected: #TagLine, #RuleLine, #Comment, #Empty')) {
        index = i + 1;
      } else {
        break;
      }
    }
  }
  return {errors: errors.slice(index), errorMsgs};
}

/*eslint no-console: "off"*/
function getFormattedFatalError(error: RuleError|ParseError): RuleError {
  const errorLine = parseInt(error.message.match(/\((\d+):.*/)[1]);
  let errorMsg;
  let rule;
  if (error.message.includes('got \'Background')) {
    errorMsg = 'Multiple "Background" definitions in the same file are disallowed';
    rule = 'up-to-one-background-per-file';
  } else if (error.message.includes('got \'Feature')) {
    errorMsg = 'Multiple "Feature" definitions in the same file are disallowed';
    rule = 'one-feature-per-file';
  } else if (
    error.message.includes('expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got') ||
    error.message.includes('expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got')
  ) {
    errorMsg = 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed';
    rule = 'no-multiline-steps';

  } else {
    errorMsg = error.message;
    rule = 'unexpected-error';
  }
  return {
    message: errorMsg,
    rule: rule,
    line: errorLine,
    column: 0,
    level: 2, // Force error
  };
}
