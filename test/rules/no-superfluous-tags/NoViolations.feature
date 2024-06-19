@featureTag1 @featureTag2
Feature: Feature with multiple tags

  Background:
    Given I have a Background

  @scenarioTag1 @scenarioTag2
  Scenario: This is a Scenario with multiple tags
    Then this is a then step

  @scenarioTag1 @scenarioTag3
  Scenario Outline: This is a Scenario Outline with multiple tags
    Then this is a then step <foo>

    @exampleTag1 @exampleTag2
    Examples:
      | foo |
      | bar |

  @ruleTag
  Rule: A rule

    Background:
      Given I have a Background

    @scenarioTag1 @scenarioTag2
    Scenario: This is a Scenario with superfluous tags
      Then this is a then step

    @scenarioTag1
    Scenario Outline: This is a Scenario Outline with superfluous tags
      Then this is a then step <foo>

      @scenarioTag2 @examplesTag
      Examples:
        | foo |
        | bar |
