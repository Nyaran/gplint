import {ErrorsByFile} from '../types.js';

export function print(results: ErrorsByFile[]): string {
	return JSON.stringify(results);
}
