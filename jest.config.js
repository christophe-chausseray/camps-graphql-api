module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text-summary', 'html'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/e2e/server.ts'],
};
