import * as ruleTestBase from '../rule-test-base.js';
import * as rule from '../../../src/rules/no-restricted-patterns.js';
import { Rule } from '../../../src/index.js';
const runTest = ruleTestBase.createRuleTest(rule as unknown as Rule, '<%= nodeType %> <%= property %>: "<%= string %>" matches restricted pattern "/<%= pattern %>/i"');

describe('No Restricted Patterns Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-restricted-patterns/NoViolations.feature', {
      'Global': [
        '^.*disallowed.*$'
      ]}, []);
  });

  it('detects errors in Feature names and descriptions that match the Feature or Global config', function() {
    const configuration = {
      'Feature': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    return runTest('no-restricted-patterns/FeatureViolations.feature', configuration, [
      {
        messageElements: {
          string: 'Feature with disallowed patterns',
          pattern: '^.*disallowed.*$',
          nodeType:'Feature',
          property: 'name'
        },
        line: 1,
        column: 1,
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'A restricted global pattern',
          nodeType:'Feature',
          property: 'description'
        },
        line: 1,
        column: 1
      },
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Feature',
          property: 'description'
        },
        line: 1,
        column: 1
      }
    ]);
  });

  it('detects errors in Background descriptions and steps that match the Background or Global config', function() {
    const configuration = {
      'Background': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    return runTest('no-restricted-patterns/BackgroundViolations.feature', configuration, [
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Background',
          property: 'description'
        },
        line: 4,
        column: 1,
      },
      {
        messageElements: {
          string: 'disallowed background step',
          pattern: '^.*disallowed.*$',
          nodeType:'Step',
          property: 'text'
        },
        line: 6,
        column: 3,
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step',
          property: 'text'
        },
        line: 7,
        column: 3,
      }
    ]);
  });

  it('detects errors in Scenario names, descriptions and steps that match the Background or Global config', function() {
    const configuration = {
      'Scenario': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    return runTest('no-restricted-patterns/ScenarioViolations.feature', configuration, [
      {
        messageElements: {
          string: 'Disallowed exact and partial matching',
          pattern: '^.*disallowed.*$',
          nodeType:'Scenario',
          property: 'name'
        },
        line: 4,
        column: 1,
      },
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Scenario',
          property: 'description'
        },
        line: 4,
        column: 1,
      },
      {
        messageElements: {
          string: 'disallowed scenario step',
          pattern: '^.*disallowed.*$',
          nodeType:'Step',
          property: 'text'
        },
        line: 6,
        column: 3,
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step',
          property: 'text'
        },
        line: 7,
        column: 3,
      }
    ]);
  });

  it('detects errors in ScenarioOutline names, descriptions and steps that match the Background or Global config', function() {
    const configuration = {
      'ScenarioOutline': [
        '^.*disallowed.*$'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    return runTest('no-restricted-patterns/ScenarioOutlineViolations.feature', configuration, [
      {
        messageElements: {
          string: 'Disallowed exact and partial matching',
          pattern: '^.*disallowed.*$',
          nodeType:'Scenario Outline',
          property: 'name'
        },
        line: 4,
        column: 1
      },
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Scenario Outline',
          property: 'description'
        },
        line: 4,
        column: 1
      },
      {
        messageElements: {
          string: 'disallowed scenario outline step',
          pattern: '^.*disallowed.*$',
          nodeType:'Step',
          property: 'text'
        },
        line: 6,
        column: 3
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step',
          property: 'text'
        },
        line: 7,
        column: 3
      }
    ]);
  });

  it('detects errors in Scenario steps with keyword Given, When, Then, the descriptions that match the Step or Global config', function() {
    const configuration = {
      'Given': [
        '^.*bad step.*$'
      ],
      'When': [
        'bad step when'
      ],
      'Then': [
        'step incorrect then'
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    return runTest('no-restricted-patterns/StepViolations.feature', configuration, [
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Scenario',
          property: 'description'
        },
        line: 4,
        column: 1,
      },
      {
        messageElements: {
          string: 'a bad step given',
          pattern: '^.*bad step.*$',
          nodeType:'Step',
          property: 'text'
        },
        line: 6,
        column: 3,
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step',
          property: 'text'
        },
        line: 7,
        column: 3,
      },
      {
        messageElements: {
          pattern: 'bad step when',
          string: 'bad step when',
          nodeType:'Step',
          property: 'text'
        },
        line: 9,
        column: 3,
      },
      {
        messageElements: {
          pattern: 'step incorrect then',
          string: 'bad step incorrect then',
          nodeType:'Step',
          property: 'text'
        },
        line: 11,
        column: 3,
      }
    ]);
  });

  it('detects errors in Scenario steps independently of keyword', function() {
    const configuration = {
      'Step': [
        'bad step when',
        'step incorrect then',
      ],
      'Global': [
        '^a restricted global pattern$',
        'a bad description'
      ]
    };

    return runTest('no-restricted-patterns/StepViolations.feature', configuration, [
      {
        messageElements: {
          pattern: 'a bad description',
          string: 'A bad description',
          nodeType:'Scenario',
          property: 'description'
        },
        line: 4,
        column: 1,
      },
      {
        messageElements: {
          pattern: '^a restricted global pattern$',
          string: 'a restricted global pattern',
          nodeType:'Step',
          property: 'text'
        },
        line: 7,
        column: 3,
      },
      {
        messageElements: {
          pattern: 'bad step when',
          string: 'bad step when',
          nodeType:'Step',
          property: 'text'
        },
        line: 9,
        column: 3,
      },
      {
        messageElements: {
          pattern: 'step incorrect then',
          string: 'bad step incorrect then',
          nodeType:'Step',
          property: 'text'
        },
        line: 11,
        column: 3,
      }
    ]);
  });
});
