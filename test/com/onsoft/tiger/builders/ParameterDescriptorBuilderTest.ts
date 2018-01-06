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
import {ParameterDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/ParameterDescriptor";

// Class to test:
import {ParameterDescriptorBuilder} from "../../../../../src/com/onsoft/tiger/builders/ParameterDescriptorBuilder";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/ParameterDescriptorBuilderTestUtils";

// Test:
describe("ParameterDescriptorBuilder", ()=> {

  describe("#build()", ()=> {
    let builder:ParameterDescriptorBuilder = new ParameterDescriptorBuilder();
    
    it("should return an instance of the ParameterDescriptor class", function() {
      let descriptor:ParameterDescriptor =
                        builder.build(utils.METHOD_NAME, utils.CONNECTOR_REF, utils.PARAMETER_INDEX);
      expect(descriptor).to.be.an.instanceof(ParameterDescriptor);
    });

    it("should return the 'index' property as defined by the 'params.METHOD_NAME' parameter", function() {
      let descriptor:ParameterDescriptor =
                        builder.build(utils.METHOD_NAME, utils.CONNECTOR_REF, utils.PARAMETER_INDEX);
      expect(descriptor.index).to.equal(utils.PARAMETER_INDEX);
    });
    
    it("should return the 'methodName' property as defined by the 'params.PARAMETER_INDEX' parameter", function() {
      let descriptor:ParameterDescriptor =
                        builder.build(utils.METHOD_NAME, utils.CONNECTOR_REF, utils.PARAMETER_INDEX);
      expect(descriptor.methodName).to.equal(utils.METHOD_NAME);
    });
    
    it("should return the 'connectorRef' property as defined by the 'params.CONNECTOR_REF' parameter", function() {
      let descriptor:ParameterDescriptor =
                        builder.build(utils.METHOD_NAME, utils.CONNECTOR_REF, utils.PARAMETER_INDEX);
      expect(descriptor.connectorRef).to.equal(utils.CONNECTOR_REF);
    });
  });
});
