module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@docs/(.*)$': '<rootDir>/docs/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
  },
};
