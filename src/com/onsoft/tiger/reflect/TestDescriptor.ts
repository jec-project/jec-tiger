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
 * The <code>TestDescriptor</code> class contains information about a JUTA test
 * class.
 */
export class TestDescriptor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestDescriptor</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * The description for this <code>TestDescriptor</code> instance.
   */
  public description:string = null;

  /**
   * The name of the method that wraps the test associated whith this
   * <code>TestDescriptor</code> instance.
   */
  public method:string = null;
  
  /**
   * The number of repetitions for the test associated whith this
   * <code>TestDescriptor</code> instance.
   */
  public repeat:number = 0;

  /**
   * The timeout for the test associated whith this <code>TestDescriptor</code>
   * instance.
   */
  public timeout:number = -1;
}