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
import { TestClassRunner } from "../../../../../../src/com/onsoft/tiger/runners/utils/TestClassRunner";

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

  describe("#applyTestMethod()", ()=> {
    
     it("should increment the 'numDisabledTests' value of the TestStats object when test is disabled", function() {
      const spy:any = sinon.spy(global, "it");
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod(true);
      expect(
        runner.applyTestMethod(method, testSuiteObj, this, stats)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
      expect(stats.numDisabledTests).to.equal(1);
    });
    
    it("should invoke the timeout property with the specified timeout", function() {
      const spy:any = sinon.spy(this, "timeout");
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod(false, 100);
      expect(
        runner.applyTestMethod(method, testSuiteObj, this, stats)
      ).to.be.undefined;
      sinon.assert.calledWith(spy, 100);
      sinon.restore()
      this.timeout(0);
    });

    it("should invoke the mocha 'it' method on global scope and increment the 'numTests' value of the TestStats object", function() {
      //const spy:any = sinon.spy(this, "it");
      const stats:TestStats = utils.buildTestStats();
      const method:TestMethod = utils.buildTestMethod(false);
      expect(
        runner.applyTestMethod(method, testSuiteObj, this, stats)
      ).to.be.undefined;
      /*sinon.assert.calledWith(spy, utils.COMPUTED_DESCRIPTION);
      sinon.restore()*/
      expect(stats.numTests).to.equal(1);
    });
  });
});