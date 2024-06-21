@featureTag1 @featureTag2 @featureTag3
Feature: Test for indentation - spaces

  Background:
     Given I have a Feature file with great indentation

  @scenarioTag1 @scenarioTag2
  @scenarioTag3
  Scenario: This is a Scenario with correct indentation - spaces
      When I have a valid indentation
        And including indentation for especial steps
         But this looks ugly, right?
       Then I should not see an indentation error

  @ruletag
  Rule: This is a rule
    Background:
       Given I have a Feature file with great indentation

    @scenarioTag1 @scenarioTag2
    @scenarioTag3
    Scenario: This is a Scenario with correct indentation - spaces
        When I have a valid indentation
          And including indentation for especial steps
           But this looks ugly, right?
         Then I should not see an indentation error
