/*!
 * JEC Tiger Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-tiger" {

import { FileProperties, FilePreProcessor, SourceFileInspector,
         Decorator, AbstractDecoratorConnector, LoggerProxy,
         AbstractLoggerProxy, InspectMode } from "jec-commons";
import { AnnotatedMethod, AnnotatedMethodParams, RunableTestSuite, TestParams,
         TestMethod, TestSuiteParams, TestRunner, TestableMethod,
         TestStats } from "jec-juta";

export class AnnotatedMethodBuilder {
    constructor();
    build(descriptor: AnnotatedMethodDescriptor): AnnotatedMethod;
}
export class AnnotatedMethodDescriptorBuilder {
    constructor();
    build(key: string, descriptor: PropertyDescriptor, type: number, params?: AnnotatedMethodParams): AnnotatedMethodDescriptor;
}
export class ParameterDescriptorBuilder {
    constructor();
    build(methodName: string, connectorRef: string, parameterIndex: number): ParameterDescriptor;
}
export class RunableTestSuiteFactory {
    constructor();
    private sendMessage(message, logLevel?);
    create(file: FileProperties, tigerContainer: Tiger): RunableTestSuite;
}
export class TestDescriptorBuilder {
    constructor();
    build(key: string, descriptor: PropertyDescriptor, params: TestParams): TestDescriptor;
}
export class TestMethodBuilder {
    constructor();
    build(descriptor: TestDescriptor): TestMethod;
}
export class TigerFactory {
    constructor();
    create(): Tiger;
}
export class DefaultTigerContainer implements Tiger {
    constructor();
    private _testPaths;
    private _sourceFileInspector;
    private _version;
    private _testRunner;
    private _beforeProcess;
    private initObj();
    private sendMessage(message, logLevel?);
    beforeProcess(callback: () => void): void;
    process(callback: (err: any) => void): void;
    getVersion(): string;
    setTestPaths(paths: string[]): void;
    getTestPaths(): string[];
}
export interface TestWatcher {
    getContextPath(): string;
    addTestSuite(testSuite: RunableTestSuite): void;
    getTestSuites(): RunableTestSuite[];
}
export class TigerAutowireProcessor implements FilePreProcessor {
    constructor();
    private static readonly TEST_SUITE_MASK;
    private static readonly JUTA_MASK;
    private _tigerContainer;
    private _contextManager;
    private initObj();
    getTigerContainer(): Tiger;
    setTigerContainer(container: Tiger): void;
    processStart(watcher: any, sourcePath: string): void;
    process(file: FileProperties, watcher: any): void;
    processComplete(watcher: any, sourcePath: string): void;
}
export class TigerContainerWatcher implements TestWatcher {
    constructor();
    private _contextPath;
    private _testSuites;
    private initObj();
    getContextPath(): string;
    addTestSuite(testSuite: RunableTestSuite): void;
    getTestSuites(): RunableTestSuite[];
}
export class TigerSourceFileInspector implements SourceFileInspector {
    constructor();
    private _processors;
    private _sourcePaths;
    private _watcher;
    private _targetPath;
    private _walkUtil;
    private init();
    private sendMessage(message, logLevel?);
    private inspectSourcePath(sourcePath);
    private processFile(file);
    private notifyProcessComplete(sourcePath);
    beforeProcess: Function;
    afterProcess: Function;
    setWatcher(watcher: any): void;
    getWatcher(): any;
    addProcessor(processor: FilePreProcessor): void;
    removeProcessor(processor: FilePreProcessor): boolean;
    removeProcessors(): void;
    addSourcePath(path: string): void;
    inspect(inspectMode: InspectMode): void;
    clearCache(): void;
}
export class TigerConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
}
export class AfterAllDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: AnnotatedMethodParams): any;
}
export class AfterClassDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: AnnotatedMethodParams): any;
}
export class AfterDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: AnnotatedMethodParams): any;
}
export class AsyncDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number): any;
}
export class BeforeAllDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: AnnotatedMethodParams): any;
}
export class BeforeClassDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: AnnotatedMethodParams): any;
}
export class BeforeDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params?: AnnotatedMethodParams): any;
}
export class TestDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, descriptor: PropertyDescriptor, params: TestParams): any;
}
export class TestSuiteDecorator implements Decorator {
    constructor();
    decorate(target: any, params: TestSuiteParams): any;
}
export class JutaContextManager {
    constructor();
    private _jcadContext;
    private initContext(jcadReference, decoratorClass);
    private removeContext(jcadReference);
    createContext(): void;
    deleteContext(): void;
}
export class TigerLoggerProxy extends AbstractLoggerProxy implements LoggerProxy {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): LoggerProxy;
}
export class TestSuiteDescriptorRegistry {
    private static _testSuiteDescriptor;
    private static _testColl;
    private static _methodColl;
    private static _parametersMap;
    static registerDescriptor(testSuiteDescriptor: TestSuiteDescriptor): TestSuiteDescriptor;
    static getRegisteredDescriptor(): TestSuiteDescriptor;
    static getTestDescriptorCollection(): Array<TestDescriptor>;
    static addTestDescriptor(testDescriptor: TestDescriptor): void;
    static getAnnotatedMethodDescriptorCollection(): Array<AnnotatedMethodDescriptor>;
    static addAnnotatedMethodDescriptor(methodDescriptor: AnnotatedMethodDescriptor): void;
    static getParametersMap(): Map<string, Array<ParameterDescriptor>>;
}
export class AnnotatedMethodDescriptor extends TestableMethodDescriptor {
    constructor();
    type: number;
}
export class ParameterDescriptor {
    constructor();
    index: number;
    methodName: string;
    connectorRef: string;
}
export abstract class TestableMethodDescriptor {
    constructor();
    method: string;
    timeout: number;
    disabled: boolean;
}
export class TestDescriptor extends TestableMethodDescriptor {
    constructor();
    description: string;
    repeat: number;
    order: number;
}
export class TestSuiteDescriptor {
    constructor();
    description: string;
    disabled: boolean;
    testOrder: number;
    instantiationPolicy: string;
}
export class TigerAnnotatedMethod extends TigerTestableMethod implements AnnotatedMethod {
    constructor();
    type: number;
}
export class TigerRunableTestSuite implements RunableTestSuite {
    constructor();
    private _testSuite;
    private _description;
    private _testMethods;
    private _annotatedMethods;
    private _disabled;
    private _testOrder;
    private _instantiationPolicy;
    private _testSorter;
    private initObj();
    private initTestMethods();
    private initAnnotatedMethods();
    private initParameters();
    private initAsyncProps(map, coll);
    getTestSuite(): any;
    setTestSuite(testSuite: any): void;
    getDescription(): string;
    getTestMethods(): TestMethod[];
    getAnnotatedMethods(): AnnotatedMethod[];
    isDisabled(): boolean;
    getTestOrder(): number;
    getInstantiationPolicy(): string;
}
export abstract class TigerTestableMethod implements TestableMethod {
    constructor();
    timeout: number;
    name: string;
    async: boolean;
    disabled: boolean;
}
export class TigerTestMethod extends TigerTestableMethod implements TestMethod {
    constructor();
    description: string;
    repeat: number;
    order: number;
}
export class TigerTestRunner implements TestRunner {
    constructor();
    private _stats;
    private _runMultipleTests;
    private _testStart;
    private _classRunner;
    private initObj();
    private sendMessage(message, logLevel?);
    private initStats(multiple?);
    private computeTestDuration();
    runTest(testSuite: RunableTestSuite, callback: (stats: TestStats) => void): void;
    runAllTests(testSuiteColl: RunableTestSuite[], callback: (stats: TestStats) => void): void;
}
export class TigerTestStats implements TestStats {
    constructor();
    numTestSuites: number;
    numDisabledTestSuites: number;
    numTests: number;
    numDisabledTests: number;
    numAsyncTests: number;
    duration: number;
    time: string;
    error: any;
}
export class TestClassRunner {
    constructor();
    private checkDisabledTest(method);
    private invalidMethodTypeError(expected);
    applyStaticMethod(method: AnnotatedMethod, ClassRef: any, scope: any): void;
    applyAnnotatedMethod(method: AnnotatedMethod, testSuiteObj: any, scope: any): void;
    applyGlobalFixtures(testPolicy: string, mapper: AnnotatedMethodsMapper, testSuiteObj: any, scope: any): void;
    applyTestMethod(method: TestMethod, testSuiteObj: any, scope: any, stats: TestStats): void;
    runSingleInstanceTests(testMethods: TestMethod[], mapper: AnnotatedMethodsMapper, testSuiteObj: any, scope: any, stats: TestStats): void;
    runMultipleInstanceTest(testMethods: TestMethod[], mapper: AnnotatedMethodsMapper, testSuiteObj: any, stats: TestStats): number;
}
export interface Tiger {
    beforeProcess(callback: () => void): void;
    process(callback: (err: any) => void): void;
    getVersion(): string;
    setTestPaths(paths: string[]): void;
    getTestPaths(): string[];
}
export class AnnotatedMethodsMapper {
    constructor(methods: AnnotatedMethod[]);
    private _beforeAll;
    private _afterAll;
    private _beforeClass;
    private _afterClass;
    private _before;
    private _after;
    private initObj(methods);
    getMethodByType(type: number): AnnotatedMethod;
}
export class ParametersMapUtil {
    constructor();
    static getParameterCollection(methodName: string): Array<ParameterDescriptor>;
}
export class SplashScreen {
    constructor();
    displayMessage(version: string): void;
}
export class TestSorterUtil {
    constructor();
    private nameAscendingSorter(a, b);
    private nameDescendingSorter(a, b);
    private orderDescendingSorter(a, b);
    private orderAscendingSorter(a, b);
    sort(methods: TestMethod[], sortBy: number): void;
}
}