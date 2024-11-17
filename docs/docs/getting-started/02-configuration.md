# Configuration

The configuration file(s) must be valid JSON, though it does allow comments.

## Configure rule level

Each rule should have a level configured, there are 3 available:

* "off" or "0": Turn the rule off.
* "warn" or "1" or 1: Turn the rule on, without affection exit code.
* "error" or "2" or 2: Turn the rule on, setting exit code to 1 when triggered.

Note: "warn" can provoke an exit code 1 if `--max-warnings` is provided with 0 or greater value.

## Example

The following example sets up some rules:

* Allow whole text in uppercase for examples headers and examples body.
* Allow whole text in lowercase for steps, examples headers and examples body.
* File names should follow camel case style, allowing acronyms. As the level is set to `"warn"`, the rule violation
  doesn't produce an error, but shows a warning.
* The keywords on each scenario should follow logical order, `Given` -> `When` -> `Then` (`And` and `Or` are allowed
  between them). If a keyword is missing, implies rule violation.
* Superfluos tags produces a warning message.
* Unnamed features and scenarios produces an error.
* Unused variables produces a warning.

```json title=".gplintrc"
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

## Ignoring Feature Files
Add a `.gplintignore` file in your working directory and specify one glob pattern per file line.
```text title=".gplintignore"
**/wip/**/*.feature
foo/ignore.feature
```





