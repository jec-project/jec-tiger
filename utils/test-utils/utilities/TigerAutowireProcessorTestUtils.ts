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

import {FileProperties, JcadContextManager} from "jec-commons";
import {FilePropertiesBuilder} from "jec-commons-node";
import {Tiger} from "../../../src/com/onsoft/tiger/Tiger";
import {TestWatcher} from "../../../src/com/onsoft/tiger/core/TestWatcher";
import {TigerFactory} from "../../../src/com/onsoft/tiger/builders/TigerFactory";

/*!
 * This module constains utilities used by the TigerAutowireProcessorTest test
 * suite.
 */

// Utilities:
const buildTiger:Function = function():Tiger {
  let factory:TigerFactory = new TigerFactory();
  return factory.create();
};
const FILE_PATH:string = process.cwd() + "/utils/test-utils/classes/TestSuiteTestClass.js";
const FILE_NAME:string = "TestSuiteTestClass.js";
const buildFile:Function = function():FileProperties {
  let builder:FilePropertiesBuilder = new FilePropertiesBuilder();
  let properties:FileProperties = builder.build(FILE_NAME, FILE_PATH, null);
  return properties;
};
const buildWatcher:Function = function():TestWatcher {
  let watcher:TestWatcher = ({
    getContextPath: ()=> { return null; },
    addTestSuite: (testSuite)=> { },
    getTestSuites: ()=> { return null; }
  } as TestWatcher);
  return watcher;
};
export const TIGER:Tiger = buildTiger();
export const WATCHER:TestWatcher = buildWatcher();
export const PATH:string = "path";
export const FILE:FileProperties = buildFile();
export const CONTEXT_MANAGER:JcadContextManager = JcadContextManager.getInstance();