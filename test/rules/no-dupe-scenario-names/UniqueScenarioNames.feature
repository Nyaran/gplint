Feature: This is a Feature with unique scenario names

  Background:
    Given I have a Background

  Scenario: This is a Scenario with a unique name
    Then this is a then step

  Scenario Outline: This is a Scenario Outline with a unique name
    Then this is a then step <foo>
    Examples:
      | foo |
      | bar |

  Scenario Outline: This is a Scenario Outline parametrized with a unique name: <foo>
    Then this is a then step <foo>
    Examples:
      | foo |
      | bar |
      | baz |

  Rule: A rule
    Scenario: This is another scenario with unique name
      Then this is a then step

  Rule: Another rule
    Scenario Outline: This is another Scenario Outline with a unique name
      Then this is a then step <foo>
      Examples:
        | foo |
        | bar |
