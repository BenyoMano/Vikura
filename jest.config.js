module.exports = {
    preset: 'react-native',
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transform: {
      '^.+\\.(js|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|your-module)/)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx|ts|tsx)$',
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
    coverageReporters: ['text-summary', 'lcov'],
  };
  