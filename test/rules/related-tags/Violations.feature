@featureTag
Feature: Feature without related tags

  Background:
    Given I have a Background

  @scenarioTag
  Scenario: This is a Scenario without related tags
    Then this is a then step

  @noRelatedTags
  Scenario: This is a Scenario without related tags, but not need it
    Then this is a then step

  @scenarioTag
  Scenario Outline: This is a Scenario Outline without related tags
    Then this is a then step <foo>
    @examplesTag
    Examples:
      | foo |
      | bar |

  Scenario: This is a Scenario without tags
    Then this is a then step

  @ruleTag
  Rule: This is a rule
    @scenarioTag
    Scenario: This is a Scenario without related tags
      Then this is a then step
