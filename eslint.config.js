import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Imports point one way: app → pages → features → shared.
  ...[
    { files: ['src/shared/**'], forbidden: ['features', 'pages', 'app'] },
    { files: ['src/features/**'], forbidden: ['pages', 'app'] },
    { files: ['src/pages/**'], forbidden: ['app'] },
  ].map(({ files, forbidden }) => ({
    files,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: forbidden.map((dir) => `**/${dir}/**`),
              message: 'Imports must point one way: app → pages → features → shared.',
            },
          ],
        },
      ],
    },
  })),
)
