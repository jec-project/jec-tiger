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
import {JutaConnectorRefs} from "jec-juta";
import {ParameterDescriptorBuilder} from "../../builders/ParameterDescriptorBuilder";
import {ParameterDescriptor} from "../../reflect/ParameterDescriptor";
import {ParametersMapUtil} from "../../utils/ParametersMapUtil";

/**
 * The <code>AsyncDecorator</code> class defines the <code>Decorator</code>  
 * implementation for the JUTA <code>@Async</code> decorator.
 */
export class AsyncDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AsyncDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, propertyKey:string | symbol,
                                                    parameterIndex:number):any {
    const methodName:string = propertyKey.toString();
    const builder:ParameterDescriptorBuilder = new ParameterDescriptorBuilder();
    const descriptor:ParameterDescriptor = builder.build(
      methodName, JutaConnectorRefs.ASYNC_CONNECTOR_REF, parameterIndex
    )
    ParametersMapUtil.getParameterCollection(methodName).push(descriptor);
    return target;
  }
}
