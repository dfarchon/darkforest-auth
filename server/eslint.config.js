import config from '@darkforest-auth/eslint-config';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...config,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // typescript rules
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
    }
  },
  /*
    We configure the global ignores pattern rulerecord config below. (equivalient to the old .eslintignore)
    Only ignores is allow inside the object below, otherwise it will not be treated as a global ignore.
  */
  {
    ignores: [
      'eslint.config.js',
    ],
  },
];