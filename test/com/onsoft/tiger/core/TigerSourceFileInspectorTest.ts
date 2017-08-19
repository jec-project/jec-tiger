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
import * as chai from "chai";
import * as spies from "chai-spies";
import {SourceFileInspector, FilePreProcessor} from "jec-commons";
import {TestWatcher} from "../../../../../src/com/onsoft/tiger/core/TestWatcher";

// Class to test:
import {TigerSourceFileInspector} from "../../../../../src/com/onsoft/tiger/core/TigerSourceFileInspector";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/TigerSourceFileInspectorTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Test:
describe("TigerSourceFileInspector", ()=> {

  describe("#getContextPath()", ()=> {

    it("should return the null when no watcher has been defined", ()=> {
      let inspector:SourceFileInspector = new TigerSourceFileInspector();
      expect(inspector.getWatcher()).to.be.null;
    });

     it("should return the reference to the watcher which has been specified by the setWatcher() method", ()=> {
      let inspector:SourceFileInspector = new TigerSourceFileInspector();
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
      let inspector:SourceFileInspector = new TigerSourceFileInspector();
      inspector.inspect(null);
      expect("inspect").to.be.ok;
    });

    it("should invoke process() and processComplete() method on the specified FilePreProcessor instance", ()=> {
      let inspector:SourceFileInspector = new TigerSourceFileInspector();
      let processor:FilePreProcessor = utils.buildProcessor();
      let processCompleteSpy:any = chai.spy.on(processor, "processComplete");
      let processSpy:any = chai.spy.on(processor, "process");
      inspector.setWatcher(utils.WATCHER);
      inspector.addSourcePath(utils.SOURCE_PATH);
      inspector.addProcessor(processor);
      inspector.inspect(null);
      expect(processSpy).to.have.been.called.exactly(utils.NUM_TEST_CLASS);
      expect(processSpy).to.have.been.called.with(utils.WATCHER);
      expect(processCompleteSpy).to.have.been.called.with(utils.WATCHER);
    });
  });
});