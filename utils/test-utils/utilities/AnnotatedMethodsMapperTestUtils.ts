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

import {AnnotatedMethod, AnnotatedMethodType} from "jec-juta";
import {AnnotatedMethodsMapper} from "../../../src/com/onsoft/tiger/utils/AnnotatedMethodsMapper";

/*!
 * This module constains utilities used by the AnnotatedMethodsMapperTest test
 * suite.
 */

// Utilities:
const buildMethod:Function = function(methodType:number):AnnotatedMethod {
  const method:AnnotatedMethod = (
    {
      name:"TestMethod " + methodType,
      timeout: Math.round((Math.random() * 10)),
      type: methodType
    } as AnnotatedMethod);
  return method;
};
export const buildEmptyMapper:Function = function():AnnotatedMethodsMapper {
  const methods:AnnotatedMethod[] = new Array<AnnotatedMethod>();
  const mapper:AnnotatedMethodsMapper = new AnnotatedMethodsMapper(methods);
  return mapper;
};
export const BEFORE_ALL_METHOD:AnnotatedMethod = buildMethod(AnnotatedMethodType.BEFORE_ALL);
export const BEFORE_CLASS_METHOD:AnnotatedMethod = buildMethod(AnnotatedMethodType.BEFORE_CLASS);
export const BEFORE_METHOD:AnnotatedMethod = buildMethod(AnnotatedMethodType.BEFORE);
export const AFTER_ALL_METHOD:AnnotatedMethod = buildMethod(AnnotatedMethodType.AFTER_ALL);
export const AFTER_CLASS_METHOD:AnnotatedMethod = buildMethod(AnnotatedMethodType.AFTER_CLASS);
export const AFTER_METHOD:AnnotatedMethod = buildMethod(AnnotatedMethodType.AFTER);
export const buildCompleteMapper:Function = function():AnnotatedMethodsMapper {
  const methods:AnnotatedMethod[] = new Array<AnnotatedMethod>();
  methods.push(BEFORE_ALL_METHOD);
  methods.push(BEFORE_CLASS_METHOD);
  methods.push(BEFORE_METHOD);
  methods.push(AFTER_ALL_METHOD);
  methods.push(AFTER_CLASS_METHOD);
  methods.push(AFTER_METHOD);
  const mapper:AnnotatedMethodsMapper = new AnnotatedMethodsMapper(methods);
  return mapper;
}