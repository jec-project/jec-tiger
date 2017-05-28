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
 * The <code>AnnotatedMethodDescriptor</code> class contains information about a 
 * method annotated by a JUTA decorator.
 */
export class AnnotatedMethodDescriptor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AnnotatedMethodDescriptor</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * The description for this <code>AnnotatedMethodDescriptor</code> instance.   
   * Valid values are the constants of the <code>AnnotatedMethodType</code>
   * enum.
   */
  public type:number = -1;

  /**
   * The name of the method that wraps the test associated whith this
   * <code>AnnotatedMethodDescriptor</code> instance.
   */
  public method:string = null;

  /**
   * Specifies the timeout for this <code>AnnotatedMethodDescriptor</code>
   * instance.
   */
  public timeout:number = -1;
}