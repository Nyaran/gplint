@required-global-tag-feature
# Subarray tags for feature
@required-tag-global-subset-A
Feature: Feature with all of the required tags present

  Background:
    Given I have a Background

  @required-global-tag-scenario
  # Tags from rule as this scenario is not inside rule
  @required-global-tag-rule
  # Tags from example as this scenario is not inside and outline
  @required-global-tag-example
  @required-tag-global-example-subset-C
  Scenario: This is a Scenario with all of the required tags present
    Then I should not see an error

  @required-global-tag-scenario
  # Tags from rule as this scenario is not inside rule
    @required-global-tag-rule
  Scenario Outline: This is a Scenario Outline with all of the required tags present
    Then I should not see an error
    @required-global-tag-example
    # Subarray tags for example
    @required-tag-global-example-subset-A
    Examples:
      | foo |
      | bar |

    @required-global-tag-example
      # Subarray tags for example
    @required-tag-global-example-subset-B
    Examples:
      | foo |
      | baz |

  @required-global-tag-rule
  Rule: A rule

  @required-global-tag-scenario
    # Tags from example as this scenario is not inside and outline
  @required-global-tag-example
  @required-tag-global-example-subset-C
  Scenario: This is a Scenario inside rule with all of the required tags present
    Then I should not see an error

  @required-global-tag-scenario
    @required-global-tag-rule
  Scenario Outline: This is a Scenario Outline inside rule with all of the required tags present
    Then I should not see an error
    @required-global-tag-example
      # Subarray tags for example
    @required-tag-global-example-subset-A
    Examples:
      | foo |
      | bar |

    @required-global-tag-example
      # Subarray tags for example
    @required-tag-global-example-subset-B
    Examples:
      | foo |
      | baz |
