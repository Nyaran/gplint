Feature: No Structure Correct - Without detect missing keywords

    Scenario: Then after of Given
        Given step given
        Then step then

    Scenario: When is first stage step
        When step when
        Then step then

    Scenario Outline: Scenario Outline
        Given the step given
        Then step then of Scenario "<value>"

        Examples:
            | value   |
            | outline |
