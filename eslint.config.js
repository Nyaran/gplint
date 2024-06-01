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
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/key-spacing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/comma-spacing': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/object-curly-spacing': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/space-infix-ops': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    }
  },
);





// mimic CommonJS variables -- not needed if using CommonJS
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);


//const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

/*export default [
  {
    files: [ 'src/**.ts' ]
  },
  ...compat.extends('love'),
  {
    rules: {
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error', 'always'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  {
    rules: {
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/key-spacing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/comma-spacing': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/object-curly-spacing': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/space-infix-ops': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    }
  },
];
*/
