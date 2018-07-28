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
import {Tiger} from "../../../../../src/com/onsoft/tiger/Tiger";
import {TestSuiteError} from "jec-juta";

// Class to test:
import {DefaultTigerContainer} from "../../../../../src/com/onsoft/tiger/core/DefaultTigerContainer";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/DefaultTigerContainerTestUtils";

// Test:
describe("DefaultTigerContainer", ()=> {

  describe("#getVersion()", ()=> {

    it("should return the current version of the DefaultTigerContainer instance", ()=>{
      const tigerContainer:Tiger = new DefaultTigerContainer();
      expect(
        utils.VERSION_PATTERN.test(tigerContainer.getVersion())
      ).to.be.true;
    });
  });
  
  describe("#getTestPaths()", ()=> {

    it("should return null when no test path is defined", ()=>{
      const tigerContainer:Tiger = new DefaultTigerContainer();
      expect(tigerContainer.getTestPaths()).to.be.null;
    });
    
    it("should return a default test path when no test path has been defined and the process has already be invoked", (done:MochaDone)=>{
      const tigerContainer:Tiger = new DefaultTigerContainer();
      let paths:string[] = null;
      tigerContainer.process((err:any)=> {
        paths = tigerContainer.getTestPaths();
        expect(paths).to.be.an("array");
        expect(paths).to.have.lengthOf(1);
        expect(paths).to.include(utils.DEFAULT_PATH);
        done();
      });
    });
  });
  
  describe("#setTestPaths()", ()=> {

    it("should change the test path values", ()=>{
      const tigerContainer:Tiger = new DefaultTigerContainer();
      tigerContainer.setTestPaths(utils.CUSTOM_PATHS);
      expect(tigerContainer.getTestPaths()).to.equal(utils.CUSTOM_PATHS);
    });
    
    it("should use the custom test path values for excuting the autowiring process", (done:MochaDone)=>{
      const tigerContainer:Tiger = new DefaultTigerContainer();
      tigerContainer.setTestPaths(utils.CUSTOM_PATHS);
      tigerContainer.process((err:any)=> {
        expect(tigerContainer.getTestPaths()).to.equal(utils.CUSTOM_PATHS);
        done();
      });
    });
  });

  describe("#process()", ()=> {

    it("should return a TestSuiteError when class paths are not valid", (done:MochaDone)=>{
      const tigerContainer:Tiger = new DefaultTigerContainer();
      tigerContainer.setTestPaths(utils.INVALID_PATHS);
      tigerContainer.process((err:any)=> {
        expect(err).not.to.be.null;
        expect(err).to.be.an.instanceof(TestSuiteError);
        done();
      });
    });
  });
});