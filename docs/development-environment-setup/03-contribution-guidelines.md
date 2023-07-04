# Contribution Guidelines

## Versions

We follow a loose https://semver.org/ policy.

```
Given a version number MAJOR.MINOR.PATCH, increment the:
1.  MAJOR version when you make incompatible API changes
2.  MINOR version when you add functionality in a backward compatible manner
3.  PATCH version when you make backward compatible bug fixes
```

## Development

We encourage using the `dc4eu` branch and treating it like the `main`.  Development usually adheres to the following steps:
 1. Create or pick an issue
 2. Create a corresponding branch (on all the affected repositories)
 3. Commit your changes: You can reference the relevant issue number and the type of the commit (feat, fix, style, refactor, test, docs), e.g. `docs: Update README, close #45`
 4. Push your branch
 5. Submit a pull request (PR)
 6. Participate in the review process
 7. Wait for merging or merge a reviewed PR

## Git Actions

Pushing (or merging) to specific branches will trigger the creation of tagged releases based on the version specified in the `package.json` file of the corresponding repository. The branches in question will be discussed and agreed upon collectively. 