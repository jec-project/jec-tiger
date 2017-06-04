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
import {Tiger} from "../../../../../src/com/onsoft/tiger/Tiger";
import {DefaultTigerContainer} from "../../../../../src/com/onsoft/tiger/core/DefaultTigerContainer";

// Class to test:
import {TigerFactory} from "../../../../../src/com/onsoft/tiger/builders/TigerFactory";

// Utilities:
import * as utils from "../../../../..//utils/test-utils/utilities/TestMethodBuilderTestUtils";

// Test:
describe("TigerFactory", ()=> {

  describe("#create()", ()=> {
    
    it("should return an instance of the DefaultTigerContainer class", function() {
      let factory:TigerFactory = new TigerFactory();
      let tiger:Tiger = factory.create();
      expect(tiger).to.be.an.instanceof(DefaultTigerContainer);
    });

  });
});
