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
import { RunableTestSuite, TestStats, TestSuiteError } from "jec-juta";

// Class to test:
import {TigerTestRunner} from "../../../../../src/com/onsoft/tiger/runners/TigerTestRunner";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/TigerTestRunnerTestUtils";

// Test:
describe("TigerTestRunner", ()=> {
  
  describe("#runTest()", ()=> {
    it("should run the specified test suite", (done:MochaDone)=> {
      utils.initRegistry();
      let runner:TigerTestRunner = new TigerTestRunner();
      runner.runTest(utils.buildRunableTestSuite(), (stats:TestStats)=> {
        expect(stats.error).to.be.null;
        expect(stats.numTestSuites).to.equal(1);
        expect(stats.numDisabledTestSuites).to.equal(0);
        expect(stats.numAsyncTests).to.equal(0);
        expect(stats.numDisabledTests).to.equal(0);
        expect(stats.time).not.to.be.null;
        expect(stats.duration).not.to.equal(0);
        expect(stats.numTests).to.equal(3); // 1 test repeated 3 times
        utils.resetRegistry();
        done();
      });
    });
  });

  describe("#runTest() with invalid instantiation policy", ()=> {
    it("should throw a TestSuiteError exception", ()=> {
      utils.initInvalidPolicyRegistry();
      let runner:TigerTestRunner = new TigerTestRunner();
      let doRun:Function = function():void {
        runner.runTest(utils.buildRunableTestSuite(), (stats:TestStats)=> {});
      };
      expect(doRun).to.throw(TestSuiteError);
      utils.resetRegistry();
    });
  });

  describe("#runAllTests()", ()=> {
    it("should run the specified test suites", (done:MochaDone)=> {
      utils.initRegistry();
      let runner:TigerTestRunner = new TigerTestRunner();
      let testSuites:RunableTestSuite[] = [
        utils.buildRunableTestSuite(),
        utils.buildRunableTestSuite(),
        utils.buildRunableTestSuite()
      ];
      runner.runAllTests(testSuites, (stats:TestStats)=> {
        expect(stats.error).to.be.null;
        expect(stats.numTestSuites).to.equal(3);
        expect(stats.numDisabledTestSuites).to.equal(0);
        expect(stats.numAsyncTests).to.equal(0);
        expect(stats.numDisabledTests).to.equal(0);
        expect(stats.time).not.to.be.null;
        expect(stats.duration).not.to.equal(0);
        expect(stats.numTests).to.equal(9); // 3 tests repeated 3 times
        utils.resetRegistry();
        done();
      });
    });

    it("should invoke the callback method even if not test suite is defined", (done:MochaDone)=> {
      utils.initRegistry();
      let runner:TigerTestRunner = new TigerTestRunner();
      let testSuites:RunableTestSuite[] = [];
      runner.runAllTests(testSuites, (stats:TestStats)=> {
        expect(stats.error).to.be.null;
        utils.resetRegistry();
        done();
      });
    });
  });
});