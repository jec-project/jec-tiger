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

import {TestMethod} from "jec-juta";
import {TigerTestableMethod} from "./TigerTestableMethod";

/**
 * The <code>TigerTestMethod</code> class is te default implementation for the
 * <code>TestMethod</code> interface in the Tiger framework.
 */
export class TigerTestMethod extends TigerTestableMethod implements TestMethod {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerTestMethod</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public description:string = null;
  
  /**
   * @inheritDoc
   */
  public repeat:number = 0;
  
  /**
   * @inheritDoc
   */
  public order:number = 0;
}
