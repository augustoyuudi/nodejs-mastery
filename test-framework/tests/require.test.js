const { user } = require('../mocks/user.js');

describe('test with mock', () => {
  it('should require mock correctly', () => {
    expect(user.name).toBe('John Doe');
  });

  it('should fail purposely to test require method', () => {
    expect(user.name).toBe('Not John');
  });
});