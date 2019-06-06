module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    // required to lint *.vue files
    plugins: ['vue'],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        semi: [2, 'always', {omitLastInOneLineBlock: true}],
        'space-before-function-paren': ['error', 'never']
    }
};