module.exports = {
  projects: [
    '<rootDir>/apps/frontend',
    '<rootDir>/apps/backend',
  ],
  collectCoverageFrom: [
    'apps/*/src/**/*.{ts,tsx}',
    '!apps/*/src/**/*.d.ts',
    '!apps/*/src/**/*.spec.ts',
    '!apps/*/src/**/*.test.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
}