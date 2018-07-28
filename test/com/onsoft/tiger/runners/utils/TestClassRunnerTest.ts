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
import * as sinon from "sinon";
import {TestStats, TestMethod} from "jec-juta";
import {AnnotatedMethodsMapper} from "../../../../../../src/com/onsoft/tiger/utils/AnnotatedMethodsMapper";

// Class to test:
import {TestClassRunner} from "../../../../../../src/com/onsoft/tiger/runners/utils/TestClassRunner";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/TestClassRunnerTestUtils";
import {TestClassRunnerTestClass} from "../../../../../../utils/test-utils/classes/TestClassRunnerTestClass";

// Test:
describe("TestClassRunner", ()=> {

  const runner:TestClassRunner = new TestClassRunner();
  const testSuiteObj:TestClassRunnerTestClass = new TestClassRunnerTestClass();
  TestClassRunnerTestClass.invokator = {
    notify: function(methodName:string) { }
  };
  const mapper:AnnotatedMethodsMapper = utils.buildAnnotatedMethodsMapper();

  /*const applyTestMethodSpy:any = sinon.spy(runner, "applyTestMethod");
  const applyAnnotatedMethodSpy:any = sinon.spy(runner, "applyAnnotatedMethod");*/

  describe("#runSingleInstanceTests()", ()=> {
    
     it("should increment the 'numDisabledTests' value of the TestStats object when test is disabled", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod(true);
      expect(
        runner.runSingleInstanceTests(
          [method], 
          mapper, 
          testSuiteObj, 
          this, 
          stats
        )
      ).to.be.undefined;
      expect(stats.numDisabledTests).to.equal(1);
    });

    it("should call the 'applyTestMethod' function and and increment the 'numTests' value of the TestStats object", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod();
      expect(
        runner.runSingleInstanceTests(
          [method], 
          mapper, 
          testSuiteObj, 
          this, 
          stats
        )
      ).to.be.undefined;
      //sinon.assert.calledOnce(applyTestMethodSpy);
      //sinon.restore();
      expect(stats.numTests).to.equal(1);
    });
    
    it("should call the 'applyAnnotatedMethod' 2 times", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod();
      expect(
        runner.runSingleInstanceTests(
          [method], 
          mapper, 
          testSuiteObj, 
          this, 
          stats
        )
      ).to.be.undefined;
      //sinon.assert.calledTwice(applyAnnotatedMethodSpy);
      //sinon.restore();
      expect(stats.numTests).to.equal(1);
    });

    it("should call the 'applyTestMethod' function 3 times and and increment the 'numTests' value of the TestStats object", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod(false, 0, 3);
      expect(
        runner.runSingleInstanceTests(
          [method], 
          mapper, 
          testSuiteObj, 
          this, 
          stats
        )
      );
      //sinon.assert.calledThrice(applyTestMethodSpy);
      //sinon.restore();
      expect(stats.numTests).to.equal(3);
    });
  });

  
  /*describe("#runMultipleInstanceTest()", ()=> {
    
     it("should increment the 'numDisabledTests' value of the TestStats object when test is disabled", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod(true);
      expect(
        runner.runMultipleInstanceTest(
          [method], 
          mapper, 
          testSuiteObj, 
          stats
        )
      ).to.be.undefined;
      sinon.assert.calledOnce(applyTestMethodSpy);
      sinon.restore();
      expect(stats.numDisabledTests).to.equal(1);
    });

    it("should call the 'applyAnnotatedMethod' 2 times", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod();
      expect(
        runner.runMultipleInstanceTest(
          [method], 
          mapper, 
          testSuiteObj, 
          stats
        )
      ).to.be.undefined;
      sinon.assert.calledTwice(applyAnnotatedMethodSpy);
      sinon.restore();
      expect(stats.numTests).to.equal(1);
    });

    it("should call the 'applyTestMethod' function and and increment the 'numTests' value of the TestStats object", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod();
      expect(
        runner.runMultipleInstanceTest(
          [method], 
          mapper, 
          testSuiteObj, 
          stats
        )
      ).to.be.undefined;
      sinon.assert.calledOnce(applyTestMethodSpy);
      sinon.restore();
      expect(stats.numTests).to.equal(1);
    });

    it("should return 3", function() {
      const stats:TestStats = utils.buildTestStats();
      const methods:TestMethod[] = [
        utils.buildTestMethod(),
        utils.buildTestMethod(false, 0, null, "test2"),
        utils.buildTestMethod(false, 0, null, "test3")
      ];
      expect(
        runner.runMultipleInstanceTest(
          methods, 
          mapper, 
          testSuiteObj, 
          stats
        )
      ).to.equal(3);
      sinon.assert.callCount(applyAnnotatedMethodSpy, 6);
      sinon.restore();
      expect(stats.numTests).to.equal(3);
    });

    it("should call the 'applyTestMethod' function 3 times and and increment the 'numTests' value of the TestStats object", function() {
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod(false, 0, 3);
      expect(
        runner.runMultipleInstanceTest(
          [method], 
          mapper, 
          testSuiteObj, 
          stats
        )
      ).to.equal(1);
      sinon.assert.calledThrice(applyTestMethodSpy);
      sinon.restore();
      expect(stats.numTests).to.equal(3);
    });
  });*/
});