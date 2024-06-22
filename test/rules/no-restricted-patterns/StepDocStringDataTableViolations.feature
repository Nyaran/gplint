Feature: No restricted patterns
  No restricted patterns

  Scenario: Disallowed exact and partial matching
    Given a good step
    When a good step with invalid docstring
    """
    a disallowed docstring
    """
    And another good step with invalid docstring
	  """
    a restricted global pattern
    """
    Then allowed step with invalid table
      | allowed cell | invalid cell |
    And another allowed step with invalid table
      | allowed cell | a restricted global pattern |
      | wrong value  | another allowed cell        |
