@featureTag @relatedTagFeature
Feature: Feature with related tags

Background:
  Given I have a Background

@scenarioTag @relatedTagScenario
Scenario: This is a Scenario with related tags
  Then this is a then step

@noRelatedTags
Scenario: This is a Scenario with related tags, but not need it
  Then this is a then step

@scenarioTag @relatedTagScenario
Scenario Outline: This is a Scenario Outline with related tags
  Then this is a then step <foo>
@examplesTag @relatedTagExample
Examples:
  | foo |
  | bar |

Scenario: This is a Scenario without tags
  Then this is a then step

  @ruleTag @relatedTagRule
  Rule: This is a rule
    @scenarioTag @relatedTagScenario
    Scenario: This is a Scenario without related tags
      Then this is a then step
