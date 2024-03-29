module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'color-function-notation': 'legacy',
    'declaration-no-important': true,
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': [
      // BEM
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)*(--[a-z0-9]([-]?[a-z0-9]+)*)*$',
      {
        resolveNestedSelectors: true,
      },
    ],
    'scss/at-rule-no-unknown': true,
    'scss/no-global-function-names': null,
  },
};
