@feature
@required-global-tag-feature
@required-tag-feature
Feature: Feature with all of the required tags present

  Background:
    Given I have a Background

  @scenario
  @required-tag-scenario @required-tag-scenario-1234
  @required-global-tag-scenario
  # Tags from rule as this scenario is not inside rule
  @required-tag-rule-on-scenario @required-global-tag-rule
  # Tags from example as this scenario is not inside and outline
  @required-tag-example-on-scenario @required-global-tag-example
  Scenario: This is a Scenario with all of the required tags present
    Then I should not see an error

  @scenarioOutline
  @required-tag-scenario @required-tag-scenario-4567
  @required-global-tag-scenario
  # Tags from rule as this scenario is not inside rule
  @required-tag-rule-on-scenario
  @required-global-tag-rule
  Scenario Outline: This is a Scenario Outline with all of the required tags present
    Then I should not see an error
    @example
    @required-tag-example
    @required-global-tag-example
    # Tags from scenario extend from example as this scenario is an outline
    @required-tag-example-on-scenario
    Examples:
      | foo |
      | bar |

  Scenario: This is a Scenario with all of the required tags present
    Then I should not see an error

  Scenario Outline: This is a Scenario Outline with all of the required tags present
    Then I should not see an error

    Examples:
      | foo |
      | bar |

  @rule @required-tag-rule
  @required-global-tag-rule
  # Tags from scenario extend from rule as this is a rule
  @required-tag-rule-on-scenario
  Rule: A rule

    @scenario
    @required-tag-scenario @required-tag-scenario-1234
    @required-tag-example-on-scenario
    @required-global-tag-scenario @required-global-tag-example

    @scenario
    @required-tag-scenario @required-tag-scenario-1234
    @required-global-tag-scenario
    # Tags from example as this scenario is not inside and outline
    @required-tag-example-on-scenario @required-global-tag-example
    Scenario: This is a Scenario inside rule with all of the required tags present
      Then I should not see an error

    @scenarioOutline
    @required-tag-scenario @required-tag-scenario-4567
    @required-global-tag-scenario
    @required-global-tag-rule
    Scenario Outline: This is a Scenario Outline inside rule with all of the required tags present
      Then I should not see an error
      @example @required-tag-example
      @required-global-tag-example
      # Tags from scenario extend from example as this scenario is an outline
      @required-tag-example-on-scenario
      Examples:
        | foo |
        | bar |

    Scenario: This is a Scenario inside rule with all of the required tags present
      Then I should not see an error

    Scenario Outline: This is a Scenario Outline inside rule with all of the required tags present
      Then I should not see an error

      Examples:
        | foo |
        | bar |
