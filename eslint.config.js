/* eslint-disable no-underscore-dangle */
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  pluginJs.configs.recommended,
  // [Support of new eslint flat config](https://github.com/airbnb/javascript/issues/2804)
  ...compat.extends('airbnb-base', 'prettier'),
  {
    languageOptions: {
      // https://jestjs.io/docs/getting-started#using-eslint
      globals: { ...globals.node, ...globals.jest },
      ecmaVersion: 'latest',
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
      // https://nodejs.org/api/esm.html#mandatory-file-extensions
      'import/extensions': ['error', 'always'],
    },
  },
];
