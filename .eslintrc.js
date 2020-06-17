module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',

    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },

    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        parser: 'babel-eslint',
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        semi: [2, 'always'],
        quotes: [2, 'single', { allowTemplateLiterals: true }],
    },

    root: true,

    extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
};
