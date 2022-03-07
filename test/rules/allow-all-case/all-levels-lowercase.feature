Feature: lowercase feature
  given a lowercase description

  Background: lowercase background
  lowercase background description
    Given lowercase background step
    And MixedCase step

  Scenario: lowercase background
  lowercase background description
    Given lowercase step
    And MixedCase step

  Scenario Outline: lowercase background outline
  lowercase background outline description
    Given lowercase step
    And MixedCase step

    Examples: lowercase example
    lowercase example description
      | MixedCase head  | lowercase header | mixed HEAD  | lc header mc values   | MC header UP values   |
      | MixedCase Value | lowercase value  | MIXED value | MC value in UC header | lc value in mc header |

  Rule: lowercase rule
  lowercase rule description

    Background: lowercase background in rule
      lowercase background description in rule
      Given MixedCase step
      And lowercase background

    Scenario: lowercase background in rule
    lowercase background description in rule
      Given MixedCase step
      And lowercase background
