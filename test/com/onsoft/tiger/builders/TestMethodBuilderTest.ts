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
import {TestMethod} from "jec-juta";
import {TigerTestMethod} from "../../../../../src/com/onsoft/tiger/runners/model/TigerTestMethod";

// Class to test:
import {TestMethodBuilder} from "../../../../../src/com/onsoft/tiger/builders/TestMethodBuilder";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/TestMethodBuilderTestUtils";

// Test:
describe("TestMethodBuilder", ()=> {

  describe("#build()", ()=> {
    
    const builder:TestMethodBuilder = new TestMethodBuilder();
    
    it("should return an instance of the TigerTestMethod class", function() {
      const method:TestMethod = builder.build(utils.DESCRIPTOR);
      expect(method).to.be.an.instanceof(TigerTestMethod);
    });

    it("should return the 'description' property as defined by the 'params.description' parameter", function() {
      const method:TestMethod = builder.build(utils.DESCRIPTOR);
      expect(method.description).to.equal(utils.DESCRIPTION);
    });
    
    it("should return the 'name' property as defined by the 'params.method' parameter", function() {
      const method:TestMethod = builder.build(utils.DESCRIPTOR);
      expect(method.name).to.equal(utils.METHOD);
    });
    
    it("should return the 'repeat' property as defined by the 'params.repeat' parameter", function() {
      const method:TestMethod = builder.build(utils.DESCRIPTOR);
      expect(method.repeat).to.equal(utils.REPEAT);
    });
    
    it("should return the 'timeout' property as defined by the 'params.timeout' parameter", function() {
      const method:TestMethod = builder.build(utils.DESCRIPTOR);
      expect(method.timeout).to.equal(utils.TIMEOUT);
    });
  });
});
