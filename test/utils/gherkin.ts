import { expect } from 'chai';
import { getNodeType } from '../../src/rules/utils/gherkin.js';
import { GherkinKeyworded } from '../../src/types.js';

describe('Test for getNodeType function', () => {
	Object.entries({
		en: [ // English
			['Feature', 'Feature'],
			['Rule', 'Rule'],
			['Background', 'Background'],
			['Scenario', 'Scenario'],
			['Scenario Outline', 'Scenario Outline'],
			['Examples', 'Examples'],
			['Given ', 'Step'],
			['When ', 'Step'],
			['Then ', 'Step'],
			['And ', 'Step'],
			['But ', 'Step'],
			['* ', 'Step'],
		],
		es: [ // Spanish
			['Característica', 'Feature'],
			['Regla', 'Rule'],
			['Antecedentes', 'Background'],
			['Escenario', 'Scenario'],
			['Esquema del escenario', 'Scenario Outline'],
			['Ejemplos', 'Examples'],
			['Dado ', 'Step'],
			['Cuando ', 'Step'],
			['Entonces ', 'Step'],
			['Y ', 'Step'],
			['Pero ', 'Step'],
			['* ', 'Step'],
		],
	}).forEach(([lang, keywords]) => {
		keywords.forEach(([keyword, expected]) => {
			it(`should return "${expected}" for ${keyword} type node in ${lang}`, () => {
				const node: GherkinKeyworded = {
					keyword,
					name: 'Foo bar',
					description: '',
					tags: [],
					location: {
						line: 1,
						column: 1,
					},
					language: lang,
					children: [],
				};
				const result = getNodeType(node, lang);
				expect(result).to.equal(expected);
			});
		});
	});

	it('should throw error with unhandled keyword', () => {
		const node: GherkinKeyworded = {
			keyword: 'Unhandled',
			name: 'Foo bar',
			description: '',
			tags: [],
			location: {
				line: 1,
				column: 1,
			},
			language: 'en',
			children: [],
		};

		expect(() => getNodeType(node, 'en')).to.throw('Unknown Gherkin node name. "Unhandled", was resolved as undefined');
	});
});
