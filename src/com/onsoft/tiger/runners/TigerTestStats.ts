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

import {TestStats} from "jec-juta";

/**
 * The <code>TigerTestStats</code> class is te default implementation for the
 * <code>TestStats</code> interface in the Tiger framework.
 */
export class TigerTestStats implements TestStats {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TigerTestStats</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public numTestSuites:number = 0;

  /**
   * @inheritDoc
   */
  public numDisabledTestSuites:number = 0;
  
  /**
   * @inheritDoc
   */
  public numTests:number = 0;

  /**
   * @inheritDoc
   */
  public numDisabledTests:number = 0;

  /**
   * @inheritDoc
   */
  public numAsyncTests:number = 0;
  
  /**
   * @inheritDoc
   */
  public duration:number = 0;
  
  /**
   * @inheritDoc
   */
  public time:string = null;

  /**
   * @inheritDoc
   */
  public error:any = null;
}
