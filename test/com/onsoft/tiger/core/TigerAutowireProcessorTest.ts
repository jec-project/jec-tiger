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
import {JutaConnectorRefs} from "jec-juta";
import {JcadContextError} from "jec-commons";
import {TigerLoggerProxy} from "../../../../../src/com/onsoft/tiger/logging/TigerLoggerProxy";

// Class to test:
import {TigerAutowireProcessor} from "../../../../../src/com/onsoft/tiger/core/TigerAutowireProcessor";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/TigerAutowireProcessorTestUtils";

// Test:
describe("TigerAutowireProcessor", ()=> {

  describe("#processComplete()", ()=> {
    it("should remove all the registered JCAD contexts associated with the Tiger Framework", ()=> {
      const processor:TigerAutowireProcessor = new TigerAutowireProcessor();
      expect(utils.CONTEXT_MANAGER.hasContext(JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF)).to.be.true;
      expect(utils.CONTEXT_MANAGER.hasContext(JutaConnectorRefs.TEST_CONNECTOR_REF)).to.be.true;
      processor.processComplete(utils.WATCHER, utils.PATH);
      expect(utils.CONTEXT_MANAGER.hasContext(JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF)).to.be.false;
      expect(utils.CONTEXT_MANAGER.hasContext(JutaConnectorRefs.TEST_CONNECTOR_REF)).to.be.false;
    });
  });

  describe("multiple instances", ()=> {
    it("should throw a JCAD error when trying to create simultaneous instances of the TigerAutowireProcessor class", ()=> {
      const newInstance:Function = function():TigerAutowireProcessor {
        return new TigerAutowireProcessor();
      };
      const processor:TigerAutowireProcessor = newInstance();
      expect(newInstance).to.throw(JcadContextError);
      processor.processComplete(utils.WATCHER, utils.PATH);
    });
  });

  describe("#getTigerContainer()", ()=> {

    it("should return null when no Tiger container has been set", ()=>{
      const processor:TigerAutowireProcessor = new TigerAutowireProcessor();
      expect(processor.getTigerContainer()).to.be.null;
      processor.processComplete(utils.WATCHER, utils.PATH);
    });

    it("should return the same Tiger container as specified by the setTigerContainer() method", ()=>{
      const processor:TigerAutowireProcessor = new TigerAutowireProcessor();
      processor.setTigerContainer(utils.TIGER);
      expect(processor.getTigerContainer()).to.equal(utils.TIGER);
      processor.processComplete(utils.WATCHER, utils.PATH);
    });
  });

  describe("#processStart()", ()=> {
    it("should have no effect", ()=> {
      const processor:TigerAutowireProcessor = new TigerAutowireProcessor();
       processor.processStart(utils.WATCHER, utils.PATH);
       expect("processStart").to.be.ok;
       processor.processComplete(utils.WATCHER, utils.PATH);
    });
  });
  
  describe("#process()", ()=> {
    it("should find one test suite in our test scenario", ()=> {
      const watcherSpy:any = sinon.spy(utils.WATCHER, "addTestSuite");
      const loggerSpy:any = sinon.spy(TigerLoggerProxy.getInstance(), "log");
      const processor:TigerAutowireProcessor = new TigerAutowireProcessor();
      processor.process(utils.FILE, utils.WATCHER);
      sinon.assert.calledOnce(watcherSpy);
      sinon.assert.calledOnce(loggerSpy);
      processor.processComplete(utils.WATCHER, utils.PATH);
      sinon.restore();
    });
  });
});