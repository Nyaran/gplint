Feature: Feature without tags

  Background:
    Given I have a Background

  Scenario: This is a Scenario without tags
      Then I should see an error

  Scenario Outline: This is a Scenario Outline without tags
      Then I should see an error
    Examples:
      | foo |
      | bar |

  Rule: A rule

    Scenario: This is a Scenario inside rule without tags
        Then I should see an error

    Scenario Outline: This is a Scenario Outline inside rule without tags
        Then I should see an error

      Examples:
        | foo |
        | bar |
