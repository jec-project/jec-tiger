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

import {AnnotatedMethodBuilder} from "../../../src/com/onsoft/tiger/builders/AnnotatedMethodBuilder";
import {AnnotatedMethodDescriptor} from "../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";
import { AnnotatedMethodType, AnnotatedMethod } from "jec-juta";

/*!
 * This module constains utilities used by the TestClassRunnerTest test suite.
 */

// Utilities:
const BUILDER:AnnotatedMethodBuilder = new AnnotatedMethodBuilder();
const DESCRIPTOR:AnnotatedMethodDescriptor = new AnnotatedMethodDescriptor();
export const buildAnnotatedMethod:Function = function(type:number, disabled:boolean = false, timeout:number = null):AnnotatedMethod {
  let methodName:string = null;
  switch(type) {
    case AnnotatedMethodType.BEFORE : methodName = "before"; break;
    case AnnotatedMethodType.BEFORE_ALL : methodName = "beforeAll"; break;
    case AnnotatedMethodType.BEFORE_CLASS : methodName = "beforeClass"; break;
    case AnnotatedMethodType.AFTER : methodName = "after"; break;
    case AnnotatedMethodType.AFTER_ALL : methodName = "afterAll"; break;
    case AnnotatedMethodType.AFTER_CLASS : methodName = "afterClass"; break;
  }
  DESCRIPTOR.method = methodName;
  DESCRIPTOR.disabled = true;
  DESCRIPTOR.type = type;
  DESCRIPTOR.disabled = disabled;
  if(timeout) DESCRIPTOR.timeout = timeout;
  return BUILDER.build(DESCRIPTOR);
};
