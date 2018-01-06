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

import {FilePreProcessor} from "jec-commons";
import {Tiger} from "../../../src/com/onsoft/tiger/Tiger";
import {TestWatcher} from "../../../src/com/onsoft/tiger/core/TestWatcher";
import {TigerAutowireProcessor} from "../../../src/com/onsoft/tiger/core/TigerAutowireProcessor";
import {TigerContainerWatcher} from "../../../src/com/onsoft/tiger/core/TigerContainerWatcher";
import {TigerFactory} from "../../../src/com/onsoft/tiger/builders/TigerFactory";

/*!
 * This module constains utilities used by the TigerSourceFileInspectorTest 
 * test suite.
 */

// Utilities:
const buildTiger:Function = function():Tiger {
  let factory:TigerFactory = new TigerFactory();
  return factory.create();
};
const buildWatcher:Function = function():TestWatcher {
  let watcher:TestWatcher = new TigerContainerWatcher();
  return watcher;
};
export const buildProcessor:Function = function():FilePreProcessor {
  let processor:TigerAutowireProcessor = new TigerAutowireProcessor();
  processor.setTigerContainer(TIGER);
  return processor;
};
export const TIGER:Tiger = buildTiger();
export const SOURCE_PATH:string = "/utils/test-utils/classes";
export const WATCHER:TestWatcher = buildWatcher();
export const NUM_TEST_CLASS:number = 3;