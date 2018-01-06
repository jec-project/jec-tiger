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
import {TestSuiteDescriptorRegistry} from "../../metadata/TestSuiteDescriptorRegistry";
import { AnnotatedMethodParams, AnnotatedMethodType, TestSuiteError } from "jec-juta";
import {AnnotatedMethodDescriptorBuilder} from "../../builders/AnnotatedMethodDescriptorBuilder";
import {AnnotatedMethodDescriptor} from "../../reflect/AnnotatedMethodDescriptor";

/**
 * The <code>BeforeClassDecorator</code> class defines the 
 * <code>Decorator</code> implementation for the JUTA <code>@BeforeClass</code>
 * decorator.
 */
export class BeforeClassDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BeforeClassDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, key:string, descriptor:PropertyDescriptor,
                                          params?:AnnotatedMethodParams):any {
    if(typeof target !== "function") {
      throw new TestSuiteError(
        `@BeforeClass must decorate a static method: ${target}`
      );
    }
    let builder:AnnotatedMethodDescriptorBuilder =
                                         new AnnotatedMethodDescriptorBuilder();
    let methodDescriptor:AnnotatedMethodDescriptor =
       builder.build(key, descriptor, AnnotatedMethodType.BEFORE_CLASS, params);
    TestSuiteDescriptorRegistry.addAnnotatedMethodDescriptor(methodDescriptor);
    return descriptor;
  }
}
