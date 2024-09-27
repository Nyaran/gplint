import { FileData } from '../../types.js';
import fs from 'node:fs';

export function modifyLine(file: FileData, line: number, newContent: string) {
	const lines = getFileLines(file);

	lines[line - 1] = newContent;

	const newFileContent = lines.join('\n');

	fs.writeFileSync(file.relativePath, newFileContent);
}

export function getLineContent(file: FileData, line: number) {
	return getFileLines(file)[line - 1];
}

function getFileLines(file: FileData) {
	return fs.readFileSync(file.relativePath, 'utf8').split('\n');
}
