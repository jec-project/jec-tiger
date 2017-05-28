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

import {AnnotatedMethod, AnnotatedMethodType, TestParams} from "jec-juta";
import {AnnotatedMethodDescriptor} from "../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";

/*!
 * This module constains utilities used by the AnnotatedMethodBuilderTest test
 * suite.
 */

// Utilities:
const buildParams:Function = function():TestParams {
  let params:TestParams = ({
      description: DESCRIPTION,
      repeat: REPEAT,
      timeout: TIMEOUT
    } as TestParams);
  return params;
};
export const DESCRIPTION:string = "Test description";
export const KEY:string = "methodName";
export const REPEAT:number = 3;
export const TIMEOUT:number = 100;
export const DESCRIPTOR:PropertyDescriptor = null;
export const PARAMS:TestParams = buildParams();