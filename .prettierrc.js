module.exports = {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'none',
  // parser: 'typescript',
  // proseWrap: 'preserve',
  // quoteProps: 'as-needed',
  // arrowParens: 'avoid',
  // doc: false,
  // jsxBracketSameLine: true,
  // tabWidth: 4,

  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      parser: 'flow'
    }
  ]
};
