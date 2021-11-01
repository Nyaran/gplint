const ruleTestBase = require('../rule-test-base');
const rule = require('../../../dist/rules/required-tags.js');
const runTest = ruleTestBase.createRuleTest(rule, 'The tag(s) [<%= tags %>] should be present for <%= nodeType %>.');

describe('Required Tags Rule', function () {
  describe('no errors', function () {
    it('doesn\'t raise errors when there are no violations', function () {
      return runTest('required-tags/NoViolations.feature', {
        ignoreUntagged: true,
        global: ['@required-global-tag-feature', '@required-global-tag-rule', '@required-global-tag-scenario', '@required-global-tag-example'],
        feature: ['@required-tag-feature', ['@required-tag-feature-subset-A']],
        rule: ['@required-tag-rule'],
        scenario: ['@required-tag-scenario', '/@required-tag-scenario-\\d+/'],
        example: ['@required-tag-example', ['@required-tag-example-subset-A', '@required-tag-example-subset-B']],
        extendRule: false,
        extendExample: false,
      }, []);
    });

    describe('extend', function () {
      it('rule to scenario', function () {
        return runTest('required-tags/NoViolations.feature', {
          ignoreUntagged: true,
          rule: ['@required-tag-rule-on-scenario'],
          extendRule: true,
          extendExample: false,
        }, []);
      });

      it('example to scenario', function () {
        return runTest('required-tags/NoViolations.feature', {
          ignoreUntagged: true,
          example: ['@required-tag-example-on-scenario'],
          extendRule: false,
          extendExample: true,
        }, []);
      });
    });
  });

  describe('detect errors', function () {
    it('feature', function () {
      return runTest('required-tags/Violations.feature', {
        ignoreUntagged: true,
        feature: ['@required-tag-feature'],
      }, [{
        messageElements: {tags: '@required-tag-feature', nodeType: 'Feature'},
        line: 2,
        column: 1,
      }]);
    });

    it('rule', function () {
      return runTest('required-tags/Violations.feature', {
        ignoreUntagged: true,
        rule: ['@required-tag-rule'],
      }, [{
        messageElements: {tags: '@required-tag-rule', nodeType: 'Rule'},
        line: 30,
        column: 3,
      }]);
    });

    it('scenario', function () {
      return runTest('required-tags/Violations.feature', {
        ignoreUntagged: true,
        scenario: ['@required-tag-scenario', '/@required-tag-scenario-\\d+/'],
      }, [{
        messageElements: {tags: '@required-tag-scenario', nodeType: 'Scenario'},
        line: 8,
        column: 3,
      }, {
        messageElements: {tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario'},
        line: 8,
        column: 3,
      }, {
        messageElements: {
          tags: '@required-tag-scenario', nodeType: 'Scenario Outline'
        },
        line: 12,
        column: 3,
      }, {
        messageElements: {
          tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario Outline'
        },
        line: 12,
        column: 3,
      }, {
        messageElements: {tags: '@required-tag-scenario', nodeType: 'Scenario'},
        line: 33,
        column: 5,
      }, {
        messageElements: {tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario'},
        line: 33,
        column: 5,
      }, {
        messageElements: {
          tags: '@required-tag-scenario', nodeType: 'Scenario Outline'
        },
        line: 37,
        column: 5,
      }, {
        messageElements: {
          tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario Outline'
        },
        line: 37,
        column: 5,
      }]);
    });

    it('example', function () {
      return runTest('required-tags/Violations.feature', {
        ignoreUntagged: true,
        example: ['@required-tag-example'],
      }, [{
        messageElements: {tags: '@required-tag-example', nodeType: 'Examples'},
        line: 15,
        column: 5,
      }, {
        messageElements: {tags: '@required-tag-example', nodeType: 'Examples'},
        line: 40,
        column: 7,
      }]);
    });

    describe('extend', function () {
      it('rule to scenario', function () {
        return runTest('required-tags/Violations.feature', {
          ignoreUntagged: true,
          rule: ['@required-tag-rule-on-scenario'],
          scenario: ['@required-tag-scenario', '/@required-tag-scenario-\\d+/'],
          extendRule: true,
        }, [{
          messageElements: {
            tags: '@required-tag-scenario',
            nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: '/@required-tag-scenario-\\d+/',
            nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: '@required-tag-rule-on-scenario',
            nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: '@required-tag-scenario',
            nodeType: 'Scenario Outline'
          },
          line: 12,
          column: 3,
        }, {
          messageElements: {
            tags: '/@required-tag-scenario-\\d+/',
            nodeType: 'Scenario Outline'
          },
          line: 12,
          column: 3,
        }, {
          messageElements: {
            tags: '@required-tag-rule-on-scenario',
            nodeType: 'Scenario Outline'
          },
          line: 12,
          column: 3,
        }, {
          messageElements: {tags: '@required-tag-rule-on-scenario', nodeType: 'Rule'},
          line: 30,
          column: 3,
        }, {
          messageElements: {tags: '@required-tag-scenario', nodeType: 'Scenario'},
          line: 33,
          column: 5,
        }, {
          messageElements: {tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario'},
          line: 33,
          column: 5,
        }, {
          messageElements: {
            tags: '@required-tag-scenario', nodeType: 'Scenario Outline'
          },
          line: 37,
          column: 5,
        }, {
          messageElements: {
            tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario Outline'
          },
          line: 37,
          column: 5,
        }]);
      });

      it('example to scenario', function () {
        return runTest('required-tags/Violations.feature', {
          ignoreUntagged: true,
          scenario: ['@required-tag-scenario', '/@required-tag-scenario-\\d+/'],
          example: ['@required-tag-example-on-scenario'],
          extendExample: true,
        }, [{
          messageElements: {
            tags: '@required-tag-scenario',
            nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: '/@required-tag-scenario-\\d+/',
            nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: '@required-tag-example-on-scenario',
            nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: '@required-tag-scenario', nodeType: 'Scenario Outline'
          },
          line: 12,
          column: 3,
        }, {
          messageElements: {
            tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario Outline'
          },
          line: 12,
          column: 3,
        }, {
          messageElements: {tags: '@required-tag-example-on-scenario', nodeType: 'Examples'},
          line: 15,
          column: 5,
        }, {
          messageElements: {
            tags: '@required-tag-scenario',
            nodeType: 'Scenario'
          },
          line: 33,
          column: 5,
        }, {
          messageElements: {
            tags: '/@required-tag-scenario-\\d+/',
            nodeType: 'Scenario'
          },
          line: 33,
          column: 5,
        }, {
          messageElements: {
            tags: '@required-tag-example-on-scenario',
            nodeType: 'Scenario'
          },
          line: 33,
          column: 5,
        }, {
          messageElements: {
            tags: '@required-tag-scenario', nodeType: 'Scenario Outline'
          },
          line: 37,
          column: 5,
        }, {
          messageElements: {
            tags: '/@required-tag-scenario-\\d+/', nodeType: 'Scenario Outline'
          },
          line: 37,
          column: 5,
        }, {
          messageElements: {tags: '@required-tag-example-on-scenario', nodeType: 'Examples'},
          line: 40,
          column: 7,
        }]);
      });

      it('example and rule to scenario', function () {
        return runTest('required-tags/Violations.feature', {
          ignoreUntagged: true,
          rule: ['@required-tag-rule-on-scenario'],
          example: ['@required-tag-example-on-scenario'],
          extendRule: true,
          extendExample: true,
        }, [{
          messageElements: {
            tags: '@required-tag-rule-on-scenario', nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: '@required-tag-example-on-scenario', nodeType: 'Scenario'
          },
          line: 8,
          column: 3,
        }, {
          messageElements: {
            tags: ['@required-tag-rule-on-scenario'], nodeType: 'Scenario Outline'
          },
          line: 12,
          column: 3,
        }, {
          messageElements: {
            tags: ['@required-tag-example-on-scenario'], nodeType: 'Examples'
          },
          line: 15,
          column: 5,
        }, {
          messageElements: {
            tags: ['@required-tag-rule-on-scenario'], nodeType: 'Rule'
          },
          line: 30,
          column: 3,
        }, {
          messageElements: {
            tags: ['@required-tag-example-on-scenario'], nodeType: 'Scenario'
          },
          line: 33,
          column: 5,
        }, {
          messageElements: {
            tags: ['@required-tag-example-on-scenario'], nodeType: 'Examples'
          },
          line: 40,
          column: 7,
        },]);
      });
    });

    describe('include untagged', function () {
      it('feature', function () {
        return runTest('required-tags/ViolationsUntagged.feature', {
          ignoreUntagged: false,
          feature: ['@required-tag-feature'],
        }, [{
          messageElements: {tags: '@required-tag-feature', nodeType: 'Feature'},
          line: 1,
          column: 1,
        }]);
      });

      it('rule', function () {
        return runTest('required-tags/ViolationsUntagged.feature', {
          ignoreUntagged: false,
          rule: ['@required-tag-rule'],
        }, [{
          messageElements: {tags: '@required-tag-rule', nodeType: 'Rule'},
          line: 15,
          column: 3,
        }]);
      });

      it('scenario', function () {
        return runTest('required-tags/ViolationsUntagged.feature', {
          ignoreUntagged: false,
          scenario: ['@required-tag-scenario'],
        }, [{
          messageElements: {tags: '@required-tag-scenario', nodeType: 'Scenario'},
          line: 6,
          column: 3,
        }, {
          messageElements: {tags: '@required-tag-scenario', nodeType: 'Scenario Outline'},
          line: 9,
          column: 3,
        }, {
          messageElements: {tags: '@required-tag-scenario', nodeType: 'Scenario'},
          line: 17,
          column: 5,
        }, {
          messageElements: {tags: '@required-tag-scenario', nodeType: 'Scenario Outline'},
          line: 20,
          column: 5,
        }]);
      });

      it('example', function () {
        return runTest('required-tags/ViolationsUntagged.feature', {
          ignoreUntagged: false,
          example: ['@required-tag-example'],
        }, [{
          messageElements: {tags: '@required-tag-example', nodeType: 'Examples'},
          line: 11,
          column: 5,
        }, {
          messageElements: {tags: '@required-tag-example', nodeType: 'Examples'},
          line: 23,
          column: 7,
        }
        ]);
      });
    });

    it('subset', function () {
      return runTest('required-tags/Violations.feature', {
        ignoreUntagged: true,
        feature: [['@required-tag-feature-subset-A']],
        scenario: [
          '@required-tag-scenario',
          ['@required-tag-scenario-subset-A', '@required-tag-scenario-subset-B']
        ],
      }, [{
        messageElements: {
          tags: ['@required-tag-feature-subset-A'],
          nodeType: 'Feature'
        },
        line: 2,
        column: 1,
      }, {
        messageElements: {
          tags: ['@required-tag-scenario'],
          nodeType: 'Scenario'
        },
        line: 8,
        column: 3,
      }, {
        messageElements: {
          tags: ['@required-tag-scenario-subset-A', '@required-tag-scenario-subset-B'],
          nodeType: 'Scenario'
        },
        line: 8,
        column: 3,
      }, {
        messageElements: {
          tags: ['@required-tag-scenario'],
          nodeType: 'Scenario Outline'
        },
        line: 12,
        column: 3,
      }, {
        messageElements: {
          tags: ['@required-tag-scenario'],
          nodeType: 'Scenario'
        },
        line: 33,
        column: 5,
      }, {
        messageElements: {
          tags: ['@required-tag-scenario'],
          nodeType: 'Scenario Outline'
        },
        line: 37,
        column: 5,
      }, {
        messageElements: {
          tags: ['@required-tag-scenario-subset-A', '@required-tag-scenario-subset-B'],
          nodeType: 'Scenario Outline'
        },
        line: 37,
        column: 5,
      }]);
    });
  });
});
