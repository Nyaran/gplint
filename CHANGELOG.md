# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
* Check on [changelog folder](changelog/).

## [1.2.0] - 2021-11-01
### Added
* Added rule `max-tags-lines`.
* Run tests on node 17.
* Added rule `table-align`.

### Changed
* Improve packaging discarding `.npmignore` and using `files` property on `package.json`.
* Improve `indentation` to support `examples tag`.
* Improve `required-tags` rule.
  * Add options to set required tags for each level.
  * Add option to define global tags, to be defined on any level.
  * Add options to extend rule and example tags to Scenario when that levels are not present for that Scenario.
  * Deprecated the `tags` option, should be replaced by `scenario`.
  * Improved tag checks allowing to force an expression is a RegExp (should be wrapped between slashes), and matching tag completely on string match.
  * Allow subset array to include optional required tags.
* Improve formatters:
  * xunit: Wrap with testsuites object and add count attribute
  * stylish: Add error count to final output

### Removed
* Run tests on node 15.

## [1.1.0] - 2021-10-01
### Changed
* Improve `no-unused-variables` to handle spaces on usage.
* Improve `file-name` on `camelCase` to allow acronyms.

## [1.0.0] - 2021-09-27
### Changed
* Rename project to [gplint](https://github.com/Nyaran/gplint).
* Improve console output when using stylish, adding column number and error level.
* Improve rule `no-dupe-scenario-names` allowing to validate scenario names after replace the example variables.
* Update Gherkin to latest version.

## [PRE]
All the previous work from https://github.com/vsiakka/gherkin-lint
