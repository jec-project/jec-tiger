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
import { AnnotatedMethod, AnnotatedMethodType, TestSuiteError } from "jec-juta";

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

  describe("#applyAnnotatedMethod()", ()=> {

    it("should do nothing when 'method' is 'null'", function() {
      expect(
        runner.applyAnnotatedMethod(null, testSuiteObj, this)
      ).to.be.OK;
    });
    
    it("should do nothing when test is disabled", function() {
      let spy:any = chai.spy.on(global, "it");
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE, true
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.OK;
      expect(spy).to.have.been.called.once;
    });
    
    it("should invoke the timeout property with the specified timeout", function() {
      let spy:any = chai.spy.on(this, "timeout");
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE, false, 100
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.OK;
      expect(spy).to.have.been.called.with(100);
      this.timeout(0);
    });
    
    it("AnnotatedMethodType.BEFORE_ALL annotation should invoke the mocha 'before' method on global scope", function() {
      let spy:any = chai.spy.on(global, "before");
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE_ALL
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.OK;
      expect(spy).to.have.been.called.once;
    });

    it("AnnotatedMethodType.AFTER_ALL annotation should invoke the mocha 'after' method on global scope", function() {
      let spy:any = chai.spy.on(global, "after");
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER_ALL
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.OK;
      expect(spy).to.have.been.called.once;
    });

    it("AnnotatedMethodType.BEFORE annotation should invoke the mocha 'beforeEach' method on global scope", function() {
      let spy:any = chai.spy.on(global, "beforeEach");
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.OK;
      expect(spy).to.have.been.called.once;
    });

    it("AnnotatedMethodType.AFTER annotation should invoke the mocha 'afterEach' method on global scope", function() {
      let spy:any = chai.spy.on(global, "afterEach");
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER
      );
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.OK;
      expect(spy).to.have.been.called.once;
    });

    /*it("should invoke the object member related to the before class annotation", function() {
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE
      );
      const invokatorSpy:any = chai.spy.on(console, "log");
      expect(
        runner.applyAnnotatedMethod(method, testSuiteObj, this)
      ).to.be.OK;
      expect(invokatorSpy).to.have.been.called.with("beforeEach");
    });*/
    
    it("should throw a TestSuiteError exception when method type is not valid", function() {
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.AFTER_CLASS
      );
      let applyStaticMethod:Function = function():void {
        runner.applyAnnotatedMethod(method, testSuiteObj, this);
      };
      expect(applyStaticMethod.bind(this)).to.throw(TestSuiteError);
    });
  });
});