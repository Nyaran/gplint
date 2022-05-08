module.exports = {
  diff: true,
  extension: ['ts', 'js'],
  package: './package.json',
  require: 'ts-node/register',
  ui: 'bdd',
  recursive: true,
  'watch-files': ['src/**/*.js', 'test/**/*.js'],
};
