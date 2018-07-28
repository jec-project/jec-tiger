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
import {Decorator} from "jec-commons";
import {JutaConnectorRefs} from "jec-juta";
import {ParametersMapUtil} from "../../../../../../src/com/onsoft/tiger/utils/ParametersMapUtil";
import {ParameterDescriptor} from "../../../../../../src/com/onsoft/tiger/reflect/ParameterDescriptor";

// Class to test:
import {AsyncDecorator} from "../../../../../../src/com/onsoft/tiger/jcad/decorators/AsyncDecorator";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/DecoratorsTestUtils";

// Test:
describe("AsyncDecorator", ()=> {

  let decorator:Decorator = null;

  beforeEach(()=> {
    utils.initRegistry();
    decorator = new AsyncDecorator();
  });

  afterEach(()=> {
    utils.resetRegistry();
    decorator = null;
  });

  describe("#decorate()", ()=> {

    it("should return the reference to the target instance", ()=>{
      const target:any = decorator.decorate(
        utils.TARGET, utils.KEY, utils.PARAMETER_INDEX
      );
      expect(target).to.equal(utils.TARGET);
    });

    it("should register information into the ParametersMapUtil by invoking the getParameterCollection() method", ()=>{
      const spy:any = sinon.spy(ParametersMapUtil, "getParameterCollection");
      decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
      sinon.assert.calledOnce(spy);
      sinon.restore();
    });
    
    it("should create an ParameterDescriptor object into the TestSuiteDescriptorRegistry object", ()=>{
      let descriptors:ParameterDescriptor[] =
                          ParametersMapUtil.getParameterCollection(utils.KEY);
      expect(descriptors).to.have.lengthOf(0);
      decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
      descriptors = ParametersMapUtil.getParameterCollection(utils.KEY);
      expect(descriptors).to.have.lengthOf(1);
    });

    it("should create an ParameterDescriptor instance with the specified 'methodName' value", ()=>{
      decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
      const descriptors:ParameterDescriptor[] =
                            ParametersMapUtil.getParameterCollection(utils.KEY);
      const descriptor:ParameterDescriptor = descriptors[0];
      expect(descriptor.methodName).to.equal(utils.KEY);
    });
    
    it("should create an ParameterDescriptor instance with the specified 'index' value", ()=>{
      decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
      const descriptors:ParameterDescriptor[] =
                            ParametersMapUtil.getParameterCollection(utils.KEY);
      const descriptor:ParameterDescriptor = descriptors[0];
      expect(descriptor.index).to.equal(utils.PARAMETER_INDEX);
    });
    
    it("should create an ParameterDescriptor instance with the 'connectorRef' value set to JutaConnectorRefs.ASYNC_CONNECTOR_REF", ()=>{
      decorator.decorate(utils.TARGET, utils.KEY, utils.PARAMETER_INDEX);
      const descriptors:ParameterDescriptor[] =
                            ParametersMapUtil.getParameterCollection(utils.KEY);
      const descriptor:ParameterDescriptor = descriptors[0];
      expect(
        descriptor.connectorRef
      ).to.equal(JutaConnectorRefs.ASYNC_CONNECTOR_REF);
    });
  });
});