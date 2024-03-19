module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-refresh', 'import'],
  rules: {
    'consistent-return': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 0,
    'no-plusplus': 'off',
    'react/function-component-definition': 0,
    'import/order': [
      1,
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        pathGroupsExcludedImportTypes: ['react'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react',
            position: 'before',
          },
        ],
      },
    ],
  },
};
