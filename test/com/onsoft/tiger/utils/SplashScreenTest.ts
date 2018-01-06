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
import * as chai from "chai";
import * as spies from "chai-spies";

// Class to test:
import {SplashScreen} from "../../../../../src/com/onsoft/tiger/utils/SplashScreen";

// Utilities:
import * as utils from "../../../../../utils/test-utils/utilities/SplashScreenTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

// Test:
describe("SplashScreen", ()=> {

  describe("#displayMessage()", ()=> {
    it("should display the splashscreen message with the right version and the correct information", function() {
      let spy:any = chai.spy.on(console, "log");
      let oldLog:any = console.log;
      let splashScreen:SplashScreen = new SplashScreen();
      splashScreen.displayMessage(utils.VERSION);
      console.log = function (message) {
        expect(message).to.have.string(utils.TITLE);
        expect(message).to.have.string(utils.VERSION);
        expect(message).to.have.string(utils.RIGHTS);
        expect(utils.COPYRIGHT.test(message)).to.be.true;
        oldLog.apply(console, arguments);
      };
      expect(spy).to.have.been.called;
      console.log = oldLog;
    });
  });
});