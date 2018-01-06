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
import {expect} from "chai";
import {TestDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/TestDescriptor";
import {AnnotatedMethodDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";

// Class to test:
import {TestSuiteDescriptorRegistry} from "../../../../../src/com/onsoft/tiger/metadata/TestSuiteDescriptorRegistry";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/TestSuiteDescriptorRegistryTestUtils";

// Test:
describe("TestSuiteDescriptorRegistry", ()=> {

  describe("#registerDescriptor()", ()=> {
    it("should initialize the TestSuiteDescriptorRegistry members when a TestSuiteDescriptor have been registered", ()=> {
      expect(TestSuiteDescriptorRegistry.getTestDescriptorCollection()).to.be.null;
      expect(TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection()).to.be.null;
      expect(TestSuiteDescriptorRegistry.getParametersMap()).to.be.null;
      TestSuiteDescriptorRegistry.registerDescriptor(utils.TEST_SUITE_DESCRIPTOR);
      expect(TestSuiteDescriptorRegistry.getTestDescriptorCollection()).not.to.be.null;
      expect(TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection()).not.to.be.null;
      expect(TestSuiteDescriptorRegistry.getParametersMap()).not.to.be.null;
      TestSuiteDescriptorRegistry.registerDescriptor(null);
    });

    it("should reset the TestSuiteDescriptorRegistry members when adding null to the registerDescriptor() method", ()=> {
      TestSuiteDescriptorRegistry.registerDescriptor(utils.TEST_SUITE_DESCRIPTOR);
      expect(TestSuiteDescriptorRegistry.getTestDescriptorCollection()).not.to.be.null;
      expect(TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection()).not.to.be.null;
      expect(TestSuiteDescriptorRegistry.getParametersMap()).not.to.be.null;
      TestSuiteDescriptorRegistry.registerDescriptor(null);
      expect(TestSuiteDescriptorRegistry.getTestDescriptorCollection()).to.be.null;
      expect(TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection()).to.be.null;
      expect(TestSuiteDescriptorRegistry.getParametersMap()).to.be.null;
    });
    
    it("should trhow an error when trying to reset the TestSuiteDescriptorRegistry members that have not been initialized", ()=> {
      let reset:Function = function():void {
        TestSuiteDescriptorRegistry.registerDescriptor(null);
      };
      expect(reset).to.throw(Error);
    });
  });
  
  describe("#getRegisteredDescriptor()", ()=> {

    it("should return null when no TestSuiteDescriptor have been registered", ()=> {
      expect(TestSuiteDescriptorRegistry.getRegisteredDescriptor()).to.be.null;
    });

    it("should return return the same TestSuiteDescriptor object as registered with the registerDescriptor() method", ()=> {
      TestSuiteDescriptorRegistry.registerDescriptor(utils.TEST_SUITE_DESCRIPTOR);
      expect(TestSuiteDescriptorRegistry.getRegisteredDescriptor()).to.equal(utils.TEST_SUITE_DESCRIPTOR);
      TestSuiteDescriptorRegistry.registerDescriptor(null);
    });
  });
  
  describe("#getTestDescriptorCollection()", ()=> {

    it("should return null when no TestSuiteDescriptor have been registered", ()=> {
      expect(TestSuiteDescriptorRegistry.getTestDescriptorCollection()).to.be.null;
    });

    it("should return an empty array when a TestSuiteDescriptor have been registered", ()=> {
      TestSuiteDescriptorRegistry.registerDescriptor(utils.TEST_SUITE_DESCRIPTOR);
      let descriptors:TestDescriptor[] = TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      expect(descriptors).to.be.an("array");
      expect(descriptors).to.have.lengthOf(0);
      TestSuiteDescriptorRegistry.registerDescriptor(null);
    });
    
    it("should return an array that contains all registered TestDescriptor objects", ()=> {
      TestSuiteDescriptorRegistry.registerDescriptor(utils.TEST_SUITE_DESCRIPTOR);
      TestSuiteDescriptorRegistry.addTestDescriptor(utils.TEST_DESCRIPTOR);
      let descriptors:TestDescriptor[] = TestSuiteDescriptorRegistry.getTestDescriptorCollection();
      expect(descriptors).to.be.an("array");
      expect(descriptors).to.have.lengthOf(1);
      expect(descriptors).to.have.include(utils.TEST_DESCRIPTOR);
      TestSuiteDescriptorRegistry.registerDescriptor(null);
    });
  });
  
  describe("#getAnnotatedMethodDescriptorCollection()", ()=> {

    it("should return null when no TestSuiteDescriptor have been registered", ()=> {
      expect(TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection()).to.be.null;
    });

    it("should return an empty array when a TestSuiteDescriptor have been registered", ()=> {
      TestSuiteDescriptorRegistry.registerDescriptor(utils.TEST_SUITE_DESCRIPTOR);
      let descriptors:AnnotatedMethodDescriptor[] = TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection();
      expect(descriptors).to.be.an("array");
      expect(descriptors).to.have.lengthOf(0);
      TestSuiteDescriptorRegistry.registerDescriptor(null);
    });
    
    it("should return an array that contains all registered AnnotatedMethodDescriptor objects", ()=> {
      TestSuiteDescriptorRegistry.registerDescriptor(utils.TEST_SUITE_DESCRIPTOR);
      TestSuiteDescriptorRegistry.addAnnotatedMethodDescriptor(utils.ANNOTATED_METHOD_DESCRIPTOR);
      let descriptors:AnnotatedMethodDescriptor[] = TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection();
      expect(descriptors).to.be.an("array");
      expect(descriptors).to.have.lengthOf(1);
      expect(descriptors).to.have.include(utils.ANNOTATED_METHOD_DESCRIPTOR);
      TestSuiteDescriptorRegistry.registerDescriptor(null);
    });
  });
});