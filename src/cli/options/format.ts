export const format = {
  alias: 'f',
  description: 'Output format.',
  required: false,
  type: 'string',
  choices: ['json', 'stylish', 'xunit'] as const,
  default: 'stylish',
};
