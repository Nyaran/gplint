Feature: Example with disallowed patterns

  Scenario Outline: Allowed steps only
    Given I use one allowed step
    When another allowed step is used
    Then no errors should be reported

    Examples: Disallowed exact and partial matching
    A bad description
      | example |
      | one     |
      | two     |

    Examples: Allowed example name with invalid example header
      | allowed | disallowed header |
      | one     | first             |
      | two     | second            |

    Examples: Allowed example name with invalid example body
      | valid | invalid               |
      | one   | disallowed body one   |
      | two   | allowed body two      |
      | three | disallowed body three |
