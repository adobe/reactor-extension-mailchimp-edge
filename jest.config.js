/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

'use strict';

// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'test views',
      setupFilesAfterEnv: ['./src/view/jest.setup.js'],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '\\.(css|styl)$': '<rootDir>/src/view/__tests_helpers__/styleMock.js'
      },
      modulePathIgnorePatterns: ['<rootDir>/src/lib/'],
      transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest'
      }
    },
    {
      displayName: 'test library modules',
      testEnvironment: 'node',
      modulePathIgnorePatterns: ['<rootDir>/src/view/']
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**']
    }
  ],

  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/__tests__/**'
  ],

  coverageReporters: ['lcov', 'text', 'html']
};
