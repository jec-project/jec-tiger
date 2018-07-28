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
import * as sinon from "sinon";
import {TestSuiteDescriptorRegistry} from "../../../../../src/com/onsoft/tiger/metadata/TestSuiteDescriptorRegistry";
import {ParameterDescriptor} from "../../../../../src/com/onsoft/tiger/reflect/ParameterDescriptor";

// Class to test:
import {ParametersMapUtil} from "../../../../../src/com/onsoft/tiger/utils/ParametersMapUtil";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/ParametersMapUtilTestUtils";

// Test:
describe("ParametersMapUtil", ()=> {

  describe("#getParameterCollection()", ()=> {

    it("should throw an error when no TestSuiteDescriptor has been registered", function() {
      try {
        ParametersMapUtil.getParameterCollection(utils.METHOD_NAME);
      } catch (e) {
        expect(e).to.be.an.instanceOf(TypeError);
      }
    });

    it("should invoke the TestSuiteDescriptorRegistry.getParametersMap() method", function() {
      utils.initRegistry();
      const spy:any = sinon.spy(
        TestSuiteDescriptorRegistry, "getParametersMap"
      );
      ParametersMapUtil.getParameterCollection(utils.METHOD_NAME);
      sinon.assert.calledOnce(spy);
      sinon.restore();
      utils.resetRegistry();
    });

    it("should return an empty array", function() {
      utils.initRegistry();
      const descriptors:ParameterDescriptor[] =
                    ParametersMapUtil.getParameterCollection(utils.METHOD_NAME);
      expect(descriptors).to.be.an("array");
      expect(descriptors).to.have.lengthOf(0);
      utils.resetRegistry();
    });
  });
});