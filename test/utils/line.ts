import { expect } from 'chai';
import { modifyLine, getLineContent } from '../../src/rules/utils/line.js';
import fs from 'node:fs';
import {FileData} from '../../build/types.js';

describe('Line utils', () => {
	const TMP_FEATURE_FILE_PATH = './tmp.feature';
	const FILE_DATA: FileData = { relativePath: TMP_FEATURE_FILE_PATH, lines: [] };

	beforeEach(function() {
		fs.writeFileSync(
			TMP_FEATURE_FILE_PATH,
			`Feature: test feature

Scenario: First scenario
  Given I setup my scenario`,
			'utf8',
	 	);
	});

	afterEach(function() {
		fs.rmSync(TMP_FEATURE_FILE_PATH);
	});

	it('should read line in file', () => {
		const line3 = getLineContent(FILE_DATA, 3);
		const line4 = getLineContent(FILE_DATA, 4);

		expect(line3).to.be.equals('Scenario: First scenario');
		expect(line4).to.be.equals('  Given I setup my scenario');
	});

	it('should modify line in file', () => {
		modifyLine(FILE_DATA, 1, 'Feature: new feature name');

		const line = getLineContent(FILE_DATA, 1);

		expect(line).to.be.equals('Feature: new feature name');
	});
});
