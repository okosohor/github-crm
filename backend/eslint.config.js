const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');

/** @type {import("eslint").FlatConfig[]} */
module.exports = [
  {
    ignores: ['node_modules', 'dist', 'eslint.config.js'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'spaced-comment': [
        'warn',
        'always',
        {
          markers: ['/'],
          exceptions: ['-'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
