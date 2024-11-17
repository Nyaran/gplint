---
slug: allow-all-lowercase
title: allow-all-lowercase ⚙️
---
# allow-all-lowercase
Allows the user to specify if some nodes allows texts completely in lowercase.

## Example
> Allows "Description", "ExampleHeader" and "ExampleBody" to be completely in lowercase, disallow the rest using "Global".
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

