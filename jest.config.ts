import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|js)x?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
