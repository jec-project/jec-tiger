# JEC Tiger Project

Tiger is the standard implementation of the [JavaScript Unit Testing API *(JUTA)*][jec-juta-url] specification. It provides the portability of unit tests for TypeScript applications.

[![][jec-logo]][jec-url]

JUTA allows developers to write portable unit tests, independently from the unit
testing framework they use. Test suites are written in [TypeScript](https://www.typescriptlang.org/) 
and are based on the same kind of annotations than [Junit](http://junit.org/junit4/).

The Tiger framework will run JUTA test suites over the [Mocha framework](https://mochajs.org/).

## Requirements

JEC Tiger needs the following system parameters in order to work correctly:

- Node 6+
- npm 3+
- TypeScript 2+

## Installation

Set up the JEC Tiger and the Mocha modules with:

```bash
$ npm install jec-tiger --save-dev
$ npm install mocha --save-dev
```

## Tiger Framework Initialization

You have to configure the Tiger framework with a basic script file (e.g. `test-config.ts`)
in order to run JUTA unit tests:

```javascript
import {TestStats} from "jec-juta";
import {Tiger, TigerFactory} from "jec-tiger";

let factory:TigerFactory = new TigerFactory();
let tiger:Tiger = factory.create();
tiger.process((stats:TestStats)=> {
  if(stats.error) console.error(stats.error);
 });
```

By default, test classes are located in the `test` folder, at the root of your project.
You can use the Tiger API to set the location of the test folder:

```javascript
const testFolder:string[] = ["my-test-folder"];
let tiger:Tiger = factory.create();
tiger.setTestPaths(testFolder);
```

To call the configuration file with the mocha command, add the following
snippet to your `package.json` file:
```json
...
"scripts": {
  "test": "mocha test-config"
}
...
```

Now, unit tests can be run by using the standard npm command:
```bash
$ npm test
```

## Using JUTA Decorators

All JUTA decorators have to be imported with the ES6 syntax:

```javascript
import { TestSuite, Test } from "jec-juta";

@TestSuite({
  description: "Tests the \"HelloWorld\" class methods."
})
export class HelloWorldTest {
  
  @Test(
    description: "should say Hello to the world 3 times",
    repeat: 3
  )
  public sayHelloTest():void {
    // Test here...
  }
}
```

For a complete list of available decorators, please refer to the [JUTA project][jec-juta-url].

## Running Tests

To execute all unit tests, use:

```bash
$ grunt test
```

## API Reference

The API Reference documentation is not included into the JEC Tiger node module. To build the API reference documentation, use:

```bash
$ grunt doc
```

Documentation will be generated in the `docs/api-reference` repository.
The online version of the  API reference documentation will be available soon at the JEC Website.

The documentation generator is [TypeDoc](http://typedoc.org/)

## Update Release Notes

**Current stable release:** [1.1.7](CHANGELOG.md#jec-tiger-1.1.7)
 
For a complete listing of release notes for all JEC Tiger update releases, see the [CHANGELOG](CHANGELOG.md) file. 

## License
This JEC Tiger Project is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

```
Copyright 2016-2017 Pascal ECHEMANN.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[jec-url]: https://github.com/pechemann/JEC
[jec-juta-url]: https://github.com/pechemann/jec-juta
[jec-logo]: https://raw.githubusercontent.com/pechemann/JEC/master/assets/jec-logos/jec-logo.png