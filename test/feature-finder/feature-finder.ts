import {assert, expect} from 'chai';
import mockFs from 'mock-fs';
import * as sinon from 'sinon';

import * as featureFinder from '../../src/feature-finder.js';
import path from 'node:path';

describe('Feature finder', function() {
	beforeEach(function() {
		if (this.sinon == null) {
			this.sinon = sinon.createSandbox();
		} else {
			this.sinon.restore();
		}
	});

	let consoleErrorStub: sinon.SinonStubbedMember<typeof console.error>;
	let processExitStub: sinon.SinonStubbedMember<typeof process.exit>;
	beforeEach(function () {
		consoleErrorStub = this.sinon.stub(console, 'error');
		processExitStub = this.sinon.stub(process, 'exit');
		mockFs({
			'folder/with/found/features': {
				'a.feature': '',
				'folder': { 'b.feature': '' },
				'c.txt': ''
			},
			'../folder/with/unfound/features': {
				'd.feature': '',
				'e.txt': ''
			},
			'feature': {
				'f.txt': ''
			},
			'directory.feature': {
			}
		});
	});

	afterEach(function () {
		consoleErrorStub.restore();
		processExitStub.restore();
		mockFs.restore();
	});

	it('returns all feature files found recursively in the current directory when no path is passed to the command line', function() {
		const actual = featureFinder.getFeatureFiles([]);
		_assertPaths(actual, [
			'folder/with/found/features/a.feature',
			'folder/with/found/features/folder/b.feature',
		]);
	});

	it('returns all feature files in a directory and its subfolders when a "path/to/dir/**" pattern is used', function() {
		const actual = featureFinder.getFeatureFiles(['folder/with/found/features/**']);
		_assertPaths(actual, [
			'folder/with/found/features/a.feature',
			'folder/with/found/features/folder/b.feature'
		]);
	});

	it('returns all feature files in a directory when a "path/to/dir/*.feature" pattern is used', function() {
		const actual = featureFinder.getFeatureFiles(['folder/with/found/features/*.feature']);
		_assertPaths(actual, [
			'folder/with/found/features/a.feature'
		]);
	});

	it('returns all feature files in a directory and its subfolders when a path to a directory is used', function() {
		const actual = featureFinder.getFeatureFiles(['folder/with/found/features/']);
		_assertPaths(actual, [
			'folder/with/found/features/a.feature',
			'folder/with/found/features/folder/b.feature'
		]);
	});

	it('does not return duplicates', function() {
		const actual = featureFinder.getFeatureFiles([
			'folder/with/found/features/**',
			'path/to/fake/**'
		]);
		_assertPaths(actual, [
			'folder/with/found/features/a.feature',
			'folder/with/found/features/folder/b.feature'
		]);
	});

	it('ignores files when the --ignore argument is provided', function() {
		const actual = featureFinder.getFeatureFiles(['folder/with/found/features/**'],
			['folder/with/found/features/**']);
		_assertPaths(actual, []);
	});

	it('ignores files in the .gplintignore when specified as glob patterns', function() {
		mockFs({
			'.gplintignore':
			'folder/with/found/features/a.feature\n\n..folder/with/found/features/**'
		});
		const actual = featureFinder.getFeatureFiles(['folder/with/found/features/**']);
		_assertPaths(actual, []);
	});

	it('prints an error message and exits with code 1 when a bad file pattern is used', function() {
		featureFinder.getFeatureFiles(['badpattern**']);
		const consoleErrorArgs = consoleErrorStub.args.map((args) => args[0] as string);
		expect(consoleErrorArgs[0]).to.include('Invalid format of the feature file path/pattern:');
		expect(processExitStub.args[0][0]).to.equal(1);
	});
});

function _assertPaths(current: string[], expected: string[]) {
	assert.deepEqual(path.sep === '/' ? current : current.map(c => c.replaceAll(path.sep, '/')), expected);
}
