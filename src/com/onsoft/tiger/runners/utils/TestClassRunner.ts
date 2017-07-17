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

import "mocha";
import { TestMethod, AnnotatedMethodType, AnnotatedMethod, InstantiationPolicy,
  TestStats, TestableMethod, TestSuiteError } from "jec-juta";
import {AnnotatedMethodsMapper} from "../../utils/AnnotatedMethodsMapper";

/**
 * A delagator object that runs all tests associated with a test class.
 */
export class TestClassRunner {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestClassRunner</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Checks whether the specified testing method is disabled
   * (<code>true</code>), or not (<code>false</code>).
   * 
   * @param {TestableMethod} method  the testing method to check.
   * @return {boolean} <code>true</code> whether the specified testing method is
   *                   disabled; <code>false</code> otherwise.
   */
  private checkDisabledTest(method:TestableMethod):boolean {
    if(method.disabled) {
      it(`disabled config method: ${method.name}`);
      return true;
    } else return false;
  }

  /**
   * Throws an exception of the type of <code>TestSuiteError</code> when the
   * annotated method type is not valid.
   * 
   * @param {string} expected a string that specifies the expected values.
   */
  private invalidMethodTypeError(expected:string):void {
    throw new TestSuiteError(`Invalid decorator: '${expected}' expected`);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Invokes the mocha hook method depending on the <code>type</code> properties 
   * of the specified static method.
   * 
   * @param {AnnotatedMethod} method the static method to wrap whithin a mocha
   *                                 hook method.
   * @param {any} ClassRef the reference to the current test suite class.
   * @param {any} scope the scope reference for current mocha test function.
   */
  public applyStaticMethod(method:AnnotatedMethod, ClassRef:any,
                                                               scope:any):void {
    let timeout:number = -1;
    let methodRef:Function = null;
    let type:number = null;
    if(method) {
      type = method.type;
      if(this.checkDisabledTest(method)) return;
      timeout = method.timeout;
      if(timeout && timeout > 0) scope.timeout(timeout);
      switch(type) {
        case AnnotatedMethodType.BEFORE_CLASS :
          methodRef = before;
          break;
        case AnnotatedMethodType.AFTER_CLASS :
          methodRef = after;
          break;
        default :
        this.invalidMethodTypeError(
          "AnnotatedMethodType.BEFORE_CLASS or AnnotatedMethodType.AFTER_CLASS"
        );
      }
      if(method.async) {
        methodRef((done?:MochaDone) => {
          ClassRef[method.name](done);
        });
      } else {
        methodRef(() => {
          ClassRef[method.name]();
        });
      } 
    }
  }
  
  /**
   * Invokes the mocha hook method depending on the <code>type</code> properties 
   * of the specified annotated method.
   * 
   * @param {AnnotatedMethod} method the annotated method to wrap whithin a
   *                                 mocha hook method.
   * @param {any} testSuiteObj the reference to the current test suite instance.
   * @param {any} scope the scope reference for current mocha test function.
   */
  public applyAnnotatedMethod(method:AnnotatedMethod, testSuiteObj:any,
                                                               scope:any):void {
    let timeout:number = -1;
    let methodRef:Function = null;
    let type:number = null;
    if(method) {
      type = method.type;
      if(this.checkDisabledTest(method)) return;
      timeout = method.timeout;
      if(timeout && timeout > 0) scope.timeout(timeout);
      switch(type) {
        case AnnotatedMethodType.BEFORE_ALL :
          methodRef = before;
          break;
        case AnnotatedMethodType.AFTER_ALL :
          methodRef = after;
          break;
        case AnnotatedMethodType.BEFORE :
          methodRef = beforeEach;
          break;
        case AnnotatedMethodType.AFTER :
          methodRef = afterEach;
          break;
        default :
        this.invalidMethodTypeError(
          "AnnotatedMethodType.BEFORE_ALL, AnnotatedMethodType.AFTER_ALL AnnotatedMethodType.BEFORE or AnnotatedMethodType.AFTER"
        );
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

  /**
   * Invokes test fixture methods depending on the instantiation policy
   * specified in the current test suite configuration.
   * 
   * @param {string} testPolicy the reference to the instantiation policy as
   *                            specified in the current test suite
   *                            configuration.
   * @param {AnnotatedMethodsMapper} mapper the annotated methods mapper 
   *                                        associated with the current test
   *                                        suite.
   * @param {any} testSuiteObj the reference to the current test suite instance.
   * @param {any} scope the scope reference for current mocha test function.
   */
  public applyGlobalFixtures(testPolicy:string,
                             mapper:AnnotatedMethodsMapper, 
                             testSuiteObj:any, scope:any):void {
    if(testPolicy === InstantiationPolicy.SINGLE) {
      this.applyAnnotatedMethod(
        mapper.getMethodByType(AnnotatedMethodType.BEFORE_ALL),
        testSuiteObj,
        scope
      );
      this.applyAnnotatedMethod(
        mapper.getMethodByType(AnnotatedMethodType.AFTER_ALL),
        testSuiteObj,
        scope
      );
    } else if(testPolicy === InstantiationPolicy.MULTIPLE) {
      let ClassRef:Function = testSuiteObj.constructor;
      this.applyStaticMethod(
        mapper.getMethodByType(AnnotatedMethodType.BEFORE_CLASS),
        ClassRef,
        scope
      );
      this.applyStaticMethod(
        mapper.getMethodByType(AnnotatedMethodType.AFTER_CLASS),
        ClassRef,
        scope
      );
    } else {
        throw new TestSuiteError(
          `Instantiation Policy is not valid:
+expected InstantiationPolicy.SINGLE or InstantiationPolicy.MULTIPLE 
-actual ${testPolicy}`
        );
      }
  }

  /**
   * Invokes the mocha test function for the specified test method.
   * 
   * @param {TestMethod} method the method to wrap within a mocha test function.
   * @param {any} testSuiteObj the reference to the current test suite instance.
   * @param {any} scope the scope reference for current mocha test function.
   * @param {TestStats} stats the <code>TestStats</code> object associated with 
   *                          the current test.
   */
  public applyTestMethod(method:TestMethod, testSuiteObj:any, scope:any,
                                                         stats:TestStats):void {
    let name:string = method.name;
    let timeout:number = method.timeout;
    let desc:string = `${name}: ${method.description}`;
    if(this.checkDisabledTest(method)) {
      stats.numDisabledTests++;
      return;
    }
    if(timeout && timeout > 0) scope.timeout(timeout);
    if(method.async) {
      stats.numAsyncTests++;
      it(desc, (done?:MochaDone) => {
        testSuiteObj[name](done);
      });
    } else {
      stats.numTests++;
      it(desc, () => {
        testSuiteObj[name]();
      });
    }
  }
  
  /**
   * Invokes all tests for the current test suite by creating a single instance
   * of the test class.
   * 
   * @param {Array<TestMethod>} testMethods the of methods to be run during the
   *                                        current test.
   * @param {AnnotatedMethodsMapper} mapper the annotated methods mapper 
   *                                        associated with the current test
   *                                        suite.
   * @param {any} testSuiteObj the reference to the current test suite instance.
   * @param {any} scope the scope reference for current mocha test suite
   *                    function.
   * @param {TestStats} stats the <code>TestStats</code> object associated with 
   *                          the current test.
   */
  public runSingleInstanceTests(testMethods:TestMethod[],
                                mapper:AnnotatedMethodsMapper, testSuiteObj:any,
                                scope:any, stats:TestStats):void {
    let testMethod:TestMethod = null;
    let len:number = testMethods.length - 1;
    let cursor:number = 0;
    let repeat:number = 0;
    this.applyAnnotatedMethod(
      mapper.getMethodByType(AnnotatedMethodType.BEFORE),
      testSuiteObj,
      scope
    );
    this.applyAnnotatedMethod(
      mapper.getMethodByType(AnnotatedMethodType.AFTER),
      testSuiteObj,
      scope
    );
    for(; cursor <= len; ++cursor) {
      testMethod = testMethods[cursor];
      repeat = testMethod.repeat;
      if(repeat && repeat > 0) {
        while(repeat--) {
          this.applyTestMethod(
            testMethod,
            testSuiteObj,
            scope,
            stats
          );
        }
      } else {
        this.applyTestMethod(
          testMethod,
          testSuiteObj,
          scope,
          stats
        );
      }
    }
  }

  /**
   * Invokes all test for the current test suite by creating a new instance
   * of the test class for each test.
   * 
   * @param {Array<TestMethod>} testMethods the of methods to be run during the
   *                                        current test.
   * @param {AnnotatedMethodsMapper} mapper the annotated methods mapper 
   *                                        associated with the current test
   *                                        suite.
   * @param {any} testSuiteObj the reference to the current test suite instance.
   * @param {TestStats} stats the <code>TestStats</code> object associated with 
   *                          the current test.
   * 
   * @return {number} the number of new test class instances created.
   */
  public runMultipleInstanceTest(testMethods:TestMethod[],
                                 mapper:AnnotatedMethodsMapper,
                                 testSuiteObj:any, stats:TestStats):number {
    let testMethod:TestMethod = null;
    let len:number = testMethods.length - 1;
    let cursor:number = 0;
    let repeat:number = 0;
    let ClassRef:any = testSuiteObj.constructor;
    let newInstance:any = null;
    let scope:any = null;
    let _this = this;
    let numInstances:number = 0;
    for(; cursor <= len; ++cursor) {
      describe("[Isolated Test]", function() {
        _this.applyAnnotatedMethod(
          mapper.getMethodByType(AnnotatedMethodType.BEFORE),
          testSuiteObj,
          scope
        );
        _this.applyAnnotatedMethod(
          mapper.getMethodByType(AnnotatedMethodType.AFTER),
          testSuiteObj,
          scope
        );
        scope = this;
        newInstance = new ClassRef();
        numInstances++;
        testMethod = testMethods[cursor];
        repeat = testMethod.repeat;
        if(repeat && repeat > 0) {
          while(repeat--) {
            _this.applyTestMethod(
              testMethod,
              testSuiteObj,
              scope,
              stats
            );
          }
        } else {
          _this.applyTestMethod(
            testMethod,
            testSuiteObj,
            scope,
            stats
          );
        }
      });
    }
    return numInstances;
  }
};
