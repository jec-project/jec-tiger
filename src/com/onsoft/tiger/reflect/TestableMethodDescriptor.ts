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

/**
 * The abstract class that contains information about a testable method defined 
 * by a JUTA decorator.
 */
export abstract class TestableMethodDescriptor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestableMethodDescriptor</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The name of the method that wraps the test associated whith this
   * <code>TestableMethodDescriptor</code> instance.
   */
  public method:string = null;

  /**
   * Specifies the timeout for this <code>TestableMethodDescriptor</code>
   * instance.
   */
  public timeout:number = -1;

  /**
   * Indicates whether the associated test method has to be ignored 
   * (<code>true</code>), or not (<code>false</code>). Default value is
   * <code>false</code>.
   */
  public disabled:boolean = false;
}