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
import {TestSuiteDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/TestSuiteDescriptor";
import { InstantiationPolicy, TestSorters } from "jec-juta";

// Test:
describe("TestSuiteDescriptor", ()=> {

  let descriptor:TestSuiteDescriptor = new TestSuiteDescriptor();
  
  it("should have a 'description' property set to 'null'", function() {
    expect(descriptor).to.have.property("description", null);
  });

  it("should have a 'disabled' property set to 'false'", function() {
    expect(descriptor).to.have.property("disabled", false);
  });

  it("should have a 'testOrder' property set to 'TestSorters.DEFAULT'", function() {
    expect(descriptor).to.have.property("testOrder", TestSorters.DEFAULT);
  });

  it("should have a 'instantiationPolicy' property set to 'InstantiationPolicy.SINGLE'", function() {
    expect(descriptor).to.have.property(
      "instantiationPolicy", InstantiationPolicy.SINGLE
    );
  });
});