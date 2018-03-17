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

import {ParameterDescriptor} from "../reflect/ParameterDescriptor";

/**
 * A helper class that creates and returns new <code>ParameterDescriptor</code>
 * instances.
 */
export class ParameterDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AsyncDecorator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns new <code>ParameterDescriptor</code> instance.
   * 
   * @param {string} methodName the name of the method for which to create this
   *                            parameter descriptor.
   * @param {string} connectorRef the type of decoration. Valid values are the
   *                              constants of the <code>JutaConnectorRefs<code>
   *                              class.
   * @param {number} parameterIndex the index of the parameter in the method
   *                                signature.
   */
  public build(methodName:string, connectorRef:string, 
                                    parameterIndex:number):ParameterDescriptor {
    const paramDesc:ParameterDescriptor = new ParameterDescriptor();
    paramDesc.connectorRef = connectorRef;
    paramDesc.index = parameterIndex;
    paramDesc.methodName = methodName;
    return paramDesc;
  }
};