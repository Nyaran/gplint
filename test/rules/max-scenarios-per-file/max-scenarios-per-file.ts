import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/max-scenarios-per-file.js';
const runTest = ruleTestBase.createRuleTest(rule, 'Number of scenarios exceeds maximum: <%= variable %>/10');

describe('Max Scenarios per File rule', function() {
	it('doesn\'t raise errors when the default configuration is used and there are correct number of scenarios', async function() {
		await runTest('max-scenarios-per-file/CorrectNumber.feature', { maxScenarios: 10 }, []);
		await runTest('max-scenarios-per-file/CorrectNumberExamples.feature', { maxScenarios: 10 }, []);
		await runTest('max-scenarios-per-file/CorrectNumberMixed.feature', { maxScenarios: 10 }, []);
	});

	it('detects errors for when a feature file has too many scenarios', async function() {
		await runTest('max-scenarios-per-file/TooManyScenarios.feature', { maxScenarios: 10 }, [{
			messageElements: { variable: 11 },
			line: 0,
			column: 0,
		}]);
		await runTest('max-scenarios-per-file/TooManyExamples.feature', { maxScenarios: 10 }, [{
			messageElements: { variable: 11 },
			line: 0,
			column: 0,
		}]);
	});

	it('considers a scenario outline with many examples to be one scenario when "countOutlineExamples" is on', async function() {
		await runTest('max-scenarios-per-file/TooManyScenarios.feature', { maxScenarios: 10, countOutlineExamples: false }, [{ messageElements: { variable: 11 }, line: 0, column: 0 }]);
		await runTest('max-scenarios-per-file/TooManyExamples.feature', { maxScenarios: 10, countOutlineExamples: false }, []);
	});

	it('considers a scenario outline with many examples to be one scenario when "countOutlineExamples" is false', async function() {
		await runTest('max-scenarios-per-file/TooManyScenarios.feature', { maxScenarios: 10, countOutlineExamples: false }, [{ messageElements: { variable: 11 }, line: 0, column: 0 }]);
		await runTest('max-scenarios-per-file/TooManyExamples.feature', { maxScenarios: 10, countOutlineExamples: false }, []);
	});
});
