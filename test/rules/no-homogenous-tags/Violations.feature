Feature: Feature with homogenous tags

  Background:
    Given I have a Background

  @tagScenarioRepeatA @tagScenarioRepeatB @tagScenarioRepeatNotRule @tagScenarioNoRepeatA
  Scenario: This is a Scenario with some tags
    Then this is a then step

  @tagScenarioRepeatA @tagScenarioRepeatB @tagScenarioRepeatNotRule @tagScenarioNoRepeatB
  Scenario Outline: This is a Scenario Outline with the same tags
    Then this is a then step <foo>

    @tagExampleRepeatA @tagExampleNoRepeatA
    Examples:
      | foo |
      | bar |

    @tagExampleRepeatA @tagExampleNoRepeatB
    Examples:
      | foo |
      | bar |

  @tagScenarioRepeatA @tagScenarioRepeatB @tagRule
  Rule: A rule

    @tagScenarioRuleRepeatA @tagScenarioRuleRepeatB @tagScenarioRuleNoRepeatA
    Scenario: This is a Scenario with some tags
      Then this is a then step

    @tagScenarioRuleRepeatA @tagScenarioRuleRepeatB @tagScenarioRuleNoRepeatB
    Scenario: This is a Scenario with some tags
      Then this is a then step
