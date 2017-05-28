"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestSuiteDescriptorRegistry_1 = require("../../metadata/TestSuiteDescriptorRegistry");
const jec_juta_1 = require("jec-juta");
const TestMethodBuilder_1 = require("../../builders/TestMethodBuilder");
const AnnotatedMethodBuilder_1 = require("../../builders/AnnotatedMethodBuilder");
class TigerRunableTestSuite {
    constructor() {
        this._testSuite = null;
        this._description = null;
        this._testMethods = null;
        this._annotatedMethods = null;
        this.initObj();
    }
    initObj() {
        this._testMethods = new Array();
        this._annotatedMethods = new Array();
    }
    initTestMethods() {
        let coll = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getTestDescriptorCollection();
        let len = coll.length;
        let builder = new TestMethodBuilder_1.TestMethodBuilder();
        let method = null;
        while (len--) {
            method = builder.build(coll[len]);
            this._testMethods.push(method);
        }
    }
    initAnnotatedMethods() {
        let coll = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getAnnotatedMethodDescriptorCollection();
        let len = coll.length;
        let builder = new AnnotatedMethodBuilder_1.AnnotatedMethodBuilder();
        let method = null;
        while (len--) {
            method = builder.build(coll[len]);
            this._annotatedMethods.push(method);
        }
    }
    getTestSuite() {
        return this._testSuite;
    }
    setTestSuite(testSuite) {
        let descriptor = TestSuiteDescriptorRegistry_1.TestSuiteDescriptorRegistry.getRegisteredDescriptor();
        if (!descriptor) {
            throw new jec_juta_1.TestSuiteError("No TestSuiteDescriptor is defined for the specified class:" +
                testSuite.constructor.name);
        }
        this._testSuite = testSuite;
        this._description = descriptor.description;
        this.initTestMethods();
        this.initAnnotatedMethods();
    }
    getDescription() {
        return this._description;
    }
    getTestMethods() {
        return this._testMethods;
    }
    getAnnotatedMethods() {
        return this._annotatedMethods;
    }
}
exports.TigerRunableTestSuite = TigerRunableTestSuite;
