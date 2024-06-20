const os = require('os');

module.exports = {
	diff: true,
	extension: ['ts', 'js'],
	package: './package.json',
	loader: 'ts-node/esm',
	ui: 'bdd',
	recursive: true,
	'watch-files': [
		'src/**/*.js',
		'test/**/*.js',
	],
	timeout: os.type() === 'Windows_NT' ? 10_000 : 5_000,
};
