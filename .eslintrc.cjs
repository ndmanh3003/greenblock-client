module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '!.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'brace-style': 'error',
    'no-irregular-whitespace': 'error',
    indent: ['error', 2],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never']
  }
}
