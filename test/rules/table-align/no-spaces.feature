Feature: Feature with tables without spaces

Background: This is a background
  Given step with table in background:
    |gplint|
    |do magic|

Scenario: This is a Scenario
  Given step with table:
    |lorem|ipsum|dolor|
    |foo|bar|foo bar|
  When step without table

Scenario Outline: This is a Scenario Outline
  Given test step <foo>
Examples:
  |foo|lorem|
  |bar||
