Feature: No restricted patterns
  No restricted patterns

Background:
This is a good description
  Given only allowed patterns are used

Scenario: Allowed steps only
This is a good description
  Given I use one allowed step
  When another allowed step is used
  Then no errors should be reported

Rule: Allowed rule text
Scenario Outline: Allowed steps only
This is a good description
  Given I use one allowed step
  When another allowed step is used
  Then no errors should be reported

  Examples: Allowed example name
  A good description
    | example |
    | one     |
    | two     |
