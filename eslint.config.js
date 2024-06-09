import eslint from '@eslint/js';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
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
      '@typescript-eslint/restrict-template-expressions': ['error', {
        allowNumber: true,
        allowArray: true,
      }],
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // requires strictNullChecks
      '@typescript-eslint/no-unnecessary-condition': 'off', // requires strictNullChecks
    }
  },
  {
    plugins: {'chai-friendly': pluginChaiFriendly},
    rules: {
      'no-unused-expressions': 'off', // disable original rule
      '@typescript-eslint/no-unused-expressions': 'off', // disable original rule
      'chai-friendly/no-unused-expressions': 'error'
    },
  }
);
