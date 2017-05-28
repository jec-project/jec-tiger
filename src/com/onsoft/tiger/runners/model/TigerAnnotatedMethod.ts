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

import {AnnotatedMethod} from "jec-juta";

/**
 * The <code>TigerAnnotatedMethod</code> class is te default implementation for 
 * the <code>AnnotatedMethod</code> interface in the Tiger framework.
 */
export class TigerAnnotatedMethod implements AnnotatedMethod {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerAnnotatedMethod</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public timeout:number = -1;
  
  /**
   * @inheritDoc
   */
  public name:string = null;
  
  /**
   * @inheritDoc
   */
  public type:number = null;
}
