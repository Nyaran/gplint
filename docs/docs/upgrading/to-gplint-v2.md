---
title: Upgrading to GPLint v2
---

This documentation will help you upgrade your rules config from _GPLint_ v1 to _GPLint_ v2. To review the new features, go
to the blog [release blog post](/blog/2024/07/07/v2-released).

## Miscellaneous

### ESM

This package is now pure ESM. It should not affect if using _GPLint_ as a cli tool, if you have problems with integration,
please, first [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

### Drop old Node.js versions

The support for Node.js 14 and 16 was removed, upgrade at least to Node.js 18.

## Rules

### Global

All rules with "on" as an option should be replaced with a level string, "error" or "warn".

```json lines
// v1
{
  "no-files-without-scenarios": "on",
  "file-name": ["on", {"style": "PascalCase"}]
}

// v2
{
  "no-files-without-scenarios": "warn",
  "file-name": ["error", {"style": "PascalCase"}]
}
```

### required-tags

On rule `required-tags` the `tags` config was renamed to `scenario`, to avoid confusions with the other levels (global, 
feature, example, etc.).

```json lines
// v1
{
  "required-tags": [
    "error",
    {
      "tags": [["@ready", "@manual", "@wip"]],
    }
  ]
}

// v2
{
  "required-tags": [
    "error",
    {
      "scenario": [["@ready", "@manual", "@wip"]],
    }
  ]
}
```
