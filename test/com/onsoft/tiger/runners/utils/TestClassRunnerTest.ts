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
import { AnnotatedMethod, AnnotatedMethodType } from "jec-juta";

// Class to test:
import {TestClassRunner} from "../../../../../../src/com/onsoft/tiger/runners/utils/TestClassRunner";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/TestClassRunnerTestUtils";
import {TestClassRunnerTestClass} from "../../../../../../utils/test-utils/classes/TestClassRunnerTestClass";


// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Test:
describe("TestClassRunner", ()=> {

  let runner:TestClassRunner = new TestClassRunner();
  
  describe("#applyStaticMethod()", ()=> {

     it("should do nothing when test is disabled", function() {
      let spy:any = chai.spy.on(global, "it");
      let method:AnnotatedMethod = utils.buildAnnotatedMethod(
        AnnotatedMethodType.BEFORE, true
      );
      expect(
        runner.applyStaticMethod(method, TestClassRunnerTestClass, this)
      ).to.be.OK;
      expect(spy).to.have.been.called.once;
    });
  });
});