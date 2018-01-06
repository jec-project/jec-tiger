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

import {AnnotatedMethodParams, TestParams, TestSuiteParams} from "jec-juta";
import {TestSuiteDescriptorRegistry} from "../../../src/com/onsoft/tiger/metadata/TestSuiteDescriptorRegistry";
import {TestSuiteDescriptor} from "../../../src/com/onsoft/tiger/reflect/TestSuiteDescriptor";

/*!
 * This module constains utilities used by the JCAD decorators test suite.
 */

// Utilities:
export const DISABLED:boolean = true;
const buildMethodParams:Function = function():AnnotatedMethodParams {
  let params:AnnotatedMethodParams = ({
    timeout: TIMEOUT,
    disabled: DISABLED
  } as AnnotatedMethodParams);
  return params;
};
const buildTestParams:Function = function():TestParams {
  let params:TestParams = ({
    timeout: TIMEOUT,
    description: DESCRIPTION,
    disabled: DISABLED
  } as TestParams);
  return params;
};
const buildTestSuiteParams:Function = function():TestSuiteParams {
  let params:TestSuiteParams = ({
    description: DESCRIPTION,
    disabled: DISABLED
  } as TestSuiteParams);
  return params;
};
export const initRegistry:Function = function():void {
  let testSuiteDescriptor:TestSuiteDescriptor = new TestSuiteDescriptor();
  TestSuiteDescriptorRegistry.registerDescriptor(testSuiteDescriptor);
};
export const resetRegistry:Function = function():void {
  TestSuiteDescriptorRegistry.registerDescriptor(null);
};
export const TIMEOUT:number = 100;
export const DESCRIPTION:string = "Test description";
export const PARAMS:AnnotatedMethodParams = buildMethodParams();
export const TEST_PARAMS:TestParams = buildTestParams();
export const TEST_SUITE_PARAMS:TestSuiteParams = buildTestSuiteParams();
export const DESCRIPTOR:PropertyDescriptor = null;
export const KEY:string = "memberToTest";
export const TARGET:any = {};
export const STATIC_TARGET:Function = function(){};
export const PARAMETER_INDEX:number = 0;
