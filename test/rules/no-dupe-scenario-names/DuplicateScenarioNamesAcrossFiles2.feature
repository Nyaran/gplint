Feature: This is a Feature with non unique scenario names across multiple files - pt 2

  Background:
    Given I have a Background

  Scenario: This is a Scenario
    Then this is a then step

  Scenario Outline: This is a Scenario Outline
    Then this is a then step <foo>
    Examples:
      | foo |
      | bar |

  Rule: A Rule
    Scenario: This is a Scenario inside Rule
      Then this is a then step
