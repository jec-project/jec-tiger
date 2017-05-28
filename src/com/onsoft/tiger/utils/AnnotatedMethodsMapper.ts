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

import {AnnotatedMethod, AnnotatedMethodType} from "jec-juta";

/**
 * A utility class that allows to easilly get access to
 * <code>AnnotatedMethod</code> instances for a test suite.
 */
export class AnnotatedMethodsMapper {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AnnotatedMethodsMapper</code> instance.
   * 
   * @param {Array<AnnotatedMethod>} methods the collection of
   *                                         <code>AnnotatedMethod</code>
   *                                         associated with a test suite.
   */
  constructor(methods:AnnotatedMethod[]) {
    this.initObj(methods);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to method annotated with the <code>@BeforeClass</code>
   * decorator.
   */
  private _beforeClass:AnnotatedMethod = null;
  
  /**
   * The reference to method annotated with the <code>@AfterClass</code>
   * decorator.
   */
  private _afterClass:AnnotatedMethod = null;
  
  /**
   * The reference to method annotated with the <code>@Before</code>
   * decorator.
   */
  private _before:AnnotatedMethod = null;
  
  /**
   * The reference to method annotated with the <code>@After</code>
   * decorator.
   */
  private _after:AnnotatedMethod = null;
  
  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {Array<AnnotatedMethod>} methods the collection of
   *                                         <code>AnnotatedMethod</code>
   *                                         associated with a test suite.
   */
  private initObj(methods:AnnotatedMethod[]):void {
    let method:AnnotatedMethod = null;
    let len:number = methods.length;
    while(len--) {
      method = methods[len];
       switch(method.type) {
        case AnnotatedMethodType.BEFORE_CLASS :
          this._beforeClass = method;
          break;
        case AnnotatedMethodType.AFTER_CLASS :
          this._afterClass = method;
          break;
        case AnnotatedMethodType.BEFORE :
          this._before = method;
          break;
        case AnnotatedMethodType.AFTER :
          this._after = method;
          break;
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns an annotated method, depending on the specified type.
   *
   * @param {number} type the type of the method to find. valid values are the
   *                      constants of the <code>AnnotatedMethodType</code> 
   *                      enum.
   * @return {AnnotatedMethod} the annotated method with the specified type, or 
   *                           <code>null</code> wheter the method does not
   *                           exists.
   */
  public getMethodByType(type:number):AnnotatedMethod{
    let method:AnnotatedMethod = null;
    switch(type) {
      case AnnotatedMethodType.BEFORE_CLASS :
        method = this._beforeClass;
        break;
      case AnnotatedMethodType.AFTER_CLASS :
        method = this._afterClass;
        break;
      case AnnotatedMethodType.BEFORE :
        method = this._before;
        break;
      case AnnotatedMethodType.AFTER :
        method = this._after;
        break;
    }
    return method;
  }
};
