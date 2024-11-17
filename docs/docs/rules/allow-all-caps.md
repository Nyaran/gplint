---
slug: allow-all-caps
title: allow-all-caps ⚙️
---
# allow-all-caps
Allows the user to specify if some nodes allows texts completely in uppercase.

## Example
> Allows "Description", "ExampleHeader" and "ExampleBody" to be completely in uppercase, disallow the rest using "Global".
```json
{
  "allow-all-caps": [
    "error",
    {
      "Global": false,
      "Description": true,
      "ExampleHeader": true,
      "ExampleBody": true
    }
  ]
}
```

