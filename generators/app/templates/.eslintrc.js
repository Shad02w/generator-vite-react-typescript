/** @type {import('eslint').Linter.Config} */
const config = {
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        commonjs: true
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    plugins: ["react-hooks"],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react/display-name": "off",
        "@typescript-eslint/no-explicit-any": "off"
    },
    settings: {
        react: {
            version: "latest"
        }
    }
}

module.exports = config
