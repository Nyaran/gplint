@featuretag1 @featuretag2
Feature: Feature with multiple tags

  Background:
    Given I have a Background

  @tagScenarioNoRepeatA @tagScenarioNoRepeatB @featuretag1
  Scenario: This is a Scenario with multiple tags
    Then this is a then step

  @tagScenarioNoRepeatC @tagScenarioNoRepeatD
  Scenario Outline: This is a Scenario Outline with multiple tags
    Then this is a then step <foo>

    @tagExampleRepeatA @tagExampleRepeatB
    Examples:
      | foo |
      | bar |

    @tagExampleRepeatC @tagExampleRepeatD
    Examples:
      | foo |
      | bar |

  @tagRule
  Rule: A rule

    @tagScenarioRuleNoRepeatA @tagScenarioRuleNoRepeatB @tagRule
    Scenario: This is a Scenario with some tags
      Then this is a then step

    @tagScenarioRuleNoRepeatC @tagScenarioRuleNoRepeatD
    Scenario: This is a Scenario with some tags
      Then this is a then step

  @ruleUniqueScenario
  Rule: Rule with unique Scenario

    @tagScenarioRuleNoRepeatA @tagScenarioRuleNoRepeatE
    Scenario: This is a Scenario with some tags
      Then this is a then step
