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

import {RunableTestSuite, TestRunner, TestMethod, AnnotatedMethodType,
        AnnotatedMethod} from "jec-juta";
import {TigerLoggerProxy} from "../logging/TigerLoggerProxy";
import {AnnotatedMethodsMapper} from "../utils/AnnotatedMethodsMapper";
import "mocha";

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
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

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

  /**
   * Applies the mocha test to the specified test method.
   * 
   * @param {TestMethod} method the method to wrap whithin a mocha hook method.
   * @param {any} testSuiteObj the reference to the current test suite instance.
   * @param {any} scope the scope for current test.
   */
  private applyTestMethod(method:TestMethod, testSuiteObj:any, scope:any):void {
    if(method.disabled) {
        it(`disabled test: ${method.name}`);
        return;
    }
    let timeout:number = method.timeout;
    if(timeout && timeout > 0) scope.timeout(timeout);
    if(method.async) {
       it(method.description, (done?:MochaDone) => {
        testSuiteObj[method.name](done);
      });
    } else {
       it(method.description, () => {
        testSuiteObj[method.name]();
       });
    }
  }

  /**
   * Applies the mocha hook method depending on the <code>type</code> properties 
   * of the specified annotated method.
   * 
   * @param {AnnotatedMethod} method the annotated method to wrap whithin a
   *                                 mocha hook method.
   * @param {any} testSuiteObj the reference to the current test suite instance.
   * @param {any} scope the scope for current test.
   */
  private applyAnnotatedMethod(method:AnnotatedMethod, testSuiteObj:any,
                                                               scope:any):void {
    let timeout:number = -1;
    let methodRef:Function = null;
    if(method) {
      if(method.disabled) {
         it(`disabled config method: ${method.name}`);
         return;
      }
      timeout = method.timeout;
      if(timeout && timeout > 0) scope.timeout(timeout);
      switch(method.type) {
        case AnnotatedMethodType.BEFORE_CLASS :
          methodRef = before;
          break;
        case AnnotatedMethodType.AFTER_CLASS :
          methodRef = after;
          break;
        case AnnotatedMethodType.BEFORE :
          methodRef = beforeEach;
          break;
        case AnnotatedMethodType.AFTER :
          methodRef = afterEach;
          break;
      }
      if(method.async) {
        methodRef((done?:MochaDone) => {
          testSuiteObj[method.name](done);
        });
      } else {
        methodRef(() => {
          testSuiteObj[method.name]();
        });
      } 
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public runTest(testSuite:RunableTestSuite, callback:(err:any)=>void):void {
    let testMethods:TestMethod[] = testSuite.getTestMethods();
    let testMethod:TestMethod = null;
    let len:number = testMethods.length - 1;
    let cursor:number = 0;
    let _this:TigerTestRunner = this;
    let testSuiteObj:any = testSuite.getTestSuite();
    let mapper:AnnotatedMethodsMapper = 
                    new AnnotatedMethodsMapper(testSuite.getAnnotatedMethods());
    let describeScope:any = null;
    let repeat:number = 0;
    this.sendMessage("test suite run");
    describe(testSuite.getDescription(), function() {
      if(testSuite.isDisabled()) {
        it(`disabled test suite: ${testSuiteObj.constructor.name}`);
        return;
      }
      describeScope = this;
      _this.applyAnnotatedMethod(
        mapper.getMethodByType(AnnotatedMethodType.BEFORE_CLASS),
        testSuiteObj,
        describeScope
      );
      _this.applyAnnotatedMethod(
        mapper.getMethodByType(AnnotatedMethodType.AFTER_CLASS),
        testSuiteObj,
        describeScope
      );
      _this.applyAnnotatedMethod(
        mapper.getMethodByType(AnnotatedMethodType.BEFORE),
        testSuiteObj,
        describeScope
      );
      _this.applyAnnotatedMethod(
        mapper.getMethodByType(AnnotatedMethodType.AFTER),
        testSuiteObj,
        describeScope
      );
      for(; cursor <= len; ++cursor) {
        testMethod = testMethods[cursor];
        repeat = testMethod.repeat;
        if(repeat && repeat > 0) {
          while(repeat--) {
            _this.applyTestMethod(testMethod, testSuiteObj, describeScope);
          }
        } else _this.applyTestMethod(testMethod, testSuiteObj, describeScope);
      }
      _this.sendMessage("test suite complete");
      callback(null);
    });
  }

  /**
   * @inheritDoc
   */
  public runAllTests(testSuiteColl:RunableTestSuite[],
                                                callback:(err:any)=>void):void {
    let len:number = testSuiteColl.length;
    let process:boolean = true;
    while(len-- && process) {
      this.runTest(
        testSuiteColl[len],
        (err)=> {
          if(err) {
            process = false;
            callback(err);
          } else if(len <= 0 && process) callback(null);
        }
      );
    }
  }
}
