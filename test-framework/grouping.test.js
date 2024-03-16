describe('grouping test', () => {
  it('should pass', () => {
    expect(1 * 5).toBe(5);
  });
});

describe('grouping test 2', () => {
  it('should fail', () => {
    expect(10).toBe(100);
  });
});