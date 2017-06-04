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
import {JutaConnectorRefs} from "jec-juta";
import {AbstractDecoratorConnector} from "jec-commons";

// Class to test:
import {TigerConnector} from "../../../../../../src/com/onsoft/tiger/jcad/connectors/TigerConnector";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/TigerConnectorTestUtils";

// Test:
describe("TigerConnector", ()=> {
  
  describe("extends AbstractDecoratorConnector", ()=> {
    it("should extend the AbstractDecoratorConnector class", ()=>{
      let connector:TigerConnector = new TigerConnector(JutaConnectorRefs.TEST_CONNECTOR_REF, utils.DECORATOR);
      expect(connector).to.be.an.instanceOf(AbstractDecoratorConnector);
    });
  });
  
  describe("#getJcadReference()", ()=> {
    it("should return the JCAD reference passed as parameter of the constructor function", ()=>{
      let connector:TigerConnector = new TigerConnector(JutaConnectorRefs.TEST_CONNECTOR_REF, utils.DECORATOR);
      expect(connector.getJcadReference()).to.be.equal(JutaConnectorRefs.TEST_CONNECTOR_REF);
    });
  });
  
  describe("#getDecorator()", ()=> {
    it("should return the Decorator instance passed as parameter of the constructor function", ()=>{
      let connector:TigerConnector = new TigerConnector(JutaConnectorRefs.TEST_CONNECTOR_REF, utils.DECORATOR);
      expect(connector.getDecorator()).to.be.equal(utils.DECORATOR);
    });
  });
});