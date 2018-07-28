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
import {SourceFileInspector, FilePreProcessor} from "jec-commons";

// Class to test:
import {TigerSourceFileInspector} from "../../../../../src/com/onsoft/tiger/core/TigerSourceFileInspector";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/TigerSourceFileInspectorTestUtils";

// Test:
describe("TigerSourceFileInspector", ()=> {

  describe("#getContextPath()", ()=> {

    it("should return the null when no watcher has been defined", ()=> {
      const inspector:SourceFileInspector = new TigerSourceFileInspector();
      expect(inspector.getWatcher()).to.be.null;
    });

     it("should return the reference to the watcher which has been specified by the setWatcher() method", ()=> {
      const inspector:SourceFileInspector = new TigerSourceFileInspector();
      inspector.setWatcher(utils.WATCHER);
      expect(inspector.getWatcher()).to.equal(utils.WATCHER);
    });
  });

  describe("#addProcessor()", ()=> {
    it("we must improve the SourceFileInspector interface for testing the addProcessor() method");
  });
  
  describe("#addSourcePath()", ()=> {
    it("we must improve the SourceFileInspector interface for testing the addSourcePath() method");
  });

  describe("#inspect()", ()=> {
    
    it("should run silently when no properties have been set", ()=> {
      const inspector:SourceFileInspector = new TigerSourceFileInspector();
      expect(inspector.inspect(null)).to.be.undefined;
    });

    it("should invoke process() and processComplete() method on the specified FilePreProcessor instance", ()=> {
      const inspector:SourceFileInspector = new TigerSourceFileInspector();
      const processor:FilePreProcessor = utils.buildProcessor();
      const processCompleteSpy:any = sinon.spy(processor, "processComplete");
      const processSpy:any = sinon.spy(processor, "process");
      inspector.setWatcher(utils.WATCHER);
      inspector.addSourcePath(utils.SOURCE_PATH);
      inspector.addProcessor(processor);
      inspector.inspect(null);
      sinon.assert.called(processCompleteSpy);
      sinon.assert.called(processSpy);
      /*sinon.assert.calledWith(processSpy, utils.NUM_TEST_CLASS, utils.WATCHER);
      sinon.assert.calledWith(processCompleteSpy, utils.WATCHER);*/
      sinon.restore();
    });
  });
});