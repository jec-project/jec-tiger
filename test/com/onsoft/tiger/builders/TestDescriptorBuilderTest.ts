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
import {TestDescriptor} from "../../../../../src/com/onsoft/tiger//reflect/TestDescriptor";

// Class to test:
import {TestDescriptorBuilder} from "../../../../../src/com/onsoft/tiger/builders/TestDescriptorBuilder";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/TestDescriptorBuilderTestUtils";

// Test:
describe("TestDescriptorBuilder", ()=> {

  describe("#build()", ()=> {
    const builder:TestDescriptorBuilder = new TestDescriptorBuilder();
    
    it("should return an instance of the TestDescriptor class", function() {
      const descriptor:TestDescriptor =
                       builder.build(utils.KEY, utils.DESCRIPTOR, utils.PARAMS);
      expect(descriptor).to.be.an.instanceof(TestDescriptor);
    });

    it("should return the 'description' property as defined by the 'params.description' parameter", function() {
      const descriptor:TestDescriptor =
                       builder.build(utils.KEY, utils.DESCRIPTOR, utils.PARAMS);
      expect(descriptor.description).to.equal(utils.DESCRIPTION);
    });
    
    it("should return the 'method' property as defined by the 'key' parameter", function() {
      const descriptor:TestDescriptor =
                       builder.build(utils.KEY, utils.DESCRIPTOR, utils.PARAMS);
      expect(descriptor.method).to.equal(utils.KEY);
    });
    
    it("should return the 'repeat' property as defined by the 'params.repeat' parameter", function() {
      const descriptor:TestDescriptor =
                       builder.build(utils.KEY, utils.DESCRIPTOR, utils.PARAMS);
      expect(descriptor.repeat).to.equal(utils.REPEAT);
    });
    
    it("should return the 'timeout' property as defined by the 'params.timeout' parameter", function() {
      const descriptor:TestDescriptor =
                       builder.build(utils.KEY, utils.DESCRIPTOR, utils.PARAMS);
      expect(descriptor.timeout).to.equal(utils.TIMEOUT);
    });
    
    it("should return the 'order' property as defined by the 'params.order' parameter", function() {
      const descriptor:TestDescriptor =
                       builder.build(utils.KEY, utils.DESCRIPTOR, utils.PARAMS);
      expect(descriptor.order).to.equal(utils.ORDER);
    });
    
    it("should return the 'disabled' property as defined by the 'params.disabled' parameter", function() {
      const descriptor:TestDescriptor =
                       builder.build(utils.KEY, utils.DESCRIPTOR, utils.PARAMS);
      expect(descriptor.disabled).to.equal(utils.DISABLED);
    });
  });
});
