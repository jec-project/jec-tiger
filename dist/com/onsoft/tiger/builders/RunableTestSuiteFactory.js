"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TigerLoggerProxy_1 = require("../logging/TigerLoggerProxy");
const TestSuiteDescriptor_1 = require("../reflect/TestSuiteDescriptor");
const TestSuiteDescriptorRegistry_1 = require("../metadata/TestSuiteDescriptorRegistry");
const jec_commons_1 = require("jec-commons");
const TigerRunableTestSuite_1 = require("../runners/model/TigerRunableTestSuite");
class RunableTestSuiteFactory {
    constructor() { }
    sendMessage(message, logLevel) {
        TigerLoggerProxy_1.TigerLoggerProxy.getInstance().log(message, logLevel);
    }
    create(file, tigerContainer) {
        let descriptor = new TestSuiteDescriptor_1.TestSuiteDescriptor();
        TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.registerDescriptor(descriptor);
        let loader = new jec_commons_1.DefaultClassLoader();
        let filePath = file.path + file.name + jec_commons_1.UrlStringsEnum.DOT +
            jec_commons_1.JecStringsEnum.JS_EXTENSION;
        let ClassRef = loader.loadClass(filePath);
        let testSuiteObj = new ClassRef();
        let runnable = new TigerRunableTestSuite_1.TigerRunableTestSuite();
        runnable.setTestSuite(testSuiteObj);
        TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.registerDescriptor(null);
        return runnable;
    }
}
exports.RunableTestSuiteFactory = RunableTestSuiteFactory;
;
