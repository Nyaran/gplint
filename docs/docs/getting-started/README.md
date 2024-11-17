---
sidebar_position: 1
---

## About _GPLint_

_GPLint_ is a tool for identifying and reporting on patterns found in Gherkin definition files, with the goal of making
Gherkin definitions more consistent and avoiding bugs and mistakes.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above.

## Quick start

Install _GPLint_ as a development dependency with this shell command:

```shell
npm install --save-dev gplint
```

### Configuration

The default name for the configuration file is `.gplintrc` and it's expected to be in your working directory.

The file contents must be valid JSON, though it does allow comments.

You can start with the following example
```json title=".gplintrc"
{
  "allow-all-caps": ["error", {
    "Global": false,
    "Description": false,
    "ExampleHeader": true,
    "ExampleBody": true
  }],
  "allow-all-lowercase": ["error", {
    "Global": false,
    "Description": false,
    "Step": true,
    "ExampleHeader": true,
    "ExampleBody": true
  }],
  "file-name": [
    "warn",
    {
      "style": "camelCase",
      "allowAcronyms": true
    }
  ],
  "keywords-in-logical-order": ["error", {"detectMissingKeywords":true}],
  "no-superfluous-tags": "warn",
  "no-unnamed-features": "error",
  "no-unnamed-scenarios": "error",
  "no-unused-variables": "warn"
}
```

### Run _GPLint_
On a terminal, run the following code

```shell
gplint tests/features
```

