@feature
@required-tag-feature
# Subarray tags for feature
@required-tag-feature-subset-A
Feature: Feature with all of the required tags present

  Background:
    Given I have a Background

  @scenario
  @required-tag-scenario @required-tag-scenario-1234
  # Tags from rule as this scenario is not inside rule
  @required-tag-rule-on-scenario
  # Tags from example as this scenario is not inside and outline
  @required-tag-example-on-scenario
  Scenario: This is a Scenario with all of the required tags present
    Then I should not see an error

  @scenarioOutline
    @required-tag-scenario @required-tag-scenario-4567
  # Tags from rule as this scenario is not inside rule
    @required-tag-rule-on-scenario
  Scenario Outline: This is a Scenario Outline with all of the required tags present
    Then I should not see an error
    @example @required-tag-example
      # Tags from scenario extend from example as this scenario is an outline
    @required-tag-example-on-scenario
      # Subarray tags for example
    @required-tag-example-subset-A @required-tag-example-subset-B
    Examples:
      | foo |
      | bar |

    @example @required-tag-example
      # Tags from scenario extend from example as this scenario is an outline
    @required-tag-example-on-scenario
      # Subarray tags for example
    @required-tag-example-subset-A @required-tag-example-subset-B
    Examples:
      | foo |
      | baz |

  Scenario: This is a Scenario with all of the required tags present
    Then I should not see an error

  Scenario Outline: This is a Scenario Outline with all of the required tags present
    Then I should not see an error

    Examples:
      | foo |
      | bar |

  @rule @required-tag-rule
  # Tags from scenario extend from rule as this is a rule
  @required-tag-rule-on-scenario
  Rule: A rule

  @scenario
  @required-tag-scenario @required-tag-scenario-1234
    # Tags from example as this scenario is not inside and outline
  @required-tag-example-on-scenario
  Scenario: This is a Scenario inside rule with all of the required tags present
    Then I should not see an error

  @scenarioOutline
    @required-tag-scenario @required-tag-scenario-4567
  Scenario Outline: This is a Scenario Outline inside rule with all of the required tags present
    Then I should not see an error
    @example @required-tag-example
      # Tags from scenario extend from example as this scenario is an outline
    @required-tag-example-on-scenario
      # Subarray tags for example
    @required-tag-example-subset-A @required-tag-example-subset-B
    Examples:
      | foo |
      | bar |

    @example @required-tag-example
      # Tags from scenario extend from example as this scenario is an outline
    @required-tag-example-on-scenario
      # Subarray tags for example
    @required-tag-example-subset-A @required-tag-example-subset-B
    Examples:
      | foo |
      | baz |

  Scenario: This is a Scenario inside rule with all of the required tags present
    Then I should not see an error

  Scenario Outline: This is a Scenario Outline inside rule with all of the required tags present
    Then I should not see an error

    Examples:
      | foo |
      | bar |
