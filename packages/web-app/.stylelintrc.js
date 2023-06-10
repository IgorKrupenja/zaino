module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'declaration-no-important': true,
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': [
      // BEM
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)*(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        resolveNestedSelectors: true,
      },
    ],
    'scss/at-rule-no-unknown': true,
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
};
