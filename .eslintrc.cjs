module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // React Refresh 规则
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 格式化规则
    // 1. 强制使用分号
    'semi': ['error', 'always'],
    // 2. 优先使用单引号
    'quotes': ['error', 'single', { avoidEscape: true }],
    // 3. 花括号与变量之间要有空格
    'object-curly-spacing': ['error', 'always'],
  },
}
