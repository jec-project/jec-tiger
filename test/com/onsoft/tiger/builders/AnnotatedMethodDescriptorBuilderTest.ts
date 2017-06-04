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
import {AnnotatedMethodDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";

// Class to test:
import {AnnotatedMethodDescriptorBuilder} from "../../../../../src/com/onsoft/tiger/builders/AnnotatedMethodDescriptorBuilder";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/AnnotatedMethodDescriptorBuilderTestUtils";

// Test:
describe("AnnotatedMethodDescriptorBuilder", ()=> {

  describe("#build()", ()=> {
    let builder:AnnotatedMethodDescriptorBuilder = new AnnotatedMethodDescriptorBuilder();
    let methodDescriptor:AnnotatedMethodDescriptor =
            builder.build(utils.KEY, utils.DESCRIPTOR, utils.TYPE, utils.PARAMS);
    
    it("should return an instance of the AnnotatedMethodDescriptor class", function() {
      expect(methodDescriptor).to.be.an.instanceof(AnnotatedMethodDescriptor);
    });

    it("should return the 'method' property as defined by the specified AnnotatedMethodParams", function() {
       expect(methodDescriptor.method).to.equal(utils.KEY);
    });

    it("should return the 'timeout' property as defined by the specified AnnotatedMethodParams", function() {
       expect(methodDescriptor.timeout).to.equal(utils.TIMEOUT);
    });
    
    it("should return the 'type' property as defined by the specified AnnotatedMethodParams", function() {
       expect(methodDescriptor.type).to.equal(utils.TYPE);
    });
  });
});
