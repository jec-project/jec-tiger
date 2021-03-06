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

import {AnnotatedMethodType} from "jec-juta";
import {AnnotatedMethodDescriptor} from "../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";

/*!
 * This module constains utilities used by the AnnotatedMethodBuilderTest test
 * suite.
 */

// Utilities:
const buildMethodDescriptor:Function = function():AnnotatedMethodDescriptor {
  const descriptor:AnnotatedMethodDescriptor = new AnnotatedMethodDescriptor();
  descriptor.type = METHOD_TYPE;
  descriptor.method = METHOD_NAME;
  descriptor.timeout = METHOD_TIMEOUT;
  return descriptor;
};
export const METHOD_TYPE:number = AnnotatedMethodType.BEFORE_ALL;
export const METHOD_NAME:string = "methodName";
export const METHOD_TIMEOUT:number = 100;
export const DESCRIPTOR:AnnotatedMethodDescriptor = buildMethodDescriptor();