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

import {TestSorters, TestMethod} from "jec-juta";
import {TigerTestMethod} from "../../../src/com/onsoft/tiger/runners/model/TigerTestMethod";

/*!
 * This module constains utilities used by the TestSorterUtilTest test suite.
 */

// Utilities:
const buildTestMethod:Function = function(name:string, order:number):TestMethod {
  let testMethod:TestMethod = new TigerTestMethod();
  testMethod.name = name;
  testMethod.order = order;
  return testMethod;
};
export const A_METHOD:TestMethod = buildTestMethod("aMethod", 5);
export const B_METHOD:TestMethod = buildTestMethod("bMethod", 4);
export const C_METHOD:TestMethod = buildTestMethod("cMethod", 3);
export const D_METHOD:TestMethod = buildTestMethod("dMethod", 2);
export const E_METHOD:TestMethod = buildTestMethod("eMethod", 1);
export const getTestMethods:Function = function():TestMethod[] {
  let methods:TestMethod[] = [
    A_METHOD, E_METHOD, B_METHOD, D_METHOD, C_METHOD
  ];
  return methods;
};
export const DEFAULT_SORT:TestMethod[] = [ A_METHOD, E_METHOD, B_METHOD, D_METHOD, C_METHOD ];
export const NAME_ASCENDING_SORT:TestMethod[] = [ A_METHOD, B_METHOD, C_METHOD, D_METHOD, E_METHOD ];
export const NAME_DESCENDING_SORT:TestMethod[] = [ E_METHOD, D_METHOD, C_METHOD, B_METHOD, A_METHOD ];
export const ORDER_ASCENDING_SORT:TestMethod[] = [ E_METHOD, D_METHOD, C_METHOD, B_METHOD, A_METHOD ];
export const ORDER_DESCENDING_SORT:TestMethod[] = [ A_METHOD, B_METHOD, C_METHOD, D_METHOD, E_METHOD ];
