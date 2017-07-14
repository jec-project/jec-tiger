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
import {TigerLoggerProxy} from "../logging/TigerLoggerProxy";
import {Logger, LogLevel, ConsoleLogger, SourceFileInspector} from "jec-commons";
import {TigerAutowireProcessor} from "./TigerAutowireProcessor";
import {TigerSourceFileInspector} from "./TigerSourceFileInspector";
import {TigerContainerWatcher} from "./TigerContainerWatcher";
import {TestRunner, TestSuiteError} from "jec-juta";
import {TigerTestRunner} from "../runners/TigerTestRunner";

/**
 * The default implementation of the <code>Tiger</code> interface.
 */
export class DefaultTigerContainer implements Tiger {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultTigerContainer</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The collection that contains paths to folders that define test suites.
   */
  private _testPaths:string[] = null;

  /**
   * The <code>SourceFileInspector</code> instance for this container.
   */
  private _sourceFileInspector:SourceFileInspector = null;

  /**
   * The current version of this <code>Tiger</code> container implementation.
   */
  private _version:string = null;

  /**
   * The <code>TestRunner</code> associated with this container.
   */
  private _testRunner:TestRunner = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    let logger:Logger = new ConsoleLogger();
    this._version = "1.2.0";
    TigerLoggerProxy.getInstance().setLogger(logger);
    this._sourceFileInspector = new TigerSourceFileInspector();
    this._testRunner = new TigerTestRunner();
  }

  /**
   * The wrapper function used to send decorated messages to the output stream.
   * 
   * @param {string} message the message to decorate and to send to the output
   *                         stream.
   * @param {number} logLevel the log level of the message sent to the output
   *                          stream. Valid values are the constants of the
   *                          <code>LogLevel</code> class.
   */
  private sendMessage(message:string, logLevel?:number):void {
    TigerLoggerProxy.getInstance().log(message, logLevel);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public process(callback:(err:any)=>void):void {
    this.sendMessage("Tiger start");
    let watcher:TigerContainerWatcher = new TigerContainerWatcher();
    let processor:TigerAutowireProcessor = new TigerAutowireProcessor();
    let validSourcePaths:boolean = true;
    let errorMessage:string = null;
    if(this._testPaths === null || this._testPaths.length === 0) {
      this.setTestPaths(["test"]);
    }
    this._sourceFileInspector.setWatcher(watcher);
    processor.setTigerContainer(this);
    this._sourceFileInspector.addProcessor(processor);
    try {
      this._sourceFileInspector.inspect();
    } catch(e) {
      if(e.code === "ENOENT") {
        validSourcePaths = false;
        errorMessage = "invalid test classes paths"
      }
      this.sendMessage(`${errorMessage}\n${e.stack}`, LogLevel.ERROR);
      processor.processComplete(null, null);
      callback(new TestSuiteError(errorMessage));
    }
    if(validSourcePaths) {
      this._testRunner.runAllTests(
        watcher.getTestSuites(),
        (err:any)=> {
          callback(err);
          this.sendMessage("Tiger complete");
      });
    }
  }

  /**
   * @inheritDoc
   */
  public getVersion():string {
    return this._version;
  }

  /**
   * @inheritDoc
   */
  public setTestPaths(paths:string[]):void {
    let len:number = paths.length;
    this._testPaths = paths;
    while(len--) this._sourceFileInspector.addSourcePath(paths[len]);
  }

  /**
   * @inheritDoc
   */
  public getTestPaths():string[] {
    return this._testPaths;
  }
};
