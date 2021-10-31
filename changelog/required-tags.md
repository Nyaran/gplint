### Changed
* Improve `required-tags` rule.
  * Add options to set required tags for each level.
  * Add option to define global tags, to be defined on any level.
  * Add options to extend rule and example tags to Scenario when that levels are not present for that Scenario.
  * Deprecated the `tags` options, should be replaced by `scenario`.
  * Improved tag checks allowing to force an expression is a RegExp (should be wrapped between slashes), and matching tag completely on string match.
  * Allow subset array to include optional required tags.
