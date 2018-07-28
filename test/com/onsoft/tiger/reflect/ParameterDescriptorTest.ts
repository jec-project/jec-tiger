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

// Class to test:
import {ParameterDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/ParameterDescriptor";

// Test:
describe("ParameterDescriptor", ()=> {

  const descriptor:ParameterDescriptor = new ParameterDescriptor();
  
  it("should have a 'index' property set to null", function() {
    expect(descriptor).to.have.property("index", null);
  });

  it("should have a 'methodName' property set to null", function() {
    expect(descriptor).to.have.property("methodName", null);
  });
  
  it("should have a 'connectorRef' property set to null", function() {
    expect(descriptor).to.have.property("connectorRef", null);
  });
});