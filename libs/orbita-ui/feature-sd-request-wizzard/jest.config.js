module.exports = {
  displayName: 'orbita-ui-feature-sd-request-wizzard',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory:
    '../../../coverage/libs/orbita-ui/feature-sd-request-wizzard',
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment',
    ],
};
