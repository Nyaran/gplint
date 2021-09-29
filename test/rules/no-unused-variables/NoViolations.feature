Feature: Feature with scenario outline

Background:
  Given I have a background step with a word that looks like a <variable> even though it's not, because this is not a scenario outline step
  Then I shouldn't get an unused variable error

Scenario:
  Given I have a scenario step with a word that looks like a <variable> even though it's not, because there's no examples table
  Then I shouldn't get an unused variable error

Scenario:
  Given I have a scenario step with a word that looks like a <a>
  Then I shouldn get an unused variable error cause

  Examples:
    | a |
    | 1 |

Scenario Outline: This is a Scenario Outline
  Given this is step <a>

  Examples:
    | a |
    | 1 |

Scenario Outline: Examples variable <a> is in the scenario name
  Given this
  When I do that
  Then something should happen
  Examples:
    | a |
    | 1 |

Scenario Outline: Examples variable is in a step table
  Given this:
    | <a> |
  When I do that
  Then something should happen
  Examples:
    | a |
    | 1 |

Scenario Outline: Examples variable is in a step string
  Given this
  When I do that
  Then this should display:
    """
      <a>
    """
  Examples:
    | a |
    | 1 |

Scenario Outline: Examples variable with spaces in the middle
    Given this is step <a  a>

  Examples:
    | a  a |
    | 1    |

Scenario Outline: Scenario with variable characters but empty in step
    Given this is step <a>
    And use inequality sign on step <>
    And use spaced inequality sign on step < >

  Examples:
    | a |
    | 1 |

Scenario Outline: Scenario with variable characters but with spaces around the string
    Given this is step <a>
    And have space before the string < b>
    And have space after the string <b >
    And have space before and after the string < b >
    And have multiple spaces before and after the string <  b   >

  Examples:
    | a |
    | 1 |
