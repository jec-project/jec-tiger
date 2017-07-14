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
import {expect} from "chai";
import { TestSuiteError, TestMethod, AnnotatedMethod, TestSorters, InstanciationPolicy } from "jec-juta";

// Class to test:
import {TigerRunableTestSuite} from "../../../../../../src/com/onsoft/tiger/runners/model/TigerRunableTestSuite";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/TigerRunableTestSuiteTestUtils";

// Test:
describe("TigerRunableTestSuite", ()=> {
  
  describe("#setTestSuite()", ()=> {
    it("should throw a TestSuiteError when no TestSuiteDescriptor have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      try {
        trts.setTestSuite(utils.TEST_SUITE);
      } catch(e) {
        expect(e).to.be.an.instanceOf(TestSuiteError);
      }
    });
  });
  
  describe("#isDisabled()", ()=> {

    it("should return false when no test suite have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      expect(trts.isDisabled()).to.be.false;
    });
    
    it("should return the same as value as specified by the TestSuiteDescriptor ", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      trts.setTestSuite(utils.TEST_SUITE);
      expect(trts.isDisabled()).to.equal(utils.DISABLED);
      utils.resetRegistry();
    });
  });

  describe("#getTestOrder()", ()=> {

    it("should return TestSorters.DEFAULT when no test suite have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      expect(trts.getTestOrder()).to.equal(TestSorters.DEFAULT);
    });
    
    it("should return the same as value as specified by the TestSuiteDescriptor ", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      trts.setTestSuite(utils.TEST_SUITE);
      expect(trts.getTestOrder()).to.equal(utils.TEST_ORDER);
      utils.resetRegistry();
    });
  });

  describe("#getInstanciationPolicy()", ()=> {

    it("should return InstanciationPolicy.SINGLE when no test suite have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      expect(
        trts.getInstanciationPolicy()
      ).to.equal(InstanciationPolicy.SINGLE);
    });
    
    it("should return the same as value as specified by the TestSuiteDescriptor ", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      trts.setTestSuite(utils.TEST_SUITE);
      expect(
        trts.getInstanciationPolicy()
      ).to.equal(utils.TEST_INSTANCIATION_POLICY);
      utils.resetRegistry();
    });
  });

  describe("#getTestSuite()", ()=> {

    it("should return null when no test suite have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      expect(trts.getTestSuite()).to.be.null;
    });
    
    it("should return the same test suite as registered with the setTestSuite() method", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      trts.setTestSuite(utils.TEST_SUITE);
      expect(trts.getTestSuite()).to.equal(utils.TEST_SUITE);
      utils.resetRegistry();
    });
  });

  describe("#getDescription()", ()=> {
    it("should return null when no TestSuiteDescriptor have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      expect(trts.getDescription()).to.be.null;
    });

    it("should return the same description as defined by the current TestSuiteDescriptor", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      trts.setTestSuite(utils.TEST_SUITE);
      expect(trts.getDescription()).to.equal(utils.DESCRIPTION);
      utils.resetRegistry();
    });
  });
  
  describe("#getTestMethods()", ()=> {

    it("should return an empty array when no TestDescriptor have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      let methods:TestMethod[] = trts.getTestMethods();
      expect(methods).to.be.an("array");
      expect(methods).to.have.lengthOf(0);
    });

    it("should return an empty array when no test suite have been registered", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      let methods:TestMethod[] = trts.getTestMethods();
      expect(methods).to.have.lengthOf(0);
      utils.resetRegistry();
    });

    it("should return an array that contains the registered TestMethod objects for the related TestDescriptor objects", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      trts.setTestSuite(utils.TEST_SUITE);
      let methods:TestMethod[] = trts.getTestMethods();
      expect(methods).to.have.lengthOf(1);
      let method:TestMethod = methods[0];
      expect(method.name).to.equal(utils.TEST_DESCRIPTOR.method);
      expect(method.description).to.equal(utils.TEST_DESCRIPTOR.description);
      utils.resetRegistry();
    });
  });

  
  describe("#getAnnotatedMethods()", ()=> {

    it("should return an empty array when no AnnotatedMethodDescriptor have been registered", ()=> {
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      let methods:AnnotatedMethod[] = trts.getAnnotatedMethods();
      expect(methods).to.be.an("array");
      expect(methods).to.have.lengthOf(0);
    });

    it("should return an empty array when no test suite have been registered", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      let methods:AnnotatedMethod[] = trts.getAnnotatedMethods();
      expect(methods).to.have.lengthOf(0);
      utils.resetRegistry();
    });

    it("should return an array that contains the registered AnnotatedMethod objects for the related AnnotatedMethodDescriptor objects", ()=> {
      utils.initRegistry();
      let trts:TigerRunableTestSuite = new TigerRunableTestSuite();
      trts.setTestSuite(utils.TEST_SUITE);
      let methods:AnnotatedMethod[] = trts.getAnnotatedMethods();
      expect(methods).to.have.lengthOf(1);
      let method:AnnotatedMethod = methods[0];
      expect(method.name).to.equal(utils.ANNOTATED_METHOD_DESCRIPTOR.method);
      expect(method.timeout).to.equal(utils.ANNOTATED_METHOD_DESCRIPTOR.timeout);
      expect(method.type).to.equal(utils.ANNOTATED_METHOD_DESCRIPTOR.type);
      utils.resetRegistry();
    });
  });
});