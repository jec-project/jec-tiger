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

// Class to test:
import {JutaContextManager} from "../../../../../src/com/onsoft/tiger/jcad/JutaContextManager";
import { JcadContextError } from "jec-commons";

// Test:
describe("JutaContextManager", ()=> {
  
  describe("#deleteContext() Error", ()=> {
    it("should throw a JcadContextError excpetion when nor context have been created before", ()=> {
      let manager:JutaContextManager = new JutaContextManager();
      let doDeleteContext:Function = function():void {
        manager.deleteContext();
      }
      expect(doDeleteContext).to.throw(JcadContextError);
    });
  });
  
  describe("#createContext(), #deleteContext()", ()=> {
    it("should create and remove JCAD contexts without errors", ()=> {
      let manager:JutaContextManager = new JutaContextManager();
      expect(manager.createContext()).to.be.OK;
      expect(manager.deleteContext()).to.be.OK;
    });
  });
});