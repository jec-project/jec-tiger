# JEC Tiger Project: Update Release Notes

<a name="jec-tiger-1.2.2"></a>
## **1.2.2** (2018-07-28)

### Bug Fixes

- Fixing test cases issues due to dependencies upgrade

### Features

- Updating all dependencies
- Test cases improvements

<a name="jec-tiger-1.2.1"></a>
## **1.2.1** (2018-07-21)

### Bug Fixes

### Features

- Dependencies upgrade

<a name="jec-tiger-1.2.0"></a>
## **1.2.0** (2018-04-08)

### Bug Fixes

### Features

- Adding the `removeProcessors` method

<a name="jec-tiger-1.1.9"></a>
## **1.1.9** (2018-03-31)

### Bug Fixes

### Features

- Adding the `beforeProcess` method

<a name="jec-tiger-1.1.8"></a>
## **1.1.8** (2017-12-26)

### Bug Fixes

### Features

- Dependencies upgrade
- Fixing `jec-commons` module break changes
- **TigerSourceFileInspector**: adding implementation for the `SourceFileInspector` new API

<a name="jec-tiger-1.1.7"></a>
## **1.1.7** (2017-09-06)

### Bug Fixes

- **PropertyDescriptor**: fixing the correct value of the returned element in method decorators: using `descriptor` instead of `target`

### Features

- Dependencies upgrade

<a name="jec-tiger-1.1.6"></a>
## **1.1.6** (2017-08-20)

### Bug Fixes

- **postinstall**: removing the post install script

### Features

- **dist**: adding binaries to the `dist` folder

<a name="jec-tiger-1.1.5"></a>
## **1.1.5** (2017-08-20)

### Bug Fixes

### Features

- Fixing peer dependencies for GlassCat alpha releases integration

<a name="jec-tiger-1.1.4"></a>
## **1.1.4** (2017-08-16)

### Bug Fixes

### Features

- **build**: adding build script to npm install process for GlassCat install optimisation
- **index.ts**: refactoring index.ts file for better types generation
- Dependencies upgrade
- **TigerSourceFileInspector**: adding implementation for the new `SourceFileInspector` interface signature

<a name="jec-tiger-1.1.3"></a>
## **1.1.3** (2017-07-17)

### Bug Fixes

- Fixes JUTA 1.2.2 dependency missing in the `package.json` file.

### Features

- JUTA 1.2.2 dependency upgrade

<a name="jec-tiger-1.1.2"></a>
## **1.1.2** (2017-07-17)

### Bug Fixes

### Features

- JUTA 1.2.2 dependency upgrade

<a name="jec-tiger-1.1.1"></a>
## **1.1.1** (2017-07-14)

### Bug Fixes

- **TigerTestRunner.runAllTests():** the callback method was never called when the `testSuiteColl` parameter was an empty  array. This caused the callback method of the `DefaultTigerContainer.process()` method to never been invokated.

### Features

- **JUTA Update:** implements the new `@AfterClass` and `@BeforeClass` decorators.
- **JUTA Update:** implements the new `instantiationPolicy` property.
- **TestClassRunner:** the new `TestClassRunner` class allows test suites delegation.

<a name="jec-tiger-1.1.0"></a>
## **1.1.0** (2017-06-05)

### Bug Fixes

### Features

- **JUTA Update:** implements the new `@AfterAll` and `@BeforeAll` decorators.
- **build improvements:** in this release definition types are updated during the build process.

<a name="jec-tiger-1.0.1"></a>
## **1.0.1** (2017-05-06)

### Bug Fixes

### Features

- Dependencies upgrade

<a name="jec-tiger-1.0.0"></a>
## **1.0.0** (2017-05-06)

### Bug Fixes

### Features

- **@Async:** implementation of the `@Async` annotation

<a name="jec-tiger-1.0.0-RC1"></a>
## **1.0.0-RC1** (2017-05-28)

### Bug Fixes

### Features

- Initial release of the JEC Tiger framework