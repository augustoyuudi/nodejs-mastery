const fs = require('fs');
const vm = require('vm');
const NodeEnvironment = require('jest-environment-node');
const { expect } = require('expect');
const mock = require('jest-mock');
const { describe, it, run, resetState } = require('jest-circus');

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, 'utf-8');

  const testResult = {
    success: false,
    errorMessage: null,
    testResults: null,
  };

  try {
    resetState();

    const environment = new NodeEnvironment.default({
      projectConfig: {
        testEnvironmentOptions: { describe, it, expect, mock },
      }
    });
    vm.runInContext(code, environment.getVmContext());

    const { testResults } = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
}
