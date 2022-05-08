import {ErrorsByFile} from '../types';

export function print(results: ErrorsByFile[]): string {
  return JSON.stringify(results);
}
