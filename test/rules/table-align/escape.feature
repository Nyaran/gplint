Feature: Feature with tables with pipe symbols

  Scenario: This is a Scenario
    Given step with table:
      | \|this | \| is \|    | aligned\|   |
      | \|this  |\| isn't \||  aligned\||
      | this   | \|is\|      | aligned too |
