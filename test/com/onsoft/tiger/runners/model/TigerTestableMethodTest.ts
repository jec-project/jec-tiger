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

// Utilities
import {TigerTestableMethodImpl} from "../../../../../../utils/test-utils/utilities/TigerTestableMethodImpl";

// Test:
describe("TigerTestableMethod", ()=> {

  let descriptor:TigerTestableMethodImpl = new TigerTestableMethodImpl();
  
  it("should have a 'timeout' property set to -1", function() {
    expect(descriptor).to.have.property("timeout", -1);
  });

  it("should have a 'name' property set to null", function() {
    expect(descriptor).to.have.property("name", null);
  });
  
  it("should have a 'async' property set to false", function() {
    expect(descriptor).to.have.property("async", false);
  });

  it("should have a 'disabled' property set to false", function() {
    expect(descriptor).to.have.property("disabled", false);
  });
});