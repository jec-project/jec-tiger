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

import {Decorator} from "jec-commons";
import {TestSuiteError, TestParams} from "jec-juta";
import {TestSuiteDescriptorRegistry} from "../../metadata/TestSuiteDescriptorRegistry";
import {TestSuiteDescriptor} from "../../reflect/TestSuiteDescriptor";
import {TestDescriptor} from "../../reflect/TestDescriptor";
import {TestDescriptorBuilder} from "../../builders/TestDescriptorBuilder";

/**
 * The <code>TestDecorator</code> class defines the <code>Decorator</code> 
 * implementation for the JUTA <code>@Test</code> decorator.
 */
export class TestDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TestDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, key:string, descriptor:PropertyDescriptor,
                                                        params:TestParams):any {
    if(!params.description) {
      throw new TestSuiteError(
        "Test error: 'description' parameter is missing for test " + key
      );
    }
    const testSuiteDescriptor:TestSuiteDescriptor =
                          TestSuiteDescriptorRegistry.getRegisteredDescriptor();
    const builder:TestDescriptorBuilder = new TestDescriptorBuilder();
    const testDescriptor:TestDescriptor =
                                         builder.build(key, descriptor, params);
    TestSuiteDescriptorRegistry.addTestDescriptor(testDescriptor);
    return descriptor;
  }
}
