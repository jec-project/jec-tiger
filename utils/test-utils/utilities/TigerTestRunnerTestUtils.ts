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
import {TigerRunableTestSuite} from "../../../src/com/onsoft/tiger/runners/model/TigerRunableTestSuite";
import {AnnotatedMethodType, RunableTestSuite} from "jec-juta";

/*!
 * This module constains utilities used by the TigerTestRunnerTest test suite.
 */

// Utilities:
export const DESCRIPTION:string = "Test description";
const buildTestDescriptor:Function = function():TestDescriptor {
  let descriptor:TestDescriptor = new TestDescriptor();
  descriptor.description = "should increment methodToTest";
  descriptor.method = "methodToTest",
  //descriptor.timeout = 100;
  descriptor.repeat = 3;
  return descriptor;
};
const buildTestSuiteDescriptor:Function = function():TestSuiteDescriptor {
  let testSuiteDescriptor:TestSuiteDescriptor = new TestSuiteDescriptor();
  testSuiteDescriptor.description = DESCRIPTION;
  return testSuiteDescriptor;
};
const buildAnnotatedMethodDescriptor:Function = function():AnnotatedMethodDescriptor {
  let descriptor:AnnotatedMethodDescriptor = new AnnotatedMethodDescriptor();
  descriptor.method = "beforeClassMethod",
  descriptor.type = AnnotatedMethodType.BEFORE_CLASS;
  return descriptor;
};
export const METHOD_TO_TEST_LOG:string = "methodToTest called";
const TEST_SUITE:any = {
  beforeClassMethod: function():void {},
  methodToTest: function():void {}
};
const TEST_DESCRIPTOR:TestDescriptor = buildTestDescriptor();
const TEST_SUITE_DESCRIPTOR:TestSuiteDescriptor = buildTestSuiteDescriptor();
const ANNOTATED_METHOD_DESCRIPTOR:AnnotatedMethodDescriptor = buildAnnotatedMethodDescriptor();
export const initRegistry:Function = function():void {
  TestSuiteDescriptorRegistry.registerDescriptor(TEST_SUITE_DESCRIPTOR);
  TestSuiteDescriptorRegistry.addTestDescriptor(TEST_DESCRIPTOR);
  TestSuiteDescriptorRegistry.addAnnotatedMethodDescriptor(ANNOTATED_METHOD_DESCRIPTOR);
};
export const resetRegistry:Function = function():void {
  TestSuiteDescriptorRegistry.registerDescriptor(null);
};
export const buildRunableTestSuite:Function = function():RunableTestSuite {
  let tigerRunableTestSuite:TigerRunableTestSuite = new TigerRunableTestSuite();
  tigerRunableTestSuite.setTestSuite(TEST_SUITE);
  return tigerRunableTestSuite;
};