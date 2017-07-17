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

import {Decorator} from "jec-commons";
import { TestSuiteError, TestSuiteParams, TestSorters, InstantiationPolicy } from "jec-juta";
import {TestSuiteDescriptorRegistry} from "../../metadata/TestSuiteDescriptorRegistry";
import {TestSuiteDescriptor} from "../../reflect/TestSuiteDescriptor";

/**
 * The <code>TestSuiteDecorator</code> class defines the <code>Decorator</code> 
 * implementation for the JUTA <code>@TestSuite</code> decorator.
 */
export class TestSuiteDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestSuiteDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, params:TestSuiteParams):any {
    let descriptor:TestSuiteDescriptor =
                          TestSuiteDescriptorRegistry.getRegisteredDescriptor();
    if(!params.description) {
      throw new TestSuiteError(
        "TestSuite error: 'description' parameter is missing for test suite " +
        target
      );
    }
    descriptor.description = params.description;
    descriptor.disabled = params.disabled || false;
    descriptor.testOrder = params.testOrder || TestSorters.DEFAULT;
    descriptor.instantiationPolicy =
                       params.instantiationPolicy || InstantiationPolicy.SINGLE;
    return target;
  }
}
