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

import {AnnotatedMethodBuilder} from "../../../src/com/onsoft/tiger/builders/AnnotatedMethodBuilder";
import {TestMethodBuilder} from "../../../src/com/onsoft/tiger/builders/TestMethodBuilder";
import {AnnotatedMethodsMapper} from "../../../src/com/onsoft/tiger/utils/AnnotatedMethodsMapper";
import {TestDescriptor} from "../../../src/com/onsoft/tiger/reflect/TestDescriptor";
import {AnnotatedMethodDescriptor} from "../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";
import {TigerTestStats} from "../../../src/com/onsoft/tiger/runners/TigerTestStats";
import { AnnotatedMethodType, AnnotatedMethod, TestMethod, TestStats } from "jec-juta";

/*!
 * This module constains utilities used by the TestClassRunnerTest test suite.
 */

// Utilities:
const BUILDER:AnnotatedMethodBuilder = new AnnotatedMethodBuilder();
const TEST_BUILDER:TestMethodBuilder = new TestMethodBuilder();
const DESCRIPTOR:AnnotatedMethodDescriptor = new AnnotatedMethodDescriptor();
export const buildAnnotatedMethod:Function = function(type:number, disabled:boolean = false, timeout:number = 0):AnnotatedMethod {
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
  DESCRIPTOR.type = type;
  DESCRIPTOR.disabled = disabled;
  DESCRIPTOR.timeout = timeout;
  return BUILDER.build(DESCRIPTOR);
};
export const buildAnnotatedMethodsMapper:Function = function():AnnotatedMethodsMapper {
  let mapper:AnnotatedMethodsMapper = null;
  const methods:AnnotatedMethod[] = [
    buildAnnotatedMethod(AnnotatedMethodType.BEFORE),
    buildAnnotatedMethod(AnnotatedMethodType.BEFORE_ALL),
    buildAnnotatedMethod(AnnotatedMethodType.BEFORE_CLASS),
    buildAnnotatedMethod(AnnotatedMethodType.AFTER),
    buildAnnotatedMethod(AnnotatedMethodType.AFTER_ALL),
    buildAnnotatedMethod(AnnotatedMethodType.AFTER_CLASS)
  ];
  mapper = new AnnotatedMethodsMapper(methods);
  return mapper;
};
export const buildTestMethod:Function = function(
  disabled:boolean = false, timeout:number = 0, repeat:number = null,
  name:string = null
):TestMethod {
  const desc:TestDescriptor = new TestDescriptor();
  desc.method = name || "test";
  desc.description = "description";
  desc.disabled = disabled;
  desc.timeout = timeout;
  if(repeat !== null) desc.repeat = repeat;
  return TEST_BUILDER.build(desc);
};
export const buildTestStats:Function = function():TestStats {
  return new TigerTestStats();
};
export const COMPUTED_DESCRIPTION:string = "test: description";
