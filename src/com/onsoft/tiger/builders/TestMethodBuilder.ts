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

import {TestMethod} from "jec-juta";
import {TestDescriptor} from "../reflect/TestDescriptor";
import {TigerTestMethod} from "../runners/model/TigerTestMethod";

/**
 * A helper class that creates and returns new <code>TestMethod</code>
 * instances.
 */
export class TestMethodBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestMethodBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>TestMethod</code> instance.
   * 
   * @param {TestDescriptor} descriptor the descriptor associated with the 
   *                                    decorated method.
   * @return {TestMethod} a new <code>TestMethod</code> instance.
   */
  public build(descriptor:TestDescriptor):TestMethod {
    let testMethod:TestMethod = new TigerTestMethod();
    testMethod.description = descriptor.description;
    testMethod.name = descriptor.method;
    testMethod.timeout = descriptor.timeout;
    testMethod.repeat = descriptor.repeat;
    testMethod.disabled = descriptor.disabled || false;
    testMethod.order = descriptor.order || 0;
    return testMethod;
  }
};
