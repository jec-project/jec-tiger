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

import {TestWatcher} from "./TestWatcher";
import {RunableTestSuite} from "jec-juta";

/**
 * The <code>TigerContainerWatcher</code> class allows to store all test suites 
 * of a JEC project.
 */
export class TigerContainerWatcher implements TestWatcher {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerContainerWatcher</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The root path to the project to be test.
   */
  private _contextPath:string = null;

  /**
   * The collection of <code>RunableTestSuite</code> associated with this
   * watcher.
   */
  private _testSuites:Array<RunableTestSuite> = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._contextPath = process.cwd();
    this._testSuites = new Array<RunableTestSuite>();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getContextPath():string {
    return this._contextPath;
  }

  /**
   * @inheritDoc
   */
  public addTestSuite(testSuite:RunableTestSuite):void {
    this._testSuites.push(testSuite);
  }

  /**
   * @inheritDoc
   */
  public getTestSuites():RunableTestSuite[] {
    return this._testSuites;
  }
}