//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import "mocha";
import * as chai from "chai";
import * as spies from "chai-spies";
import {Decorator} from "jec-commons";
import {AnnotatedMethodType} from "jec-juta";
import {TestSuiteDescriptorRegistry} from "../../../../../../src/com/onsoft/tiger/metadata/TestSuiteDescriptorRegistry";
import {TestSuiteDescriptor} from "../../../../../../src/com/onsoft/tiger/reflect/TestSuiteDescriptor";

// Class to test:
import {TestSuiteDecorator} from "../../../../../../src/com/onsoft/tiger/jcad/decorators/TestSuiteDecorator";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/DecoratorsTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Test:
describe("TestSuiteDecorator", ()=> {

  let decorator:Decorator = null;

  beforeEach(()=> {
    utils.initRegistry();
    decorator = new TestSuiteDecorator();
  });

  afterEach(()=> {
    utils.resetRegistry();
    decorator = null;
  });

  describe("#decorate()", ()=> {

    it("should return the reference to the target instance", ()=>{
      let target:any = decorator.decorate(utils.TARGET, utils.TEST_SUITE_PARAMS);
      expect(target).to.equal(utils.TARGET);
    });

    it("should register information into the TestSuiteDescriptorRegistry object", ()=>{
      let spy:any = chai.spy.on(TestSuiteDescriptorRegistry, "getRegisteredDescriptor");
      decorator.decorate(utils.TARGET, utils.TEST_SUITE_PARAMS);
      expect(spy).to.have.been.called.once;
      let descriptor:TestSuiteDescriptor = TestSuiteDescriptorRegistry.getRegisteredDescriptor();
      expect(descriptor.description).to.equal(utils.DESCRIPTION);
      expect(descriptor.disabled).to.equal(utils.DISABLED);
    });
  });
});