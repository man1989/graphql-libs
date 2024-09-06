import tseslint from 'typescript-eslint';
import * as graphql from '@graphql-eslint/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['**/dist/', '**/__generated__/'],
  },
  {
    name: "typescript-code",
    extends: [
      ...tseslint.configs.recommended,
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ]
    }
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphql.parser,
      parserOptions: {
        graphQLConfig: {
          schema: '**/*.graphql',
        },
      },
    },
    plugins: {
      '@graphql-eslint': { rules: graphql.rules },
    },
    rules: {
      ...graphql.flatConfigs['schema-recommended'].rules,
      '@graphql-eslint/no-anonymous-operations': 'error',
    },
  },
);
