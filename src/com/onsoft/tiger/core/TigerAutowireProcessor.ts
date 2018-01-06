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

import {Tiger} from "../Tiger";
import {RunableTestSuiteFactory} from "../builders/RunableTestSuiteFactory";
import {TigerLoggerProxy} from "../logging/TigerLoggerProxy";
import {LoggerProxy, FilePreProcessor, FileProperties,
        DecoratorProperties} from "jec-commons";
import {RunableTestSuite} from "jec-juta";
import {JutaContextManager} from "../jcad/JutaContextManager";

/**
 * The <code>TigerAutowireProcessor</code> class allows to find all test suites 
 * of a JEC  project.
 */
export class TigerAutowireProcessor implements FilePreProcessor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerAutowireProcessor</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The mask used to detect the <code>@TestSuite</code> annotation in a file.
   */
  private static readonly TEST_SUITE_MASK:string = "TestSuite";
  
  /**
   * The mask used to detect the <code>jec-juta</code> imports in a file.
   */
  private static readonly JUTA_MASK:string = "jec-juta";

  /**
   * The reference to the Tiger container that runs this processor.
   */
  private _tigerContainer:Tiger = null;

  /**
   * The reference to the <code>JutaContextManager</code> that is used to manage 
   * JCAD context objects for this processor.
   */
  private _contextManager:JutaContextManager = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._contextManager = new JutaContextManager();
    this._contextManager.createContext();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the Tiger container reference for this processor.
   * 
   * @return {Tiger} the reference to the Tiger container for this processor.
   */
  public getTigerContainer():Tiger {
    return this._tigerContainer;
  }

  /**
   * Sets the Tiger container reference for this processor.
   * 
   * @param {Tiger} container the reference to the Tiger container for this
   *                          processor.
   */
  public setTigerContainer(container:Tiger):void {
    this._tigerContainer = container;
  }

  /**
   * @inheritDoc
   */
  public processStart(watcher:any, sourcePath:string):void {}

  /**
   * @inheritDoc
   */
  public process(file:FileProperties, watcher:any):void {
    let decorators:DecoratorProperties[] = file.decorators;
    let len:number = decorators.length;
    let decorator:DecoratorProperties = null;
    let logger:LoggerProxy = TigerLoggerProxy.getInstance();
    let factory:RunableTestSuiteFactory = new RunableTestSuiteFactory();
    let testSuite:RunableTestSuite = null;
    while(len--) {
      decorator = decorators[len];
      if( decorator.classPath === TigerAutowireProcessor.JUTA_MASK &&
          decorator.name === TigerAutowireProcessor.TEST_SUITE_MASK ) {
        testSuite = factory.create(file, this._tigerContainer);
        watcher.addTestSuite(testSuite);
        logger.log(
          "autowired test suite detected: source file='" + file.name + "'"
        );
      }
    }
  }

  /**
   * @inheritDoc
   */
  public processComplete(watcher:any, sourcePath:string) {
    this._contextManager.deleteContext();
  }
}