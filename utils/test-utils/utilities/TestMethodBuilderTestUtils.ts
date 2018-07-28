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

import {TestDescriptor} from "../../../src/com/onsoft/tiger/reflect/TestDescriptor";

/*!
 * This module constains utilities used by the TestMethodBuilderTest test
 * suite.
 */

// Utilities:
const buildDescriptor:Function = function():TestDescriptor {
  const descriptor:TestDescriptor = new TestDescriptor();
  descriptor.description = DESCRIPTION;
  descriptor.method = METHOD;
  descriptor.timeout = TIMEOUT;
  descriptor.repeat = REPEAT;
  return descriptor;
};
export const DESCRIPTION:string = "Test description";
export const METHOD:string = "methodToTest";
export const TIMEOUT:number = 100;
export const REPEAT:number = 3;
export const DESCRIPTOR:TestDescriptor = buildDescriptor();