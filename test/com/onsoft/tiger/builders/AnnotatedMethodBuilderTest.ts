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
import {AnnotatedMethod} from "jec-juta";
import {AnnotatedMethodDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";
import {TigerAnnotatedMethod} from "../../../../../src/com/onsoft/tiger/runners/model/TigerAnnotatedMethod";

// Class to test:
import {AnnotatedMethodBuilder} from "../../../../../src/com/onsoft/tiger/builders/AnnotatedMethodBuilder";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/AnnotatedMethodBuilderTestUtils";

// Test:
describe("AnnotatedMethodBuilder", ()=> {

  describe("#build()", ()=> {

    let builder:AnnotatedMethodBuilder = new AnnotatedMethodBuilder();
    let annotatedMethod:AnnotatedMethod = builder.build(utils.DESCRIPTOR);
    
    it("should return an instance of the TigerAnnotatedMethod class", function() {
      expect(annotatedMethod).to.be.an.instanceof(TigerAnnotatedMethod);
    });

    it("should return the 'name' property as defined by the specified AnnotatedMethodDescriptor", function() {
       expect(annotatedMethod.name).to.equal(utils.METHOD_NAME);
    });

    it("should return the 'timeout' property as defined by the specified AnnotatedMethodDescriptor", function() {
       expect(annotatedMethod.timeout).to.equal(utils.METHOD_TIMEOUT);
    });
    
    it("should return the 'type' property as defined by the specified AnnotatedMethodDescriptor", function() {
       expect(annotatedMethod.type).to.equal(utils.METHOD_TYPE);
    });
  });
});
