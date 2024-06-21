@featureTag1 @featureTag2 @featureTag3
Feature: Test for indentation - spaces

  Background:
    Given I have a Feature file with great indentation

  @scenarioTag1 @scenarioTag2
  @scenarioTag3
  Scenario: This is a Scenario with correct indentation - spaces
    Then I should not see an indentation error

  @scenarioTag1 @scenarioTag2
  @scenarioTag3
  Scenario Outline: This is a Scenario Outline with correct indentation - spaces
    Then I should not see an indentation error <foo> <bar>
    @exampleTag1 @exampleTag2
    @exampleTag3
    Examples:
      | foo | bar |
      | bar | foo |
      | har | har |

  @ruletag
  Rule: This is a rule

    Background:
      Given Background in ruel have a great indentation too

    @scenarioTag4
    Scenario: This is a Scenario a rule for indentation - spaces
      Then I should see an indentation error

    @scenarioTag1 @scenarioTag2
    @scenarioTag3
    Scenario Outline: This is a Scenario Outline with correct indentation - spaces
      Then I should not see an indentation error <foo> <bar>
      @exampleTag1 @exampleTag2
      @exampleTag3
      Examples:
        | foo | bar |
        | bar | foo |
        | har | har |
