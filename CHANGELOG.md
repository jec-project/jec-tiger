# JEC Tiger Project: Update Release Notes

<a name="jec-tiger-1.1.1"></a>
## **1.1.1** (2017-07-14)

### Bug Fixes

- **TigerTestRunner.runAllTests():** the callback method was never called when the `testSuiteColl` parameter was an empty  array. This caused the callback method of the `DefaultTigerContainer.process()` method to never been invokated.

### Features

- **JUTA Update:** implements the new `@AfterClass` and `@BeforeClass` decorators.
- **JUTA Update:** implements the new `instanciationPolicy` property.
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