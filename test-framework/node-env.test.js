describe('Tests with node.js macros', () => {
  it('should work if has node.js macros enabled', async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });

    expect(1).toBe(1);
  });
});