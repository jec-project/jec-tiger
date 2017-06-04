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
import {TigerTestableMethod} from "../../../../../../src/com/onsoft/tiger/runners/model/TigerTestableMethod";

// Class to test:
import {TigerAnnotatedMethod} from "../../../../../../src/com/onsoft/tiger/runners/model/TigerAnnotatedMethod";

// Test:
describe("TigerAnnotatedMethod", ()=> {

  let descriptor:TigerAnnotatedMethod = new TigerAnnotatedMethod();
  
  it("should extend the TigerTestableMethod class", function() {
    expect(descriptor).to.be.an.instanceOf(TigerTestableMethod);
  });

  it("should have a 'type' property set to null", function() {
    expect(descriptor).to.have.property("type", null);
  });
});