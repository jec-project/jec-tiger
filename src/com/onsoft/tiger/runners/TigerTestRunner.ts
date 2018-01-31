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

import {RunableTestSuite, TestRunner, TestMethod, AnnotatedMethodType,
  AnnotatedMethod, TestStats, InstantiationPolicy, TestSuiteError
} from "jec-juta";
import {TigerLoggerProxy} from "../logging/TigerLoggerProxy";
import {AnnotatedMethodsMapper} from "../utils/AnnotatedMethodsMapper";
import {TestClassRunner} from "./utils/TestClassRunner";
import {TigerTestStats} from "./TigerTestStats";
import "mocha";
import * as moment from "moment";
import {LogLevel} from "jec-commons";

/**
 * The <code>TigerTestRunner</code> class is te default implementation for the
 * <code>TestRunner</code> interface in the Tiger framework.
 */
export class TigerTestRunner implements TestRunner {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerTestRunner</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Contains information about the current tests invocated by this
   * <code>TigerTestRunner</code> instance.
   */
  private _stats:TestStats = null;

  /**
   * A boolean value that indicates whether multiple tests has been run with
   * the <code>runAllTests()</code> method (<code>true</code>), or not
   * <code>false</code>.
   */
  private _runMultipleTests:boolean = false;

  /**
   * The start time for the current tests.
   */
  private _testStart:Date = null;

  /**
   * The delagator object useed by this <code>TigerTestRunner</code> instance to
   * run test suite classes.
   */
  private _classRunner:TestClassRunner = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

    /**
     * Initializes this object.
     */
  private initObj():void {
    this._classRunner = new TestClassRunner();
  }

  /**
   * The wrapper function used to send decorated messages to the output stream.
   * 
   * @param {string} message the message to decorate and to send to the output
   *                         stream.
   * @param {LogLevel} logLevel the log level of the message sent to the output
   *                          stream.
   */
  private sendMessage(message:string, logLevel?:LogLevel):void {
    TigerLoggerProxy.getInstance().log(message, logLevel);
  }

  /**
   * Initializes the test stats for the current test suites.
   */
  private initStats(multiple?:boolean):TestStats {
    let stats:TestStats = (this._stats === null) ? new TigerTestStats() :
                                                   this._stats;                                 
    if(multiple) this._runMultipleTests = true;
    else this._testStart = new Date();
    return stats;
  }

  /**
   * Computes the duration of the current tests.
   */
  private computeTestDuration():void {
    let now:Date = new Date();
    let duration:number = moment(now).diff(moment(this._testStart));
    this._stats.duration = duration;
    this._stats.time = moment(duration).format("mm:ss.SSS");
    this._testStart = null;
    this._runMultipleTests = false;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public runTest(testSuite:RunableTestSuite,
                                        callback:(stats:TestStats)=>void):void {
    let testMethods:TestMethod[] = testSuite.getTestMethods();
    let _this:TigerTestRunner = this;
    let testSuiteObj:any = testSuite.getTestSuite();
    let mapper:AnnotatedMethodsMapper = 
                    new AnnotatedMethodsMapper(testSuite.getAnnotatedMethods());
    let name:string = testSuiteObj.constructor.name;
    let testPolicy:string = testSuite.getInstantiationPolicy();
    let stats:TestStats = this.initStats();
    this._stats = stats;
    this.sendMessage(`test suite run: ${name}`);
    describe(testSuite.getDescription(), function() {
      if(testSuite.isDisabled()) {
        _this._stats.numDisabledTestSuites++;
        it(`disabled test suite: ${name}`);
        return;
      }
      _this._stats.numTestSuites++;
      _this._classRunner.applyGlobalFixtures(
        testPolicy, mapper, testSuiteObj, this
      );
      if(testPolicy === InstantiationPolicy.SINGLE) {
         _this._classRunner.runSingleInstanceTests(
          testMethods, mapper, testSuiteObj, this, stats
        );
      } else if(testPolicy === InstantiationPolicy.MULTIPLE) {
        _this._classRunner.runMultipleInstanceTest(
          testMethods, mapper, testSuiteObj, stats
        );
      } else {
        throw new TestSuiteError(
          `Instantiation Policy is not valid on test suite ${name}:
+expected InstantiationPolicy.SINGLE or InstantiationPolicy.MULTIPLE 
-actual ${testPolicy}`
        );
      }
      _this.sendMessage("test suite complete");
      if(!_this._runMultipleTests) _this.computeTestDuration();
      callback(_this._stats);
    });
  }

  /**
   * @inheritDoc
   */
  public runAllTests(testSuiteColl:RunableTestSuite[],
                                        callback:(stats:TestStats)=>void):void {
    let len:number = testSuiteColl.length;
    let process:boolean = true;
    this._stats = this.initStats(true);
    this._testStart = new Date();
    if(len === 0) {
      this.computeTestDuration();
      callback(this._stats);
    } else {
      while(len-- && process) {
        this.runTest(
          testSuiteColl[len],
          (innerStats)=> {
            if(innerStats.error) {
              process = false;
              this.computeTestDuration();
              callback(this._stats);
            } else if(len <= 0 && process) {
              this.computeTestDuration();
              callback(this._stats);
            }
          }
        );
      }
    }
    
    this._stats = null;
  }
}
