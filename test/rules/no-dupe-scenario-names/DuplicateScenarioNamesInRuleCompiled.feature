Feature: This is a Feature with non unique scenario names

  Background:
    Given I have a Background

  Scenario: This is a Scenario with non unique name
    Then this is a then step

  Scenario Outline: This is a Scenario Outline with non unique name across examples <foo>
    Then this is a then step <foo>
    Examples:
      | foo |
      | baz |

  Scenario Outline: This is a Scenario Outline with non unique name across examples <foo>
    Then this is a then step <foo>
    Examples:
      | foo |
      | bar |
      | baz |

  Rule: A rule
    Scenario Outline: This is a Scenario Outline with non unique name across examples <foo>
      Then this is a then step <foo>
      Examples:
        | foo |
        | asd |
        | bar |
        | bas |

    Scenario Outline: This is a Scenario Outline with non unique name across examples <foo>
      Then this is a then step <foo>
      Examples:
        | foo |
        | bas |

  Rule: Another rule
    Scenario Outline: This is a Scenario Outline with non unique name across examples <foo>
      Then this is a then step <foo>
      Examples:
        | foo |
        | bas |
        | baz |
