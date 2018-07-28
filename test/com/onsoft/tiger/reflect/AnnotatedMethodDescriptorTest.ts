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
import {AnnotatedMethodDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";

// Test:
describe("AnnotatedMethodDescriptor", ()=> {

  const descriptor:AnnotatedMethodDescriptor = new AnnotatedMethodDescriptor();
  
  it("should extend the TestableMethodDescriptor class", function() {
    expect(descriptor).to.be.an.instanceOf(TestableMethodDescriptor);
  });

  it("should have a 'type' property set to -1", function() {
    expect(descriptor).to.have.property("type", -1);
  });
});