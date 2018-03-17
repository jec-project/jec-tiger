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

import {AnnotatedMethod} from "jec-juta";
import {AnnotatedMethodDescriptor} from "../reflect/AnnotatedMethodDescriptor";
import {TigerAnnotatedMethod} from "../runners/model/TigerAnnotatedMethod";

/**
 * A helper class that creates and returns new <code>AnnotatedMethod</code>
 * instances.
 */
export class AnnotatedMethodBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AnnotatedMethodBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>AnnotatedMethod</code> instance.
   * 
   * @param {AnnotatedMethodDescriptor} descriptor the descriptor associated  
   *                                               with the annotated method.
   * @return {AnnotatedMethod} a new <code>AnnotatedMethod</code> instance.
   */
  public build(descriptor:AnnotatedMethodDescriptor):AnnotatedMethod {
    const method:AnnotatedMethod = new TigerAnnotatedMethod();
    method.name = descriptor.method;
    method.type = descriptor.type;
    method.timeout = descriptor.timeout;
    method.disabled = descriptor.disabled;
    return method;
  }
};
