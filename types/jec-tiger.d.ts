// Type definitions for jec-juta
// Project: JEC Tiger
// Definitions by: Pascal ECHEMANN <https://github.com/pechemann/JEC>

// Please maintain packages and alphabetical order.

declare module "jec-tiger" {

import { FileProperties, FilePreProcessor, SourceFileInspector,
         Decorator, AbstractDecoratorConnector, LoggerProxy,
         AbstractLoggerProxy } from "jec-commons";
import { AnnotatedMethod, AnnotatedMethodParams, RunableTestSuite, TestParams,
         TestMethod, TestSuiteParams, TestRunner, TestableMethod } from "jec-juta";

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
    private initObj();
    private sendMessage(message, logLevel?);
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
    setWatcher(watcher: any): void;
    getWatcher(): any;
    addProcessor(processor: FilePreProcessor): void;
    addSourcePath(path: string): void;
    inspect(): void;
}

export class TigerConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
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
    static registerDescriptor(testSuiteDescriptor: TestSuiteDescriptor): any;
    static getRegisteredDescriptor(): TestSuiteDescriptor;
    static getTestDescriptorCollection(): Array<TestDescriptor>;
    static addTestDescriptor(testDescriptor: TestDescriptor): void;
    static getAnnotatedMethodDescriptorCollection(): Array<AnnotatedMethodDescriptor>;
    static addAnnotatedMethodDescriptor(methodDescriptor: AnnotatedMethodDescriptor): void;
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
    private initObj();
    private initTestMethods();
    private initAnnotatedMethods();
    getTestSuite(): any;
    setTestSuite(testSuite: any): void;
    getDescription(): string;
    getTestMethods(): TestMethod[];
    getAnnotatedMethods(): AnnotatedMethod[];
    isDisabled(): boolean;
    getTestOrder(): number;
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
    private sendMessage(message, logLevel?);
    private applyTestMethod(method, testSuiteObj, scope);
    private applyAnnotatedMethod(method, testSuiteObj, scope);
    runTest(testSuite: RunableTestSuite, callback: (err: any) => void): void;
    runAllTests(testSuiteColl: RunableTestSuite[], callback: (err: any) => void): void;
}

export class AnnotatedMethodsMapper {
    constructor(methods: AnnotatedMethod[]);
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

export interface Tiger {
    process(callback: (err: any) => void): void;
    getVersion(): string;
    setTestPaths(paths: string[]): void;
    getTestPaths(): string[];
}

}