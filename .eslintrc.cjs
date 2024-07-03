module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-unused-vars': 'error',
    'no-undef': 'error',
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
