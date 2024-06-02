import { RuleError } from './types.js';

/**
 * Wrapping error class to handle the rejected promises about Rule Errors
 */
export class RuleErrors extends Error {
  private readonly errors: RuleError[];
  constructor(errors: RuleError[] = []) {
    super();

    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}
