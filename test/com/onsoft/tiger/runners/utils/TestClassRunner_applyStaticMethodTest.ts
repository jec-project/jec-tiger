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
  TestClassRunnerTestClass.invokator = {
    notify: function(methodName:string) { }
  };

  describe("#applyStaticMethod()", ()=> {

     it("should do nothing when 'method' is 'null'", function() {
      expect(
        runner.applyStaticMethod(null, TestClassRunnerTestClass, this)
      ).to.be.undefined;
    });
    
     it("should do nothing when test is disabled", function() {
      const spy:any = sinon.spy(global, "it");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE_CLASS, true
      );
      expect(
        runner.applyStaticMethod(method, TestClassRunnerTestClass, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });
    
    it("should invoke the timeout property with the specified timeout", function() {
      const spy:any = sinon.spy(this, "timeout");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE_CLASS, false, 100
      );
      expect(
        runner.applyStaticMethod(method, TestClassRunnerTestClass, this)
      ).to.be.undefined;
      sinon.assert.calledWith(spy, 100);
      sinon.restore();
      this.timeout(0);
    });
    
    it("AnnotatedMethodType.BEFORE_CLASS annotation should invoke the mocha 'before' method on global scope", function() {
      const spy:any = sinon.spy(global, "before");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE_CLASS
      );
      expect(
        runner.applyStaticMethod(method, TestClassRunnerTestClass, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });

    it("AnnotatedMethodType.AFTER_CLASS annotation should invoke the mocha 'after' method on global scope", function() {
      const spy:any = sinon.spy(global, "after");
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER_CLASS
      );
      expect(
        runner.applyStaticMethod(method, TestClassRunnerTestClass, this)
      ).to.be.undefined;
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });

    // it("should invoke the static member related to the before class annotation", function() {
    //   let method:AnnotatedMethod = utils.buildAnnotatedMethod(
    //     AnnotatedMethodType.BEFORE_CLASS
    //   );
    //   const invokatorSpy:any = chai.spy.on(console, "log");
    //   expect(
    //     runner.applyStaticMethod(method, TestClassRunnerTestClass, this)
    //   ).to.be.OK;
    //   expect(invokatorSpy).to.have.been.called.with("beforeClass");
    // });
    
    it("should throw a TestSuiteError exception when method type is not valid", function() {
      const method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER
      );
      const applyStaticMethod:Function = function():void {
        runner.applyStaticMethod(method, TestClassRunnerTestClass, this);
      };
      expect(applyStaticMethod.bind(this)).to.throw(TestSuiteError);
    });
  });
});