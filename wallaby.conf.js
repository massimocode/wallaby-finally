'use strict';

module.exports = function (wallaby) {
  return {
    files: [
      'empty.js'
    ],
    testFramework: 'tape',
    tests: [
      'tests/**/*.test.js'
    ],
    env: {
      type: 'node'
    },
    setup: () => {
      process.env.localProjectDir = wallaby.localProjectDir;
    },
    workers: {
      initial: 1,
      regular: 1,
      recycle: true
    }
  };
};