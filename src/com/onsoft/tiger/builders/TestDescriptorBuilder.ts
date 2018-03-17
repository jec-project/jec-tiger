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

import {TestParams} from "jec-juta";
import {TestDescriptor} from "../reflect/TestDescriptor";

/**
 * A helper class that creates and returns new <code>TestDescriptor</code>
 * instances.
 */
export class TestDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestDescriptorBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>TestDescriptor</code> instance.
   * 
   * @param {string} key the name of the decorated method.
   * @param {PropertyDescriptor} descriptor the property descriptor associated
   *                                        with the decorated method.
   * @param {TestParams} params the testing parameters associated with the
   *                            decorated method.
   * @return {TestDescriptor} a new <code>TestDescriptor</code> instance.
   */
  public build(key:string, descriptor:PropertyDescriptor,
                                             params:TestParams):TestDescriptor {
    const testDesc:TestDescriptor = new TestDescriptor();
    testDesc.description = params.description;
    testDesc.method = key;
    testDesc.repeat = params.repeat || 0;
    testDesc.timeout = params.timeout || -1;
    testDesc.disabled = params.disabled || false;
    testDesc.order = params.order || 0;
    return testDesc;
  }
};
