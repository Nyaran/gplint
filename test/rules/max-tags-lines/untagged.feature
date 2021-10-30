Feature: Feature without tags

  Background: This is a background
    Given a foobar step

  Scenario: This is a Scenario
    Given gplint is awesome

  Scenario Outline: This is a Scenario Outline
    Given gplint is <word>

    Examples:
      | word     |
      | cool     |
      | the best |

    Examples:
      | word      |
      | awful     |
      | the worst |

  Rule: One rule to rule them all

  Scenario: This is another Scenario
    Given gplint is awesome
