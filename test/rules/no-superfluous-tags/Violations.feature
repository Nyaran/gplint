@superfluousFeatureTag1 @superfluousFeatureTag2 @superfluousFeatureTag3 @featureTag
Feature: Feature with multiple superfluous tags

  Background:
    Given I have a Background

  @superfluousFeatureTag1 @scenarioTag1 @scenarioTag2
  Scenario: This is a Scenario with superfluous tags
    Then this is a then step

  @superfluousFeatureTag1 @superfluousFeatureTag2 @scenarioTag1 @superfluousScenarioTag1
  Scenario Outline: This is a Scenario Outline with superfluous tags
    Then this is a then step <foo>

    @superfluousFeatureTag2 @scenarioTag2 @superfluousScenarioTag1 @examplesTag
    Examples:
      | foo |
      | bar |

  @superfluousFeatureTag3 @superfluousRuleTag1 @superfluousRuleTag2 @ruleTag
  Rule: A rule

    Background:
      Given I have a Background

    @superfluousFeatureTag1 @scenarioTag1 @scenarioTag2 @superfluousFeatureTag3 @superfluousRuleTag1
    Scenario: This is a Scenario with superfluous tags
      Then this is a then step

    @superfluousFeatureTag1 @superfluousFeatureTag2 @scenarioTag1 @superfluousScenarioTag1 @superfluousFeatureTag3 @superfluousRuleTag1
    Scenario Outline: This is a Scenario Outline with superfluous tags
      Then this is a then step <foo>

      @superfluousFeatureTag2 @scenarioTag2 @superfluousScenarioTag1 @examplesTag @superfluousRuleTag2
      Examples:
        | foo |
        | bar |
