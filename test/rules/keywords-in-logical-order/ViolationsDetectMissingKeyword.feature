Feature: Feature with keywords-in-logical-order violations with detect missing keyword

    Scenario: Scenario without given
        When step11
        Then step then

    Scenario Outline: Scenario outline without When
        Given the step given
        Then the step then "<test>"

        Examples:
            | test    |
            | is test |