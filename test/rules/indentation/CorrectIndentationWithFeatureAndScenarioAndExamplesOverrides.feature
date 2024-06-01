 @featureTag1 @featureTag2
 Feature: Test for indentation

  Background:
    Given I have a Feature file with great indentation

   @scenarioTag1 @scenarioTag2
   @scenarioTag3
   Scenario: This is a Scenario with correct indentation
    Then I should not see an indentation error

   @scenarioTag1 @scenarioTag2
   @scenarioTag3
   Scenario Outline: This is a Scenario Outline with correct indentation
    Then I should not see an indentation error
     @exampleTag1 @exampleTag2
     @exampleTag3
     Examples:
       | foo | bar |
       | bar | foo |
       | har | har |

    Rule:
      Background:
        Given I have a Feature file with great indentation

       @scenarioTag1 @scenarioTag2
       @scenarioTag3
       Scenario: This is a Scenario with correct indentation
        Then I should not see an indentation error

       @scenarioTag1 @scenarioTag2
       @scenarioTag3
       Scenario Outline: This is a Scenario Outline with correct indentation
        Then I should not see an indentation error
         @exampleTag1 @exampleTag2
         @exampleTag3
         Examples:
           | foo | bar |
           | bar | foo |
           | har | har |
