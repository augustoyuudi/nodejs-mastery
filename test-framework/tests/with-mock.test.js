const { user } = require('../mocks/user');

describe('test with mock', () => {
  it('should require mock correctly', () => {
    expect(user.name).toBe('John Doe');
  });
});