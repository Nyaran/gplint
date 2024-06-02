import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error', 'always'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-var-requires': 'off',
    }
  },
  {
    // Temporary disabled rules
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // 14 (requires "strictNullChecks", implies 69 build errors)
      '@typescript-eslint/restrict-template-expressions': 'off', // 22
      '@typescript-eslint/no-unsafe-argument': 'off', // 4
      '@typescript-eslint/no-unnecessary-condition': 'off', // 209
    }
  },
);
