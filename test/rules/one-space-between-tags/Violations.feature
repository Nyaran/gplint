@featuretag1  @featuretag2
@featuretag3
Feature: Feature with bad tag spacing

Background:
  Given I have a Background

@scenariotag1 @scenariotag2
@scenariotag3   @scenariotag4  @scenariotag5
Scenario: This is a Scenario with bad tag spacing
  Then this is a then step

@ruletag1  @ruletag2
Rule: This is a rule
@scenariotag5   @scenariotag6
Scenario Outline: This is a Scenario Outline with bad tag spacing
  Then this is a then step <foo>
@examplestag1   @examplestag2
Examples:
  | foo |
  | bar |
