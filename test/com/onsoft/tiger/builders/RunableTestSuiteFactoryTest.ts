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
import {RunableTestSuite, JutaConnectorRefs} from "jec-juta";
import {TigerRunableTestSuite} from "../../../../../src/com/onsoft/tiger/runners/model/TigerRunableTestSuite";

// Class to test:
import {RunableTestSuiteFactory} from "../../../../../src/com/onsoft/tiger/builders/RunableTestSuiteFactory";

// Utilities:
const utils:any = require("../../../../..//utils/test-utils/utilities/RunableTestSuiteFactoryTestUtils");

// Test:
describe("RunableTestSuiteFactory", ()=> {

  before(()=> {
    utils.CTXM.addContext(JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF, utils.CONTEXT);
    utils.DCM.addConnector(utils.TEST_SUITE_CONNECTOR, utils.CONTEXT);
    utils.CTXM.addContext(JutaConnectorRefs.TEST_CONNECTOR_REF, utils.CONTEXT);
    utils.DCM.addConnector(utils.TEST_CONNECTOR, utils.CONTEXT);
  });

  after(()=> {
    utils.CTXM.removeContext(JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF);
    utils.DCM.removeConnector(JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF, utils.CONTEXT);
    utils.CTXM.removeContext(JutaConnectorRefs.TEST_CONNECTOR_REF);
    utils.DCM.removeConnector(JutaConnectorRefs.TEST_CONNECTOR_REF, utils.CONTEXT);
  });

  describe("#create()", ()=> {
    let builder:RunableTestSuiteFactory = new RunableTestSuiteFactory();
    
    it("should return an instance of the TigerRunableTestSuite class", function() {
      let testSuite:RunableTestSuite =
                             builder.create(utils.FILE_PROPERTIES, utils.TIGER);
      expect(testSuite).to.be.an.instanceof(TigerRunableTestSuite);
    });
  });
});
