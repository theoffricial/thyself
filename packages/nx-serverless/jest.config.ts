import type { Config } from 'jest';

/* eslint-disable */
export default {
  displayName: 'nx-serverless',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  // roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/nx-serverless',
  // setupFiles: ['./src/__mocks__/serverless/lib/configuration/read.ts'],
  // moduleNameMapper: {
  //   '^serverless/lib/configuration/read$': '<rootDir>/src/__mocks__/serverless/lib/configuration/read.ts',
  // },
} as Config;
