const fs = require('fs');
const vm = require('vm');
const { basename, join, dirname } = require('path');
const NodeEnvironment = require('jest-environment-node');
const { expect } = require('expect');
const mock = require('jest-mock');
const { describe, it, run, resetState } = require('jest-circus');

exports.runTest = async function (testFile) {
  const testResult = {
    success: false,
    errorMessage: null,
    testResults: null,
  };

  try {
    resetState();

    const environment = new NodeEnvironment.default({
      projectConfig: {
        testEnvironmentOptions: {
          describe,
          it,
          expect,
          mock,
        },
      }
    });

    const customRequire = (fileName) => {
      const code = fs.readFileSync(join(dirname(testFile), fileName), 'utf-8');

      const moduleFactory = vm.runInContext(
        `(function(module, require) {${code}})`,
        environment.getVmContext(),
      );

      const module = { exports: {} };

      moduleFactory(module, customRequire);

      return module.exports;
    };

    customRequire(basename(testFile));
    const { testResults } = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
}
