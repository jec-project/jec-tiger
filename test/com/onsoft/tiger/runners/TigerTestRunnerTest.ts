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
import {RunableTestSuite} from "jec-juta";

// Class to test:
import {TigerTestRunner} from "../../../../../src/com/onsoft/tiger/runners/TigerTestRunner";

// Utilities:
const utils:any = require("../../../../../utils/test-utils/utilities/TigerTestRunnerTestUtils");

// Test:
describe("TigerTestRunner", ()=> {
  
  describe("#runTest()", ()=> {

    it("we must implement stats to improve this test");

    it("should run the specified test suite", ()=> {
      utils.initRegistry();
      let runner:TigerTestRunner = new TigerTestRunner();
      runner.runTest(utils.buildRunableTestSuite(), (err:any)=> {
        expect("runTest").to.be.OK;
        utils.resetRegistry();
      });
    });
  });

  describe("#runAllTests()", ()=> {

    it("we must implement stats to improve this test");
    
    it("should run the specified test suites", ()=> {
      utils.initRegistry();
      let runner:TigerTestRunner = new TigerTestRunner();
      let testSuites:RunableTestSuite[] = [
        utils.buildRunableTestSuite(),
        utils.buildRunableTestSuite(),
        utils.buildRunableTestSuite()
      ];
      runner.runAllTests(testSuites, (err:any)=> {
        expect("runAllTests").to.be.OK;
        utils.resetRegistry();
      });
    });
  });
});