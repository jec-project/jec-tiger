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
import {SingletonError, LoggerProxy} from "jec-commons";

// Class to test:
import {TigerLoggerProxy} from "../../../../../src/com/onsoft/tiger/logging/TigerLoggerProxy";

// Test:
describe("TigerLoggerProxy", ()=> {

  describe("singleton error", ()=> {
    it("should throw a singleton error when calling the constructor function", ()=>{
      let buildInstance:Function = function():void {
        new TigerLoggerProxy();
      };
      expect(buildInstance).to.throw(SingletonError);
    });
  });
  
  describe("#getInstance()", ()=> {
    it("should return a TigerLoggerProxy instance", ()=>{
      let logger:LoggerProxy = TigerLoggerProxy.getInstance();
      expect(logger).to.be.an.instanceOf(TigerLoggerProxy);
    });
  });
  
  describe("#getInstance()", ()=> {
    it("should return a singleton reference", ()=>{
      let logger1:LoggerProxy = TigerLoggerProxy.getInstance();
      let logger2:LoggerProxy = TigerLoggerProxy.getInstance();
      expect(logger1).to.equal(logger2);
    });
  });
});