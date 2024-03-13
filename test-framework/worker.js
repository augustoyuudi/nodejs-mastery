const fs = require('fs');

const expect = (received) => {
  return {
    toBe(expected) {
      if (received !== expected) {
        throw new Error(`Expected ${expected} but received ${received}`);
      }
      return true;
    }
  };
};

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, 'utf-8');

  const testResult = {
    success: false,
    errorMessage: null,
  };

  try {
    eval(code); // eval has access to the scope around
    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
}
