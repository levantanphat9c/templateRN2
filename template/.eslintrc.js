module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: './tsconfig.json', // Use the TypeScript config
  },
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  extends: [
    'eslint:recommended', // Use the recommended rules from eslint
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // Use the recommended rules from @eslint-plugin-react
    'plugin:react-native/all', // Use the recommended rules from @eslint-plugin-react-native
    'plugin:prettier/recommended', // Use the recommended rules from @eslint-plugin-prettier
    'prettier', // Use the recommended rules from prettier
  ],
  env: {
    browser: true, // Enables browser global variables
    es2021: true, // Enables ES2021 global variables
    node: true, // Enables Node.js global variables and Node.js scoping
    'react-native/react-native': true, // Enables React Native global variables
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'src/templates/*'], // Ignore node_modules and build directories
  rules: {
    // ERROR
    'prettier/prettier': 'error',
    'react/self-closing-comp': 'error', // Enforce self-closing tags
    'no-console': 'error', // Disallow console
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],

    // WARN
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // Ignore unused variables starting with _
      },
    ],
    'react-native/no-inline-styles': 'warn', // Disallow inline styles
    '@typescript-eslint/no-explicit-any': 'warn', // Disallow the use of any type

    // OFF
    'react/jsx-uses-react': 'off', // Disable react/react-in-jsx-scope
    'react/react-in-jsx-scope': 'off', // Disable react/react-in-jsx-scope
    '@typescript-eslint/explicit-function-return-type': 'off', // Disable explicit return types
    'react/prop-types': 'off', // Disable prop-types
    'react-native/no-raw-text': 'off', // Disable raw text
    'react/display-name': 'off', // Disable display name
  },
  overrides: [
    // Override rules for TypeScript files
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types
      },
    },
  ],
};
