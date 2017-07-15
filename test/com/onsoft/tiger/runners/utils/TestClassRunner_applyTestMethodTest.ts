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
import { TestSuiteError,
         InstanciationPolicy, TestStats, TestMethod } from "jec-juta";
import {AnnotatedMethodsMapper} from "../../../../../../src/com/onsoft/tiger/utils/AnnotatedMethodsMapper";

// Class to test:
import {TestClassRunner} from "../../../../../../src/com/onsoft/tiger/runners/utils/TestClassRunner";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/TestClassRunnerTestUtils";
import {TestClassRunnerTestClass} from "../../../../../../utils/test-utils/classes/TestClassRunnerTestClass";


// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Test:
describe("TestClassRunner", ()=> {

  let runner:TestClassRunner = new TestClassRunner();
  let testSuiteObj:TestClassRunnerTestClass = new TestClassRunnerTestClass();
  TestClassRunnerTestClass.invokator = {
    notify: function(methodName:string) { }
  };
  let mapper:AnnotatedMethodsMapper = utils.buildAnnotatedMethodsMapper();

  describe("#applyTestMethod()", ()=> {
    
     it("should increment the 'numDisabledTests' value of the TestStats object when test is disabled", function() {
      let spy:any = chai.spy.on(global, "it");
      let stats:TestStats = utils.buildTestStats();
      let method:TestMethod = utils.buildTestMethod(true);
      expect(
        runner.applyTestMethod(method, testSuiteObj, this, stats)
      ).to.be.OK;
      expect(spy).to.have.been.called.once;
      expect(stats.numDisabledTests).to.equal(1);
    });
    
    it("should invoke the timeout property with the specified timeout", function() {
      let spy:any = chai.spy.on(this, "timeout");
      let stats:TestStats = utils.buildTestStats();
      let method:TestMethod = utils.buildTestMethod(false, 100);
      expect(
        runner.applyTestMethod(method, testSuiteObj, this, stats)
      ).to.be.OK;
      expect(spy).to.have.been.called.with(100);
      this.timeout(0);
    });

    it("should invoke the mocha 'it' method on global scope and increment the 'numTests' value of the TestStats object", function() {
      let spy:any = chai.spy.on(this, "it");
      let stats:TestStats = utils.buildTestStats();
      let method:TestMethod = utils.buildTestMethod(false);
      expect(
        runner.applyTestMethod(method, testSuiteObj, this, stats)
      ).to.be.OK;
      //expect(spy).to.have.been.called.with(utils.COMPUTED_DESCRIPTION);
      expect(stats.numTests).to.equal(1);
    });

  });
});