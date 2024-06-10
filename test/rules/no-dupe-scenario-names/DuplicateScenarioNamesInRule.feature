Feature: This is a Feature with non unique scenario names

  Background:
    Given I have a Background

  Scenario: This is a Scenario with non unique name
    Then this is a then step

  Scenario: This is a Scenario with non unique name
    Then this is a then step

  Scenario Outline: This is a Scenario Outline with non unique name
    Then this is a then step <foo>
    Examples:
      | foo |
      | bar |

  Rule: A rule
    Scenario: This is a Scenario with non unique name
      Then this is a then step

    Scenario Outline: This is a Scenario Outline with non unique name
      Then this is a then step <foo>
      Examples:
        | foo |
        | bar |

  Rule: Another rule
    Scenario: This is a Scenario with non unique name
      Then this is a then step

    Scenario: This is a Scenario with non unique name
      Then this is a then step

    Scenario Outline: This is a Scenario Outline with non unique name
      Then this is a then step <foo>
      Examples:
        | foo |
        | bar |
