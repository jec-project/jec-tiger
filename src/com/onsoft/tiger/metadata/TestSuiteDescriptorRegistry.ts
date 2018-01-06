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

import {TestSuiteDescriptor} from "../reflect/TestSuiteDescriptor";
import {TestDescriptor} from "../reflect/TestDescriptor";
import {AnnotatedMethodDescriptor} from "../reflect/AnnotatedMethodDescriptor";
import {ParameterDescriptor} from "../reflect/ParameterDescriptor";

/**
 * A static helper class which is used to temporarily store
 * <code>TestSuiteDescriptor</code> instances during JUTA decorators lookup
 * process.
 */
export class TestSuiteDescriptorRegistry {

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>TestSuiteDescriptor</code> instance which is  
   * currently registered into this <code>TestSuiteDescriptorRegistry</code>.
   */
  private static _testSuiteDescriptor:TestSuiteDescriptor = null;

  /**
   * The array that is used to store the test descriptors for the current test
   * suite.
   */
  private static _testColl:Array<TestDescriptor> = null;

  /**
   * The array that is used to store the annotated descriptors for the current 
   * test suite.
   */
  private static _methodColl:Array<AnnotatedMethodDescriptor> = null;

  /**
   * The map which is used to store the parameter descriptors for the HTTP
   * methods exposed by the associated resource.
   */
  private static _parametersMap:Map<string, Array<ParameterDescriptor>> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Registers a <code>TestSuiteDescriptor</code> instance into this
   * <code>TestSuiteDescriptorRegistry</code> object.
   * @param {TestSuiteDescriptor} testSuiteDescriptor 
   *                              the <code>TestSuiteDescriptor</code> to
   *                              register.
   * @return {TestSuiteDescriptor} the registered
   *                               <code>TestSuiteDescriptor</code> object.
   */
  public static registerDescriptor(
                  testSuiteDescriptor:TestSuiteDescriptor):TestSuiteDescriptor {
    TestSuiteDescriptorRegistry._testSuiteDescriptor = testSuiteDescriptor;
    if(testSuiteDescriptor) {
      TestSuiteDescriptorRegistry._testColl = new Array<TestDescriptor>();
      TestSuiteDescriptorRegistry._methodColl = 
                                         new Array<AnnotatedMethodDescriptor>();
      TestSuiteDescriptorRegistry._parametersMap =
                                  new Map<string, Array<ParameterDescriptor>>();
    } else {
      TestSuiteDescriptorRegistry._testColl.splice(0);
      TestSuiteDescriptorRegistry._testColl = null;
      TestSuiteDescriptorRegistry._methodColl.splice(0);
      TestSuiteDescriptorRegistry._methodColl = null;
      TestSuiteDescriptorRegistry._parametersMap.clear();
      TestSuiteDescriptorRegistry._parametersMap = null;
    }
    return testSuiteDescriptor;
  }

  /**
   * Returns the <code>TestSuiteDescriptor</code> instance registered into this
   * <code>TestSuiteDescriptorRegistry</code> object.
   *
   * @return {TestSuiteDescriptor} the <code>TestSuiteDescriptor</code>
   *                               registered into this
   *                               <code>TestSuiteDescriptorRegistry</code>
   *                               object.
   */
  public static getRegisteredDescriptor():TestSuiteDescriptor {
    return TestSuiteDescriptorRegistry._testSuiteDescriptor;
  }
  
  /**
   * Returns the array which is used to store the test descriptors for the 
   * current test suite.
   *
   * @return {Array<TestDescriptor>} the collection of 
   *                                 <code>TestDescriptor</code> objects for the
   *                                 current test suite.
   */
  public static getTestDescriptorCollection():Array<TestDescriptor> {
    return TestSuiteDescriptorRegistry._testColl;
  }

  /**
   * Adds the specified <code>TestDescriptor</code> object to the registery.
   *
   * @param {TestDescriptor} testDescriptor the <code>TestDescriptor</code> 
   *                                        object to add to the registery.
   */
  public static addTestDescriptor(testDescriptor:TestDescriptor):void {
    TestSuiteDescriptorRegistry._testColl.push(testDescriptor);
  }

  /**
   * Returns the array which is used to store the annotated method descriptors 
   * for the current test suite.
   *
   * @return {Array<AnnotatedMethodDescriptor>}
   *                    the collection of <code>AnnotatedMethodDescriptor</code>
   *                    objects for the current test suite.
   */
  public static getAnnotatedMethodDescriptorCollection():Array<AnnotatedMethodDescriptor> {
    return TestSuiteDescriptorRegistry._methodColl;
  }

  /**
   * Adds the specified <code>AnnotatedMethodDescriptor</code> object to the
   * registery.
   * 
   * @param {AnnotatedMethodDescriptor} testDescriptor
   *                           the <code>AnnotatedMethodDescriptor</code> object
   *                           to add to the registery.
   */
  public static addAnnotatedMethodDescriptor(
                              methodDescriptor:AnnotatedMethodDescriptor):void {
    TestSuiteDescriptorRegistry._methodColl.push(methodDescriptor);
  }
  
  /**
   * Returns the map which is used to store the parameter descriptors for the 
   * associated test class.
   *
   * @return {Map<string, Array<ParameterDescriptor>>}
   *                        the map of <code>ParameterDescriptor</code> objects.
   */
  public static getParametersMap():Map<string, Array<ParameterDescriptor>> {
    return TestSuiteDescriptorRegistry._parametersMap;
  }
}
