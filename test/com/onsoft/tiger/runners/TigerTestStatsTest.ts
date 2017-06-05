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

// Class to test:
import {TigerTestStats} from "../../../../../src/com/onsoft/tiger/runners/TigerTestStats";

// Test:
describe("TigerTestStats", ()=> {

  let stats:TigerTestStats = new TigerTestStats();
  
  it("should have a 'numTestSuites' property set to 0", function() {
    expect(stats).to.have.property("numTestSuites", 0);
  });
  
  it("should have a 'numDisabledTestSuites' property set to 0", function() {
    expect(stats).to.have.property("numDisabledTestSuites", 0);
  });

  it("should have a 'numTests' property set to 0", function() {
    expect(stats).to.have.property("numTests", 0);
  });

  it("should have a 'numAsyncTests' property set to 0", function() {
    expect(stats).to.have.property("numAsyncTests", 0);
  });

  it("should have a 'numDisabledTests' property set to 0", function() {
    expect(stats).to.have.property("numDisabledTests", 0);
  });

  it("should have a 'duration' property set to 0", function() {
    expect(stats).to.have.property("duration", 0);
  });

  it("should have a 'time' property set to null", function() {
    expect(stats).to.have.property("time", null);
  });

  it("should have a 'error' property set to null", function() {
    expect(stats).to.have.property("error", null);
  });
});