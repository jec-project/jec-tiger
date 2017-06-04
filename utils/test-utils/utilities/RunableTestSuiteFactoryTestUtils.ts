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

import {DecoratorConnectorManager, JcadContextManager, JcadContext,
        JcadContextFactory, DecoratorConnector, AbstractDecoratorConnector,
        Decorator, FileProperties, JecStringsEnum} from "jec-commons";
import {JutaConnectorRefs} from "jec-juta";

import {Tiger} from "../../../src/com/onsoft/tiger/Tiger";
import {TestDecorator} from "../../../src/com/onsoft/tiger/jcad/decorators/TestDecorator";
import {TestSuiteDecorator} from "../../../src/com/onsoft/tiger/jcad/decorators/TestSuiteDecorator";
import {TigerConnector} from "../../../src/com/onsoft/tiger/jcad/connectors/TigerConnector";

/*!
 * This module constains utilities used by the RunableTestSuiteFactoryTest test
 * suite.
 */

// Utilities:
const PATH:string = process.cwd() + "/utils/test-utils/classes/";
const CLASS_NAME:string =  "TestSuiteTestClass";
const buildfileProperties:Function = function():FileProperties {
  let fp:FileProperties = (
    {
      name: CLASS_NAME,
      extension: JecStringsEnum.JS_EXTENSION,
      path: PATH
    } as FileProperties);
    return fp;
};
let contextFactory:JcadContextFactory = new JcadContextFactory();
const TEST_DECORATOR:Decorator = new TestDecorator();
const TEST_SUITE_DECORATOR:Decorator = new TestSuiteDecorator();
const ASYNC_DECORATOR:Decorator = new TestSuiteDecorator();
export const TIGER:Tiger = null;
export const TEST_SUITE_DESCRIPTION:string = "Sample test suite";
export const DCM:DecoratorConnectorManager = DecoratorConnectorManager.getInstance();
export const CTXM:JcadContextManager = JcadContextManager.getInstance();
export const CONTEXT:JcadContext = contextFactory.create();
export const FILE_PROPERTIES:FileProperties = buildfileProperties();
export const TEST_CONNECTOR:DecoratorConnector = new TigerConnector(JutaConnectorRefs.TEST_CONNECTOR_REF, TEST_DECORATOR);
export const TEST_SUITE_CONNECTOR:DecoratorConnector = new TigerConnector(JutaConnectorRefs.TEST_SUITE_CONNECTOR_REF, TEST_SUITE_DECORATOR);
export const ASYNC_CONNECTOR:DecoratorConnector = new TigerConnector(JutaConnectorRefs.ASYNC_CONNECTOR_REF, ASYNC_DECORATOR);
