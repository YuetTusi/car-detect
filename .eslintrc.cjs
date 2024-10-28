module.exports = {
  rules: {
    semi: ['warn', 'always'],
    'no-unused-vars': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
  ],
};
