@feature
Feature: Feature with some of the required tags missing

  Background:
    Given I have a Background

  @scenario @required-tag-scenario-untag
  Scenario: This is a Scenario with some of the required tags missing
      Then I should see an error

  @scenarioOutline @required-tag-scenario-untag
  Scenario Outline: This is a Scenario Outline with some of the required tags missing
      Then I should see an error
    @example
    Examples:
      | foo |
      | bar |

  Scenario: This is a Scenario with some of the required tags missing
      Then I should see an error

  Scenario Outline: This is a Scenario Outline with some of the required tags missing
      Then I should see an error

    Examples:
      | foo |
      | bar |

  @rule
  Rule: A rule

    @scenario @required-tag-scenario-untag
    Scenario: This is a Scenario inside rule with some of the required tags missing
        Then I should see an error

    @scenarioOutline @required-tag-scenario-untag
    Scenario Outline: This is a Scenario Outline inside rule with some of the required tags missing
        Then I should see an error
      @example
      Examples:
        | foo |
        | bar |

    Scenario: This is a Scenario inside rule with some of the required tags missing
        Then I should see an error

    Scenario Outline: This is a Scenario Outline inside rule with some of the required tags missing
        Then I should see an error

      Examples:
        | foo |
        | bar |
