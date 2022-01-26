module.exports = {
  // Javascript
  extends: [
    "plugin:import/recommended",
    "plugin:monorepo/recommended",
    "prettier",
  ],
  plugins: ["import", "unused-imports"],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
    "import/extensions": "off",
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
    // Enforce all imports, and any potential side-effects, at the top of the file
    "import/first": "error",
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
    // To avoid any nasty side-effects, all exports must be defined in immutable terms
    "import/no-mutable-exports": "error",
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
    // Rule collides with aliases and monorepo settings
    "import/no-unresolved": "off",
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md
    "import/no-unused-modules": "warn",
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    // Using the alphabetic order simil to the one by VSCode's import sort configuration.
    // The only difference being that, due to the comparison function used by the plugin,
    // names that begin with an underscore are placed after letters, rather than before
    // [See](https://github.com/import-js/eslint-plugin-import/issues/1742#issuecomment-968376099)
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          ["builtin", "external", "internal"],
          "index",
          "parent",
          "sibling",
        ],
      },
    ],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
    // In my opinion, default exports are bothersome to maintain, as it forces import names
    // to be arbitrarily defined
    "import/prefer-default-export": "off",
    // https://eslint.org/docs/rules/no-use-before-define#options
    // JS variables are particularly problematic because of hoisting
    "no-use-before-define": ["error", { variables: true }],
    // https://eslint.org/docs/rules/no-unused-vars
    // Only emit warnings during development
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    // https://eslint.org/docs/rules/no-console
    // A logger with dev/prod distinctions should be used instead
    "no-console": "warn",
    // https://eslint.org/docs/rules/no-nested-ternary
    // This rule is incompatible with the functional way of doing things
    "no-nested-ternary": "off",
    // https://eslint.org/docs/rules/no-shadow
    // shadow names are often the cause of many errors, even during development
    "no-shadow": "error",
    // https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md
    // For best results with tree shaking, we want to avoid any unnecessary imports
    "unused-imports/no-unused-imports": "warn",
  },
  ignorePatterns: ["node_modules", "lib"],
  overrides: [
    {
      // Typescript
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parserOptions: {
        ecmaversion: 2020,
        project: "./packages/tsconfig.settings.json",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/no-empty-interface": ["warn"],
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "default-case": "warn",
        "no-else-return": "warn",
        "no-shadow": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      plugins: ["jest"],
      env: { "jest/globals": true },
    },
  ],
};
