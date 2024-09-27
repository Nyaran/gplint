import {GherkinData, RuleError} from '../types.js';
import { getLineContent, modifyLine } from './utils/line.js';

export const name = 'no-trailing-spaces';

export function run({file}: GherkinData, _: unknown, autoFix: boolean): RuleError[] {
	const errors = [] as RuleError[];
	let lineNo = 1;
	file.lines.forEach(line => {
		if (/[\t ]+$/.test(line)) {
			if (autoFix) {
				fix(lineNo);
			} else {
				errors.push({message: 'Trailing spaces are not allowed',
					rule   : name,
					line   : lineNo,
					column : 0,
				});
			}
		}

		lineNo++;
	});

	function fix(line: number) {
		modifyLine(file, line, getLineContent(file, line).replaceAll(/\s+$/g, ''));
	}

	return errors;
}
