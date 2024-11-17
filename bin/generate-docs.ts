import path from 'node:path';
import {promises as fs} from 'node:fs';
import os from 'node:os';

import {getAllRules} from '../src/rules.js';
import {Documentation} from '../src/types.js';

const RULES_DOC_FOLDER = './docs/docs/rules';

async function buildErrorCodesDocumentation() {
	const rules = await getAllRules();

	await fs.mkdir(RULES_DOC_FOLDER, {recursive: true});

	return Promise.all(Object.entries(rules).filter(([, rule]) => rule.documentation).map(([name, rule]) => generateDocumentationFiles(name, rule.documentation)));
}

async function generateDocumentationFiles(name: string, ruleDoc: Documentation) {
	const lines = [
		`---`,
		`slug: ${name}`,
		`title: ${[name, ruleDoc.configurable ? '⚙️' : undefined, ruleDoc.fixable ? '🪄' : undefined].filter(i => i).join(' ')}`,
		`---`,
		`# ${name}`,
		`${ruleDoc.description}`,
		'',
	];

	const examplesBlock = [];

	for (const {title, description, config} of ruleDoc.examples) {
		examplesBlock.push([
			`## ${title}`,
			`> ${description}`,
			'```json',
			JSON.stringify(config, null, 2),
			'```',
		].join(os.EOL));
	}

	lines.push(examplesBlock.join(os.EOL));

	lines.push(os.EOL);

	await fs.writeFile(path.join(RULES_DOC_FOLDER, `${name}.md`), lines.join(os.EOL));
}

await buildErrorCodesDocumentation();
