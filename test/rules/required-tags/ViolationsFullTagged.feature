@feature
Feature: Feature with some of the required tags missing

  Background:
    Given I have a Background

  @scenario @required-tag-scenario-untag @required-tag-global-subset-example-B @required-tag-global-subset-example-Z
  Scenario: This is a Scenario with some of the required tags missing
      Then I should see an error

  @scenarioOutline @required-tag-scenario-untag @required-tag-scenario-subset-B @required-tag-global-subset-B
  Scenario Outline: This is a Scenario Outline with some of the required tags missing
      Then I should see an error
    @example
    Examples:
      | foo |
      | bar |

    @example @required-tag-global-subset-example-A
    Examples:
      | foo |
      | baz |

  @rule
  Rule: A rule

    @scenario @required-tag-scenario-untag @required-tag-scenario-subset-A @required-tag-global-subset-example-Z
    Scenario: This is a Scenario inside rule with some of the required tags missing
        Then I should see an error

    @scenarioOutline @required-tag-scenario-untag
    Scenario Outline: This is a Scenario Outline inside rule with some of the required tags missing
        Then I should see an error
      @example
      Examples:
        | foo |
        | bar |

      @example @required-tag-global-subset-example-B
      Examples:
        | foo |
        | baz |
