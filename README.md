# GPLint (Gherkin/Pickle Linter)

[![Test](https://github.com/gplint/gplint/actions/workflows/test.yml/badge.svg)](https://github.com/gplint/gplint/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/gplint/gplint/branch/main/graph/badge.svg?token=JAAQ2DCW9D)](https://codecov.io/gh/gplint/gplint)
[![npm](https://img.shields.io/npm/dw/gplint)](https://www.npmjs.com/package/gplint)

Uses [Gherkin](https://github.com/cucumber/gherkin-javascript) to parse feature files and runs linting against the
default rules, and the optional rules you specified in your `.gplintrc` file.

Forked from [gherkin-lint](https://github.com/vsiakka/gherkin-lint)

## Documentation

Access to the documentation site to know how to use GPLint: https://gplint.github.io/

## Quickstart

We encourage to check the site for complete documentation, but as quick start you can follow this:

### Installation

Install as development dependency:

```shell
npm install --save-dev gplint
```

### Create basic configuration

Set some basic rules to validate your gherkin files, to do that, create a file called `.gplintrc` with the following
content:

#### **`.gplintrc`**

```json
{
  "allow-all-caps": [
    "error",
    {
      "Global": false,
      "Description": false,
      "ExampleHeader": true,
      "ExampleBody": true
    }
  ],
  "allow-all-lowercase": [
    "error",
    {
      "Global": false,
      "Description": false,
      "Step": true,
      "ExampleHeader": true,
      "ExampleBody": true
    }
  ],
  "file-name": [
    "warn",
    {
      "style": "camelCase",
      "allowAcronyms": true
    }
  ],
  "keywords-in-logical-order": [
    "error",
    {
      "detectMissingKeywords": true
    }
  ],
  "no-superfluous-tags": "warn",
  "no-unnamed-features": "error",
  "no-unnamed-scenarios": "error",
  "no-unused-variables": "warn"
}
```

### Run it!

Run it, checking the Gherkin files you have on `test/features` folder.

```shell
gplint tests/features
```
