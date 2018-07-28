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
import {AnnotatedMethod, AnnotatedMethodType, TestSuiteError} from "jec-juta";

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

  describe("#applyAnnotatedMethod()", ()=> {

    it("should do nothing when 'method' is 'null'", function() {
      expect(
        runner.applyAnnotatedMethod(null, testSuiteObj, this)
      ).to.be.undefined;
    });
    
    it("should do nothing when test is disabled", function() {
      const spy:any = sinon.spy(global, "it");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE, true
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });
    
    it("should invoke the timeout property with the specified timeout", function() {
      const spy:any = sinon.spy(this, "timeout");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE, false, 100
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.undefined;
      sinon.assert.calledWith(spy, 100);
      this.timeout(0);
    });
    
    it("AnnotatedMethodType.BEFORE_ALL annotation should invoke the mocha 'before' method on global scope", function() {
      const spy:any = sinon.spy(global, "before");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE_ALL
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });

    it("AnnotatedMethodType.AFTER_ALL annotation should invoke the mocha 'after' method on global scope", function() {
      const spy:any = sinon.spy(global, "after");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER_ALL
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });

    it("AnnotatedMethodType.BEFORE annotation should invoke the mocha 'beforeEach' method on global scope", function() {
      const spy:any = sinon.spy(global, "beforeEach");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });

    it("AnnotatedMethodType.AFTER annotation should invoke the mocha 'afterEach' method on global scope", function() {
      const spy:any = sinon.spy(global, "afterEach");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });

    /*it("should invoke the object member related to the before class annotation", function() {
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE
      );
      const invokatorSpy:any = sinon.spy(console, "log");
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.undefined;
      sinon.assert.calledWith(invokatorSpy, "beforeEach");
    });*/
    
    it("should throw a TestSuiteError exception when method type is not valid", function() {
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER_CLASS
      );
      const applyStaticMethod:Function = function():void {
        runner.applyAnnotatedMethod(method, testSuiteObj, this);
      };
      expect(applyStaticMethod.bind(this)).to.throw(TestSuiteError);
    });
  });
});