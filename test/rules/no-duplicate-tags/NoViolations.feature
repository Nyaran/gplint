@featuretag1 @featuretag2
Feature: Feature with multiple tags

  Background:
    Given I have a Background

  @scenariotag1 @scenariotag2
  Scenario: This is a Scenario with multiple tags
    Then this is a then step

  @scenariotag1 @scenariotag3
  Scenario Outline: This is a Scenario Outline with multiple tags
    Then this is a then step <foo>

    @examplestag @examplestag2
    Examples:
      | foo |
      | bar |

  @ruletag @ruletag2
  Rule: This is a rule

  @scenariotag1 @scenariotag2
  Scenario: This is a Scenario without related tags
    Then this is a then step
