const fs = require('fs');
const { expect } = require('expect');
const mock = require('jest-mock');
const { describe, it, run, resetState } = require('jest-circus');
const vm = require('vm');

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, 'utf-8');

  const testResult = {
    success: false,
    errorMessage: null,
    testResults: null,
  };

  try {
    resetState();

    const context = { describe, it, expect, mock };
    vm.createContext(context);
    vm.runInContext(code, context);

    const { testResults } = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
}
