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

const printMessage:any = require("print-message");

/**
 * A utility class that creates and displays the splashscreen message when
 * running a <code>Tiger</code> instance.
 */
export class SplashScreen {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SplashScreen</code> instance.
   */
  constructor() { }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Displays the splashscreen message.
   *
   * @param {string} version the current version of the <code>Tiger</code>
   *                         instance.
   */
  public displayMessage(version:string):void{
    printMessage([
      "  Tiger Unit Testing Framework ",
      "  ----------------------------",
      `            V. ${version}            `,
      "    (C) 2017 - ONSOFT SYSTEMS    ",
      "       All Rights Reserved       "
    ]);
  }
};
