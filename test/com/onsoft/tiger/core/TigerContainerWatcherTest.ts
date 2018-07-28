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
import {TestWatcher} from "../../../../../src/com/onsoft/tiger/core/TestWatcher";
import {RunableTestSuite} from "jec-juta";

// Class to test:
import {TigerContainerWatcher} from "../../../../../src/com/onsoft/tiger/core/TigerContainerWatcher";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/TigerContainerWatcherTestUtils";

// Test:
describe("TigerContainerWatcher", ()=> {

  describe("#getContextPath()", ()=> {
    it("should return the current context path", ()=> {
      const watcher:TestWatcher = new TigerContainerWatcher();
      expect(watcher.getContextPath()).to.equal(process.cwd());
    });
  });
  
  describe("#getTestSuites()", ()=> {

    it("should return an empty array when no test suites have been registered", ()=> {
      const watcher:TestWatcher = new TigerContainerWatcher();
      const testSuites:RunableTestSuite[] = watcher.getTestSuites();
      expect(testSuites).to.be.an("array");
      expect(testSuites).to.have.lengthOf(0);
    });
    
    it("should return an array that contains test suites which have been registered with the addTestSuite() method", ()=> {
      const watcher:TestWatcher = new TigerContainerWatcher();
      watcher.addTestSuite(utils.RUNABLE_TEST_SUITE);
      const testSuites:RunableTestSuite[] = watcher.getTestSuites();
      expect(testSuites).to.have.lengthOf(1);
      expect(testSuites).to.include(utils.RUNABLE_TEST_SUITE);
    });
  });
});