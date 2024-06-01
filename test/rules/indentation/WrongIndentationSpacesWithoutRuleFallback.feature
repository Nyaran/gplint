@featureTag1 @featureTag2
Feature: Test for indentation - spaces

  @ruletag
  Rule:
   Background:
Given I have a Feature file with indentation all over the place
       @scenarioTag4
 Scenario: This is a Scenario a rule for indentation - spaces
  Then I should see an indentation error
