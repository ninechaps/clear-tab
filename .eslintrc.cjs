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
    // 4. 缩进使用 2 个空格
    'indent': ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false,
    }],
  },
}
