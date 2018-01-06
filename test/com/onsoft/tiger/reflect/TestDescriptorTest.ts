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
import {TestableMethodDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/TestableMethodDescriptor";

// Class to test:
import {TestDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/TestDescriptor";

// Test:
describe("TestDescriptor", ()=> {

  let descriptor:TestDescriptor = new TestDescriptor();
  
  it("should extend the TestableMethodDescriptor class", function() {
    expect(descriptor).to.be.an.instanceOf(TestableMethodDescriptor);
  });

  it("should have a 'description' property set to null", function() {
    expect(descriptor).to.have.property("description", null);
  });
  
  it("should have a 'repeat' property set to 0", function() {
    expect(descriptor).to.have.property("repeat", 0);
  });
  
  it("should have an 'order' property set to 0", function() {
    expect(descriptor).to.have.property("order", 0);
  });
});