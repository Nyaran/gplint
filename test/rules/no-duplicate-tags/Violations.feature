@featuretag @featuretag @anothertag
Feature: Feature with multiple duplicate tags

  Background:
    Given I have a Background

  @scenariotag @scenariotag @scenariotag @anothertag
  Scenario: This is a Scenario with three duplicate tags
    Then this is a then step

  @scenariooutlinetag @scenariooutlinetag
  Scenario Outline: This is a Scenario Outline with two duplicate tags
    Then this is a then step <foo>

    @examplestag @examplestag
    Examples:
      | foo |
      | bar |

  @ruletag @ruletag
  Rule: This is a rule

  @scenariotag @scenariotag @scenariotag @anothertag
  Scenario: This is a Scenario without related tags
    Then this is a then step
