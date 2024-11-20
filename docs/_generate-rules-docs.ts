import path from 'node:path';
import {promises as fs} from 'node:fs';
import os from 'node:os';

import {getAllRules} from '../src/rules.js';
import {Documentation} from '../src/types.js';
import * as glob from 'glob';

const RULES_DOC_FOLDER = './docs/rules';
const FILE_PREFIX = 'autogen-';

async function buildErrorCodesDocumentation() {
	const rules = await getAllRules();

	await fs.mkdir(RULES_DOC_FOLDER, {recursive: true});

	const previousRulesDocs = glob.sync(`${RULES_DOC_FOLDER}/${FILE_PREFIX}*.md`);

	await Promise.all(previousRulesDocs.map(f => fs.unlink(f)));

	return Promise.all(Object.entries(rules).filter(([, rule]) => rule.documentation)
		.map(([name, rule]) => generateDocumentationFiles(name, rule.documentation)));
}

async function generateDocumentationFiles(name: string, ruleDoc: Documentation) {
	const lines = [
		'---',
		`slug: ${name}`,
		`title: ${[name, ruleDoc.configuration?.length > 0 ? '⚙️' : undefined, ruleDoc.fixable ? '🪄' : undefined].filter(i => i).join(' ')}`,
		'---',
		`# ${name}${ruleDoc.fixable ? ' 🪄' : ''}`,
		ruleDoc.description,
		'',
	];

	if (ruleDoc.configuration) {
		lines.push('## Configuration');
		lines.push('| Name | Type | Description | Default |');
		lines.push('|------|------|-------------|---------|');

		for (const config of ruleDoc.configuration) {
			lines.push(`| \`${config.name}\` | \`${config.type}\` | ${config.description} | ${config.default} |`);
		}
	}

	const examplesBlock = [];

	for (const {
		title,
		description,
		config
	} of ruleDoc.examples) {
		examplesBlock.push([
			`## ${title}`,
			`> ${description.split(os.EOL).join(`${os.EOL}> `)}`,
			'```json',
			JSON.stringify(config, null, 2),
			'```',
		].join(os.EOL));
	}

	lines.push(examplesBlock.join(os.EOL));

	lines.push(os.EOL);

	await fs.writeFile(path.join(RULES_DOC_FOLDER, `${FILE_PREFIX}${name}.md`), lines.join(os.EOL));
}

void buildErrorCodesDocumentation()
	.then(() => 'Rules documentation generated successfully.');
