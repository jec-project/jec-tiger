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

import {AnnotatedMethodParams} from "jec-juta";
import {AnnotatedMethodDescriptor} from "../reflect/AnnotatedMethodDescriptor";

/**
 * A helper class that creates and returns new
 * <code>AnnotatedMethodDescriptor</code> instances.
 */
export class AnnotatedMethodDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AnnotatedMethodDescriptorBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>AnnotatedMethodDescriptor</code> instance.
   * 
   * @param {string} key the name of the decorated method.
   * @param {PropertyDescriptor} descriptor the property descriptor associated
   *                                        with the decorated method.
   * @param {number} type the type of the annotation associated with the 
   *                      decorated method. Valid values are the constants of
   *                      the <code>AnnotatedMethodType</code> enum.
   * @param {AnnotatedMethodParams} params the testing parameters associated 
   *                                       with the decorated method. This
   *                                       parameter is optional.
   * @return {AnnotatedMethodDescriptor} a new
   *                                     <code>AnnotatedMethodDescriptor</code>
   *                                     instance.
   */
  public build(key:string, descriptor:PropertyDescriptor, type:number,
                      params?:AnnotatedMethodParams):AnnotatedMethodDescriptor {
    let desc:AnnotatedMethodDescriptor = new AnnotatedMethodDescriptor();
    desc.method = key;
    desc.type = type;
    if(params) {
      desc.timeout = params.timeout;
    }
    return desc;
  }
};
