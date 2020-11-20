module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text-summary', 'html'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/infrastructure/server/express/server.ts',
  ],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/helper/server.ts'],
};
