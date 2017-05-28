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

import {RunableTestSuite} from "jec-juta";

/**
 * The <code>TestWatcher</code> defines the basic set of APIs you must implement 
 * to create test watcher objects for the JUTA specification in the Tiger
 * framework.
 */
export interface TestWatcher {
  
  /**
   * Returns the context path to the project to be test.
   * 
   * @return {string} the context path to the project to be test.
   */
  getContextPath():string;

  /**
   * Returns the context path to the project to be test.
   * 
   * @return {string} the context path to the project to be test.
   */
  addTestSuite(testSuite:RunableTestSuite):void;

  /**
   * Returns the collection that contains all test suites defined in the context
   * paths.
   * 
   * @return {Array<RunableTestSuite>} the collection that contains all test 
   *                                   suites defined in  the context paths.
   */
  getTestSuites():RunableTestSuite[];
}
