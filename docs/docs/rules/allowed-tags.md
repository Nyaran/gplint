---
slug: allowed-tags
title: allowed-tags ⚙️
---
# allowed-tags
Only the listed tags are allowed

## Example
> Only accept tags `@watch`, `@wip` and all that starts with `@ID.` and is followed by 5 numbers.
```json
{
  "allowed-tags": [
    "error",
    {
      "tags": [
        "@watch",
        "@wip"
      ],
      "patterns": [
        "^@ID.[0-9]{5}$"
      ]
    }
  ]
}
```

