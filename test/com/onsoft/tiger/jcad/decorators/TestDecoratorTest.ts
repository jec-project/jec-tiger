//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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
import {TestDescriptor} from "../../../../../../src/com/onsoft/tiger/reflect/TestDescriptor";

// Class to test:
import {TestDecorator} from "../../../../../../src/com/onsoft/tiger/jcad/decorators/TestDecorator";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/DecoratorsTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Test:
describe("TestDecorator", ()=> {
  
  let decorator:Decorator = null;

  beforeEach(()=> {
    utils.initRegistry();
    decorator = new TestDecorator();
  });

  afterEach(()=> {
    utils.resetRegistry();
    decorator = null;
  });

  describe("#decorate()", ()=> {

    it("should return the reference to the PropertyDescriptor instance", ()=>{
      let target:any = decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.TEST_PARAMS);
      expect(target).to.equal(utils.DESCRIPTOR);
    });

    it("should register information into the TestSuiteDescriptorRegistry by invoking the addAnnotatedMethodDescriptor() method", ()=>{
      let spy:any = chai.spy.on(TestSuiteDescriptorRegistry, "addTestDescriptor");
      decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.TEST_PARAMS);
      expect(spy).to.have.been.called.once;
    });

    it("should create an TestDescriptor object into the TestSuiteDescriptorRegistry object", ()=>{
      let descriptors:TestDescriptor[] = TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      expect(descriptors).to.have.lengthOf(0);
      decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.TEST_PARAMS);
      descriptors= TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      expect(descriptors).to.have.lengthOf(1);
    });

    it("should create an TestDescriptor instance with the specified 'method' value", ()=>{
      decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.TEST_PARAMS);
      let descriptors:TestDescriptor[] = TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      let descriptor:TestDescriptor = descriptors[0];
      expect(descriptor.method).to.equal(utils.KEY);
    });
    
    it("should create an TestDescriptor instance with the specified 'timeout' value", ()=>{
      decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.TEST_PARAMS);
      let descriptors:TestDescriptor[] = TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      let descriptor:TestDescriptor = descriptors[0];
      expect(descriptor.timeout).to.equal(utils.TIMEOUT);
    });
    
    it("should create an TestDescriptor instance with the specified 'disabled' value", ()=>{
      decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.TEST_PARAMS);
      let descriptors:TestDescriptor[] = TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      let descriptor:TestDescriptor = descriptors[0];
      expect(descriptor.disabled).to.equal(utils.DISABLED);
    });

    it("should create an TestDescriptor instance with the specified 'description' value", ()=>{
      decorator.decorate(utils.TARGET, utils.KEY, utils.DESCRIPTOR, utils.TEST_PARAMS);
      let descriptors:TestDescriptor[] = TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      let descriptor:TestDescriptor = descriptors[0];
      expect(descriptor.description).to.equal(utils.DESCRIPTION);
    });
  });
});