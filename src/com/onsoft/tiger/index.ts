/*!
 * JEC Tiger Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

"use strict";

/*!
 * Module dependencies.
 * Please maintain package and alphabetical order!
 */

//--> com/onsoft/tiger/builders
export {AnnotatedMethodBuilder} from "./builders/AnnotatedMethodBuilder";
export {AnnotatedMethodDescriptorBuilder} from "./builders/AnnotatedMethodDescriptorBuilder";
export {ParameterDescriptorBuilder} from "./builders/ParameterDescriptorBuilder";
export {RunableTestSuiteFactory} from "./builders/RunableTestSuiteFactory";
export {TestDescriptorBuilder} from "./builders/TestDescriptorBuilder";
export {TestMethodBuilder} from "./builders/TestMethodBuilder";
export {TigerFactory} from "./builders/TigerFactory";
//--> com/onsoft/tiger/core
export {DefaultTigerContainer} from "./core/DefaultTigerContainer";
export {TestWatcher} from "./core/TestWatcher";
export {TigerAutowireProcessor} from "./core/TigerAutowireProcessor";
export {TigerContainerWatcher} from "./core/TigerContainerWatcher";
export {TigerSourceFileInspector} from "./core/TigerSourceFileInspector";
//--> com/onsoft/tiger/jcad/connectors
export {TigerConnector} from "./jcad/connectors/TigerConnector";
//--> com/onsoft/tiger/jcad/decorators
export {AfterClassDecorator} from "./jcad/decorators/AfterClassDecorator";
export {AfterDecorator} from "./jcad/decorators/AfterDecorator";
export {AsyncDecorator} from "./jcad/decorators/AsyncDecorator";
export {BeforeClassDecorator} from "./jcad/decorators/BeforeClassDecorator";
export {BeforeDecorator} from "./jcad/decorators/BeforeDecorator";
export {TestDecorator} from "./jcad/decorators/TestDecorator";
export {TestSuiteDecorator} from "./jcad/decorators/TestSuiteDecorator";
//--> com/onsoft/tiger/logging
export {TigerLoggerProxy} from "./logging/TigerLoggerProxy";
//--> com/onsoft/tiger/metadata
export {TestSuiteDescriptorRegistry} from "./metadata/TestSuiteDescriptorRegistry";
//--> com/onsoft/tiger/reflect
export {AnnotatedMethodDescriptor} from "./reflect/AnnotatedMethodDescriptor";
export {ParameterDescriptor} from "./reflect/ParameterDescriptor";
export {TestableMethodDescriptor} from "./reflect/TestableMethodDescriptor";
export {TestDescriptor} from "./reflect/TestDescriptor";
export {TestSuiteDescriptor} from "./reflect/TestSuiteDescriptor";
//--> com/onsoft/tiger/runners/model
export {TigerAnnotatedMethod} from "./runners/model/TigerAnnotatedMethod";
export {TigerRunableTestSuite} from "./runners/model/TigerRunableTestSuite";
export {TigerTestableMethod} from "./runners/model/TigerTestableMethod";
export {TigerTestMethod} from "./runners/model/TigerTestMethod";
//--> com/onsoft/tiger/runners
export {TigerTestRunner} from "./runners/TigerTestRunner";
//--> com/onsoft/tiger/utils
export {AnnotatedMethodsMapper} from "./utils/AnnotatedMethodsMapper";
export {ParametersMapUtil} from "./utils/ParametersMapUtil";
export {SplashScreen} from "./utils/SplashScreen";
export {TestSorterUtil} from "./utils/TestSorterUtil";
//--> com/onsoft/tiger
export {Tiger} from "./Tiger";
