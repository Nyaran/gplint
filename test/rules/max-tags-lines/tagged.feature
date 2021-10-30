@no-violations
@max-tag-lines
Feature: Feature without tags

  Background: This is a background
    Given a foobar step

  @scenario @oneTag
  Scenario: This is a Scenario
    Given gplint is awesome

  @scenarioOut
  @anotherTag @anotherTagBis
  @oneMoreTag
  # just a comment
  @oneLastTag
  Scenario Outline: This is a Scenario Outline
    Given gplint is <word>

    @good
    @exampleA
    Examples:
      | word     |
      | cool     |
      | the best |

    @bad
    @exampleB
    @extraExampleB
    Examples:
      | word      |
      | awful     |
      | the worst |

  @tagRule
  @anotherTagRule
  Rule: One rule to rule them all

    @scenario @oneTag
    Scenario: This is another Scenario
      Given gplint is awesome
