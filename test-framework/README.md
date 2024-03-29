## This is a test framework similar to JEST

This was developed to understand how these frameworks runs in the background.

### List of features that can still be implemented:

- [ ] Print the name of every `describe`/`it`, including passed tests.
- [ ] Print a summary of how many tests and assertions passed or failed, and how long the test run took.
- [ ] Ensure there is at least one test in a file using `it`, and fail the test if there aren’t any assertions.
- [ ] Inject `describe`, `it`, `expect` and `mock` using a “fake module” that can be loaded via `require('best')`.
- [ ] _Medium_: Transform the test code using Babel or TypeScript ahead of execution.
- [ ] _Medium:_ Add a configuration file and command line flags to customize test runs, like changing the output colors, limiting the number of worker processes or a `bail` option that exits as soon as one test fails.
- [ ] _Medium:_ Add a feature to record and compare snapshots.
- [ ] _Advanced:_ Add a watch mode that re-runs tests when they change, using `jest-haste-map`’s [`watch`](https://github.com/facebook/jest/blob/04b75978178ccb31bccb9f9b2f8a0db2fecc271e/packages/jest-haste-map/src/index.ts#L75) option and listening to changes via `hasteMap.on('change', (changeEvent) => { … })`.
- [ ] _Advanced:_ Make use of `jest-runtime` and `jest-resolve` to provide a full module and `require` implementation.
- [ ] _Advanced_: What would it take to collect code coverage? How can we transform our test code to keep track of which lines of code were run?
- [ ] Sequencing tests to optimize performance
- [ ] Compiling JavaScript or TypeScript files
- [ ] Collect code coverage
- [ ] Interactive watch mode
- [ ] Snapshot testing
- [ ] Run multiple projects in a single test run
- [ ] Live reporting and printing a test run summary