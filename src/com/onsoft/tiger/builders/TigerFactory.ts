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

import {Tiger} from "../Tiger";
import {DefaultTigerContainer} from "../core/DefaultTigerContainer";
import {SplashScreen} from "../utils/SplashScreen";

/**
 * The helper class for creating <code>Tiger</code> instances.
 */
export class TigerFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerFactory</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and return a new <code>Tiger</code> instance.
   * 
   * @return a new <code>Tiger</code> instance.
   */
  public create():Tiger {
    let tester:Tiger = new DefaultTigerContainer();
    let splashScreen:SplashScreen = new SplashScreen();
    splashScreen.displayMessage(tester.getVersion());
    return tester;
  }
};
