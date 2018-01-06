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

import {TestSuiteDescriptorRegistry} from "../../metadata/TestSuiteDescriptorRegistry";
import {TestSuiteDescriptor} from "../../reflect/TestSuiteDescriptor";
import {TestDescriptor} from "../../reflect/TestDescriptor";
import {ParameterDescriptor} from "../../reflect/ParameterDescriptor";
import {AnnotatedMethodDescriptor} from "../../reflect/AnnotatedMethodDescriptor";
import {RunableTestSuite, TestSuiteError, TestMethod, AnnotatedMethod, TestableMethod} from "jec-juta";
import {TestMethodBuilder} from "../../builders/TestMethodBuilder";
import {AnnotatedMethodBuilder} from "../../builders/AnnotatedMethodBuilder";
import {ParametersMapUtil} from "../../utils/ParametersMapUtil";
import { TestSorters, InstantiationPolicy } from "jec-juta";
import {TestSorterUtil} from "../../utils/TestSorterUtil";

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

  /**
   * Indicates whether this <code>RunableTestSuite</code> object has to be
   * ignored by the test runners (<code>true</code>), or not
   * (<code>false</code>).
   */
  private _disabled:boolean = false;

  /**
   * Indicates the test execution order for this <code>RunableTestSuite</code>
   * object.
   */
  private _testOrder:number = TestSorters.DEFAULT;

  /**
   * Indicates the policy used to create test class instances.
   */
  private _instantiationPolicy:string = InstantiationPolicy.SINGLE;

  /**
   * The utility which is resposible for sorting test methods that compose this
   * <code>RunableTestSuite</code>
   */
  private _testSorter:TestSorterUtil = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._testMethods = new Array<TestMethod>();
    this._annotatedMethods = new Array<AnnotatedMethod>();
    this._testSorter = new TestSorterUtil();
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
    let descriptor:TestDescriptor = null;
    while(len--) {
      descriptor = coll[len];
      method = builder.build(descriptor);
      this._testMethods.push(method);
    }
    this._testSorter.sort(this._testMethods, this._testOrder);
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
    let descriptor:AnnotatedMethodDescriptor = null;
    while(len--) {
      descriptor = coll[len];
      method = builder.build(descriptor);
      this._annotatedMethods.push(method);
    }
  }

  /**
   * Initializes the test parameters for this object.
   */
  private initParameters():void {
    let map:Map<string, ParameterDescriptor[]> = 
                                 TestSuiteDescriptorRegistry.getParametersMap();
    this.initAsyncProps(map, this._testMethods);
    this.initAsyncProps(map, this._annotatedMethods);
  }

  /**
   * Initializes the asynchronous testable methods for this object.
   * 
   * @param {Map<string, ParameterDescriptor[]>} map the map that contains the
   *                                                 references to the 
   *                                                 asynchronous callback
   *                                                 methods.
   * @param {TestableMethod[]>} coll the collection of testable methods to
   *                                 initialize.
   */
  private initAsyncProps(map:Map<string, ParameterDescriptor[]>,
                                                   coll:TestableMethod[]):void {
    let len:number = coll.length;
    let method:TestableMethod = null;
    while(len--) {
      method = coll[len];
      if(map.has(method.name)) method.async = true;
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
    this._disabled = descriptor.disabled;
    this._testOrder = descriptor.testOrder;
    this._instantiationPolicy = descriptor.instantiationPolicy;
    this.initTestMethods();
    this.initAnnotatedMethods();
    this.initParameters();
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

  /**
   * @inheritDoc
   */
  public isDisabled():boolean {
    return this._disabled;
  }
  
  /**
   * @inheritDoc
   */
  public getTestOrder():number {
    return this._testOrder;
  }
  
  /**
   * @inheritDoc
   */
  public getInstantiationPolicy():string {
    return this._instantiationPolicy;
  }
}
