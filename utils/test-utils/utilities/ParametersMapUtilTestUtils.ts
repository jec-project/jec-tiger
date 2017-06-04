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

import {TestSuiteDescriptor} from "../../../src/com/onsoft/tiger/reflect/TestSuiteDescriptor";
import {TestDescriptor} from "../../../src/com/onsoft/tiger/reflect/TestDescriptor";
import {AnnotatedMethodDescriptor} from "../../../src/com/onsoft/tiger/reflect/AnnotatedMethodDescriptor";
import {TestSuiteDescriptorRegistry} from "../../../src/com/onsoft/tiger/metadata/TestSuiteDescriptorRegistry";
import {AnnotatedMethodType} from "jec-juta";

/*!
 * This module constains utilities used by the ParametersMapUtilTest test suite.
 */

// Utilities:
export const METHOD_NAME:string = "methodToTest";
export const DESCRIPTION:string = "Test description";
const buildTestDescriptor:Function = function():TestDescriptor {
  let descriptor:TestDescriptor = new TestDescriptor();
  descriptor.description = DESCRIPTION;
  descriptor.method = METHOD_NAME;
  return descriptor;
};
const buildTestSuiteDescriptor:Function = function():TestSuiteDescriptor {
  let testSuiteDescriptor:TestSuiteDescriptor = new TestSuiteDescriptor();
  testSuiteDescriptor.description = DESCRIPTION;
  return testSuiteDescriptor;
};
const TEST_DESCRIPTOR:TestDescriptor = buildTestDescriptor();
const TEST_SUITE_DESCRIPTOR:TestSuiteDescriptor = buildTestSuiteDescriptor();
export const initRegistry:Function = function():void {
  TestSuiteDescriptorRegistry.registerDescriptor(TEST_SUITE_DESCRIPTOR);
  TestSuiteDescriptorRegistry.addTestDescriptor(TEST_DESCRIPTOR);
};
export const resetRegistry:Function = function():void {
  TestSuiteDescriptorRegistry.registerDescriptor(null);
};
