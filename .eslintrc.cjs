module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  ignorePatterns: ['dist', '!.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'import', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    curly: ['error', 'all'],
    '@typescript-eslint/no-explicit-any': 'warn',
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'brace-style': 'error',
    'no-irregular-whitespace': 'error',
    indent: ['off', 2],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'react-hooks/exhaustive-deps': 'off',
    'import/order': [
      1,
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'index'
        ],
        pathGroups: [
          {
            pattern: 'components',
            group: 'internal'
          },
          {
            pattern: 'common',
            group: 'internal'
          },
          {
            pattern: 'routes/ **',
            group: 'internal'
          },
          {
            pattern: 'assets/**',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
        multiline: 'ignore',
        reservedFirst: true,
        shorthandFirst: true,
        shorthandLast: false,
        callbacksLast: true
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-unescaped-entities': 'off'
  }
}
