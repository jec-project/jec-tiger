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
import {TestSuiteError, InstantiationPolicy} from "jec-juta";
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

  describe("#applyGlobalFixtures()", ()=> {
    
    it("should throw a TestSuiteError exception when test policy is not valid", function() {
      const applyGlobalFixtures:Function = function():void {
        runner.applyGlobalFixtures(
          "invalidPolicy", mapper, testSuiteObj, this
        );
      };
      expect(applyGlobalFixtures.bind(this)).to.throw(TestSuiteError);
    });
    
    it("InstantiationPolicy.MULTIPLE should invoke both mocha 'before' and after' methods on global scope", function() {
      const spyBefore:any = sinon.spy(global, "before");
      const spyAfter:any = sinon.spy(global, "after");
      runner.applyGlobalFixtures(
        InstantiationPolicy.MULTIPLE, mapper, testSuiteObj, this
      );
      sinon.assert.calledOnce(spyBefore);
      sinon.assert.calledOnce(spyAfter);
      sinon.restore();
    });
    
    it("InstantiationPolicy.SINGLE should invoke both mocha 'before' and after' methods on global scope", function() {
      const spyBefore:any = sinon.spy(global, "before");
      const spyAfter:any = sinon.spy(global, "after");
      runner.applyGlobalFixtures(
        InstantiationPolicy.SINGLE, mapper, testSuiteObj, this
      );
      sinon.assert.calledOnce(spyBefore);
      sinon.assert.calledOnce(spyAfter);
      sinon.restore();
    });
  });
});