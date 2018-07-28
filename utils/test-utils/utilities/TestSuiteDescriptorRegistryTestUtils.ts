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

import {TestSuiteDescriptor} from "../../../src/com/onsoft/tiger/reflect/TestSuiteDescriptor";
import {TestDescriptor} from "../../../src/com/onsoft/tiger/reflect/TestDescriptor";
import {AnnotatedMethodDescriptor} from "../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";
import {AnnotatedMethodType} from "jec-juta";

/*!
 * This module constains utilities used by the TestSuiteDescriptorRegistryTest 
 * test suite.
 */

// Utilities:
const buildTestDescriptor:Function = function():TestDescriptor {
  const descriptor:TestDescriptor = new TestDescriptor();
  descriptor.description = "Test description";
  descriptor.method = "methodToTest",
  descriptor.timeout = 100;
  descriptor.repeat = 0;
  return descriptor;
};
const buildTAnnotatedMethodDescriptor:Function = function():AnnotatedMethodDescriptor {
  const descriptor:AnnotatedMethodDescriptor = new AnnotatedMethodDescriptor();
  descriptor.method = "methodToTest",
  descriptor.timeout = 100;
  descriptor.type = AnnotatedMethodType.BEFORE;
  return descriptor;
};
export const TEST_SUITE_DESCRIPTOR:TestSuiteDescriptor = new TestSuiteDescriptor();
export const TEST_DESCRIPTOR:TestDescriptor = buildTestDescriptor();
export const ANNOTATED_METHOD_DESCRIPTOR:AnnotatedMethodDescriptor = buildTAnnotatedMethodDescriptor();