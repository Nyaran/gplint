	@featureTag1 @featureTag2
	Feature: Test for indentation - tabs

				Background:
Given I have a Feature file with indentation all over the place

	@scenarioTag1 @scenarioTag2
	@scenarioTag3
	Scenario: This is a Scenario for indentation - tabs
			Then I should see an indentation error

			@scenarioTag1 @scenarioTag2
				@scenarioTag3
			Scenario Outline: This is a Scenario Outline for indentation - tabs
		 Then I should see an indentation error <foo>
		@exampleTag1 @exampleTag2
			@exampleTag3
		Examples:
				| foo |
				| bar |
