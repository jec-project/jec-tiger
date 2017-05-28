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

/**
 * The main Tiger framework execution entry point, which will run a full unit 
 * testing session.
 */
export interface Tiger {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Starts the Tiger framework main process.
   * 
   * @param {Function} callback the callback method called an the end of the
   *                            process. This function takes an object parameter
   *                            which represents an error message whether the
   *                            process failed.
   */
  process(callback:(err:any)=>void):void;

  /**
   * Returns the current version of the Tiger framework.
   * 
   * @return {string} the current version of the Tiger framework.
   */
  getVersion():string;

  /**
   * Sets the test paths defined for running autowired tests.
   * 
   * @param {Array<string>} paths an array that contains the test paths defined  
   *                              for running autowired tests.
   */
  setTestPaths(paths:string[]):void;

  /**
   * Returns the test paths defined for running autowired tests.
   * 
   * @return {Array<string>} an array that contains the test paths defined for 
   *                         running autowired tests.
   */
  getTestPaths():string[];
};
