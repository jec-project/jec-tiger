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

import {TestSuiteDescriptorRegistry} from "../../metadata/TestSuiteDescriptorRegistry";
import {TestSuiteDescriptor} from "../../reflect/TestSuiteDescriptor";
import {TestDescriptor} from "../../reflect/TestDescriptor";
import {AnnotatedMethodDescriptor} from "../../reflect/AnnotatedMethodDescriptor";
import {RunableTestSuite, TestSuiteError, TestMethod, AnnotatedMethod} from "jec-juta";
import {TestMethodBuilder} from "../../builders/TestMethodBuilder";
import {AnnotatedMethodBuilder} from "../../builders/AnnotatedMethodBuilder";

/**
 * The <code>TigerRunableTestSuite<code> class is te default implementation for 
 * the <code>RunableTestSuite</code> interface in the Tiger framework.
 */
export class TigerRunableTestSuite implements RunableTestSuite {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerRunableTestSuite</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The test suite associated with this <code>RunableTestSuite</code> object.
   */
  private _testSuite:any = null;

  /**
   * The description of the test suite associated with this
   * <code>RunableTestSuite</code> object.
   */
  private _description:string = null;

  /**
   * The collection of test methods associated with this
   * <code>RunableTestSuite</code> object.
   */
  private _testMethods:TestMethod[] = null;

  /**
   * The collection of annotated methods associated with this
   * <code>RunableTestSuite</code> object.
   */
  private _annotatedMethods:AnnotatedMethod[] = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._testMethods = new Array<TestMethod>();
    this._annotatedMethods = new Array<AnnotatedMethod>();
  }

  /**
   * Initializes the test methods for this object.
   */
  private initTestMethods():void {
    let coll:TestDescriptor[] =
                      TestSuiteDescriptorRegistry.getTestDescriptorCollection();
    let len:number = coll.length;
    let builder:TestMethodBuilder = new TestMethodBuilder();
    let method:TestMethod = null;
    while(len--) {
      method = builder.build(coll[len]);
      this._testMethods.push(method);
    }
  }

  /**
   * Initializes the annotated methods for this object.
   */
  private initAnnotatedMethods():void {
    let coll:AnnotatedMethodDescriptor[] =
           TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection();
    let len:number = coll.length;
    let builder:AnnotatedMethodBuilder = new AnnotatedMethodBuilder();
    let method:AnnotatedMethod = null;
    while(len--) {
      method = builder.build(coll[len]);
      this._annotatedMethods.push(method);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getTestSuite():any {
    return this._testSuite;
  }

  /**
   * @inheritDoc
   */
  public setTestSuite(testSuite:any):void {
    let descriptor:TestSuiteDescriptor =
                          TestSuiteDescriptorRegistry.getRegisteredDescriptor();
    if(!descriptor){
      //TODO: log this error
      throw new TestSuiteError(
        "No TestSuiteDescriptor is defined for the specified class:" +
        testSuite.constructor.name
      );
    }
    this._testSuite = testSuite;
    this._description = descriptor.description;
    this.initTestMethods();
    this.initAnnotatedMethods();
  }

  /**
   * @inheritDoc
   */
  public getDescription():string {
    return this._description;
  }

  /**
   * @inheritDoc
   */
  public getTestMethods():TestMethod[] {
    return this._testMethods;
  }

   /**
   * @inheritDoc
   */
  public getAnnotatedMethods():AnnotatedMethod[] {
    return this._annotatedMethods;
  }
}
