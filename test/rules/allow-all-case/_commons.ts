export const ERRORS = {
	Description: [
		{
			messageElements: {nodeType: 'Description'},
			line: 1,
			column: 1,
		}, {
			messageElements: {nodeType: 'Description'},
			line: 4,
			column: 3,
		}, {
			messageElements: {nodeType: 'Description'},
			line: 9,
			column: 3,
		}, {
			messageElements: {nodeType: 'Description'},
			line: 14,
			column: 3,
		}, {
			messageElements: {nodeType: 'Description'},
			line: 19,
			column: 5,
		}, {
			messageElements: {nodeType: 'Description'},
			line: 24,
			column: 3,
		}, {
			messageElements: {nodeType: 'Description'},
			line: 27,
			column: 5,
		}, {
			messageElements: {nodeType: 'Description'},
			line: 32,
			column: 5,
		},
	],
	Feature: [{
		messageElements: {nodeType: 'Feature'},
		line: 1,
		column: 1,
	}],
	Rule: [{
		messageElements: {nodeType: 'Rule'},
		line: 24,
		column: 3,
	}],
	Background: [
		{
			messageElements: {nodeType: 'Background'},
			line: 4,
			column: 3,
		}, {
			messageElements: {nodeType: 'Background'},
			line: 27,
			column: 5,
		},
	],
	Scenario: [
		{
			messageElements: {nodeType: 'Scenario'},
			line: 9,
			column: 3,
		}, {
			messageElements: {nodeType: 'Scenario'},
			line: 14,
			column: 3,
		}, {
			messageElements: {nodeType: 'Scenario'},
			line: 32,
			column: 5,
		},
	],
	Step: [
		{
			messageElements: {nodeType: 'Step'},
			line: 6,
			column: 5,
		}, {
			messageElements: {nodeType: 'Step'},
			line: 11,
			column: 5,
		}, {
			messageElements: {nodeType: 'Step'},
			line: 16,
			column: 5,
		}, {
			messageElements: {nodeType: 'Step'},
			line: 30,
			column: 7,
		}, {
			messageElements: {nodeType: 'Step'},
			line: 35,
			column: 7,
		},
	],
	Example: [
		{
			messageElements: {nodeType: 'Example'},
			line: 19,
			column: 5,
		},
	],
	ExampleHeader: [
		{
			messageElements: {nodeType: 'ExampleHeader'},
			line: 21,
			column: 27,
		}, {
			messageElements: {nodeType: 'ExampleHeader'},
			line: 21,
			column: 60,
		},
	],
	ExampleBody: [
		{
			messageElements: {nodeType: 'ExampleBody'},
			line: 22,
			column: 27,
		}, {
			messageElements: {nodeType: 'ExampleBody'},
			line: 22,
			column: 84,
		},
	],
};

export const ALL_LEVEL_CAPS_FULL_ERRORS = [
	ERRORS.Feature[0],
	ERRORS.Description[0],
	ERRORS.Background[0],
	ERRORS.Description[1],
	ERRORS.Step[0],
	ERRORS.Scenario[0],
	ERRORS.Description[2],
	ERRORS.Step[1],
	ERRORS.Scenario[1],
	ERRORS.Description[3],
	ERRORS.Step[2],
	ERRORS.Example[0],
	ERRORS.Description[4],
	ERRORS.ExampleHeader[0],
	ERRORS.ExampleHeader[1],
	ERRORS.ExampleBody[0],
	ERRORS.ExampleBody[1],
	ERRORS.Rule[0],
	ERRORS.Description[5],
	ERRORS.Background[1],
	ERRORS.Description[6],
	ERRORS.Step[3],
	ERRORS.Scenario[2],
	ERRORS.Description[7],
	ERRORS.Step[4],
];
